// Entity identity that survives a rename.
//
// entity_id and friendly_name both belong to the user, and the display registry a card sees carries nothing
// else. config/entity_registry/list carries unique_id, and is open to every user — only writing to the
// registry needs an administrator.
//
// An esphome unique_id is <mac>-<platform>-<name>[_<slot>][@<sub-device>]. What is left after taking those
// apart is the name echod gave the thing, which is what the card looks a row up by.

import type { HassEntity, HomeAssistant } from "./types";

export interface Tagged extends HassEntity {
  // echod's own name, or Home Assistant's for the entities it invents for an assist satellite. Empty until
  // the registry answers, so a lookup misses rather than finding the wrong thing.
  name: string;

  // One per assistant, noise layer or ring segment. Zero when there is only one of the thing.
  slot: number;

  // Which sub-device declared it, or 0 for the device itself.
  part: number;
}

export function tag(hass: HomeAssistant, entities: HassEntity[]): Tagged[] {
  const known = keys(hass);

  return entities.map((entity) => {
    const found = known?.get(entity.entity_id);
    return { ...entity, name: found?.name ?? "", slot: found?.slot ?? 0, part: found?.part ?? 0 };
  });
}

// Built once, then every row is a direct lookup. Each name's entities are in slot order, so the twelve
// segments and the two noise layers come out numbered.
export type Index = Map<string, Tagged[]>;

export function index(entities: Tagged[]): Index {
  const out: Index = new Map();

  for (const entity of entities) {
    const mine = out.get(entity.name);
    if (mine) mine.push(entity);
    else out.set(entity.name, [entity]);
  }

  for (const mine of out.values()) mine.sort((a, b) => a.slot - b.slot);
  return out;
}

export interface Known {
  entityId: string;
  deviceId: string;
  name: string;
  slot: number;
  part: number;
  platform: string;
  disabled: boolean;
}

interface Entry {
  entity_id: string;
  device_id: string | null;
  disabled_by: string | null;
  platform: string;
  unique_id: string;
}

export const KEYS_READY = "echolocal-keys";

let cache: Promise<Map<string, Known>> | null = null;
let ready: Map<string, Known> | null = null;

// Null until the registry answers. Callers render what they can and listen for KEYS_READY on window.
export function keys(hass: HomeAssistant): Map<string, Known> | null {
  if (!cache) {
    cache = load(hass);
    cache.then(() => window.dispatchEvent(new Event(KEYS_READY)));
    listen(hass);
  }
  return ready;
}

async function load(hass: HomeAssistant): Promise<Map<string, Known>> {
  const out = new Map<string, Known>();

  try {
    const found = await hass.callWS<Entry[]>({ type: "config/entity_registry/list" });

    for (const entry of found) {
      if (!entry.device_id) continue;
      out.set(entry.entity_id, {
        entityId: entry.entity_id,
        deviceId: entry.device_id,
        ...split(entry.unique_id),
        platform: entry.platform,
        disabled: !!entry.disabled_by,
      });
    }
  } catch {
    // No registry, so the card shows only what it can work out without one.
  }

  ready = out;
  return out;
}

export function split(uniqueId: string): { name: string; slot: number; part: number } {
  const withoutMac = uniqueId.replace(/^(?:[0-9a-f]{2}:){5}[0-9a-f]{2}-?/i, "");

  const at = withoutMac.lastIndexOf("@");
  const part = at < 0 ? 0 : Number(withoutMac.slice(at + 1)) || 0;
  const whole = at < 0 ? withoutMac : withoutMac.slice(0, at);

  // Home Assistant's own have no platform in front; echod's do.
  const dash = whole.indexOf("-");
  const named = dash < 0 ? whole : whole.slice(dash + 1);

  const cut = named.lastIndexOf("_");
  const tail = cut < 0 ? "" : named.slice(cut + 1);
  const numbered = /^\d+$/.test(tail);

  return {
    name: numbered ? named.slice(0, cut) : named,
    slot: numbered ? Number(tail) : 0,
    part,
  };
}

function listen(hass: HomeAssistant): void {
  hass.connection
    ?.subscribeEvents(() => {
      cache = null;
      ready = null;
      keys(hass);
    }, "entity_registry_updated")
    .catch(() => {});
}
