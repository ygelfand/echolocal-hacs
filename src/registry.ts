// The twelve ring segments ship disabled, so Home Assistant never creates them and the display registry
// a card sees does not carry them at all. Finding them means asking the entity registry itself, which is
// an administrator's call — anyone else gets no offer rather than an error.

import { KEY } from "./keys";
import { SEGMENTS } from "./satellite";
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
  devices: Set<string>
): Promise<(string | undefined)[]> {
  const found: (string | undefined)[] = new Array(SEGMENTS).fill(undefined);
  if (!hass.user?.is_admin) return found;

  try {
    const all = await hass.callWS<RegistryEntry[]>({ type: "config/entity_registry/list" });

    for (const entry of all) {
      if (!entry.disabled_by || !entry.device_id || !devices.has(entry.device_id)) continue;

      // The number comes off the unique id, which is echod's, since a disabled entity has no entity id
      // worth trusting and may not have one at all.
      const key = entry.unique_id.replace(/^(?:[0-9a-f]{2}:){5}[0-9a-f]{2}-?/i, "").split("@")[0];
      const at = Number(key.match(KEY.segment)?.[1] ?? 0) - 1;

      if (at >= 0 && at < SEGMENTS) found[at] = entry.entity_id;
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
