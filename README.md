# EchoLocal for Home Assistant

<p align="center">
  <img src="custom_components/echolocal/brand/icon.png" width="96" alt="EchoLocal for Home Assistant icon">
</p>

[![hacs][hacs-badge]][hacs] [![Validate](https://github.com/ygelfand/echolocal-ha/actions/workflows/validate.yml/badge.svg)](https://github.com/ygelfand/echolocal-ha/actions/workflows/validate.yml)

An optional companion to [EchoLocal](https://github.com/ygelfand/echolocal), which turns Amazon Echo
Dots and Echo Shows into Home Assistant voice satellites, and to its sister project
[LANovo](https://github.com/ygelfand/LANovo), which does the same for Lenovo Smart Displays. Both
kinds of device share one dashboard.

EchoLocal speaks the ESPHome native API, so Home Assistant already adopts each device and gives it
an assist satellite and an entity for every setting, without this integration. This adds:

- **A card** for each device, with its settings and controls
- **A dashboard** in the sidebar with every device, plus wake words, tones, turn history, groups
  and health
- **Fleet**: compare every device's settings with one of them and copy settings across
- **Features the ESPHome protocol can't express**: the wake word library, custom tones and turn
  recordings
- **Calls from a dashboard** to an Echo Show, with audio or video

![The EchoLocal dashboard with Echo Dots and Echo Shows](docs/images/dashboard.png)

## The card

Drawn like the device: a Dot with its ring and light level, or a Show with its screen. Buttons for
the microphone, playback, ring, screen, posters, camera and each assistant open their settings. On
an Echo Show, the phone button calls it from the browser; sound and video go straight between the
two, so the browser has to be on the same network.

<p align="center">
  <img src="docs/images/card.png" width="360" alt="The card for an Echo Dot: the device from above, ring lit, showing the room's light level">
  <img src="docs/images/card-show.png" width="360" alt="The card for an Echo Show 8, with buttons for microphone, playback, screen, posters, camera, both assistants and calling">
</p>

<p align="center">
  <img src="docs/images/screen.png" width="560" alt="The Screen settings for an Echo Show 8: brightness, theme, style, dock side, visual, clock face and idle settings">
  <img src="docs/images/assistant.png" width="720" alt="The assistant settings: wake word, pipeline, sensitivity, timings, chime, reply delivery and how many recordings to keep">
</p>

## The dashboard

### Home

Every device on one page, or grouped. A group bar mutes, rings or stops every device in it.

### Activity

Every turn a device reports: what woke it, what it heard, what it answered, and how long each phase
took. Where a recording was kept, you can play back what the microphones sent.

![The activity view: turns with their wake word, transcript, reply and a bar of listen, think and reply times](docs/images/activity.png)

### Wake words

Which device listens for what, and a library shared by every device. Drop in a `.tflite` to make it
available to all of them.

![The wake word tab: which device listens for what, and the library table](docs/images/wake-words.png)

### Tones

Upload a sound and assign it to devices for alerts, timers and wake chimes.

![The tones tab: a custom chime assigned to four devices](docs/images/tones.png)

### Groups

Devices against groups. Groups are Home Assistant labels, so they work in automations too.

### Fleet

Pick a **Primary** device and see, setting by setting, which devices match it, differ, or don't have
that setting. Tick settings and devices, then **Sync** to copy them from the primary; each row
reports what changed. Sections collapse to one column with a checkbox for the whole section, label
pills narrow the devices, an eye leaves a device out of the comparison, and **Local** lists settings
that are never synced. Pipelines and wake words go through Home Assistant's own selects. Devices on
older firmware show **needs an update**. Administrators only.

### Health

Version, update status, Wi‑Fi signal, CPU temperature, load, memory and disk for every device.

![The health tab: one row per device](docs/images/health.png)

## Status

**Active development. Everything here is subject to change**, including entity names, the card's
config and the dashboard layout.

## Installing

Needs Home Assistant **2026.8** or newer.

### HACS (custom repository)

[![My Home Assistant](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=ygelfand&repository=echolocal-ha&category=Integration)

Click the badge to add this repo to HACS, or add it manually:

1. HACS → ⋮ → **Custom repositories**
2. Add `https://github.com/ygelfand/echolocal-ha` with category **Integration**
3. Install **EchoLocal**, then restart Home Assistant

### Manual

Copy `custom_components/echolocal` into your Home Assistant `config/custom_components/` and restart.

### Then

Settings → **Devices & Services** → **Add Integration** → **EchoLocal**. The only option is whether
to show the dashboard in the sidebar.

## License

MIT.

[hacs]: https://github.com/hacs/integration
[hacs-badge]: https://img.shields.io/badge/HACS-Custom-41BDF5.svg
