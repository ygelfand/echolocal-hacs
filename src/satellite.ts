// Finding our devices, and working out what their entities are for.
//
// Roles come from the registry keys in keys.ts, which echod owns. Nothing here reads an entity id.

import { KEY, tag, type Tagged } from "./keys";
import type { HassDevice, HomeAssistant, Kind } from "./types";

export const MANUFACTURER = "EchoLocal";

const ESPHOME = "esphome";

// The ring has twelve segments whether or not Home Assistant has entities for them, so anything indexed
// by segment is this long and sparse: position eleven is segment twelve, enabled or not.
export const SEGMENTS = 12;

export interface Satellite {
  device: HassDevice;
  parts: HassDevice[];
  entities: Tagged[];
  satellite?: string;
  player?: string;
  update?: string;
  ring?: string;

  // Indexed by segment number, so segments[6] is segment 7 and a hole means that one has no entity.
  segments: (string | undefined)[];
  mute?: string;
}

function esphomeMade(device?: HassDevice): boolean {
  return !!device?.identifiers?.some(([domain]) => domain === ESPHOME);
}

function partsOf(hass: HomeAssistant, deviceId: string): HassDevice[] {
  return Object.values(hass.devices ?? {})
    .filter((d) => d.via_device_id === deviceId && !d.disabled_by)
    .sort((a, b) => deviceName(a).localeCompare(deviceName(b)));
}

export function findSatellites(hass?: HomeAssistant): HassDevice[] {
  if (!hass) return [];

  return Object.values(hass.devices ?? {})
    .filter(
      (d) => isSatellite(hass, d.id) && !d.via_device_id && !d.disabled_by,
    )
    .sort((a, b) => deviceName(a).localeCompare(deviceName(b)));
}

export function deviceName(device?: HassDevice | null): string {
  return device?.name_by_user || device?.name || "";
}

export function isSatellite(
  hass: HomeAssistant | undefined,
  deviceId: string,
): boolean {
  if (hass?.devices?.[deviceId]?.manufacturer !== MANUFACTURER) return false;
  return partsOf(hass, deviceId).some(esphomeMade);
}

export function resolve(
  hass?: HomeAssistant,
  deviceId?: string,
): Satellite | null {
  if (!hass || !deviceId) return null;

  const device = hass.devices?.[deviceId];
  if (!device) return null;

  const parts = partsOf(hass, deviceId);

  const own = new Set([deviceId, ...parts.map((d) => d.id)]);
  const entities = tag(
    hass,
    Object.values(hass.entities ?? {}).filter(
      (e) => e.device_id && own.has(e.device_id) && !e.hidden,
    ),
  );

  const one = (pattern: RegExp) => entities.find((e) => pattern.test(e.key))?.entity_id;

  // Indexed by segment number taken from the key, so a renamed segment stays where it belongs.
  const segments: (string | undefined)[] = new Array(SEGMENTS).fill(undefined);
  for (const light of entities) {
    const at = Number(light.key.match(KEY.segment)?.[1] ?? 0) - 1;
    if (at >= 0 && at < SEGMENTS) segments[at] = light.entity_id;
  }

  return {
    device,
    parts,
    entities,
    // assist_satellite is Home Assistant's own, so its key has no platform segment.
    satellite: entities.find((e) => e.key === "assist_satellite")?.entity_id,
    player: one(KEY.player),
    update: one(KEY.firmware),
    ring: one(KEY.ring),
    segments,
    mute: one(KEY.mute),
  };
}

// What a sub-device is, from a key only that component has. The media_player is no use for playback: it is
// the device's speaker and sits on the device itself, which is why playback used to come out as an
// assistant. Anything unpinned is an assistant, one sub-device per wake word slot.
export function kindOf(state: Satellite, part: HassDevice): Kind {
  const holds = (pattern: RegExp) =>
    state.entities.some((e) => e.device_id === part.id && pattern.test(e.key));

  if (holds(KEY.ring) || holds(KEY.segment)) return "ring";
  if (holds(KEY.mute) || holds(KEY.gain)) return "microphone";
  if (holds(KEY.noise) || holds(KEY.headphones)) return "playback";
  return "assistant";
}

export function partEntities(state: Satellite, partId: string): Tagged[] {
  return state.entities.filter((e) => e.device_id === partId);
}

// One per wake word slot, in slot order, which is what the action button presses.
export function wakeButtons(state: Satellite): string[] {
  return state.entities
    .filter((e) => KEY.wake.test(e.key))
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((e) => e.entity_id);
}

export interface Lit {
  rgb: [number, number, number];
  level: number;
}

// lit reports what a light is showing, or null when it is off: Home Assistant only carries the colour
// and brightness while a light is on.
export function lit(
  hass: HomeAssistant | undefined,
  entityId?: string,
): Lit | null {
  const state = entityId ? hass?.states?.[entityId] : undefined;
  if (!state || state.state !== "on") return null;

  return {
    rgb: state.attributes.rgb_color ?? [255, 255, 255],
    level: (state.attributes.brightness ?? 255) / 255,
  };
}

export function isOn(
  hass: HomeAssistant | undefined,
  entityId?: string,
): boolean {
  return !!entityId && hass?.states?.[entityId]?.state === "on";
}

export function activity(
  hass: HomeAssistant | undefined,
  entityId?: string,
): string {
  return (
    (entityId ? hass?.states?.[entityId]?.state : undefined) ?? "unavailable"
  );
}
