// The twelve ring segments ship disabled, so Home Assistant never creates them and the display registry
// a card sees does not carry them at all. Finding them means asking the entity registry itself, which is
// an administrator's call — anyone else gets no offer rather than an error.

import { split } from "./keys";
import { SEGMENTS, type Satellite } from "./satellite";
import type { HomeAssistant } from "./types";

interface RegistryEntry {
  entity_id: string;
  device_id: string | null;
  disabled_by: string | null;
  platform: string;
  unique_id: string;
}

// Indexed by segment number the same way the enabled ones are, so segment seven is looked up at six
// whether it exists yet or not.
export async function disabledSegments(
  hass: HomeAssistant,
  state: Satellite
): Promise<(string | undefined)[]> {
  const found: (string | undefined)[] = new Array(SEGMENTS).fill(undefined);
  if (!hass.user?.is_admin) return found;

  // The sub-device the segments hang off has plenty of enabled entities besides them, so the devices this
  // satellite is made of are the ones its own entities name.
  const devices = new Set(state.entities.map((e) => e.device_id));

  try {
    const all = await hass.callWS<RegistryEntry[]>({ type: "config/entity_registry/list" });

    for (const entry of all) {
      if (!entry.disabled_by || !entry.device_id || !devices.has(entry.device_id)) continue;

      // The number comes off the unique id, which is echod's, since a disabled entity has no entity id
      // worth trusting and may not have one at all.
      const { name, slot } = split(entry.unique_id);
      if (name !== "segment") continue;

      if (slot >= 1 && slot <= SEGMENTS) found[slot - 1] = entry.entity_id;
    }
  } catch {
    // Not an administrator, or the registry said no: then there is nothing to offer.
  }
  return found;
}

// Home Assistant creates the entity a moment later, so what the card does next is wait for it to turn up
// in its own hass rather than assume anything came back.
export async function enable(hass: HomeAssistant, entityId: string): Promise<void> {
  await hass.callWS({
    type: "config/entity_registry/update",
    entity_id: entityId,
    disabled_by: null,
  });
}
