"""What a device says about itself when something has gone wrong.

The live log only carries what happened while Home Assistant was subscribed, which is never the case
for the failure somebody is reporting. This asks the device instead: its log daemon still holds what
it wrote, including from before this connection.
"""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.device_registry import DeviceEntry

from .const import EVENT_DOMAIN

# A device renamed in Home Assistant keeps the name its actions are called by, which esphome files
# under this key.
LOGS_ACTION = "logs"
CONF_DEVICE_NAME = "device_name"

# Enough pages for a full log buffer, and a stop if a device ever claims otherwise.
MAX_PAGES = 64


async def async_get_device_diagnostics(
    hass: HomeAssistant, entry: ConfigEntry, device: DeviceEntry
) -> dict[str, Any]:
    """Return the device's log, as the device still holds it."""
    diag: dict[str, Any] = {
        "device": {
            "name": device.name,
            "model": device.model,
            "sw_version": device.sw_version,
            "hw_version": device.hw_version,
        }
    }

    node = _node(hass, device)
    if node is None:
        diag["error"] = "this device has no esphome config entry to ask"
        return diag

    action = f"{node.replace('-', '_')}_{LOGS_ACTION}"
    diag["action"] = f"{EVENT_DOMAIN}.{action}"

    try:
        diag["log"] = await _log(hass, action)
    except HomeAssistantError as err:
        # A device on firmware without the action, or one that is not answering. Saying so is worth
        # more than a download that fails.
        diag["error"] = str(err)

    return diag


async def _log(hass: HomeAssistant, action: str) -> list[str]:
    """Read every page the device offers, oldest line first."""
    lines: list[str] = []
    page = 0

    while page < MAX_PAGES:
        reply = await hass.services.async_call(
            EVENT_DOMAIN, action, {"page": page}, blocking=True, return_response=True
        )
        if not isinstance(reply, dict) or reply.get("version") != 1:
            raise HomeAssistantError(f"{action} answered with {reply!r}")

        lines.extend(reply.get("lines") or [])

        page += 1
        if page >= int(reply.get("pages") or 1):
            break

    return lines


def _node(hass: HomeAssistant, device: DeviceEntry) -> str | None:
    """The name the device calls itself, which is what its actions are named after."""
    for entry_id in device.config_entries:
        entry = hass.config_entries.async_get_entry(entry_id)
        if entry is not None and entry.domain == EVENT_DOMAIN:
            return entry.data.get(CONF_DEVICE_NAME)
    return None
