from types import SimpleNamespace as NS

import pytest

from custom_components.echolocal.music import owner, row

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
