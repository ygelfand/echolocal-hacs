"""Config flow for EchoLocal."""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.config_entries import (
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlow,
)
from homeassistant.core import callback
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers.selector import AreaSelector

from .const import CONF_SIDEBAR, DOMAIN, PANEL_TITLE

SCHEMA = vol.Schema({vol.Required(CONF_SIDEBAR, default=True): bool})

CONF_AREA = "area"
AREA_SCHEMA = vol.Schema({vol.Required(CONF_AREA): AreaSelector()})


class EchoLocalConfigFlow(ConfigFlow, domain=DOMAIN):
    """One instance: this configures the frontend, not a device."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Ask the one thing there is to ask."""
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        if user_input is None:
            return self.async_show_form(step_id="user", data_schema=SCHEMA)

        return self.async_create_entry(title=PANEL_TITLE, data={}, options=user_input)

    async def async_step_device_added(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Ask which area a newly added Dot belongs to.

        Started by the device-registry watcher in __init__.py when a main EchoLocal
        device appears without an area. The key is fetched automatically by the
        esphome flow now, so this is the only chance to ask while the device is new.
        """
        registry = dr.async_get(self.hass)
        device = registry.async_get(self.context["data"]["device_id"])
        if device is None:
            return self.async_abort(reason="device_not_found")

        if user_input is not None:
            area_id: str | None = user_input[CONF_AREA]
            registry.async_update_device(device.id, area_id=area_id)
            # The ring, microphone, playback and assistant devices hang off the Dot
            # via via_device_id and would otherwise be left area-less.
            children = [
                entry
                for entry in registry.devices
                if entry.via_device_id == device.id and entry.area_id is None
            ]
            for child in children:
                registry.async_update_device(child.id, area_id=area_id)
            return self.async_abort(reason="area_assigned")

        return self.async_show_form(
            step_id="device_added",
            data_schema=AREA_SCHEMA,
            description_placeholders={"name": device.name},
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: Any) -> OptionsFlow:
        """Return the options flow."""
        return EchoLocalOptionsFlow()


class EchoLocalOptionsFlow(OptionsFlow):
    """Turning the dashboard on and off after the fact."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Show the same one setting, defaulted to what it is now."""
        if user_input is not None:
            return self.async_create_entry(data=user_input)

        current = self.config_entry.options.get(CONF_SIDEBAR, True)
        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema({vol.Required(CONF_SIDEBAR, default=current): bool}),
        )
