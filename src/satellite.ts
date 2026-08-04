// Finding our devices, and working out what their entities are for.
//
// Home Assistant gives every ESPHome entity the platform "esphome", so that tells ours apart from
// nothing. What identifies them is the device registry: echod reports its own manufacturer, which core's
// esphome integration writes onto the device and onto every sub-device, and which cannot be edited in
// the UI.
//
// Roles come from structure: exactly one assist_satellite and one media_player in a device tree, one
// enabled light (the twelve segments ship disabled), one switch with no entity category — the mute.

import type { HassDevice, HassEntity, HomeAssistant, Kind } from "./types";

export const MANUFACTURER = "EchoLocal";

// The ring has twelve segments whether or not Home Assistant has entities for them, so anything indexed
// by segment is this long and sparse: position eleven is segment twelve, enabled or not.
export const SEGMENTS = 12;

export interface Satellite {
  device: HassDevice;
  parts: HassDevice[];
  entities: HassEntity[];
  satellite?: string;
  player?: string;
  update?: string;
  ring?: string;

  // Indexed by segment number, so segments[6] is segment 7 and a hole means that one has no entity.
  segments: (string | undefined)[];
  mute?: string;
}

export function findSatellites(hass?: HomeAssistant): HassDevice[] {
  if (!hass) return [];

  return Object.values(hass.devices ?? {})
    .filter((d) => d.manufacturer === MANUFACTURER && !d.via_device_id && !d.disabled_by)
    .sort((a, b) => deviceName(a).localeCompare(deviceName(b)));
}

export function deviceName(device?: HassDevice | null): string {
  return device?.name_by_user || device?.name || "";
}

export function isSatellite(hass: HomeAssistant | undefined, deviceId: string): boolean {
  return hass?.devices?.[deviceId]?.manufacturer === MANUFACTURER;
}

export function resolve(hass?: HomeAssistant, deviceId?: string): Satellite | null {
  if (!hass || !deviceId) return null;

  const device = hass.devices?.[deviceId];
  if (!device) return null;

  const parts = Object.values(hass.devices)
    .filter((d) => d.via_device_id === deviceId && !d.disabled_by)
    .sort((a, b) => deviceName(a).localeCompare(deviceName(b)));

  const own = new Set([deviceId, ...parts.map((d) => d.id)]);
  const entities = Object.values(hass.entities ?? {}).filter(
    (e) => e.device_id && own.has(e.device_id) && !e.hidden
  );

  const of = (domain: string, plain = false) =>
    entities.filter(
      (e) => e.entity_id.startsWith(`${domain}.`) && (!plain || !e.entity_category)
    );

  const lights = of("light", true);
  const numbered = (e: HassEntity) => /_\d+$/.test(e.entity_id);

  const segments: (string | undefined)[] = new Array(SEGMENTS).fill(undefined);
  for (const light of lights.filter(numbered)) {
    const at = segmentNumber(light.entity_id) - 1;
    if (at >= 0 && at < SEGMENTS) segments[at] = light.entity_id;
  }

  return {
    device,
    parts,
    entities,
    satellite: of("assist_satellite")[0]?.entity_id,
    player: of("media_player")[0]?.entity_id,
    update: of("update")[0]?.entity_id,
    ring: (lights.find((e) => !numbered(e)) ?? lights[0])?.entity_id,
    segments,
    mute: of("switch", true)[0]?.entity_id,
  };
}

export function segmentNumber(entityId: string): number {
  return Number.parseInt(entityId.match(/_(\d+)$/)?.[1] ?? "0", 10);
}

// What a sub-device is, from what it holds. Ring, playback and microphone are each pinned by one entity;
// anything left is an assistant, one per wake word slot.
export function kindOf(hass: HomeAssistant, state: Satellite, part: HassDevice): Kind {
  const holds = (entityId?: string) =>
    !!entityId && hass.entities?.[entityId]?.device_id === part.id;

  if (holds(state.ring)) return "ring";
  if (holds(state.player)) return "playback";
  if (holds(state.mute)) return "microphone";
  return "assistant";
}

export function partEntities(state: Satellite, partId: string): HassEntity[] {
  return state.entities.filter((e) => e.device_id === partId);
}

export interface Lit {
  rgb: [number, number, number];
  level: number;
}

// lit reports what a light is showing, or null when it is off: Home Assistant only carries the colour
// and brightness while a light is on.
export function lit(hass: HomeAssistant | undefined, entityId?: string): Lit | null {
  const state = entityId ? hass?.states?.[entityId] : undefined;
  if (!state || state.state !== "on") return null;

  return {
    rgb: state.attributes.rgb_color ?? [255, 255, 255],
    level: (state.attributes.brightness ?? 255) / 255,
  };
}

export function isOn(hass: HomeAssistant | undefined, entityId?: string): boolean {
  return !!entityId && hass?.states?.[entityId]?.state === "on";
}

export function activity(hass: HomeAssistant | undefined, entityId?: string): string {
  return (entityId ? hass?.states?.[entityId]?.state : undefined) ?? "unavailable";
}
