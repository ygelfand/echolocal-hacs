"""What the device calls each of its entities, and what Home Assistant called it back.

The name echod gave an entity survives only inside the esphome unique id, in a format aioesphomeapi
owns and has already changed once. So it is never read: the same function esphome uses to build one
builds it here too, and the result is matched against the registry as an opaque key.

Disabled entities are included: the ring segments live there until one is turned on.
"""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from aioesphomeapi import build_device_unique_id
from homeassistant.components import websocket_api
from homeassistant.components.assist_pipeline.select import (
    AssistPipelineSelect,
    VadSensitivitySelect,
)
from homeassistant.components.esphome.assist_satellite import EsphomeAssistSatellite
from homeassistant.components.esphome.const import DOMAIN as ESPHOME_DOMAIN
from homeassistant.components.esphome.select import EsphomeAssistSatelliteWakeWordSelect
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.entity import Entity
from homeassistant.helpers.entity_component import DATA_INSTANCES

from .const import DOMAIN

# esphome adds these to a voice satellite itself, so they are in no entity list the device sent and
# echod has no name for them.
INVENTED = (
    EsphomeAssistSatellite,
    EsphomeAssistSatelliteWakeWordSelect,
    AssistPipelineSelect,
    VadSensitivitySelect,
)


@callback
def async_setup(hass: HomeAssistant) -> None:
    """Register the subscription."""
    websocket_api.async_register_command(hass, ws_subscribe)


@callback
def _entities(hass: HomeAssistant) -> dict[str, Any]:
    """Every esphome entity, under the name the device gave it.

    esphome restores its entity list from its own store when the entry is set up, so this answers
    for a device that has not connected yet, and one that never has has nothing to report.
    """
    ent_reg = er.async_get(hass)
    found: list[dict[str, Any]] = []

    for entry in hass.config_entries.async_entries(ESPHOME_DOMAIN):
        data = getattr(entry, "runtime_data", None)
        info = getattr(data, "device_info", None)
        if info is None:
            continue

        # The unique id each declared entity would have. Built, never parsed.
        declared = {
            build_device_unique_id(info.mac_address, entity): entity
            for by_key in data.info.values()
            for entity in by_key.values()
        }

        for registered in er.async_entries_for_config_entry(ent_reg, entry.entry_id):
            if entity := declared.get(registered.unique_id):
                name = entity.object_id
            elif (name := _invented(hass, registered)) is None:
                continue

            found.append(
                {
                    "entity_id": registered.entity_id,
                    "device_id": registered.device_id,
                    "object_id": name,
                    "disabled": registered.disabled_by is not None,
                }
            )

    return {"entities": found}


@callback
def _invented(hass: HomeAssistant, registered: er.RegistryEntry) -> str | None:
    """esphome's own name for an entity it added itself, or None for anything else.

    The instance's description, not the class's: that is where a second of a pair is numbered.
    """
    component = hass.data.get(DATA_INSTANCES, {}).get(registered.domain)
    entity: Entity | None = component.get_entity(registered.entity_id) if component else None
    if not isinstance(entity, INVENTED):
        return None

    return entity.entity_description.key


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/entities"})
@callback
def ws_subscribe(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Send the names now, and again whenever they could have changed."""

    @callback
    def send(_event: Any = None) -> None:
        connection.send_message(websocket_api.event_message(msg["id"], _entities(hass)))

    connection.subscriptions[msg["id"]] = hass.bus.async_listen(
        er.EVENT_ENTITY_REGISTRY_UPDATED, send
    )
    connection.send_result(msg["id"])
    send()
