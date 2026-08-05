"""Describe a turn for the logbook.

The recorder keeps every event a device fires whether or not anything can read it, so registering
this is what makes past turns readable — including ones from before the integration was installed.
The logbook returns whatever this function does, so the timings ride along with the sentence.
"""

from __future__ import annotations

from collections.abc import Callable
from typing import Any

from homeassistant.components.logbook import LOGBOOK_ENTRY_MESSAGE, LOGBOOK_ENTRY_NAME
from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN, TURN_EVENT

# What a turn carries beyond the sentence. Everything arrives as a string because the wire has no
# other kind; the card turns the numbers back.
FIELDS = (
    "version",
    "id",
    "slot",
    "outcome",
    "wake_word",
    "heard",
    "reply",
    "wake_ms",
    "listen_ms",
    "think_ms",
    "speak_ms",
    "audio_seconds",
)


@callback
def async_describe_events(
    hass: HomeAssistant,
    async_describe_event: Callable[[str, str, Callable[[Any], dict[str, Any]]], None],
) -> None:
    """Teach the logbook to read a turn."""

    @callback
    def async_describe_turn(event: Any) -> dict[str, Any]:
        data = event.data

        return {
            LOGBOOK_ENTRY_NAME: data.get("wake_word") or "EchoLocal",
            LOGBOOK_ENTRY_MESSAGE: _sentence(data),
            **{key: value for key, value in data.items() if key in FIELDS},
        }

    async_describe_event(DOMAIN, TURN_EVENT, async_describe_turn)


def _sentence(data: dict[str, Any]) -> str:
    """What the logbook itself shows, for somebody reading the feed rather than the card."""
    heard = data.get("heard")
    reply = data.get("reply")
    outcome = data.get("outcome")

    if heard and reply:
        return f'heard "{heard}" and answered "{reply}"'
    if heard:
        return f'heard "{heard}"' if outcome == "completed" else f'heard "{heard}" ({outcome})'
    if outcome and outcome != "completed":
        return f"woke, then {outcome}"
    return "woke"
