from __future__ import annotations

import base64
import json
import logging
import re
import struct
import time
from pathlib import Path
from typing import Any

import voluptuous as vol
from aiohttp import web
from homeassistant.components import websocket_api
from homeassistant.components.esphome.const import DOMAIN as ESPHOME_DOMAIN
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.exceptions import HomeAssistantError, ServiceValidationError, Unauthorized
from homeassistant.helpers import config_validation as cv, device_registry as dr
from homeassistant.util import slugify

from .const import DOMAIN, MANUFACTURER, TONES_DIR_NAME

_LOGGER = logging.getLogger(__name__)

PAGE = 32 * 1024
RATE = 48000
LONGEST = 30
ORIGINAL_MOST = 50 * 1024 * 1024

KEY = re.compile(r"^[a-z0-9][a-z0-9_-]{0,63}$")
EXTENSION = re.compile(r"^\.[a-z0-9]{1,8}$")

ASSIGN_SCHEMA = vol.Schema(
    {
        vol.Required("tone"): cv.string,
        vol.Required("device_id"): vol.All(cv.ensure_list, [cv.string]),
    }
)


async def async_setup(hass: HomeAssistant) -> None:
    store = _dir(hass)
    await hass.async_add_executor_job(lambda: store.mkdir(parents=True, exist_ok=True))

    hass.http.register_view(ToneUploadView())
    hass.http.register_view(ToneFileView())

    websocket_api.async_register_command(hass, ws_list)
    websocket_api.async_register_command(hass, ws_rename)
    websocket_api.async_register_command(hass, ws_delete)

    async def assign(call: ServiceCall) -> None:
        await async_assign(hass, call.data["tone"], call.data["device_id"])

    async def unassign(call: ServiceCall) -> None:
        await async_unassign(hass, call.data["tone"], call.data["device_id"])

    hass.services.async_register(DOMAIN, "assign_tone", assign, schema=ASSIGN_SCHEMA)
    hass.services.async_register(DOMAIN, "unassign_tone", unassign, schema=ASSIGN_SCHEMA)


def _dir(hass: HomeAssistant) -> Path:
    return Path(hass.config.path(TONES_DIR_NAME))


def _meta_path(store: Path, key: str) -> Path:
    if not KEY.match(key):
        raise ServiceValidationError(f"{key!r} is not a tone key")
    return store / f"{key}.json"


def _read_meta(store: Path, key: str) -> dict[str, Any]:
    path = _meta_path(store, key)
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, ValueError) as err:
        raise ServiceValidationError(f"there is no tone {key!r}") from err


def _list(store: Path) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    for path in sorted(store.glob("*.json")):
        try:
            meta = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            continue
        if meta.get("key") != path.stem:
            continue
        meta["original"] = (
            bool(meta.get("source")) and (store / meta.get("original_file", "")).is_file()
        )
        out.append(meta)
    out.sort(key=lambda m: str(m.get("name", "")).lower())
    return out


def _pcm(wav: bytes) -> bytes:
    if len(wav) < 12 or wav[:4] != b"RIFF" or wav[8:12] != b"WAVE":
        raise ValueError("the tone is not a WAV file")
    fmt: tuple[int, int, int, int] | None = None
    at = 12
    while at + 8 <= len(wav):
        chunk, size = wav[at : at + 4], struct.unpack("<I", wav[at + 4 : at + 8])[0]
        body = wav[at + 8 : at + 8 + size]
        if chunk == b"fmt ":
            audio, channels, rate = struct.unpack("<HHI", body[:8])
            bits = struct.unpack("<H", body[14:16])[0]
            fmt = (audio, channels, rate, bits)
        elif chunk == b"data":
            if fmt != (1, 1, RATE, 16):
                raise ValueError(f"the tone must be 16-bit mono PCM at {RATE} Hz")
            if len(body) > LONGEST * RATE * 2:
                raise ValueError(f"the tone is longer than {LONGEST} seconds")
            if not body:
                raise ValueError("the tone has no sound")
            return body
        at += 8 + size + (size & 1)
    raise ValueError("the tone has no audio data")


def _free_key(store: Path, name: str) -> str:
    base = slugify(name)[:56] or "tone"
    if not KEY.match(base):
        base = "tone"
    key, n = base, 2
    while (store / f"{key}.json").exists():
        key, n = f"{base}_{n}", n + 1
    return key


class ToneUploadView(HomeAssistantView):
    url = "/api/echolocal/tones"
    name = "api:echolocal:tones"

    async def post(self, request: web.Request) -> web.Response:
        hass: HomeAssistant = request.app["hass"]
        if not request["hass_user"].is_admin:
            raise Unauthorized

        reader = await request.multipart()
        fields: dict[str, str] = {}
        tone = b""
        original = b""
        source = ""
        while part := await reader.next():
            if part.name == "tone":
                tone = await part.read()
            elif part.name == "original":
                source = Path(part.filename or "").name
                original = await part.read()
            else:
                fields[part.name] = (await part.read()).decode()

        name = fields.get("name", "").strip()
        if not name:
            return self.json({"error": "a tone needs a name"}, status_code=400)
        if len(original) > ORIGINAL_MOST:
            return self.json({"error": "the original file is too large"}, status_code=400)
        try:
            pcm = _pcm(tone)
        except ValueError as err:
            return self.json({"error": str(err)}, status_code=400)

        store = _dir(hass)
        try:
            meta = await hass.async_add_executor_job(
                _save, store, fields.get("key", ""), name, source, original, tone, pcm, fields
            )
        except ServiceValidationError as err:
            return self.json({"error": str(err)}, status_code=400)
        return self.json(meta)


def _save(
    store: Path,
    key: str,
    name: str,
    source: str,
    original: bytes,
    tone: bytes,
    pcm: bytes,
    fields: dict[str, str],
) -> dict[str, Any]:
    store.mkdir(parents=True, exist_ok=True)
    if key:
        previous = _read_meta(store, key)
    else:
        key, previous = _free_key(store, name), {}

    meta: dict[str, Any] = {
        "key": key,
        "name": name,
        "source": previous.get("source", ""),
        "original_file": previous.get("original_file", ""),
        "added": previous.get("added") or int(time.time()),
        "length": round(len(pcm) / 2 / RATE, 3),
        "segment": {
            "start": float(fields.get("start") or 0),
            "end": float(fields.get("end") or 0),
        },
    }
    if original:
        extension = Path(source).suffix.lower()
        if not EXTENSION.match(extension):
            extension = ".bin"
        if meta["original_file"]:
            (store / meta["original_file"]).unlink(missing_ok=True)
        meta["source"] = source
        meta["original_file"] = f"{key}.original{extension}"
        (store / meta["original_file"]).write_bytes(original)

    (store / f"{key}.wav").write_bytes(tone)
    (store / f"{key}.json").write_text(json.dumps(meta, indent=2) + "\n", encoding="utf-8")
    return meta


class ToneFileView(HomeAssistantView):
    url = "/api/echolocal/tones/{key}/{kind}"
    name = "api:echolocal:tones:file"

    async def get(self, request: web.Request, key: str, kind: str) -> web.StreamResponse:
        hass: HomeAssistant = request.app["hass"]
        store = _dir(hass)
        try:
            meta = await hass.async_add_executor_job(_read_meta, store, key)
        except ServiceValidationError:
            return web.Response(status=404)
        if kind == "tone":
            path = store / f"{key}.wav"
        elif kind == "original" and meta.get("original_file"):
            path = store / meta["original_file"]
        else:
            return web.Response(status=404)
        if not path.is_file():
            return web.Response(status=404)
        return web.FileResponse(path)


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "echolocal/tones/list"})
@websocket_api.async_response
async def ws_list(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    found = await hass.async_add_executor_job(_list, _dir(hass))
    connection.send_result(msg["id"], {"tones": found})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "echolocal/tones/rename",
        vol.Required("key"): cv.string,
        vol.Required("name"): cv.string,
    }
)
@websocket_api.async_response
async def ws_rename(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    store, key, name = _dir(hass), msg["key"], msg["name"].strip()
    if not name:
        connection.send_error(msg["id"], "invalid_format", "a tone needs a name")
        return

    def edit() -> dict[str, Any]:
        meta = _read_meta(store, key)
        meta["name"] = name
        _meta_path(store, key).write_text(json.dumps(meta, indent=2) + "\n", encoding="utf-8")
        return meta

    try:
        meta = await hass.async_add_executor_job(edit)
    except ServiceValidationError as err:
        connection.send_error(msg["id"], "not_found", str(err))
        return
    for node in _online_nodes(hass):
        await _call(hass, node, "tone_rename", {"key": key, "name": name}, quiet=True)
    connection.send_result(msg["id"], meta)


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): "echolocal/tones/delete", vol.Required("key"): cv.string}
)
@websocket_api.async_response
async def ws_delete(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    store, key = _dir(hass), msg["key"]
    try:
        meta = await hass.async_add_executor_job(_read_meta, store, key)
    except ServiceValidationError as err:
        connection.send_error(msg["id"], "not_found", str(err))
        return

    for node in _online_nodes(hass):
        await _call(hass, node, "tone_remove", {"key": key}, quiet=True)

    def remove() -> None:
        for name in (f"{key}.json", f"{key}.wav", meta.get("original_file") or ""):
            if name:
                (store / name).unlink(missing_ok=True)

    await hass.async_add_executor_job(remove)
    connection.send_result(msg["id"], {})


async def async_assign(hass: HomeAssistant, key: str, device_ids: list[str]) -> None:
    store = _dir(hass)
    meta = await hass.async_add_executor_job(_read_meta, store, key)
    wav = await hass.async_add_executor_job((store / f"{key}.wav").read_bytes)
    try:
        pcm = _pcm(wav)
    except ValueError as err:
        raise HomeAssistantError(f"tone {key!r}: {err}") from err

    pages = [pcm[at : at + PAGE] for at in range(0, len(pcm), PAGE)]
    failed: list[str] = []
    for device_id in device_ids:
        node = _node(hass, device_id)
        try:
            for page, data in enumerate(pages):
                await _call(
                    hass,
                    node,
                    "tone_write",
                    {
                        "key": key,
                        "name": meta.get("name") or key,
                        "page": page,
                        "pages": len(pages),
                        "data": base64.b64encode(data).decode(),
                    },
                )
        except HomeAssistantError as err:
            failed.append(str(err))
    if failed:
        raise HomeAssistantError("; ".join(failed))


async def async_unassign(hass: HomeAssistant, key: str, device_ids: list[str]) -> None:
    for device_id in device_ids:
        await _call(hass, _node(hass, device_id), "tone_remove", {"key": key})


def _node(hass: HomeAssistant, device_id: str) -> str:
    device = dr.async_get(hass).async_get(device_id)
    if device is None:
        raise ServiceValidationError(f"no device {device_id!r}")
    for entry_id in device.config_entries:
        entry = hass.config_entries.async_get_entry(entry_id)
        if entry is None or entry.domain != ESPHOME_DOMAIN:
            continue
        info = getattr(getattr(entry, "runtime_data", None), "device_info", None)
        if info is not None:
            return info.name.replace("-", "_")
    raise ServiceValidationError(f"{device.name_by_user or device.name} is not an EchoLocal device")


def _online_nodes(hass: HomeAssistant) -> list[str]:
    nodes: list[str] = []
    for entry in hass.config_entries.async_entries(ESPHOME_DOMAIN):
        data = getattr(entry, "runtime_data", None)
        info = getattr(data, "device_info", None)
        if info is None or not getattr(data, "available", False):
            continue
        if info.manufacturer != MANUFACTURER:
            continue
        nodes.append(info.name.replace("-", "_"))
    return nodes


async def _call(
    hass: HomeAssistant,
    node: str,
    action: str,
    data: dict[str, Any],
    quiet: bool = False,
) -> bool:
    service = f"{node}_{action}"
    if not hass.services.has_service(ESPHOME_DOMAIN, service):
        if quiet:
            return False
        raise HomeAssistantError(f"{node} does not offer {action}; update it first")
    try:
        await hass.services.async_call(
            ESPHOME_DOMAIN, service, data, blocking=True, return_response=True
        )
    except HomeAssistantError as err:
        if quiet:
            _LOGGER.debug("%s on %s: %s", action, node, err)
            return False
        raise HomeAssistantError(f"{node}: {err}") from err
    return True
