from __future__ import annotations

import json
import logging
import time
from collections import deque
from collections.abc import Callable
from dataclasses import dataclass, field
from typing import Any

import voluptuous as vol
from homeassistant.components import assist_pipeline, media_source, tts, websocket_api
from homeassistant.components.conversation import ConversationInput
from homeassistant.components.conversation.agent_manager import get_agent_manager
from homeassistant.components.esphome import DOMAIN as ESPHOME_DOMAIN
from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import device_registry as dr, entity_registry as er
from homeassistant.helpers.dispatcher import async_dispatcher_connect, async_dispatcher_send
from homeassistant.helpers.network import NoURLAvailableError, get_url

from .const import ACTIONS_EVENT, MANUFACTURERS

_LOGGER = logging.getLogger(__name__)

DATA = "echolocal_triggers"
CHANGED = "echolocal_actions_changed"

HISTORY = 50

SPEECH = "speech"

NOT_HERE = "That isn't available on this device"
FAILED = "That didn't work"


@dataclass
class Declared:
    actions: dict[str, dict[str, Any]]
    at: float


@dataclass
class Match:
    at: float
    sentence: str
    action: str
    device_id: str | None
    reply: str


@dataclass
class Triggers:
    hass: HomeAssistant
    devices: dict[str, Declared] = field(default_factory=dict)
    registered: dict[tuple[str, str, str], Callable[[], None]] = field(default_factory=dict)
    history: deque[Match] = field(default_factory=lambda: deque(maxlen=HISTORY))

    @callback
    def declared(self, event: Event) -> None:
        device_id = event.data.get("device_id")
        if not device_id:
            return
        try:
            body = json.loads(event.data.get("actions", "{}"))
        except ValueError:
            _LOGGER.warning("%s declared actions that are not JSON", device_id)
            return
        actions = {a["name"]: a for a in body.get("actions", []) if a.get("name")}
        self.devices[device_id] = Declared(actions=actions, at=time.time())
        self._sync()

    @callback
    def _sync(self) -> None:
        wanted: dict[tuple[str, str, str], None] = {}
        for declared in self.devices.values():
            for name, action in declared.actions.items():
                for trigger in action.get("triggers") or []:
                    sentence = trigger.get("sentence")
                    if sentence:
                        args = json.dumps(trigger.get("args") or {}, sort_keys=True)
                        wanted[(name, sentence, args)] = None

        for key in list(self.registered):
            if key not in wanted:
                self.registered.pop(key)()

        manager = get_agent_manager(self.hass)
        for key in wanted:
            if key in self.registered:
                continue
            name, sentence, args = key
            self.registered[key] = manager.register_trigger(
                sentences=[sentence],
                trigger_callback=self._handler(name, sentence, json.loads(args)),
            )
        _LOGGER.debug("voice triggers: %s", sorted(self.registered))
        async_dispatcher_send(self.hass, CHANGED)

    def _handler(self, name: str, sentence: str, fixed: dict[str, str]):
        async def matched(user_input: ConversationInput, result: Any) -> str:
            device_id = self._hearer(user_input)
            slots = {
                slot: entity.value.strip() if isinstance(entity.value, str) else entity.value
                for slot, entity in result.entities.items()
            }
            if self._declares(device_id, name, sentence, fixed):
                reply = await self._run(device_id, name, {**fixed, **slots}, user_input.language)
            else:
                reply = NOT_HERE
            self.history.appendleft(Match(time.time(), user_input.text, name, device_id, reply))
            async_dispatcher_send(self.hass, CHANGED)
            return reply

        return matched

    def _declares(
        self, device_id: str | None, name: str, sentence: str, fixed: dict[str, str]
    ) -> bool:
        declared = self.devices.get(device_id or "")
        action = declared.actions.get(name) if declared else None
        if action is None:
            return False
        return any(
            t.get("sentence") == sentence and (t.get("args") or {}) == fixed
            for t in action.get("triggers") or []
        )

    def _hearer(self, user_input: ConversationInput) -> str | None:
        if user_input.satellite_id:
            entry = er.async_get(self.hass).async_get(user_input.satellite_id)
            if entry is not None and entry.device_id:
                return entry.device_id
        return user_input.device_id

    async def _run(
        self, device_id: str | None, name: str, values: dict[str, Any], language: str | None
    ) -> str:
        declared = self.devices.get(device_id or "")
        action = declared.actions.get(name) if declared else None
        node = _node(self.hass, device_id) if action else None
        if action is None or node is None:
            return NOT_HERE

        data = {
            arg["name"]: _typed(arg.get("type"), values[arg["name"]])
            for arg in action.get("args", [])
            if arg.get("name") in values
        }
        for arg in action.get("args", []):
            data.setdefault(arg["name"], _typed(arg.get("type"), None))
            if arg.get("type") == SPEECH and data[arg["name"]]:
                try:
                    data[arg["name"]] = await _speech(
                        self.hass, device_id, data[arg["name"]], language
                    )
                except HomeAssistantError as err:
                    _LOGGER.warning("speaking %s for %s failed: %s", arg["name"], name, err)
                    return FAILED
        try:
            response = await self.hass.services.async_call(
                ESPHOME_DOMAIN,
                f"{node}_{name}",
                data,
                blocking=True,
                return_response=True,
            )
        except HomeAssistantError as err:
            _LOGGER.warning("%s on %s failed: %s", name, node, err)
            return FAILED
        reply = _reply(response)
        return FAILED if reply is None else reply

    def as_dict(self) -> dict[str, Any]:
        return {
            "devices": {
                device_id: {
                    "at": d.at,
                    "actions": [
                        {**a, "entity": _switch(self.hass, device_id, a.get("switch"))}
                        for a in d.actions.values()
                    ],
                }
                for device_id, d in self.devices.items()
            },
            "history": [m.__dict__ for m in self.history],
        }


def _switch(hass: HomeAssistant, device_id: str, name: str | None) -> str | None:
    if not name:
        return None
    devices = dr.async_get(hass)
    owned = {device_id} | {d.id for d in devices.devices.values() if d.via_device_id == device_id}
    suffix = f"/switch/{name}"
    for entry in er.async_get(hass).entities.values():
        if (
            entry.domain == "switch"
            and entry.platform == ESPHOME_DOMAIN
            and entry.device_id in owned
            and entry.unique_id.endswith(suffix)
        ):
            return entry.entity_id
    return None


def _typed(kind: str | None, value: Any) -> Any:
    if kind == "bool":
        return str(value).lower() in ("true", "1", "yes", "on") if value is not None else False
    if kind == "int":
        try:
            return int(value)
        except (TypeError, ValueError):
            return 0
    if kind == "float":
        try:
            return float(value)
        except (TypeError, ValueError):
            return 0.0
    return "" if value is None else str(value)


async def _speech(
    hass: HomeAssistant, device_id: str | None, text: str, language: str | None
) -> str:
    pipeline = _pipeline(hass, device_id)
    options = {tts.ATTR_VOICE: pipeline.tts_voice} if pipeline.tts_voice else None
    media_id = tts.generate_media_source_id(
        hass,
        text,
        engine=pipeline.tts_engine,
        language=pipeline.tts_language or language,
        options=options,
    )
    resolved = await media_source.async_resolve_media(hass, media_id, None)
    url = resolved.url
    if url.startswith("/"):
        try:
            url = get_url(hass, prefer_external=False) + url
        except NoURLAvailableError as err:
            raise HomeAssistantError("Home Assistant has no address the device can reach") from err
    return url


def _pipeline(hass: HomeAssistant, device_id: str | None) -> Any:
    chosen = None
    if device_id:
        for entry in er.async_entries_for_device(er.async_get(hass), device_id):
            if entry.domain == "select" and entry.unique_id.endswith("-pipeline"):
                state = hass.states.get(entry.entity_id)
                chosen = state.state if state else None
    for pipeline in assist_pipeline.async_get_pipelines(hass):
        if chosen and pipeline.name == chosen:
            return pipeline
    return assist_pipeline.async_get_pipeline(hass)


def _reply(response: Any) -> str | None:
    if not isinstance(response, dict):
        return None
    if isinstance(response.get("reply"), str):
        return response["reply"]
    inner = response.get("response")
    if isinstance(inner, dict) and isinstance(inner.get("reply"), str):
        return inner["reply"]
    return None


def _node(hass: HomeAssistant, device_id: str | None) -> str | None:
    if not device_id:
        return None
    device = dr.async_get(hass).async_get(device_id)
    if device is None:
        return None
    entry = hass.config_entries.async_get_entry(device.config_entry_id)
    if entry is None or entry.domain != ESPHOME_DOMAIN:
        return None
    info = getattr(getattr(entry, "runtime_data", None), "device_info", None)
    if info is not None and info.manufacturer in MANUFACTURERS:
        return info.name.replace("-", "_")
    return None


async def async_setup(hass: HomeAssistant) -> None:
    triggers = Triggers(hass)
    hass.data[DATA] = triggers
    hass.bus.async_listen(ACTIONS_EVENT, triggers.declared)
    websocket_api.async_register_command(hass, ws_actions)


@websocket_api.websocket_command({vol.Required("type"): "echolocal/actions"})
@callback
def ws_actions(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    @callback
    def send() -> None:
        connection.send_message(websocket_api.event_message(msg["id"], hass.data[DATA].as_dict()))

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(hass, CHANGED, send)
    connection.send_result(msg["id"])
    send()
