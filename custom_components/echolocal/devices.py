"""Claim the ESPHome devices that are ours.

A device page offers an integration's diagnostics only when that integration is one of the device's
own, so without the claim there is no download button.
"""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import device_registry as dr

from .const import MANUFACTURER


@callback
def async_setup(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Claim what is here, and keep watching: esphome may not have loaded yet."""
    _claim(hass, entry)
    entry.async_on_unload(
        hass.bus.async_listen(dr.EVENT_DEVICE_REGISTRY_UPDATED, lambda _event: _claim(hass, entry))
    )


@callback
def _claim(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Add the entry to every EchoLocal device that does not already carry it.

    The manufacturer is what echod reports and the UI cannot edit, so it says what is ours. Claiming
    is what fires the registry event, which is why the check comes first: it is also what stops this
    answering its own event for ever.
    """
    registry = dr.async_get(hass)

    for device in list(registry.devices.values()):
        if device.manufacturer != MANUFACTURER:
            continue
        if entry.entry_id in device.config_entries:
            continue
        registry.async_update_device(device.id, add_config_entry_id=entry.entry_id)
