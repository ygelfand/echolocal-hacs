from __future__ import annotations

import voluptuous as vol
from homeassistant.core import HomeAssistant, ServiceCall, ServiceResponse, SupportsResponse

from .const import DOMAIN

PROTOCOLS = frozenset({1, 2, 3, 4})

VERSION_ENTITY = "sensor.echolocal_protocol_version"

SCHEMA = vol.Schema({vol.Required("protocol"): vol.Coerce(int)})


def answer(protocol: int) -> ServiceResponse:
    return {"supported": protocol in PROTOCOLS, "protocol": max(PROTOCOLS)}


def async_setup(hass: HomeAssistant) -> None:
    async def ping(call: ServiceCall) -> ServiceResponse:
        return answer(call.data["protocol"])

    hass.services.async_register(
        DOMAIN, "ping", ping, schema=SCHEMA, supports_response=SupportsResponse.ONLY
    )
    hass.states.async_set(VERSION_ENTITY, str(max(PROTOCOLS)))
