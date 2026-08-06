// The twelve ring segments ship disabled, so Home Assistant never creates them and the display registry
// a card sees does not carry them at all. The integration reports them anyway, so finding them costs
// nothing; only switching one on is an administrator's call.

import { keys } from "./keys";
import { SEGMENTS, type Satellite } from "./satellite";
import type { HomeAssistant } from "./types";

// Indexed by segment number the same way the enabled ones are, so segment seven is looked up at six
// whether it exists yet or not.
export function disabledSegments(
  hass: HomeAssistant,
  state: Satellite
): (string | undefined)[] {
  const found: (string | undefined)[] = new Array(SEGMENTS).fill(undefined);

  const known = keys(hass);
  if (!known) return found;

  // The sub-device the segments hang off has plenty of enabled entities besides them, so the devices this
  // satellite is made of are the ones its own entities name.
  const devices = new Set(state.entities.map((e) => e.device_id));

  for (const entry of known.values()) {
    if (!entry.disabled || entry.name !== "segment") continue;
    if (!devices.has(entry.deviceId)) continue;

    if (entry.slot >= 1 && entry.slot <= SEGMENTS) found[entry.slot - 1] = entry.entityId;
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
