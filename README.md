# EchoLocal for Home Assistant

<p align="center">
  <img src="custom_components/echolocal/brand/icon.png" width="96" alt="EchoLocal for Home Assistant icon">
</p>

[![hacs][hacs-badge]][hacs] [![Validate](https://github.com/ygelfand/echolocal-hacs/actions/workflows/validate.yml/badge.svg)](https://github.com/ygelfand/echolocal-hacs/actions/workflows/validate.yml)

An optional companion to [EchoLocal](https://github.com/ygelfand/echolocal), the firmware that turns an Amazon
Echo Dot Gen 2 into a Home Assistant voice satellite.

EchoLocal speaks the ESPHome native API, so Home Assistant already adopts a device, gives
it an assist satellite and an entity for every setting, with none of this installed. This adds integration things
on top:

- **A custom card** for the device with settings and controls
- **An optional dashboard** in the sidebar, with all the attached devices, as well as global settings
- **Extra functionality** the EspHome protocol has no way to express
- more to come

## Status

**Active development. Everything here is subject to change** — entity names, the card's config, the layout
of the dashboard, the lot.

## Installing

Needs Home Assistant **2025.11** or newer, which is where ESPHome learned to hand out custom wake words.

### HACS (custom repository)

[![My Home Assistant](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=ygelfand&repository=echolocal-hacs&category=Integration)

Click the badge to add this repo to HACS in one step, or add it manually:

1. HACS → ⋮ → **Custom repositories**
2. Add `https://github.com/ygelfand/echolocal-hacs` with category **Integration**
3. Install **EchoLocal**, then restart Home Assistant

### Manual

Copy `custom_components/echolocal` into your Home Assistant `config/custom_components/` and restart.

### Then

Settings → **Devices & Services** → **Add Integration** → **EchoLocal**. There is nothing to configure but
whether you want the dashboard in the sidebar.

## Licence

MIT.

[hacs]: https://github.com/hacs/integration
[hacs-badge]: https://img.shields.io/badge/HACS-Custom-41BDF5.svg
