"""What the devices say about themselves when something has gone wrong.

The live log only carries what happened while Home Assistant was subscribed, which is never the case
for the failure somebody is reporting. This asks each device instead: its log daemon still holds
what it wrote, from before this connection and across a restart of the agent.

Every EchoLocal device goes in one file. The registry says which they are, and a device's own config
entry says what its actions are called; neither needs this integration to own anything.
"""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import device_registry as dr

from .const import EVENT_DOMAIN, MANUFACTURER

# The action echod answers with a page of its log, and the key esphome files a device's own name
# under. A device renamed in Home Assistant keeps the name its actions are called by.
LOGS_ACTION = "logs"
CONF_DEVICE_NAME = "device_name"

# Enough for a full log buffer, and a stop if a device ever claims otherwise.
MAX_PAGES = 64


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant, entry: ConfigEntry
) -> dict[str, Any]:
    """Return every EchoLocal device's log, as the devices still hold them."""
    diag: dict[str, Any] = {}

    for node in sorted(_nodes(hass)):
        try:
            diag[node] = {"log": await _log(hass, f"{node.replace('-', '_')}_{LOGS_ACTION}")}
        except HomeAssistantError as err:
            # Firmware without the action, or a device that is not answering. Saying so is worth
            # more than leaving it out of a file somebody is about to send us.
            diag[node] = {"error": str(err)}

    return {"devices": diag}


def _nodes(hass: HomeAssistant) -> set[str]:
    """The name each of our devices calls itself, which is what its actions are named after.

    Found through the device registry, which any integration may read. A device names itself once
    and every sub-device it has repeats it, so the owning config entry is what deduplicates them.
    """
    registry = dr.async_get(hass)
    seen: set[str] = set()
    nodes: set[str] = set()

    for device in registry.devices.values():
        if device.manufacturer != MANUFACTURER:
            continue
        if device.config_entry_id in seen:
            continue
        seen.add(device.config_entry_id)

        owner = hass.config_entries.async_get_entry(device.config_entry_id)
        if (
            owner is not None
            and owner.domain == EVENT_DOMAIN
            and (node := owner.data.get(CONF_DEVICE_NAME))
        ):
            nodes.add(node)

    return nodes


async def _log(hass: HomeAssistant, action: str) -> list[str]:
    """Read every page a device offers, oldest line first."""
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
