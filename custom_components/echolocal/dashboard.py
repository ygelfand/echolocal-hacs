from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.components.esphome import DOMAIN as ESPHOME_DOMAIN
from homeassistant.components.esphome.const import CONF_DEVICE_NAME
from homeassistant.components.frontend import DATA_THEMES
from homeassistant.components.lovelace.const import LOVELACE_DATA
from homeassistant.const import __version__ as HA_VERSION
from homeassistant.core import (
    Event,
    HomeAssistant,
    ServiceCall,
    ServiceResponse,
    SupportsResponse,
    callback,
)
from homeassistant.exceptions import HomeAssistantError, ServiceValidationError
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers.network import NoURLAvailableError, get_url
from homeassistant.helpers.service import async_register_admin_service

from .const import CONF_PANEL_USERS, DOMAIN, MANUFACTURERS

CLIENT = "https://github.com/ygelfand/echolocal-hacs/panel/"

LIST_SCHEMA = vol.Schema({vol.Required("node"): str})
TOKEN_SCHEMA = vol.Schema({vol.Required("node"): str, vol.Required("user"): str})


def _node(hass: HomeAssistant, asked: str) -> str:
    wanted = asked.replace("-", "_")
    for entry in hass.config_entries.async_entries(ESPHOME_DOMAIN):
        info = getattr(getattr(entry, "runtime_data", None), "device_info", None)
        if (
            info is not None
            and info.manufacturer in MANUFACTURERS
            and info.name.replace("-", "_") == wanted
        ):
            return wanted
    raise ServiceValidationError(f"{asked} is not an EchoLocal or LANovo device")


def allowed(hass: HomeAssistant) -> list[str]:
    entries = hass.config_entries.async_entries(DOMAIN)
    if not entries:
        return []
    return list(entries[0].options.get(CONF_PANEL_USERS, []))


async def _views(config: Any) -> list[dict[str, str]]:
    try:
        loaded = await config.async_load(False)
    except HomeAssistantError:
        return []
    views = []
    for i, view in enumerate(loaded.get("views", []) if isinstance(loaded, dict) else []):
        path = str(view.get("path") or i)
        views.append({"path": path, "title": str(view.get("title") or path)})
    return views


async def _dashboards(hass: HomeAssistant) -> list[dict[str, Any]]:
    data = hass.data.get(LOVELACE_DATA)
    if data is None:
        return []
    found = []
    for path, config in data.dashboards.items():
        info = config.config or {}
        found.append(
            {
                "path": path or "lovelace",
                "title": info.get("title") or "Overview",
                "admin": bool(info.get("require_admin")),
                "views": await _views(config),
            }
        )
    return found


def _themes(hass: HomeAssistant) -> list[dict[str, Any]]:
    themes = hass.data.get(DATA_THEMES) or {}
    return [
        {"name": name, "dark": "dark" in (theme.get("modes") or {})}
        for name, theme in sorted(themes.items(), key=lambda item: item[0].casefold())
        if isinstance(theme, dict)
    ]


async def _users(hass: HomeAssistant) -> list[dict[str, Any]]:
    users = []
    for user_id in allowed(hass):
        user = await hass.auth.async_get_user(user_id)
        if user is not None and user.is_active and not user.system_generated:
            users.append({"id": user.id, "name": user.name, "admin": user.is_admin})
    return users


async def _forget(hass: HomeAssistant, keep: Any = None, node: str | None = None) -> None:
    for user in await hass.auth.async_get_users():
        for token in list(user.refresh_tokens.values()):
            client = token.client_id or ""
            if token is keep or not client.startswith(CLIENT):
                continue
            if node is not None and client != CLIENT + node:
                continue
            if node is None and user.id in allowed(hass):
                continue
            hass.auth.async_remove_refresh_token(token)


def _nodes(hass: HomeAssistant) -> set[str]:
    names = (
        str(entry.data.get(CONF_DEVICE_NAME) or "")
        for entry in hass.config_entries.async_entries(ESPHOME_DOMAIN)
    )
    return {name.replace("-", "_") for name in names if name}


async def _orphans(hass: HomeAssistant) -> None:
    nodes = _nodes(hass)
    for user in await hass.auth.async_get_users():
        for token in list(user.refresh_tokens.values()):
            client = token.client_id or ""
            if client.startswith(CLIENT) and client.removeprefix(CLIENT) not in nodes:
                hass.auth.async_remove_refresh_token(token)


async def async_prune(hass: HomeAssistant) -> None:
    await _forget(hass)
    await _orphans(hass)


def async_setup(hass: HomeAssistant) -> None:
    @callback
    def removed(event: Event[dr.EventDeviceRegistryUpdatedData]) -> None:
        if event.data["action"] == "remove":
            hass.async_create_task(_orphans(hass))

    hass.bus.async_listen(dr.EVENT_DEVICE_REGISTRY_UPDATED, removed)

    async def dashboards(call: ServiceCall) -> ServiceResponse:
        _node(hass, call.data["node"])
        return {
            "version": HA_VERSION,
            "users": await _users(hass),
            "dashboards": await _dashboards(hass),
            "themes": _themes(hass),
        }

    async def dashboard_token(call: ServiceCall) -> ServiceResponse:
        node = _node(hass, call.data["node"])
        if call.data["user"] not in allowed(hass):
            raise ServiceValidationError("that user is not allowed on device screens")
        user = await hass.auth.async_get_user(call.data["user"])
        if user is None or not user.is_active or user.system_generated:
            raise ServiceValidationError("that user cannot sign in")
        try:
            url = get_url(hass, prefer_external=False, allow_cloud=False)
        except NoURLAvailableError as err:
            raise HomeAssistantError("Home Assistant has no address to give the device") from err
        client = CLIENT + node
        token = next(
            (t for t in user.refresh_tokens.values() if t.client_id == client),
            None,
        )
        if token is None:
            token = await hass.auth.async_create_refresh_token(
                user, client_id=client, client_name=f"{node} screen"
            )
        await _forget(hass, keep=token, node=node)
        return {
            "url": url,
            "access_token": hass.auth.async_create_access_token(token),
            "expires_in": int(token.access_token_expiration.total_seconds()),
        }

    async_register_admin_service(
        hass,
        DOMAIN,
        "dashboards",
        dashboards,
        schema=LIST_SCHEMA,
        supports_response=SupportsResponse.ONLY,
    )
    async_register_admin_service(
        hass,
        DOMAIN,
        "dashboard_token",
        dashboard_token,
        schema=TOKEN_SCHEMA,
        supports_response=SupportsResponse.ONLY,
    )
