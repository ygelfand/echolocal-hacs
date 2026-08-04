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
