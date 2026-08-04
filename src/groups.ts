// Groups are Home Assistant labels; nothing here stores them. Any label on a satellite is a group.

import { resolve, type Satellite } from "./satellite";
import type { HassDevice, HassLabel, HomeAssistant } from "./types";

// UNGROUPED is the absence of a label rather than one of them.
export const UNGROUPED = "";

export interface Group {
  id: string;
  name: string;
  icon?: string | null;
  devices: HassDevice[];
}

export async function labels(hass: HomeAssistant): Promise<HassLabel[]> {
  try {
    return (await hass.callWS<HassLabel[]>({ type: "config/label_registry/list" })) ?? [];
  } catch {
    return [];
  }
}

// group() arranges the satellites under the labels they carry, the ungrouped last so the named groups
// lead. A device in two labels appears in both, which is what a label means.
export function group(devices: HassDevice[], known: HassLabel[]): Group[] {
  const named = new Map<string, Group>();
  const loose: HassDevice[] = [];

  for (const device of devices) {
    const mine = device.labels ?? [];
    if (!mine.length) {
      loose.push(device);
      continue;
    }

    for (const id of mine) {
      const label = known.find((entry) => entry.label_id === id);
      const already = named.get(id);

      if (already) already.devices.push(device);
      else named.set(id, { id, name: label?.name ?? id, icon: label?.icon, devices: [device] });
    }
  }

  const out = [...named.values()].sort((a, b) => a.name.localeCompare(b.name));
  if (loose.length) out.push({ id: UNGROUPED, name: "Ungrouped", devices: loose });

  return out;
}

export async function createLabel(hass: HomeAssistant, name: string): Promise<HassLabel | null> {
  try {
    return await hass.callWS<HassLabel>({ type: "config/label_registry/create", name });
  } catch {
    return null;
  }
}

export async function renameLabel(hass: HomeAssistant, id: string, name: string): Promise<void> {
  await hass.callWS({ type: "config/label_registry/update", label_id: id, name });
}

export async function deleteLabel(hass: HomeAssistant, id: string): Promise<void> {
  await hass.callWS({ type: "config/label_registry/delete", label_id: id });
}

// Labels are a set on the device, so joining and leaving is a whole-set write. Read from the registry
// rather than from what a widget last drew, or two quick clicks lose one of them.
export async function setLabels(
  hass: HomeAssistant,
  deviceId: string,
  wanted: string[]
): Promise<void> {
  await hass.callWS({
    type: "config/device_registry/update",
    device_id: deviceId,
    labels: [...new Set(wanted)],
  });
}

export async function join(hass: HomeAssistant, device: HassDevice, id: string): Promise<void> {
  await setLabels(hass, device.id, [...(device.labels ?? []), id]);
}

export async function leave(hass: HomeAssistant, device: HassDevice, id: string): Promise<void> {
  await setLabels(hass, device.id, (device.labels ?? []).filter((label) => label !== id));
}

// Writes to every member; there is no group entity. Failures are counted, not thrown, so one
// unreachable device does not stop the rest of the room from changing.
export async function fanOut(
  hass: HomeAssistant,
  devices: HassDevice[],
  name: string,
  write: (entityId: string) => Promise<unknown>
): Promise<{ done: number; failed: number; missing: number }> {
  let done = 0;
  let failed = 0;
  let missing = 0;

  await Promise.all(
    devices.map(async (device) => {
      const found = entityOf(hass, device, name);
      if (!found) {
        missing += 1;
        return;
      }

      try {
        await write(found);
        done += 1;
      } catch {
        failed += 1;
      }
    })
  );

  return { done, failed, missing };
}

// What a group shows for a setting its members might disagree about: the value when they agree, null
// when they do not.
export function reading(
  hass: HomeAssistant,
  devices: HassDevice[],
  name: string
): { value: string | null; mixed: boolean; entities: string[] } {
  const entities = devices
    .map((device) => entityOf(hass, device, name))
    .filter((id): id is string => !!id);

  const values = [...new Set(entities.map((id) => hass.states[id]?.state).filter(Boolean))];

  return { value: values.length === 1 ? values[0] : null, mixed: values.length > 1, entities };
}

// A satellite's settings hang off its sub-devices, not off the device the card names, so finding one
// means gathering the tree the same way the card does.
function entityOf(hass: HomeAssistant, device: HassDevice, name: string): string | undefined {
  const state: Satellite | null = resolve(hass, device.id);
  return state?.by.get(name)?.[0]?.entity_id;
}
