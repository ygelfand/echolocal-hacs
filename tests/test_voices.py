import json

from homeassistant.core import HomeAssistant

from custom_components.echolocal import voices


def voice(id_: str, name: str, threshold: float = 0.5) -> dict:
    return {"id": id_, "name": name, "person": "", "prints": [[1.0, 0.0]], "threshold": threshold}


async def test_changes_apply_in_arrival_order_and_the_list_comes_back(hass: HomeAssistant):
    await voices.async_setup(hass)
    changes = [
        {"save": voice("person.yuri", "Yuri")},
        {"save": voice("person.beth", "Beth")},
        {"save": voice("person.yuri", "Yuri", 0.6)},
        {"remove": "person.beth"},
    ]
    answer = await hass.services.async_call(
        "echolocal",
        "voices",
        {"changes": json.dumps(changes)},
        blocking=True,
        return_response=True,
    )
    assert [(p["id"], p["threshold"]) for p in answer["profiles"]] == [("person.yuri", 0.6)]


async def test_an_invalid_voice_is_skipped(hass: HomeAssistant):
    await voices.async_setup(hass)
    bad = [
        {"save": voice("a", "A", 0.2)},
        {"save": {**voice("b", "B"), "prints": []}},
        {"save": {"id": "c"}},
        "nonsense",
    ]
    assert not await voices._apply(hass, bad)
    assert hass.data[voices.DATA]["profiles"] == []


async def test_an_unchanged_voice_changes_nothing(hass: HomeAssistant):
    await voices.async_setup(hass)
    assert await voices._apply(hass, [{"save": voice("a", "A")}])
    assert not await voices._apply(hass, [{"save": voice("a", "A")}])


async def test_a_change_tells_the_panel(hass: HomeAssistant):
    await voices.async_setup(hass)
    told = []
    hass.bus.async_listen(voices.UPDATED, told.append)
    await voices._apply(hass, [{"save": voice("a", "A")}])
    await voices._apply(hass, [{"save": voice("a", "A")}])
    await hass.async_block_till_done()
    assert len(told) == 1


async def test_null_changes_are_no_changes(hass: HomeAssistant):
    await voices.async_setup(hass)
    answer = await hass.services.async_call(
        "echolocal", "voices", {"changes": "null"}, blocking=True, return_response=True
    )
    assert answer == {"profiles": []}


async def test_asking_with_no_changes_returns_the_household(hass: HomeAssistant):
    await voices.async_setup(hass)
    await voices._apply(hass, [{"save": voice("a", "Ann")}])
    answer = await hass.services.async_call(
        "echolocal", "voices", {}, blocking=True, return_response=True
    )
    assert [p["name"] for p in answer["profiles"]] == ["Ann"]
