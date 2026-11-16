from __future__ import annotations

import asyncio
import json
import logging
from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.components.esphome import DOMAIN as ESPHOME_DOMAIN
from homeassistant.core import HomeAssistant, ServiceCall, ServiceResponse, SupportsResponse
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.storage import Store

from .const import DOMAIN
from .fleet import _devices

_LOGGER = logging.getLogger(__name__)

STORE_KEY = f"{DOMAIN}.voices"
STORE_VERSION = 1
DATA = "echolocal_voices"
UPDATED = f"{DOMAIN}_voices_updated"

DEVICE_ACTION = "voice_profiles"
WAIT = 15

LOOSEST = 0.30
STRICTEST = 0.70

SCHEMA = vol.Schema({vol.Optional("changes", default="[]"): str})


async def async_setup(hass: HomeAssistant) -> None:
    store: Store[dict[str, Any]] = Store(hass, STORE_VERSION, STORE_KEY)
    saved = await store.async_load() or {}
    hass.data[DATA] = {"store": store, "profiles": saved.get("profiles", [])}

    async def exchange(call: ServiceCall) -> ServiceResponse:
        try:
            changes = json.loads(call.data["changes"])
        except ValueError as err:
            raise HomeAssistantError(f"voice changes are not JSON: {err}") from err
        if changes is None:
            changes = []
        if not isinstance(changes, list):
            raise HomeAssistantError("voice changes must be a list")
        if await _apply(hass, changes):
            hass.async_create_task(_push(hass))
        return {"profiles": hass.data[DATA]["profiles"]}

    hass.services.async_register(
        DOMAIN, "voices", exchange, schema=SCHEMA, supports_response=SupportsResponse.ONLY
    )
    websocket_api.async_register_command(hass, ws_list)
    websocket_api.async_register_command(hass, ws_threshold)
    websocket_api.async_register_command(hass, ws_remove)
    websocket_api.async_register_command(hass, ws_person)


def _valid(profile: Any) -> bool:
    if not isinstance(profile, dict):
        return False
    threshold = profile.get("threshold")
    return (
        isinstance(profile.get("id"), str)
        and bool(profile["id"])
        and isinstance(profile.get("name"), str)
        and isinstance(profile.get("prints"), list)
        and bool(profile["prints"])
        and isinstance(threshold, (int, float))
        and LOOSEST <= threshold <= STRICTEST
    )


async def _apply(hass: HomeAssistant, changes: list[Any]) -> bool:
    data = hass.data[DATA]
    profiles = {p["id"]: p for p in data["profiles"]}
    changed = False
    for change in changes:
        if not isinstance(change, dict):
            continue
        if "remove" in change:
            changed |= profiles.pop(str(change["remove"]), None) is not None
            continue
        profile = change.get("save")
        if not _valid(profile):
            _LOGGER.warning("a device sent a voice that is not valid: %s", str(profile)[:120])
            continue
        if profiles.get(profile["id"]) != profile:
            profiles[profile["id"]] = profile
            changed = True
    if changed:
        data["profiles"] = sorted(profiles.values(), key=lambda p: p["name"].lower())
        await data["store"].async_save({"profiles": data["profiles"]})
        hass.bus.async_fire(UPDATED)
    return changed


async def _send(hass: HomeAssistant, node: str) -> None:
    try:
        async with asyncio.timeout(WAIT):
            await hass.services.async_call(
                ESPHOME_DOMAIN,
                f"{node}_{DEVICE_ACTION}",
                {"profiles": json.dumps(hass.data[DATA]["profiles"])},
                blocking=True,
                return_response=True,
            )
    except (HomeAssistantError, TimeoutError) as err:
        _LOGGER.warning("sending voices to %s failed: %s", node, err)


async def _push(hass: HomeAssistant) -> None:
    nodes = [
        node
        for _, node, online in _devices(hass)
        if online and node and hass.services.has_service(ESPHOME_DOMAIN, f"{node}_{DEVICE_ACTION}")
    ]
    await asyncio.gather(*(_send(hass, node) for node in nodes))


def _summary(profile: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": profile["id"],
        "name": profile["name"],
        "person": profile.get("person", ""),
        "threshold": profile["threshold"],
    }


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/voices"})
@websocket_api.async_response
async def ws_list(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    connection.send_result(
        msg["id"], {"voices": [_summary(p) for p in hass.data[DATA]["profiles"]]}
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/voices/threshold",
        vol.Required("voice"): str,
        vol.Required("threshold"): vol.All(vol.Coerce(float), vol.Range(LOOSEST, STRICTEST)),
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_threshold(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    found = next((p for p in hass.data[DATA]["profiles"] if p["id"] == msg["voice"]), None)
    if found is None:
        connection.send_error(msg["id"], "not_found", "No such voice")
        return
    if await _apply(hass, [{"save": {**found, "threshold": round(msg["threshold"], 2)}}]):
        hass.async_create_task(_push(hass))
    connection.send_result(msg["id"], {})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/voices/person",
        vol.Required("voice"): str,
        vol.Required("person"): vol.Any("", vol.Match(r"^person\.[a-z0-9_]+$")),
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_person(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    found = next((p for p in hass.data[DATA]["profiles"] if p["id"] == msg["voice"]), None)
    if found is None:
        connection.send_error(msg["id"], "not_found", "No such voice")
        return
    if await _apply(hass, [{"save": {**found, "person": msg["person"]}}]):
        hass.async_create_task(_push(hass))
    connection.send_result(msg["id"], {})


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/voices/remove", vol.Required("voice"): str}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_remove(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    if await _apply(hass, [{"remove": msg["voice"]}]):
        hass.async_create_task(_push(hass))
    connection.send_result(msg["id"], {})
