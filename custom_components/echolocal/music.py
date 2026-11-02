from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.core import HomeAssistant, ServiceCall, ServiceResponse, SupportsResponse
from homeassistant.exceptions import ServiceValidationError

from .const import DOMAIN

MUSIC_ASSISTANT = "music_assistant"
AHEAD = 50

QUEUE_SCHEMA = vol.Schema(
    {
        vol.Required("player"): str,
        vol.Optional("limit", default=AHEAD): vol.All(vol.Coerce(int), vol.Range(min=1, max=200)),
    }
)
PLAY_SCHEMA = vol.Schema({vol.Required("player"): str, vol.Required("queue_item_id"): str})


def plain(player_id: str) -> str:
    return player_id.lower().replace(":", "").replace("-", "")


def owner(players: list[Any], player: str) -> Any | None:
    want = plain(player)
    for p in players:
        if plain(p.player_id) == want:
            return p
        if any(plain(o.output_protocol_id) == want for o in p.output_protocols):
            return p
    return None


def row(mass: Any, item: Any) -> dict[str, Any]:
    media = item.media_item
    artists = getattr(media, "artists", None) or []
    return {
        "id": item.queue_item_id,
        "title": media.name if media else item.name,
        "artist": ", ".join(a.name for a in artists),
        "duration": item.duration or 0,
        "image": mass.get_media_item_image_url(item) or "",
    }


def clients(hass: HomeAssistant) -> list[Any]:
    return [e.runtime_data.mass for e in hass.config_entries.async_loaded_entries(MUSIC_ASSISTANT)]


async def queue_of(hass: HomeAssistant, player: str) -> tuple[Any, Any]:
    for mass in clients(hass):
        if p := owner(mass.players.players, player):
            if queue := await mass.player_queues.get_active_queue(p.player_id):
                return mass, queue
            raise ServiceValidationError(f"no Music Assistant queue for {player}")
    raise ServiceValidationError(f"no Music Assistant player for {player}")


def async_setup(hass: HomeAssistant) -> None:
    async def music_queue(call: ServiceCall) -> ServiceResponse:
        mass, queue = await queue_of(hass, call.data["player"])
        start = (queue.current_index or 0) + 1
        items = await mass.player_queues.get_queue_items(
            queue.queue_id, limit=call.data["limit"], offset=start
        )
        return {"items": [row(mass, i) for i in items]}

    async def music_play(call: ServiceCall) -> None:
        mass, queue = await queue_of(hass, call.data["player"])
        await mass.player_queues.play_index(queue.queue_id, call.data["queue_item_id"])

    hass.services.async_register(
        DOMAIN,
        "music_queue",
        music_queue,
        schema=QUEUE_SCHEMA,
        supports_response=SupportsResponse.ONLY,
    )
    hass.services.async_register(DOMAIN, "music_play", music_play, schema=PLAY_SCHEMA)
