from __future__ import annotations

import asyncio
import base64
import time
from fnmatch import fnmatchcase
from typing import Any
from urllib.parse import urljoin, urlsplit

import aiohttp
import voluptuous as vol
from homeassistant.core import HomeAssistant, ServiceCall, ServiceResponse, SupportsResponse
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import DOMAIN

HOSTS = frozenset(
    {
        "github.com",
        "api.github.com",
        "release-assets.githubusercontent.com",
        "objects.githubusercontent.com",
        "*.echolocal.link",
    }
)
PIECE = 40 << 10
WHOLE = 8 << 20
HOPS = 5
KEEP = 60.0
TIMEOUT = aiohttp.ClientTimeout(total=30)

SCHEMA = vol.Schema(
    {
        vol.Required("url"): str,
        vol.Optional("offset", default=0): vol.All(vol.Coerce(int), vol.Range(min=0)),
        vol.Optional("length", default=PIECE): vol.All(
            vol.Coerce(int), vol.Range(min=1, max=PIECE)
        ),
    }
)


def allowed(url: str) -> bool:
    parts = urlsplit(url)
    host = parts.hostname or ""
    return (
        parts.scheme == "https"
        and parts.port in (None, 443)
        and any(fnmatchcase(host, pattern) for pattern in HOSTS)
    )


def refused(url: str) -> HomeAssistantError:
    return HomeAssistantError(f"echolocal does not download from {urlsplit(url).hostname}")


def total_of(content_range: str | None) -> int:
    if not content_range or "/" not in content_range:
        return 0
    tail = content_range.rsplit("/", 1)[1]
    return int(tail) if tail.isdigit() else 0


async def bounded(resp: aiohttp.ClientResponse, most: int) -> bytes:
    out = bytearray()
    async for part in resp.content.iter_chunked(64 << 10):
        out += part
        if len(out) > most:
            break
    return bytes(out)


def answer(status: int, total: int, kind: str, data: bytes) -> ServiceResponse:
    return {
        "status": status,
        "total": total,
        "type": kind,
        "data": base64.b64encode(data).decode(),
    }


def async_setup(hass: HomeAssistant) -> None:
    session = async_get_clientsession(hass)
    moved: dict[str, tuple[float, str]] = {}
    tags: dict[str, tuple[float, str]] = {}
    whole: dict[str, tuple[float, int, str, bytes]] = {}
    loading: dict[str, asyncio.Task[tuple[int, str, bytes]]] = {}

    def forget() -> None:
        now = time.monotonic()
        for cache in (moved, tags, whole):
            for key in [k for k, v in cache.items() if v[0] < now]:
                del cache[key]

    async def get(url: str, headers: dict[str, str], most: int) -> tuple[int, Any, bytes]:
        target = moved.get(url, (0.0, url))[1]
        for _ in range(HOPS):
            if not allowed(target):
                raise refused(target)
            async with session.get(
                target, headers=headers, allow_redirects=False, timeout=TIMEOUT
            ) as resp:
                if resp.status in (301, 302, 303, 307, 308) and "Location" in resp.headers:
                    target = urljoin(target, resp.headers["Location"])
                    continue
                if target != url:
                    moved[url] = (time.monotonic() + KEEP, target)
                body = await bounded(resp, most) if resp.status in (200, 206) else b""
                return resp.status, resp.headers, body
        raise HomeAssistantError(f"{url} redirects too often")

    async def load(url: str) -> tuple[int, str, bytes]:
        status, headers, body = await get(url, {}, WHOLE)
        if len(body) > WHOLE:
            raise HomeAssistantError(f"{url} is too large to keep whole")
        return status, headers.get("Content-Type", ""), body

    async def kept(url: str, offset: int, length: int) -> ServiceResponse:
        if url not in whole:
            if (task := loading.get(url)) is None:
                task = hass.async_create_task(load(url))
                loading[url] = task
                task.add_done_callback(lambda _: loading.pop(url, None))
            status, kind, body = await task
            if status != 200:
                return answer(status, 0, kind, b"")
            whole.setdefault(url, (0.0, status, kind, body))
        _, status, kind, body = whole[url]
        whole[url] = (time.monotonic() + KEEP, status, kind, body)
        if offset >= len(body):
            return answer(416, len(body), kind, b"")
        return answer(206, len(body), kind, body[offset : offset + length])

    async def ranged(url: str, offset: int, length: int) -> ServiceResponse:
        headers = {
            "Range": f"bytes={offset}-{offset + length - 1}",
            "Accept-Encoding": "identity",
        }
        pinned = tags.get(url, (0.0, ""))[1]
        if pinned:
            headers["If-Range"] = pinned
        status, got, body = await get(url, headers, length)
        if got.get("Content-Encoding", "identity") != "identity":
            raise HomeAssistantError(f"{url} came back encoded as {got['Content-Encoding']}")
        kind = got.get("Content-Type", "")
        if status == 206:
            tag = got.get("ETag", "")
            if not tag or tag.startswith("W/"):
                return await kept(url, offset, length)
            if pinned and tag != pinned:
                raise HomeAssistantError(f"{url} changed while downloading")
            tags[url] = (time.monotonic() + KEEP, tag)
            return answer(206, total_of(got.get("Content-Range")), kind, body[:length])
        if status == 200:
            if pinned:
                raise HomeAssistantError(f"{url} changed while downloading")
            return await kept(url, offset, length)
        if status == 416:
            return answer(416, total_of(got.get("Content-Range")), kind, b"")
        return answer(status, 0, kind, b"")

    async def fetch(call: ServiceCall) -> ServiceResponse:
        url, offset, length = call.data["url"], call.data["offset"], call.data["length"]
        if not allowed(url):
            raise refused(url)
        forget()
        try:
            if url in whole or url in loading:
                return await kept(url, offset, length)
            return await ranged(url, offset, length)
        except (aiohttp.ClientError, TimeoutError) as err:
            raise HomeAssistantError(f"downloading {url}: {err}") from err

    hass.services.async_register(
        DOMAIN, "fetch", fetch, schema=SCHEMA, supports_response=SupportsResponse.ONLY
    )
