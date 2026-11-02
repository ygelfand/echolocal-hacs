import pytest

from custom_components.echolocal.fetch import allowed, total_of


@pytest.mark.parametrize(
    ("url", "ok"),
    [
        ("https://github.com/ygelfand/echolocal/releases/download/1.0.0/manifest.json", True),
        ("https://api.github.com/repos/ygelfand/echolocal/releases", True),
        ("https://release-assets.githubusercontent.com/github-production-release-asset/1", True),
        ("https://d.echolocal.link/pryon/1/model.tar.xz", True),
        ("https://files.echolocal.link/x", True),
        ("https://echolocal.link/x", False),
        ("https://evilecholocal.link/x", False),
        ("https://echolocal.link.evil.com/x", False),
        ("https://x.github.com/x", False),
        ("http://github.com/x", False),
        ("https://github.com:8443/x", False),
        ("https://example.com/x", False),
        ("http://homeassistant.local:8123/api/", False),
    ],
)
def test_only_release_hosts_are_allowed(url, ok):
    assert allowed(url) is ok


@pytest.mark.parametrize(
    ("header", "total"),
    [
        ("bytes 0-99/444438", 444438),
        ("bytes 40960-41059/*", 0),
        (None, 0),
        ("", 0),
    ],
)
def test_total_comes_from_content_range(header, total):
    assert total_of(header) == total
