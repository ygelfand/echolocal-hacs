from __future__ import annotations

import asyncio
import json
import logging
import re
from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.components.esphome import DOMAIN as ESPHOME_DOMAIN
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import device_registry as dr, entity_registry as er
from homeassistant.helpers.storage import Store

from .const import DOMAIN, MANUFACTURERS

_LOGGER = logging.getLogger(__name__)

STORE_KEY = f"{DOMAIN}.fleet"
STORE_VERSION = 1
DATA = "echolocal_fleet"

EXPORT = "settings_export"
IMPORT = "settings_import"
WAIT = 15

ASSISTANTS = "assistants"
SECTION = "Voice assistants"
SELECTS = re.compile(r"-(pipeline|wake_word)(?:_(\d+))?$")
TITLES = {"pipeline": "Pipeline", "wake_word": "Wake word"}


async def async_setup(hass: HomeAssistant) -> None:
    store: Store[dict[str, Any]] = Store(hass, STORE_VERSION, STORE_KEY)
    hass.data[DATA] = {"store": store, "local": (await store.async_load() or {}).get("local", [])}
    websocket_api.async_register_command(hass, ws_read)
    websocket_api.async_register_command(hass, ws_sync)
    websocket_api.async_register_command(hass, ws_local)


def _devices(hass: HomeAssistant) -> list[tuple[dr.DeviceEntry, str | None, bool]]:
    out = []
    registry = dr.async_get(hass)
    for entry in hass.config_entries.async_entries(ESPHOME_DOMAIN):
        data = getattr(entry, "runtime_data", None)
        info = getattr(data, "device_info", None)
        node = info.name.replace("-", "_") if info is not None else None
        online = bool(getattr(data, "available", False))
        for device in dr.async_entries_for_config_entry(registry, entry.entry_id):
            if device.via_device_id is None and device.manufacturer in MANUFACTURERS:
                out.append((device, node, online))
    return out


def _selects(hass: HomeAssistant, device_id: str) -> dict[str, str]:
    out = {}
    for entry in er.async_entries_for_device(er.async_get(hass), device_id):
        if entry.domain != "select" or entry.platform != ESPHOME_DOMAIN:
            continue
        found = SELECTS.search(entry.unique_id)
        if found:
            out[f"{found.group(2) or '1'}.{found.group(1)}"] = entry.entity_id
    return out


def _ha_settings(hass: HomeAssistant, device_id: str) -> list[dict[str, Any]]:
    out = []
    for name, entity_id in sorted(_selects(hass, device_id).items()):
        state = hass.states.get(entity_id)
        if state is None or state.state in ("unavailable", "unknown"):
            continue
        slot, field = name.split(".", 1)
        out.append(
            {
                "domain": ASSISTANTS,
                "section": SECTION,
                "group": f"Assistant {slot}",
                "name": name,
                "title": TITLES[field],
                "kind": "choice",
                "value": state.state,
                "choices": list(state.attributes.get("options", [])),
            }
        )
    return out


def _answer(response: Any) -> dict[str, Any]:
    if isinstance(response, dict) and isinstance(response.get("response"), dict):
        return response["response"]
    return response if isinstance(response, dict) else {}


async def _export(hass: HomeAssistant, node: str) -> list[dict[str, Any]]:
    async with asyncio.timeout(WAIT):
        response = await hass.services.async_call(
            ESPHOME_DOMAIN, f"{node}_{EXPORT}", {}, blocking=True, return_response=True
        )
    return list(_answer(response).get("settings", []))


async def _read_one(
    hass: HomeAssistant, device: dr.DeviceEntry, node: str | None, online: bool
) -> dict[str, Any]:
    out: dict[str, Any] = {
        "id": device.id,
        "name": device.name_by_user or device.name or device.id,
        "online": online,
        "settings": [],
        "error": None,
    }
    if not online or node is None:
        out["online"] = False
        return out
    if not hass.services.has_service(ESPHOME_DOMAIN, f"{node}_{EXPORT}"):
        out["error"] = "update"
    else:
        try:
            out["settings"] = await _export(hass, node)
        except TimeoutError:
            _LOGGER.warning("%s didn't answer for its settings within %d s", node, WAIT)
            out["error"] = "timeout"
        except HomeAssistantError as err:
            _LOGGER.warning("reading settings from %s failed: %s", node, err)
            out["error"] = "failed"
    out["settings"] += _ha_settings(hass, device.id)
    return out


@websocket_api.websocket_command(
    {vol.Required("type"): "echolocal/fleet", vol.Optional("devices"): [str]}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_read(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    wanted = msg.get("devices")
    picked = [d for d in _devices(hass) if wanted is None or d[0].id in wanted]
    devices = await asyncio.gather(*(_read_one(hass, *d) for d in picked))
    connection.send_result(msg["id"], {"devices": list(devices), "local": hass.data[DATA]["local"]})


async def _sync_one(
    hass: HomeAssistant,
    node: str | None,
    device_id: str,
    device_side: dict[str, dict[str, str]],
    ha_side: dict[str, str],
) -> dict[str, Any]:
    out: dict[str, Any] = {"id": device_id, "changed": 0, "skipped": [], "errors": []}
    if device_side:
        if node is None or not hass.services.has_service(ESPHOME_DOMAIN, f"{node}_{IMPORT}"):
            out["errors"].append("This device needs an update")
        else:
            try:
                async with asyncio.timeout(WAIT):
                    response = await hass.services.async_call(
                        ESPHOME_DOMAIN,
                        f"{node}_{IMPORT}",
                        {"settings": json.dumps(device_side)},
                        blocking=True,
                        return_response=True,
                    )
                answer = _answer(response)
                out["changed"] += int(answer.get("changed", 0))
                out["skipped"] += answer.get("skipped") or []
                if answer.get("errors"):
                    out["errors"].append(answer["errors"])
            except (HomeAssistantError, TimeoutError) as err:
                out["errors"].append(str(err) or "No answer")
    selects = _selects(hass, device_id)
    for name, value in ha_side.items():
        entity_id = selects.get(name)
        state = hass.states.get(entity_id) if entity_id else None
        if state is None:
            out["skipped"].append({"domain": ASSISTANTS, "name": name, "why": "missing"})
            continue
        if state.state == value:
            continue
        if value not in state.attributes.get("options", []):
            out["errors"].append(f"{TITLES[name.split('.', 1)[1]]}: {value} isn't offered here")
            continue
        try:
            await hass.services.async_call(
                "select", "select_option", {"entity_id": entity_id, "option": value}, blocking=True
            )
            out["changed"] += 1
        except HomeAssistantError as err:
            out["errors"].append(str(err))
    return out


@websocket_api.websocket_command(
    {
        vol.Required("type"): "echolocal/fleet/sync",
        vol.Required("primary"): str,
        vol.Required("targets"): [str],
        vol.Required("keys"): [str],
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_sync(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    found = {device.id: (device, node, online) for device, node, online in _devices(hass)}
    primary = found.get(msg["primary"])
    if primary is None or not primary[2] or primary[1] is None:
        connection.send_error(msg["id"], "not_found", "The primary device is offline")
        return
    local = set(hass.data[DATA]["local"])
    wanted = [k for k in msg["keys"] if k not in local]
    selects = _selects(hass, primary[0].id)

    try:
        exported = await _export(hass, primary[1])
    except (HomeAssistantError, TimeoutError) as err:
        connection.send_error(msg["id"], "failed", f"Reading the primary failed: {err}")
        return
    values = {f"{s['domain']}.{s['name']}": s["value"] for s in exported}

    device_side: dict[str, dict[str, str]] = {}
    ha_side: dict[str, str] = {}
    for key in wanted:
        domain, name = key.split(".", 1)
        if domain == ASSISTANTS and name in selects:
            state = hass.states.get(selects[name])
            if state is not None and state.state not in ("unavailable", "unknown"):
                ha_side[name] = state.state
        elif key in values:
            device_side.setdefault(domain, {})[name] = values[key]

    targets = [found[t] for t in msg["targets"] if t in found and t != msg["primary"]]
    results = await asyncio.gather(
        *(
            _sync_one(hass, node, device.id, device_side, ha_side)
            if online
            else asyncio.sleep(
                0, {"id": device.id, "changed": 0, "skipped": [], "errors": ["Offline"]}
            )
            for device, node, online in targets
        )
    )
    connection.send_result(msg["id"], {"results": list(results)})


@websocket_api.websocket_command(
    {vol.Required("type"): "echolocal/fleet/local", vol.Required("local"): [str]}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_local(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    data = hass.data[DATA]
    data["local"] = sorted(set(msg["local"]))
    await data["store"].async_save({"local": data["local"]})
    connection.send_result(msg["id"], {"local": data["local"]})
