from types import SimpleNamespace as NS

import pytest

from custom_components.echolocal.music import (
    contents,
    media,
    owner,
    playable,
    recommended,
    row,
    speakers,
)

UNIVERSAL = NS(
    player_id="up1a2b3c4d",
    output_protocols=[
        NS(output_protocol_id="AA:BB:CC:00:11:22"),
        NS(output_protocol_id="ap1234"),
    ],
)
NATIVE = NS(player_id="ddeeff334455", output_protocols=[])


@pytest.mark.parametrize(
    ("player", "want"),
    [
        ("aabbcc001122", UNIVERSAL),
        ("aa:bb:cc:00:11:22", UNIVERSAL),
        ("DD:EE:FF:33:44:55", NATIVE),
        ("010203040506", None),
    ],
)
def test_owner_is_the_player_holding_our_sendspin_output(player, want):
    assert owner([UNIVERSAL, NATIVE], player) is want


def test_speakers_list_entities_and_mark_ours():
    registry = NS(
        async_get_entity_id=lambda domain, platform, uid: {
            "up1a2b3c4d": "media_player.athena_2",
            "ddeeff334455": "media_player.kitchen",
        }.get(uid)
    )
    hidden = NS(player_id="nohaentity", output_protocols=[])
    players = [
        NS(name="athena", **vars(UNIVERSAL)),
        NS(name="Kitchen", **vars(NATIVE)),
        NS(name="ghost", **vars(hidden)),
    ]
    assert speakers(registry, players, "aabbcc001122") == [
        {"entity_id": "media_player.athena_2", "name": "athena", "mine": True},
        {"entity_id": "media_player.kitchen", "name": "Kitchen", "mine": False},
    ]
    assert not any(s["mine"] for s in speakers(registry, players, ""))


def test_row_names_artists_and_falls_back_to_the_item_name():
    mass = NS(get_media_item_image_url=lambda item: "http://ma/img" if item.media_item else None)
    track = NS(
        queue_item_id="q1",
        name="ignored",
        duration=187,
        media_item=NS(name="Iris", artists=[NS(name="Goo Goo Dolls"), NS(name="Guest")]),
    )
    stream = NS(queue_item_id="q2", name="Radio", duration=None, media_item=None)
    assert row(mass, track) == {
        "id": "q1",
        "title": "Iris",
        "artist": "Goo Goo Dolls, Guest",
        "duration": 187,
        "image": "http://ma/img",
    }
    assert row(mass, stream) == {
        "id": "q2",
        "title": "Radio",
        "artist": "",
        "duration": 0,
        "image": "",
    }


def kind(value):
    return NS(value=value)


def test_media_rows_keep_playable_items_only():
    mass = NS(get_media_item_image_url=lambda item: "http://ma/" + item.name)
    album = NS(
        uri="spotify://album/1",
        media_type=kind("album"),
        name="Recovery",
        artists=[NS(name="Eminem")],
    )
    station = NS(uri="radio://2", media_type=kind("radio"), name="KEXP")
    folder = NS(uri="folder://3", media_type=kind("folder"), name="More")
    nameless = NS(uri="", media_type=kind("track"), name="Broken")
    assert playable([album, folder, station, nameless]) == [album, station]
    assert media(mass, album) == {
        "uri": "spotify://album/1",
        "type": "album",
        "name": "Recovery",
        "artist": "Eminem",
        "image": "http://ma/Recovery",
    }
    assert media(mass, station)["artist"] == ""


class FakeRecommendations:
    def __init__(self, folders, rows):
        self.music = NS(recommendations=self.listing)
        self.folders, self.rows, self.asked = folders, rows, []

    async def listing(self):
        return self.folders

    async def send_command(self, command, provider, item_id):
        self.asked.append((command, provider, item_id))
        return self.rows[item_id]

    def get_media_item_image_url(self, item):
        return ""


def parse(d):
    if d["name"] == "broken":
        raise ValueError(d)
    return NS(uri=d["uri"], media_type=kind(d["media_type"]), name=d["name"])


async def test_recommendations_fetch_each_empty_folders_items():
    held = NS(uri="t://9", media_type=kind("track"), name="Kept")
    folders = [
        NS(name="Mixes", icon="mdi-playlist", provider="spotify", item_id="mix", items=[]),
        NS(name="Held", icon=None, provider="library", item_id="held", items=[held]),
        NS(name="Empty", icon="", provider="library", item_id="none", items=[]),
    ]
    rows = {
        "mix": [
            {"uri": "p://1", "media_type": "playlist", "name": "Daily Mix"},
            {"uri": "f://2", "media_type": "folder", "name": "More"},
            {"uri": "p://3", "media_type": "playlist", "name": "broken"},
            {"uri": "", "media_type": "track", "name": "Nameless"},
        ],
        "none": [],
    }
    mass = FakeRecommendations(folders, rows)
    got = await recommended(mass, 5, parse)
    assert [(f["name"], [i["name"] for i in f["items"]]) for f in got["folders"]] == [
        ("Mixes", ["Daily Mix"]),
        ("Held", ["Kept"]),
    ]
    assert mass.asked == [
        ("music/recommendations/items", "spotify", "mix"),
        ("music/recommendations/items", "library", "none"),
    ]


class FakeLibrary:
    def __init__(self, kind):
        self.kind = kind
        self.asked = []

    async def get_item_by_uri(self, uri):
        return NS(item_id="7", provider="spotify", name="Recovery", media_type=kind(self.kind))

    async def get_album_tracks(self, item_id, provider):
        self.asked.append(("album", item_id, provider))
        return [NS(uri="t://1", media_type=kind("track"), name="Talkin' 2 Myself")]

    async def get_playlist_tracks(self, item_id, provider):
        self.asked.append(("playlist", item_id, provider))
        return [NS(uri="t://2", media_type=kind("track"), name="Lose Yourself")] * 3

    async def get_artist_albums(self, item_id, provider):
        return [NS(uri="a://1", media_type=kind("album"), name="Relapse")]

    async def get_artist_tracks(self, item_id, provider):
        return [NS(uri="t://3", media_type=kind("track"), name="Beautiful")]


@pytest.mark.parametrize(
    ("what", "names", "asked"),
    [
        ("album", ["Talkin' 2 Myself"], [("album", "7", "spotify")]),
        ("playlist", ["Lose Yourself", "Lose Yourself"], [("playlist", "7", "spotify")]),
        ("artist", ["Relapse", "Beautiful"], []),
        ("track", [], []),
    ],
)
async def test_contents_list_what_an_item_holds(what, names, asked):
    library = FakeLibrary(what)
    mass = NS(music=library, get_media_item_image_url=lambda item: "")
    got = await contents(mass, "spotify://x/7", 2)
    assert got["name"] == "Recovery" and got["type"] == what
    assert [i["name"] for i in got["items"]] == names
    assert library.asked == asked
