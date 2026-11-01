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
from homeassistant.helpers.selector import (
    SelectOptionDict,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
)

from .const import CONF_PANEL_USERS, CONF_SIDEBAR, DOMAIN, PANEL_TITLE

SCHEMA = vol.Schema({vol.Required(CONF_SIDEBAR, default=True): bool})


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

        users = {
            u.id: u.name or u.id
            for u in await self.hass.auth.async_get_users()
            if u.is_active and not u.system_generated
        }
        options = self.config_entry.options
        chosen = [u for u in options.get(CONF_PANEL_USERS, []) if u in users]
        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_SIDEBAR, default=options.get(CONF_SIDEBAR, True)): bool,
                    vol.Optional(CONF_PANEL_USERS, default=chosen): SelectSelector(
                        SelectSelectorConfig(
                            options=[
                                SelectOptionDict(value=uid, label=name)
                                for uid, name in sorted(users.items(), key=lambda u: u[1].lower())
                            ],
                            multiple=True,
                            mode=SelectSelectorMode.DROPDOWN,
                        )
                    ),
                }
            ),
        )
