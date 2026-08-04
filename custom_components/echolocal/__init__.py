"""Serves the frontend bundle, the wake word manager, and the sidebar panel."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.loader import async_get_integration

from . import wakewords
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
