"""CRUD over config/custom_wake_words/, which core serves to satellites but has no interface for.

A wake word is two files: <id>.json and <id>.tflite. Three core behaviours worked around here:

- it reads the directory once, behind @singleton(_DATA_WAKE_WORDS), so a new file does nothing
  until restart. async_invalidate drops that cache.
- it needs `type` and `wake_word`, and skips an entry missing either at debug level. _read
  reports what it would skip.
- the json is hand-written. The upload view generates one from the filename.
"""

from __future__ import annotations

import hashlib
import json
import logging
from pathlib import Path
from typing import Any

import voluptuous as vol
from aiohttp import web
from homeassistant.components import websocket_api
from homeassistant.components.esphome.const import (
    WAKE_WORDS_API_PATH,
    WAKE_WORDS_DIR_NAME,
)
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import Unauthorized
from homeassistant.helpers import config_validation as cv
from homeassistant.util import slugify

_LOGGER = logging.getLogger(__name__)

# core's own key, not ours. Popping it is the only way to avoid a restart.
CACHE_KEY = "wake_word_cache"

# What a dropped .tflite almost always is, and what echod runs. Editable: core passes the type
# through to the device without opinion.
DEFAULT_TYPE = "micro"

# A wake model is a few hundred kilobytes. Anything this size is not one.
MOST = 8 * 1024 * 1024


async def async_setup(hass: HomeAssistant) -> None:
    """Serve the manager, and make sure the directory core reads exists."""
    store = _dir(hass)
    await hass.async_add_executor_job(lambda: store.mkdir(parents=True, exist_ok=True))

    hass.http.register_view(WakeWordUploadView())

    websocket_api.async_register_command(hass, ws_list)
    websocket_api.async_register_command(hass, ws_update)
    websocket_api.async_register_command(hass, ws_delete)


def _dir(hass: HomeAssistant) -> Path:
    return Path(hass.config.path(WAKE_WORDS_DIR_NAME))


@callback
def async_invalidate(hass: HomeAssistant) -> None:
    """Drop core's cached listing. It re-reads on its next connect or set_wake_words."""
    hass.data.pop(CACHE_KEY, None)


def _read(store: Path) -> list[dict[str, Any]]:
    """Every wake word in the directory, including the ones core would silently drop."""
    out: list[dict[str, Any]] = []

    for config_path in sorted(store.glob("*.json")):
        model_path = config_path.with_suffix(".tflite")
        entry: dict[str, Any] = {
            "id": config_path.stem,
            "wake_word": "",
            "type": "",
            "trained_languages": [],
            "size": 0,
            "hash": "",
            "model_url": f"{WAKE_WORDS_API_PATH}/{model_path.name}",
            "config_url": f"{WAKE_WORDS_API_PATH}/{config_path.name}",
            "problems": [],
        }

        try:
            config = json.loads(config_path.read_text(encoding="utf-8"))
        except (OSError, ValueError) as err:
            entry["problems"].append(f"its description will not parse: {err}")
            out.append(entry)
            continue

        entry["wake_word"] = config.get("wake_word") or ""
        entry["type"] = config.get("type") or ""
        entry["trained_languages"] = config.get("trained_languages") or []

        # Core requires both of these and says nothing when one is missing.
        if not entry["wake_word"]:
            entry["problems"].append("it has no wake word, so Home Assistant ignores it")
        if not entry["type"]:
            entry["problems"].append("it has no model type, so Home Assistant ignores it")

        if model_path.exists():
            payload = model_path.read_bytes()
            entry["size"] = len(payload)
            entry["hash"] = hashlib.sha256(payload).hexdigest()
        else:
            entry["problems"].append(f"{model_path.name} is missing, so there is nothing to run")

        out.append(entry)

    # A model with no description beside it is invisible to core too, and is worth saying so.
    described = {entry["id"] for entry in out}
    for model_path in sorted(store.glob("*.tflite")):
        if model_path.stem in described:
            continue

        out.append(
            {
                "id": model_path.stem,
                "wake_word": "",
                "type": "",
                "trained_languages": [],
                "size": model_path.stat().st_size,
                "hash": "",
                "model_url": f"{WAKE_WORDS_API_PATH}/{model_path.name}",
                "config_url": "",
                "problems": ["it has no description beside it, so Home Assistant ignores it"],
            }
        )

    return out


class WakeWordUploadView(HomeAssistantView):
    """POST a .tflite and it becomes a wake word, description and all."""

    url = "/api/echolocal/wake_words"
    name = "api:echolocal:wake_words"

    async def post(self, request: web.Request) -> web.Response:
        hass: HomeAssistant = request.app["hass"]

        if not request["hass_user"].is_admin:
            raise Unauthorized

        reader = await request.multipart()
        fields: dict[str, str] = {}
        payload = b""
        filename = ""

        while part := await reader.next():
            if part.name == "file":
                filename = part.filename or "wake.tflite"
                payload = await part.read()
            else:
                fields[part.name] = (await part.read()).decode()

        if not payload:
            return self.json({"error": "nothing was uploaded"}, status_code=400)
        if len(payload) > MOST:
            return self.json({"error": "that is too large for a wake model"}, status_code=400)
        if not filename.endswith(".tflite"):
            return self.json({"error": "a wake model is a .tflite file"}, status_code=400)

        stem = Path(filename).stem
        wake_id = slugify(fields.get("id") or stem)

        # The filename is all a dropped model says about itself. Guessed here, editable after.
        spoken = fields.get("wake_word") or stem.replace("_", " ").replace("-", " ").strip()

        config = {
            "model": f"{wake_id}.tflite",
            "type": fields.get("type") or DEFAULT_TYPE,
            "wake_word": spoken,
            "trained_languages": [
                lang for lang in (fields.get("trained_languages") or "").split(",") if lang.strip()
            ],
        }

        store = _dir(hass)
        await hass.async_add_executor_job(_write, store, wake_id, payload, config)
        async_invalidate(hass)

        return self.json({"id": wake_id, "wake_word": spoken})


def _write(store: Path, wake_id: str, payload: bytes, config: dict[str, Any]) -> None:
    store.mkdir(parents=True, exist_ok=True)
    (store / f"{wake_id}.tflite").write_bytes(payload)
    (store / f"{wake_id}.json").write_text(json.dumps(config, indent=2) + "\n", encoding="utf-8")


def _file(store: Path, wake_id: str, suffix: str) -> Path:
    """The id names a file in the directory, and has to resolve to one still inside it."""
    path = (store / f"{wake_id}{suffix}").resolve()
    if path.parent != store.resolve():
        raise ValueError(f"not a wake word id: {wake_id}")
    return path


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "echolocal/wake_words/list"})
@websocket_api.async_response
async def ws_list(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Everything in the directory, valid or not."""
    found = await hass.async_add_executor_job(_read, _dir(hass))
    connection.send_result(msg["id"], {"wake_words": found})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "echolocal/wake_words/update",
        vol.Required("wake_word_id"): cv.string,
        vol.Optional("wake_word"): cv.string,
        vol.Optional("model_type"): cv.string,
        vol.Optional("trained_languages"): [cv.string],
    }
)
@websocket_api.async_response
async def ws_update(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Correct a description, which is what fixes one core is dropping."""
    try:
        path = _file(_dir(hass), msg["wake_word_id"], ".json")
    except ValueError as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
        return

    def edit() -> dict[str, Any]:
        try:
            config = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            config = {}

        if "wake_word" in msg:
            config["wake_word"] = msg["wake_word"]
        if "model_type" in msg:
            config["type"] = msg["model_type"]
        if "trained_languages" in msg:
            config["trained_languages"] = msg["trained_languages"]

        config.setdefault("type", DEFAULT_TYPE)
        path.write_text(json.dumps(config, indent=2) + "\n", encoding="utf-8")
        return config

    config = await hass.async_add_executor_job(edit)
    async_invalidate(hass)
    connection.send_result(msg["id"], config)


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "echolocal/wake_words/delete",
        vol.Required("wake_word_id"): cv.string,
    }
)
@websocket_api.async_response
async def ws_delete(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Take both files away, since one without the other is a wake word nobody can see."""
    store = _dir(hass)

    try:
        doomed = [_file(store, msg["wake_word_id"], suffix) for suffix in (".json", ".tflite")]
    except ValueError as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
        return

    def remove() -> None:
        for path in doomed:
            path.unlink(missing_ok=True)

    await hass.async_add_executor_job(remove)
    async_invalidate(hass)
    connection.send_result(msg["id"], {})
