"""Quieten the room's speakers while a Dot is listening to a voice turn.

When an EchoLocal satellite hears its wake word, every player in the same area that is
playing drops by that satellite's own `media_duck_level`, and comes back when the turn
ends. Nothing here names a device or a room: the satellite's area is read at the moment
it wakes, so a Dot added tomorrow is covered without anybody editing anything.

The Dots duck their own speaker themselves, so they are never targets here. Ducking one
again would only quieten the reply currently being spoken through it.
"""

from __future__ import annotations

import logging
from collections.abc import Callable
from dataclasses import dataclass, field
from typing import Any

import voluptuous as vol

from homeassistant.core import Event, HomeAssistant, ServiceCall, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import (
    config_validation as cv,
    device_registry as dr,
    entity_registry as er,
)
from homeassistant.helpers.event import async_call_later, async_track_state_change_event
from homeassistant.helpers.storage import Store

from .const import DOMAIN, MANUFACTURER

_LOGGER = logging.getLogger(__name__)

# volume_level runs 0..1. 0.01 is 1 on the Sonos scale, which is where we agreed to stop
# rather than let a quiet player be ducked all the way to silence.
FLOOR = 0.01

# How long a turn may run before the room is put back regardless. Only ever reached when a
# turn dies mid-flight: the Dot reboots, or Home Assistant stops and starts again.
WATCHDOG = 45.0

# What echod calls the number that says how far its own music drops. It lives on the
# playback sub-device rather than on the Dot itself.
DUCK_SETTING = "music_ducking"

STORAGE_KEY = f"{DOMAIN}.ducking"
STORAGE_VERSION = 1

DUCK_SCHEMA = vol.Schema({vol.Required("device_id"): vol.All(cv.ensure_list, [cv.string])})


@dataclass
class _Ducked:
    """One player's volume before we touched it, and how many turns want it down."""

    original: float
    refs: int = 1


@dataclass
class _Session:
    """One turn's worth of ducking, keyed by the satellite that started it."""

    targets: set[str] = field(default_factory=set)
    cancel: Callable[[], None] | None = None


class Ducking:
    """Duck the room on the wake word and put it back at the end of the turn."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._ducked: dict[str, _Ducked] = {}
        self._sessions: dict[str, _Session] = {}
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self._resubscribe: Callable[[], None] | None = None

    # -- setup ---------------------------------------------------------------

    async def async_load(self) -> None:
        """Restore anything that was still ducked when Home Assistant last stopped."""
        saved = await self._store.async_load()
        players = (saved or {}).get("players") or {}
        if not players:
            return

        _LOGGER.warning("putting back %d player(s) left ducked by a restart", len(players))
        for entity_id, volume in players.items():
            await self._async_restore_one(entity_id, float(volume))

    @callback
    def async_start_watching(self) -> None:
        """Watch every EchoLocal satellite, and pick up new ones as they appear."""
        self._async_subscribe()
        self.hass.bus.async_listen(
            er.EVENT_ENTITY_REGISTRY_UPDATED,
            lambda _event: self._async_subscribe(),
        )

    @callback
    def _async_subscribe(self) -> None:
        """(Re)subscribe to the satellites known right now.

        The set is re-derived rather than held, which is what makes a new Dot a non-event:
        the registry update that adds it is what gets us to look again.
        """
        wanted = self._async_satellites()
        if self._resubscribe is not None:
            self._resubscribe()
        self._resubscribe = async_track_state_change_event(
            self.hass, wanted, self._async_state_changed
        )

    @callback
    def _async_satellites(self) -> list[str]:
        """Every assist_satellite entity on a device echod made."""
        entities, devices = self._registries()
        found = []
        for entry in entities.entities.values():
            if entry.domain != "assist_satellite" or entry.disabled_by is not None:
                continue
            if self._is_echolocal(devices, entry.device_id):
                found.append(entry.entity_id)
        return found

    # -- the turn -----------------------------------------------------------

    @callback
    def _async_state_changed(self, event: Event) -> None:
        new = event.data.get("new_state")
        if new is None:
            return

        entity_id = event.data["entity_id"]
        old = event.data.get("old_state")
        before = old.state if old is not None else None

        if new.state == "listening" and before != "listening":
            self.hass.async_create_task(self.async_duck(entity_id))
        elif new.state in ("idle", "unavailable", "unknown") and entity_id in self._sessions:
            self.hass.async_create_task(self.async_unduck(entity_id))

    async def async_duck(self, satellite: str) -> None:
        """Drop the room this satellite is in, remembering what everything was."""
        if satellite in self._sessions:
            return

        duck_db = self._duck_db(satellite)
        if duck_db is None:
            return
        if duck_db == 0:
            _LOGGER.debug("%s has ducking turned off, leaving the room alone", satellite)
            return

        area = self._area_of(satellite)
        if area is None:
            _LOGGER.debug("%s has no area, so there is no room to quieten", satellite)
            return

        targets = self._targets(area)
        if not targets:
            return

        factor = 10 ** (duck_db / 20.0)
        session = _Session()
        for entity_id in targets:
            state = self.hass.states.get(entity_id)
            level = None if state is None else state.attributes.get("volume_level")
            if level is None:
                continue

            already = self._ducked.get(entity_id)
            if already is None:
                self._ducked[entity_id] = _Ducked(original=float(level))
                await self._async_set_volume(
                    entity_id, max(FLOOR, float(level) * factor)
                )
            else:
                already.refs += 1
            session.targets.add(entity_id)

        if not session.targets:
            return

        self._sessions[satellite] = session
        session.cancel = async_call_later(
            self.hass, WATCHDOG, lambda _now: self._watchdog(satellite)
        )
        await self._async_save()
        _LOGGER.debug("ducked %d player(s) for %s by %sdB", len(session.targets), satellite, duck_db)

    async def async_unduck(self, satellite: str) -> None:
        """Put back everything this turn ducked, once nobody else wants it down."""
        session = self._sessions.pop(satellite, None)
        if session is None:
            return
        if session.cancel is not None:
            session.cancel()

        for entity_id in session.targets:
            ducked = self._ducked.get(entity_id)
            if ducked is None:
                continue
            ducked.refs -= 1
            if ducked.refs > 0:
                continue
            del self._ducked[entity_id]
            await self._async_set_volume(entity_id, ducked.original)

        await self._async_save()

    @callback
    def _watchdog(self, satellite: str) -> None:
        """A turn that never said it ended still has to let the room back up."""
        _LOGGER.warning("%s never finished its turn; restoring the room anyway", satellite)
        self.hass.async_create_task(self.async_unduck(satellite))

    # -- what to touch -------------------------------------------------------

    def _targets(self, area: str) -> list[str]:
        """Every player in this area that is playing, minus the Dots themselves."""
        entities, devices = self._registries()
        wanted = []

        for state in self.hass.states.async_all("media_player"):
            if state.state != "playing":
                continue
            entry = entities.async_get(state.entity_id)
            if entry is None or self._area(entry, devices) != area:
                continue

            if self._is_echolocal(devices, entry.device_id):
                continue

            wanted.append(state.entity_id)
        return wanted

    def _duck_db(self, satellite: str) -> float | None:
        """How far this satellite drops its own music, in dB.

        None means the device does not say, and there is nothing to follow. Guessing a
        depth here would quietly disagree with the setting the Dot is actually using.
        """
        entities, devices = self._registries()
        entry = entities.async_get(satellite)
        if entry is None or entry.device_id is None:
            return None

        # The setting lives on the playback sub-device rather than on the Dot itself.
        family = self._family(devices, entry.device_id)
        for candidate in entities.entities.values():
            if candidate.domain != "number" or candidate.device_id not in family:
                continue
            if DUCK_SETTING not in candidate.entity_id:
                continue
            state = self.hass.states.get(candidate.entity_id)
            if state is not None:
                try:
                    return float(state.state)
                except (TypeError, ValueError):
                    return None

        _LOGGER.warning("%s advertises no %s setting; leaving its room alone", satellite, DUCK_SETTING)
        return None

    def _area_of(self, entity_id: str) -> str | None:
        entities, devices = self._registries()
        entry = entities.async_get(entity_id)
        return None if entry is None else self._area(entry, devices)

    @staticmethod
    def _family(devices: dr.DeviceRegistry, device_id: str) -> set[str]:
        """A device and everything hanging off it, however the registry links them.

        echod splits a Dot into ring, microphone, playback and assistant devices. Those
        have been carried both as devices with a via_device_id and as child devices with
        a parent_device_id, so both are walked; neither is read as a mapping, which the
        registry deprecated.
        """
        family = {device_id}
        for device in devices.devices:
            if device.via_device_id == device_id:
                family.add(device.id)
        for child in devices.child_devices:
            if child.parent_device_id == device_id:
                family.add(child.id)
        return family

    def _is_echolocal(self, devices: dr.DeviceRegistry, device_id: str | None) -> bool:
        """Whether echod made this device.

        Child devices carry no manufacturer of their own and defer to their parent, so
        the question is asked of the device at the top.
        """
        if device_id is None:
            return False
        entry = devices.async_get(device_id)
        for _ in range(4):
            if entry is None:
                return False
            parent = (
                entry.parent_device_id
                if isinstance(entry, dr.ChildDeviceEntry)
                else entry.via_device_id
            )
            if not parent:
                return entry.manufacturer == MANUFACTURER
            entry = devices.async_get(parent)
        return False

    @staticmethod
    def _area(entry: er.RegistryEntry, devices: dr.DeviceRegistry) -> str | None:
        """An entity's own area, else the area it inherits from its device."""
        if entry.area_id:
            return entry.area_id
        device = devices.async_get(entry.device_id) if entry.device_id else None
        return device.area_id if device is not None else None

    def _registries(self) -> tuple[er.EntityRegistry, dr.DeviceRegistry]:
        return er.async_get(self.hass), dr.async_get(self.hass)

    # -- plumbing -----------------------------------------------------------

    async def _async_set_volume(self, entity_id: str, level: float) -> None:
        try:
            await self.hass.services.async_call(
                "media_player",
                "volume_set",
                {"entity_id": entity_id, "volume_level": level},
                blocking=True,
            )
        except HomeAssistantError as err:
            _LOGGER.warning("could not set %s to %s: %s", entity_id, level, err)

    async def _async_restore_one(self, entity_id: str, volume: float) -> None:
        """Put one player back, waiting for it if it is not there yet."""
        state = self.hass.states.get(entity_id)
        if state is not None and state.state not in ("unavailable", "unknown"):
            await self._async_set_volume(entity_id, volume)
            return

        @callback
        def _when_back(event: Event) -> None:
            new = event.data.get("new_state")
            if new is None or new.state in ("unavailable", "unknown"):
                return
            unsub()
            self.hass.async_create_task(self._async_set_volume(entity_id, volume))

        unsub = async_track_state_change_event(self.hass, [entity_id], _when_back)

    async def _async_save(self) -> None:
        await self._store.async_save(
            {"players": {k: v.original for k, v in self._ducked.items()}}
        )

    # -- services -----------------------------------------------------------

    async def async_service(self, call: ServiceCall, duck: bool) -> None:
        for device_id in call.data["device_id"]:
            for satellite in self._satellites_of(device_id):
                if duck:
                    await self.async_duck(satellite)
                else:
                    await self.async_unduck(satellite)

    def _satellites_of(self, device_id: str) -> list[str]:
        entities, devices = self._registries()
        wanted = self._family(devices, device_id)
        return [
            entry.entity_id
            for entry in entities.entities.values()
            if entry.domain == "assist_satellite" and entry.device_id in wanted
        ]


async def async_setup(hass: HomeAssistant) -> None:
    """Start watching the satellites and offer the two services.

    The services are the same code path the wake word uses, so calling one by hand is
    exactly what a turn does, and is the quickest way to hear whether a room is wired up.
    """
    ducking = Ducking(hass)
    await ducking.async_load()
    ducking.async_start_watching()

    async def duck(call: ServiceCall) -> None:
        await ducking.async_service(call, True)

    async def unduck(call: ServiceCall) -> None:
        await ducking.async_service(call, False)

    hass.services.async_register(DOMAIN, "duck_room", duck, schema=DUCK_SCHEMA)
    hass.services.async_register(DOMAIN, "unduck_room", unduck, schema=DUCK_SCHEMA)
