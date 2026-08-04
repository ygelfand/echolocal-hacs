// What each popup shows, and in what order.
//
// Rows are matched on the registry key, and the match only decides position. Anything a layout does not
// claim is listed after it under More, so a component this firmware does not have is fewer rows.

import { KEY, type Tagged } from "./keys";
import { deviceName, type Satellite } from "./satellite";
import type { HassDevice, Kind, Section } from "./types";

interface Group {
  title: string | null;
  rows: RegExp[];
}

const LAYOUTS: Partial<Record<Kind, Group[]>> = {
  ring: [{ title: null, rows: [KEY.ring] }, { title: "Segments", rows: [KEY.segment] }],

  microphone: [
    { title: null, rows: [KEY.mute] },
    { title: "Capture", rows: [KEY.gain, KEY.mixing, KEY.leveling, KEY.echo] },
    { title: "The room", rows: [KEY.sensitivity, KEY.roomLevel, KEY.roomFloor, KEY.stopWord] },
    { title: "Indicator", rows: [KEY.muteLamp] },
  ],

  playback: [
    { title: null, rows: [KEY.headphones] },
    { title: "Generated sound", rows: [KEY.noise] },
    { title: "During a turn", rows: [KEY.musicOnTurn, KEY.ducking] },
    { title: "Voice", rows: [KEY.resampling] },
  ],

  // The wake word select is Home Assistant's own and lives on the device, not here, so this is what an
  // assistant sub-device actually holds.
  assistant: [
    { title: null, rows: [KEY.threshold] },
    { title: "Timing", rows: [KEY.maxListen, KEY.maxThink, KEY.followUp] },
    { title: "Feedback", rows: [KEY.wakeEffect, KEY.wakeTone] },
    { title: "Reply", rows: [KEY.replyBuffer, KEY.replyDelivery] },
  ],

  device: [
    {
      title: null,
      rows: [KEY.firmware, KEY.wakeWord, KEY.pipeline, KEY.updateChannel, KEY.checkUpdates],
    },
    { title: "Listening", rows: [KEY.vad] },
    { title: "Bluetooth", rows: [KEY.bluetooth, KEY.advertisements] },
    { title: "Maintenance", rows: [KEY.metrics, KEY.purge, KEY.cached, KEY.testPlayback] },
  ],

  diagnostics: [
    { title: "Network", rows: [KEY.ip, KEY.wifiSignal, KEY.wifiSent, KEY.wifiReceived] },
    {
      title: "Hardware",
      rows: [
        KEY.cpuTemperature,
        KEY.radioTemperature,
        KEY.cores,
        KEY.load,
        KEY.memory,
        KEY.disk,
      ],
    },
    { title: "The room", rows: [KEY.roomLevel, KEY.roomFloor] },
    { title: "Last turn", rows: [KEY.lastWakeWord, KEY.lastHeard, KEY.lastReply] },
    { title: "Access", rows: [KEY.adb, KEY.updateStatus, KEY.updateOutcome] },
  ],
};

// Several entities handed to one purpose-built control, and not listed again below it. Every role must
// resolve or the widget is skipped and its entities fall back to ordinary rows.
const WIDGETS: Partial<Record<Kind, Spec[]>> = {
  ring: [
    { widget: "power", place: "header", roles: { light: KEY.ring } },

    // The segments are claimed so they do not each become a row: they are edited on the card, on the
    // artwork, twelve rows being no way to color a ring.
    {
      widget: "appearance",
      roles: { light: KEY.ring },
      lists: {
        segments: KEY.segment,
        muted: KEY.whileMuted,
        failure: KEY.onFailure,
        room: KEY.followsRoom,
      },
    },
  ],

  assistant: [{ widget: "turn", roles: { listen: KEY.maxListen, think: KEY.maxThink } }],

  // The speaker is the device's, not the playback sub-device's, so these two are composed against the
  // whole tree rather than one component's entities.
  playback: [
    { widget: "player", place: "header", roles: { player: KEY.player } },
    { widget: "volume", roles: { player: KEY.player }, lists: { jack: KEY.headphones } },
    { widget: "noise", roles: { first: KEY.noise }, lists: { layers: KEY.noise } },
  ],

  microphone: [
    // The mute is what the microphone is, so it sits in the popup's header with its indicator rather
    // than taking a row below it. The header has the room for it.
    { widget: "mute", place: "header", roles: { mute: KEY.mute, lamp: KEY.muteLamp } },
    {
      widget: "array",
      roles: {
        level: KEY.roomLevel,
        floor: KEY.roomFloor,
        gate: KEY.sensitivity,
        mode: KEY.mixing,
      },
    },
  ],
};

interface Spec {
  widget: Widget["widget"];
  place?: "header" | "body";
  roles: Record<string, RegExp>;

  // lists take every match rather than the first, for a widget over a set of entities — the twelve ring
  // segments. An empty list is allowed: the segments ship disabled, so most devices have none.
  lists?: Record<string, RegExp>;
}

export interface Widget {
  widget:
    | "mute"
    | "array"
    | "appearance"
    | "power"
    | "player"
    | "volume"
    | "noise"
    | "turn"
    | "history";
  place?: "header" | "body";
  roles: Record<string, string>;
  lists: Record<string, string[]>;
}

export interface Composed {
  widgets: Widget[];
  sections: Section[];
}

export function compose(kind: Kind, entities: Tagged[]): Composed {
  const widgets: Widget[] = [];
  const taken = new Set<string>();

  // Matched against everything, not against what is left: the ring's light belongs to both the header
  // switch and the picture of the ring. taken only decides what no longer needs a row.
  for (const spec of WIDGETS[kind] ?? []) {
    const roles: Record<string, string> = {};

    for (const [role, pattern] of Object.entries(spec.roles)) {
      const found = entities.find((e) => pattern.test(e.key));
      if (found) roles[role] = found.entity_id;
    }

    if (Object.keys(roles).length !== Object.keys(spec.roles).length) continue;

    const lists: Record<string, string[]> = {};
    for (const [name, pattern] of Object.entries(spec.lists ?? {})) {
      lists[name] = entities
        .filter((e) => pattern.test(e.key))
        .sort(byNumber)
        .map((e) => e.entity_id);
    }

    widgets.push({ widget: spec.widget, place: spec.place ?? "body", roles, lists });
    [...Object.values(roles), ...Object.values(lists).flat()].forEach((id) => taken.add(id));
  }

  return {
    widgets,
    sections: order(
      LAYOUTS[kind],
      entities.filter((e) => !taken.has(e.entity_id))
    ),
  };
}

export function sections(kind: Kind, entities: Tagged[]): Section[] {
  return order(LAYOUTS[kind], entities);
}

// Settings belong to a component, so they stay grouped by one, the device itself first and each part
// ordered by its own layout.
export function settings(state: Satellite, kinds: Record<string, Kind>): Section[] {
  const out: Section[] = [];
  const all: [HassDevice, boolean][] = [
    [state.device, true],
    ...state.parts.map((part): [HassDevice, boolean] => [part, false]),
  ];

  for (const [device, main] of all) {
    const mine = state.entities.filter(
      (e) =>
        e.device_id === device.id &&
        (e.entity_category === "config" || (main && !e.entity_category))
    );

    if (!mine.length) continue;

    const grouped = order(LAYOUTS[main ? "device" : kinds[device.id]], mine);
    out.push({ title: deviceName(device), entities: grouped.flatMap((g) => g.entities) });
  }
  return out;
}

// Grouped by subject across the whole device, not by which sub-device a reading hangs off. The three
// last-heard sensors become one history, whose first row is what they each show anyway.
export function diagnostics(state: Satellite): Composed {
  const mine = state.entities.filter((e) => e.entity_category === "diagnostic");

  const roles: Record<string, string> = {};
  for (const [role, pattern] of Object.entries({
    wake: KEY.lastWakeWord,
    heard: KEY.lastHeard,
    reply: KEY.lastReply,
  })) {
    const found = mine.find((e) => pattern.test(e.key));
    if (found) roles[role] = found.entity_id;
  }

  const widgets: Widget[] = roles.wake
    ? [{ widget: "history", place: "body", roles, lists: {} }]
    : [];

  const taken = new Set(Object.values(roles));
  return {
    widgets,
    sections: order(LAYOUTS.diagnostics, mine.filter((e) => !taken.has(e.entity_id))),
  };
}

// byNumber keeps segment 2 before segment 10, which sorting as text does not.
function byNumber(a: Tagged, b: Tagged): number {
  const at = (e: Tagged) => Number.parseInt(e.key.match(/_(\d+)$/)?.[1] ?? "0", 10);
  return at(a) - at(b);
}

// order walks a layout's patterns in turn, taking what each one claims, and puts whatever is left at the
// end so nothing is dropped.
function order(layout: Group[] | undefined, entities: Tagged[]): Section[] {
  const left = new Set(entities);
  const out: Section[] = [];

  for (const group of layout ?? []) {
    const found: string[] = [];

    for (const pattern of group.rows) {
      for (const entity of [...left].sort(byNumber)) {
        if (pattern.test(entity.key)) {
          found.push(entity.entity_id);
          left.delete(entity);
        }
      }
    }
    if (found.length) out.push({ title: group.title, entities: found });
  }

  if (left.size) {
    out.push({
      title: out.length ? "More" : null,
      entities: [...left].sort((a, b) => a.label.localeCompare(b.label)).map((e) => e.entity_id),
    });
  }
  return out;
}
