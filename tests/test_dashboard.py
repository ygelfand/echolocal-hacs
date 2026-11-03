from types import SimpleNamespace

from homeassistant.components.frontend import DATA_THEMES
from homeassistant.components.lovelace.const import LOVELACE_DATA
from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.echolocal import dashboard
from custom_components.echolocal.const import CONF_PANEL_USERS, DOMAIN

CLIENT = dashboard.CLIENT


async def clients(hass: HomeAssistant) -> set[str]:
    return {
        token.client_id or ""
        for user in await hass.auth.async_get_users()
        for token in user.refresh_tokens.values()
    }


async def tokens_for(hass: HomeAssistant, *nodes: str) -> None:
    user = await hass.auth.async_create_user("Wall")
    for node in nodes:
        await hass.auth.async_create_refresh_token(user, client_id=CLIENT + node)
    await hass.auth.async_create_refresh_token(user, client_id="http://other.example/")


def esphome(hass: HomeAssistant, name: str) -> None:
    MockConfigEntry(domain="esphome", data={"device_name": name}, title=name).add_to_hass(hass)


async def test_themes_are_listed_by_name_with_their_dark_mode(hass: HomeAssistant) -> None:
    hass.data[DATA_THEMES] = {
        "Kitchen": {"modes": {"light": {}, "dark": {}}},
        "plain": {"primary-color": "#1565c0"},
        "apple": {"modes": {"light": {}}},
    }
    assert dashboard._themes(hass) == [
        {"name": "apple", "dark": False},
        {"name": "Kitchen", "dark": True},
        {"name": "plain", "dark": False},
    ]


class Board:
    def __init__(self, title: str, views: int) -> None:
        self.config = {"title": title}
        self.views = views

    async def async_load(self, force: bool) -> dict:
        return {"views": [{"path": f"v{i}"} for i in range(self.views)]}


async def test_migrated_default_dashboard_is_listed_once(hass: HomeAssistant) -> None:
    hass.data[LOVELACE_DATA] = SimpleNamespace(
        dashboards={None: Board("Overview", 0), "lovelace": Board("Overview", 19)}
    )
    found = await dashboard._dashboards(hass)
    assert [(d["path"], len(d["views"])) for d in found] == [("lovelace", 19)]


async def test_unmigrated_default_dashboard_is_lovelace(hass: HomeAssistant) -> None:
    hass.data[LOVELACE_DATA] = SimpleNamespace(
        dashboards={None: Board("Overview", 2), "map": Board("Map", 0)}
    )
    found = await dashboard._dashboards(hass)
    assert [d["path"] for d in found] == ["lovelace", "map"]


async def test_only_allowed_users_are_offered(hass: HomeAssistant) -> None:
    await hass.auth.async_create_user("Other")
    wall = await hass.auth.async_create_user("Wall", group_ids=["system-users"])
    MockConfigEntry(domain=DOMAIN, options={CONF_PANEL_USERS: [wall.id]}).add_to_hass(hass)
    assert await dashboard._users(hass) == [{"id": wall.id, "name": "Wall", "admin": False}]


async def test_nobody_is_offered_until_a_user_is_allowed(hass: HomeAssistant) -> None:
    await hass.auth.async_create_user("Wall")
    MockConfigEntry(domain=DOMAIN, options={}).add_to_hass(hass)
    assert await dashboard._users(hass) == []


async def test_tokens_of_devices_no_longer_in_esphome_are_removed(hass: HomeAssistant) -> None:
    esphome(hass, "athena")
    esphome(hass, "kitchen-show")
    await tokens_for(hass, "athena", "kitchen_show", "gone")
    await dashboard._orphans(hass)
    left = await clients(hass)
    assert CLIENT + "athena" in left
    assert CLIENT + "kitchen_show" in left
    assert CLIENT + "gone" not in left
    assert "http://other.example/" in left


async def test_removing_a_device_removes_its_tokens(hass: HomeAssistant) -> None:
    esphome(hass, "athena")
    await tokens_for(hass, "athena", "gone")
    dashboard.async_setup(hass)
    hass.bus.async_fire(
        dr.EVENT_DEVICE_REGISTRY_UPDATED, {"action": "remove", "device_id": "x", "device": {}}
    )
    await hass.async_block_till_done()
    left = await clients(hass)
    assert CLIENT + "athena" in left
    assert CLIENT + "gone" not in left


async def test_other_device_changes_leave_tokens_alone(hass: HomeAssistant) -> None:
    esphome(hass, "athena")
    await tokens_for(hass, "athena", "gone")
    dashboard.async_setup(hass)
    hass.bus.async_fire(
        dr.EVENT_DEVICE_REGISTRY_UPDATED, {"action": "update", "device_id": "x", "changes": {}}
    )
    await hass.async_block_till_done()
    assert CLIENT + "gone" in await clients(hass)
