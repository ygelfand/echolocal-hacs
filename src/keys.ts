// Entity identity that survives a rename.
//
// entity_id and friendly_name both belong to the user, and the display registry a card sees carries nothing
// else. The integration answers with the name echod gave each entity — computed on its side, never parsed
// out of a Home Assistant identifier — and pushes a new answer whenever the registry moves.
//
// Without the integration there is no answer at all, and every lookup here misses. That is the intended
// failure: the card shows what it can work out without names rather than guessing at one.

import type { HassEntity, HomeAssistant } from "./types";

export interface Tagged extends HassEntity {
  // echod's own name for the thing. Empty until the integration answers, so a lookup misses rather than
  // finding the wrong entity.
  name: string;

  // One per assistant, noise layer or ring segment. Zero when there is only one of the thing.
  slot: number;
}

export function tag(hass: HomeAssistant, entities: HassEntity[]): Tagged[] {
  const known = keys(hass);

  return entities.map((entity) => {
    const found = known?.get(entity.entity_id);
    return { ...entity, name: found?.name ?? "", slot: found?.slot ?? 0 };
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

  // Disabled entities are here and nowhere else a card can see: this is how the ring segments are found
  // before anyone has turned one on.
  disabled: boolean;
}

interface Entry {
  entity_id: string;
  device_id: string | null;
  object_id: string;
  disabled: boolean;
}

export const KEYS_READY = "echolocal-keys";

let started = false;
let ready: Map<string, Known> | null = null;

// Null until the integration answers. Callers render what they can and listen for KEYS_READY on window.
export function keys(hass: HomeAssistant): Map<string, Known> | null {
  if (!started) {
    started = true;
    listen(hass);
  }
  return ready;
}

function listen(hass: HomeAssistant): void {
  hass.connection
    ?.subscribeMessage<{ entities: Entry[] }>(
      (message) => {
        const out = new Map<string, Known>();

        for (const entry of message.entities) {
          if (!entry.device_id) continue;
          out.set(entry.entity_id, {
            entityId: entry.entity_id,
            deviceId: entry.device_id,
            ...split(entry.object_id),
            disabled: entry.disabled,
          });
        }

        ready = out;
        window.dispatchEvent(new Event(KEYS_READY));
      },
      { type: "echolocal/entities" },
    )
    .catch(() => {
      // No integration, or one too old to answer
    });
}

// echod numbers its repeated entities in the object id it declares — segment_7, wake_assistant_2 — which is
// its own naming and the one thing here that is ours to read.
function split(objectId: string): { name: string; slot: number } {
  const cut = objectId.lastIndexOf("_");
  const tail = cut < 0 ? "" : objectId.slice(cut + 1);
  if (!/^\d+$/.test(tail)) return { name: objectId, slot: 0 };

  return { name: objectId.slice(0, cut), slot: Number(tail) };
}
