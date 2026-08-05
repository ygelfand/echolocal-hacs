"""Constants for the EchoLocal integration."""

DOMAIN = "echolocal"

# How our devices are found. echod reports it, the esphome integration writes it to the device and
# every sub-device, and the UI cannot edit it. Platform is no use: every ESPHome device is esphome.
MANUFACTURER = "EchoLocal"

CONF_SIDEBAR = "sidebar"

PANEL_URL_PATH = "echolocal"
PANEL_TITLE = "EchoLocal"
PANEL_ICON = "mdi:record-circle-outline"

FRONTEND_URL = "/echolocal-frontend"

# One bundle for the card, its editor and the panel. The panel gets the same URL so the browser
# reuses the module instead of defining every element twice.
BUNDLE_FILE = "echolocal.js"

# The domain a device rides in Home Assistant. Our devices connect through the esphome integration,
# so this is the domain of their config entries and the prefix on the events they fire. The logbook
# scopes a device-filtered query to the describers registered under a device's config entry domains,
# so the turn describer registers under this.
EVENT_DOMAIN = "esphome"

# What a device calls a finished turn. Home Assistant fires the name whole, under the device's domain.
TURN_EVENT = f"{EVENT_DOMAIN}.echolocal_turn"
