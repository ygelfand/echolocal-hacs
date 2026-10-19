"""Serves the frontend bundle, the wake word manager, and the sidebar panel."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import Event, HomeAssistant
from homeassistant.helpers import device_registry as dr
from homeassistant.loader import async_get_integration

from . import entities, tones, wakewords
from .const import (
    BUNDLE_FILE,
    CONF_SIDEBAR,
    DOMAIN,
    FRONTEND_URL,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL_PATH,
)

type EchoLocalEntry = ConfigEntry[None]


async def async_setup_entry(hass: HomeAssistant, entry: EchoLocalEntry) -> bool:
    """Serve the frontend and put the dashboard in the sidebar if it is wanted."""
    integration = await async_get_integration(hass, DOMAIN)
    version = str(integration.version or "dev")

    # Views, static paths and websocket commands belong to the run rather than to the entry: Home
    # Assistant has no way to unregister any of them, so a reload must not register them twice.
    if not hass.data.get(DOMAIN):
        hass.data[DOMAIN] = True
        await _async_serve_frontend(hass, version)
        await wakewords.async_setup(hass)
        await tones.async_setup(hass)
        entities.async_setup(hass)
        _async_watch_devices(hass)

    if entry.options.get(CONF_SIDEBAR, True):
        await _async_register_panel(hass, version)

    entry.async_on_unload(entry.add_update_listener(_async_options_updated))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: EchoLocalEntry) -> bool:
    """Remove the panel. The static path and the card stay; there is no way to unregister them."""
    _async_remove_panel(hass)
    return True


async def _async_options_updated(hass: HomeAssistant, entry: EchoLocalEntry) -> None:
    await hass.config_entries.async_reload(entry.entry_id)


def _async_watch_devices(hass: HomeAssistant) -> None:
    """Ask which area a Dot is in, the moment it is added.

    The main device of a Dot carries manufacturer "EchoLocal"; the ring,
    microphone, playback and assistant devices hang off it via via_device_id.
    Existing devices get no event, so this only ever fires for new Dots.
    """
    registry = dr.async_get(hass)

    async def _on_registry_event(event: Event) -> None:
        if event.data["action"] != "create":
            return

        device = registry.async_get(event.data["device_id"])
        if (
            device is None
            or device.manufacturer != "EchoLocal"
            or device.via_device_id is not None
            or device.area_id is not None
        ):
            return

        # One prompt per device, however many create events it produces.
        for flow in hass.config_entries.async_progress(DOMAIN):
            if flow["context"].get("data", {}).get("device_id") == device.id:
                return

        await hass.config_entries.flow.async_init(
            DOMAIN,
            context={"source": "device_added"},
            data={"device_id": device.id},
        )

    hass.bus.async_listen(dr.EVENT_DEVICE_REGISTRY_UPDATED, _on_registry_event)


async def _async_serve_frontend(hass: HomeAssistant, version: str) -> None:
    """Serve the bundle and load it with every dashboard, so no Lovelace resource is needed.

    cache_headers=False: with them, a rebuilt bundle would be invisible for a month.
    """
    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(
                FRONTEND_URL, str(Path(__file__).parent / "frontend"), cache_headers=False
            )
        ]
    )
    frontend.add_extra_js_url(hass, bundle(version))


async def _async_register_panel(hass: HomeAssistant, version: str) -> None:
    if PANEL_URL_PATH in hass.data.get(frontend.DATA_PANELS, {}):
        return

    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name="echolocal-panel",
        module_url=bundle(version),
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        embed_iframe=False,
        require_admin=False,
    )


def bundle(version: str) -> str:
    return f"{FRONTEND_URL}/{BUNDLE_FILE}?v={version}"


def _async_remove_panel(hass: HomeAssistant) -> None:
    if PANEL_URL_PATH in hass.data.get(frontend.DATA_PANELS, {}):
        frontend.async_remove_panel(hass, PANEL_URL_PATH)
