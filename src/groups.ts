// Groups are Home Assistant labels; nothing here stores them. Any label on a satellite is a group.

import { resolve, type Satellite } from "./satellite";
import type { HassDevice, HassLabel, HomeAssistant } from "./types";

// UNGROUPED is the absence of a label rather than one of them.
export const UNGROUPED = "";

// The reserved label: its presence on a device means the device keeps its own settings and the Fleet
// tab writes past it. Identified by name and created by the first switch to Local — renaming it in
// Home Assistant's own Settings breaks the pill, which then makes a new one instead. It is a flag on
// the device, not a group anybody joined, so every list of groups below drops it.
export const LOCAL_LABEL = "Local config";

// Said when the reserved label's id arrives or changes, so a card can redraw its pill without waiting
// for the next state change.
export const LOCAL_READY = "echolocal-local";

let cached: string | null = null;
let pending: Promise<string | null> | null = null;
let making: Promise<string> | null = null;
let started = false;

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

// The id of the reserved label, or null while it is unknown or does not exist yet — a label only
// comes into being on the first switch to Local. Answered on first use and followed afterwards, so a
// label made in another tab or another browser is seen without a reload.
export function localLabel(hass: HomeAssistant): string | null {
  watch(hass);
  return cached;
}

function watch(hass: HomeAssistant): void {
  if (started) return;
  started = true;

  fetch(hass);
  hass.connection
    ?.subscribeEvents(() => fetch(hass), "label_registry_updated")
    .catch(() => {});
}

function fetch(hass: HomeAssistant): Promise<string | null> {
  pending ??= labels(hass)
    .then((all) => {
      const found = all.find((one) => one.name === LOCAL_LABEL)?.label_id ?? null;
      if (found !== cached) {
        cached = found;
        window.dispatchEvent(new Event(LOCAL_READY));
      }
      return cached;
    })
    .finally(() => (pending = null));
  return pending;
}

// Whether this device keeps its own settings. The lookup is started here too, so the first render of
// a card — before anybody asked for the label — already gets an answer coming.
export function isLocal(hass: HomeAssistant, device: HassDevice): boolean {
  watch(hass);
  return !!cached && (device.labels ?? []).includes(cached);
}

// Switch one device between keeping its own settings and following the fleet. The label is read fresh
// from the registry first, so an existing one is found rather than made twice; only a fresh miss
// creates it, and switching back never deletes it — the other Local devices still wear it.
export async function setLocal(
  hass: HomeAssistant,
  device: HassDevice,
  local: boolean
): Promise<void> {
  watch(hass);

  const current = hass.devices?.[device.id] ?? device;
  const mine = new Set(current.labels ?? []);

  if (local) {
    const id = (await fetch(hass)) ?? (await (making ??= make(hass)));
    mine.add(id);
  } else {
    const id = await fetch(hass);
    if (id) mine.delete(id);
  }

  await setLabels(hass, device.id, [...mine]);
}

async function make(hass: HomeAssistant): Promise<string> {
  try {
    const made = await createLabel(hass, LOCAL_LABEL);
    if (!made) throw new Error("Home Assistant did not create the label");

    if (made.label_id !== cached) {
      cached = made.label_id;
      window.dispatchEvent(new Event(LOCAL_READY));
    }
    return made.label_id;
  } finally {
    making = null;
  }
}

// group() arranges the satellites under the labels they carry, the ungrouped last so the named groups
// lead. A device in two labels appears in both, which is what a label means.
export function group(devices: HassDevice[], known: HassLabel[]): Group[] {
  // The reserved label marks how a device is configured, not where it lives: it never makes a group,
  // and a device wearing only it is simply ungrouped. The cached id covers the moment before the
  // caller's list has caught up with a label the pill just made.
  const reserved = new Set(
    known.filter((one) => one.name === LOCAL_LABEL).map((one) => one.label_id)
  );
  if (cached) reserved.add(cached);

  const named = new Map<string, Group>();
  const loose: HassDevice[] = [];

  for (const device of devices) {
    const mine = (device.labels ?? []).filter((id) => !reserved.has(id));
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
