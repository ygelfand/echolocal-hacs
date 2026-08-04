// Finding our devices, and working out what their entities are for.
//
// Roles come from the registry names in keys.ts, which echod owns. Nothing here reads an entity id.

import { index, tag, type Index, type Tagged } from "./keys";
import type { HassDevice, HomeAssistant } from "./types";

export const MANUFACTURER = "EchoLocal";

const ESPHOME = "esphome";

// The ring has twelve segments whether or not Home Assistant has entities for them, so anything indexed
// by segment is this long and sparse: position eleven is segment twelve, enabled or not.
export const SEGMENTS = 12;

export interface Satellite {
  device: HassDevice;
  entities: Tagged[];

  // Every entity under echod's own name for it, built once, so anything looking for one does a get.
  by: Index;

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

  // Sub-devices are how echod groups its entities in Home Assistant's own UI. The card gathers them all
  // and works from names, so which sub-device declared a thing never decides anything here.
  const own = new Set([deviceId, ...partsOf(hass, deviceId).map((d) => d.id)]);
  const entities = tag(
    hass,
    Object.values(hass.entities ?? {}).filter(
      (e) => e.device_id && own.has(e.device_id) && !e.hidden,
    ),
  );

  const by = index(entities);
  const one = (name: string) => by.get(name)?.[0]?.entity_id;

  // Indexed by the segment's own slot, so a renamed segment stays where it belongs.
  const segments: (string | undefined)[] = new Array(SEGMENTS).fill(undefined);
  for (const light of by.get("segment") ?? []) {
    const at = light.slot - 1;
    if (at >= 0 && at < SEGMENTS) segments[at] = light.entity_id;
  }

  return {
    device,
    entities,
    by,
    satellite: one("assist_satellite"),
    player: one("speaker"),
    update: one("firmware"),
    ring: one("ring"),
    segments,
    mute: one("mic_mute"),
  };
}

// One per assistant, in slot order, which is what the action button presses.
export function wakeButtons(state: Satellite): string[] {
  return (state.by.get("wake_assistant") ?? []).map((e) => e.entity_id);
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
