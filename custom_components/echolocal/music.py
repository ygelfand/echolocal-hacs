from __future__ import annotations

import asyncio
from typing import Any

import voluptuous as vol
from homeassistant.core import HomeAssistant, ServiceCall, ServiceResponse, SupportsResponse
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import entity_registry as er

from .const import DOMAIN

MUSIC_ASSISTANT = "music_assistant"
AHEAD = 50
RECENT = 20
PER_FOLDER = 20
FOLDERS = 8
FOLDER = "folder"

QUEUE_SCHEMA = vol.Schema(
    {
        vol.Required("player"): str,
        vol.Optional("limit", default=AHEAD): vol.All(vol.Coerce(int), vol.Range(min=1, max=200)),
    }
)
PLAY_SCHEMA = vol.Schema({vol.Required("player"): str, vol.Required("queue_item_id"): str})
RECENT_SCHEMA = vol.Schema(
    {
        vol.Optional("player"): str,
        vol.Optional("limit", default=RECENT): vol.All(vol.Coerce(int), vol.Range(min=1, max=100)),
    }
)
PLAYERS_SCHEMA = vol.Schema({vol.Optional("player"): str})
BROWSE = 100
BROWSE_SCHEMA = vol.Schema(
    {
        vol.Required("uri"): str,
        vol.Optional("limit", default=BROWSE): vol.All(vol.Coerce(int), vol.Range(min=1, max=500)),
    }
)
SEARCH = 10
SEARCH_KINDS = ("artist", "album", "track", "playlist", "radio")
SEARCH_SCHEMA = vol.Schema(
    {
        vol.Required("query"): str,
        vol.Optional("limit", default=SEARCH): vol.All(vol.Coerce(int), vol.Range(min=1, max=50)),
    }
)
SHELVES = {
    "playlist": "get_library_playlists",
    "album": "get_library_albums",
    "artist": "get_library_artists",
    "radio": "get_library_radios",
    "track": "get_library_tracks",
}
LIBRARY_SCHEMA = vol.Schema(
    {
        vol.Required("media_type"): vol.In(list(SHELVES)),
        vol.Optional("limit", default=BROWSE): vol.All(vol.Coerce(int), vol.Range(min=1, max=500)),
    }
)
RECOMMENDATIONS_SCHEMA = vol.Schema(
    {
        vol.Optional("limit", default=PER_FOLDER): vol.All(
            vol.Coerce(int), vol.Range(min=1, max=100)
        ),
    }
)


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


def player_id(hass: HomeAssistant, player: str) -> str:
    if not player.startswith("media_player."):
        return player
    entry = er.async_get(hass).async_get(player)
    if entry is None or entry.platform != MUSIC_ASSISTANT:
        raise ServiceValidationError(f"{player} is not a Music Assistant player")
    return entry.unique_id


def speakers(registry: Any, players: list[Any], player: str) -> list[dict[str, Any]]:
    mine = owner(players, player) if player else None
    out = []
    for p in players:
        entity = registry.async_get_entity_id("media_player", MUSIC_ASSISTANT, p.player_id)
        if entity:
            out.append({"entity_id": entity, "name": p.name, "mine": p is mine})
    return out


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


def media(mass: Any, item: Any) -> dict[str, Any]:
    artists = getattr(item, "artists", None) or []
    return {
        "uri": item.uri,
        "type": str(item.media_type.value),
        "name": item.name,
        "artist": ", ".join(a.name for a in artists),
        "image": mass.get_media_item_image_url(item) or "",
    }


def playable(items: list[Any]) -> list[Any]:
    return [i for i in items if str(i.media_type.value) != FOLDER and getattr(i, "uri", "")]


async def contents(mass: Any, uri: str, limit: int) -> dict[str, Any]:
    item = await mass.music.get_item_by_uri(uri)
    kind = str(item.media_type.value)
    args = (item.item_id, item.provider)
    items: list[Any] = []
    if kind == "album":
        items = await mass.music.get_album_tracks(*args)
    elif kind == "playlist":
        items = await mass.music.get_playlist_tracks(*args)
    elif kind == "artist":
        items = list(await mass.music.get_artist_albums(*args))
        items += await mass.music.get_artist_tracks(*args)
    return {
        "name": item.name,
        "type": kind,
        "items": [media(mass, i) for i in playable(items)[:limit]],
    }


async def searched(mass: Any, query: str, limit: int, kinds: list[Any]) -> dict[str, Any]:
    found = await mass.music.search(query, kinds, limit)
    items = [*found.artists, *found.albums, *found.tracks, *found.playlists, *found.radio]
    return {"items": [media(mass, i) for i in playable(items)]}


async def shelf(mass: Any, kind: str, limit: int) -> dict[str, Any]:
    items = await getattr(mass.music, SHELVES[kind])(limit=limit, order_by="sort_name")
    return {"items": [media(mass, i) for i in playable(items)]}


async def folder_items(mass: Any, folder: Any, parse: Any) -> list[Any]:
    if held := list(folder.items):
        return held
    raw = await mass.send_command(
        "music/recommendations/items", provider=folder.provider, item_id=folder.item_id
    )
    out = []
    for d in raw or []:
        if d.get("media_type") == FOLDER or not d.get("uri"):
            continue
        try:
            out.append(parse(d))
        except Exception:
            continue
    return out


async def recommended(mass: Any, limit: int, parse: Any) -> dict[str, Any]:
    folders = (await mass.music.recommendations())[:FOLDERS]
    filled = await asyncio.gather(*(folder_items(mass, f, parse) for f in folders))
    out = []
    for f, items in zip(folders, filled, strict=True):
        if shown := playable(items)[:limit]:
            out.append(
                {"name": f.name, "icon": f.icon or "", "items": [media(mass, i) for i in shown]}
            )
    return {"folders": out}


def clients(hass: HomeAssistant) -> list[Any]:
    return [e.runtime_data.mass for e in hass.config_entries.async_loaded_entries(MUSIC_ASSISTANT)]


def first_client(hass: HomeAssistant) -> Any:
    if found := clients(hass):
        return found[0]
    raise ServiceValidationError("Music Assistant is not set up")


def found(hass: HomeAssistant, player: str) -> tuple[Any, Any]:
    want = player_id(hass, player)
    for mass in clients(hass):
        if p := owner(mass.players.players, want):
            return mass, p
    raise ServiceValidationError(f"no Music Assistant player for {player}")


async def queue_of(hass: HomeAssistant, player: str) -> tuple[Any, Any]:
    mass, p = found(hass, player)
    if queue := await mass.player_queues.get_active_queue(p.player_id):
        return mass, queue
    raise ServiceValidationError(f"no Music Assistant queue for {player}")


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

    async def music_recent(call: ServiceCall) -> ServiceResponse:
        queue_id = None
        if player := call.data.get("player"):
            mass, queue = await queue_of(hass, player)
            queue_id = queue.queue_id
        else:
            mass = first_client(hass)
        items = await mass.music.recently_played(
            limit=call.data["limit"], queue_id=queue_id, fully_played_only=False
        )
        return {"items": [media(mass, i) for i in playable(items)]}

    async def music_recommendations(call: ServiceCall) -> ServiceResponse:
        from music_assistant_models.media_items import media_from_dict

        mass = first_client(hass)
        return await recommended(mass, call.data["limit"], media_from_dict)

    async def music_players(call: ServiceCall) -> ServiceResponse:
        registry = er.async_get(hass)
        player = call.data.get("player", "")
        out = []
        for mass in clients(hass):
            out += speakers(registry, mass.players.players, player)
        return {"players": out}

    async def music_browse(call: ServiceCall) -> ServiceResponse:
        return await contents(first_client(hass), call.data["uri"], call.data["limit"])

    async def music_search(call: ServiceCall) -> ServiceResponse:
        from music_assistant_models.enums import MediaType

        kinds = [MediaType(k) for k in SEARCH_KINDS]
        return await searched(first_client(hass), call.data["query"], call.data["limit"], kinds)

    async def music_library(call: ServiceCall) -> ServiceResponse:
        return await shelf(first_client(hass), call.data["media_type"], call.data["limit"])

    for name, handler, schema in (
        ("music_browse", music_browse, BROWSE_SCHEMA),
        ("music_library", music_library, LIBRARY_SCHEMA),
        ("music_search", music_search, SEARCH_SCHEMA),
        ("music_players", music_players, PLAYERS_SCHEMA),
        ("music_queue", music_queue, QUEUE_SCHEMA),
        ("music_recent", music_recent, RECENT_SCHEMA),
        ("music_recommendations", music_recommendations, RECOMMENDATIONS_SCHEMA),
    ):
        hass.services.async_register(
            DOMAIN, name, handler, schema=schema, supports_response=SupportsResponse.ONLY
        )
    hass.services.async_register(DOMAIN, "music_play", music_play, schema=PLAY_SCHEMA)
