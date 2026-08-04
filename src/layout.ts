// What each popup shows, and in what order.
//
// Rows are matched on the tail of the entity id, and the match only decides position. Anything a layout
// does not claim is listed after it under More, so a component this firmware does not have is fewer
// rows, and a renamed entity moves down rather than vanishing.

import { deviceName, type Satellite } from "./satellite";
import type { HassDevice, HassEntity, Kind, Section } from "./types";

interface Group {
  title: string | null;
  rows: RegExp[];
}

const LAYOUTS: Partial<Record<Kind, Group[]>> = {
  ring: [{ title: null, rows: [/_led_ring$/] }, { title: "Segments", rows: [/_led_ring_segment_\d+$/] }],

  microphone: [
    { title: null, rows: [/_microphone_mute$/] },
    {
      title: "Capture",
      rows: [
        /_microphone_gain$/,
        /_microphone_mixing$/,
        /_microphone_leveling$/,
        /_microphone_echo_cancellation$/,
      ],
    },
    { title: "The room", rows: [/_room_sensitivity$/, /_room_level$/, /_room_floor$/] },
    { title: "Indicator", rows: [/_mute_led_brightness$/] },
  ],

  playback: [
    { title: null, rows: [/^media_player\./, /_headphones$/] },
    { title: "Generated sound", rows: [/_white_noise_layer_\d+$/] },
    { title: "During a turn", rows: [/_music_during_a_turn$/, /_music_ducking$/] },
    { title: "Voice", rows: [/_voice_resampling$/] },
  ],

  assistant: [
    { title: null, rows: [/_wake_word/, /_sensitivity/, /_threshold/] },
    { title: "Timing", rows: [/_follow_up/] },
    { title: "Feedback", rows: [/_effect/, /_tone/] },
    { title: "Reply", rows: [/_reply_buffer/, /_reply_delivery/] },
  ],

  device: [
    {
      title: null,
      rows: [/^update\./, /_update_channel$/, /_check_for_updates$/, /_update_status$/],
    },
    { title: "Bluetooth", rows: [/_bluetooth_proxy$/, /_ble_advertisements$/] },
    {
      title: "Maintenance",
      rows: [/_metrics_interval$/, /_purge_cache$/, /_cached_data$/, /_test_playback$/],
    },
  ],

  diagnostics: [
    { title: "Network", rows: [/_ip_address$/, /_wifi_signal$/, /_wifi_sent$/, /_wifi_received$/] },
    {
      title: "Hardware",
      rows: [
        /_cpu_temperature$/,
        /_radio_temperature$/,
        /_cpu_cores/,
        /_load_average$/,
        /_memory_available$/,
        /_free_space$/,
      ],
    },
    { title: "The room", rows: [/_room_level$/, /_room_floor$/] },
    { title: "Last turn", rows: [/_last_wake_word$/, /_last_heard$/, /_last_reply$/] },
    { title: "Access", rows: [/_remote_adb$/, /_update_outcome$/] },
  ],
};

// Several entities handed to one purpose-built control, and not listed again below it. Every role must
// resolve or the widget is skipped and its entities fall back to ordinary rows.
const WIDGETS: Partial<Record<Kind, Spec[]>> = {
  ring: [
    { widget: "power", place: "header", roles: { light: /_led_ring$/ } },

    // The segments are claimed so they do not each become a row: they are edited on the card, on the
    // artwork, twelve rows being no way to color a ring.
    {
      widget: "appearance",
      roles: { light: /_led_ring$/ },
      lists: {
        segments: /_led_ring_segment_\d+$/,
        muted: /_ring_while_muted$/,
        failure: /_ring_on_failure$/,
        room: /_ring_follows_the_room$/,
      },
    },
  ],

  assistant: [{ widget: "turn", roles: { listen: /_max_listen/, think: /_max_think/ } }],

  playback: [
    { widget: "player", place: "header", roles: { player: /^media_player\./ } },
    { widget: "volume", roles: { player: /^media_player\./ }, lists: { jack: /_headphones$/ } },
    {
      widget: "noise",
      roles: { first: /_white_noise_layer_1$/ },
      lists: { layers: /_white_noise_layer_\d+$/ },
    },
  ],

  microphone: [
    // The mute is what the microphone is, so it sits in the popup's header with its indicator rather
    // than taking a row below it. The header has the room for it.
    {
      widget: "mute",
      place: "header",
      roles: { mute: /_microphone_mute$/, lamp: /_mute_led_brightness$/ },
    },
    {
      widget: "array",
      roles: {
        level: /_room_level$/,
        floor: /_room_floor$/,
        gate: /_room_sensitivity$/,
        mode: /_microphone_mixing$/,
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

export function compose(kind: Kind, entities: HassEntity[]): Composed {
  const ids = entities.map((e) => e.entity_id);
  const widgets: Widget[] = [];
  const taken = new Set<string>();

  // Matched against everything, not against what is left: the ring's light belongs to both the header
  // switch and the picture of the ring. taken only decides what no longer needs a row.
  for (const spec of WIDGETS[kind] ?? []) {
    const roles: Record<string, string> = {};

    for (const [role, pattern] of Object.entries(spec.roles)) {
      const found = ids.find((id) => pattern.test(id));
      if (found) roles[role] = found;
    }

    if (Object.keys(roles).length !== Object.keys(spec.roles).length) continue;

    const lists: Record<string, string[]> = {};
    for (const [name, pattern] of Object.entries(spec.lists ?? {})) {
      lists[name] = ids.filter((id) => pattern.test(id)).sort(byNumber);
    }

    widgets.push({ widget: spec.widget, place: spec.place ?? "body", roles, lists });
    [...Object.values(roles), ...Object.values(lists).flat()].forEach((id) => taken.add(id));
  }

  return {
    widgets,
    sections: order(
      LAYOUTS[kind],
      ids.filter((id) => !taken.has(id))
    ),
  };
}

export function sections(kind: Kind, entities: HassEntity[]): Section[] {
  return order(
    LAYOUTS[kind],
    entities.map((e) => e.entity_id)
  );
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
    const mine = state.entities
      .filter(
        (e) =>
          e.device_id === device.id &&
          (e.entity_category === "config" || (main && !e.entity_category))
      )
      .map((e) => e.entity_id);

    if (!mine.length) continue;

    const grouped = order(LAYOUTS[main ? "device" : kinds[device.id]], mine);
    out.push({ title: deviceName(device), entities: grouped.flatMap((g) => g.entities) });
  }
  return out;
}

// Grouped by subject across the whole device, not by which sub-device a reading hangs off. The three
// last-heard sensors become one history, whose first row is what they each show anyway.
export function diagnostics(state: Satellite): Composed {
  const ids = state.entities
    .filter((e) => e.entity_category === "diagnostic")
    .map((e) => e.entity_id);

  const roles: Record<string, string> = {};
  for (const [role, pattern] of Object.entries({
    wake: /_last_wake_word$/,
    heard: /_last_heard$/,
    reply: /_last_reply$/,
  })) {
    const found = ids.find((id) => pattern.test(id));
    if (found) roles[role] = found;
  }

  const widgets: Widget[] = roles.wake
    ? [{ widget: "history", place: "body", roles, lists: {} }]
    : [];

  const taken = new Set(Object.values(roles));
  return { widgets, sections: order(LAYOUTS.diagnostics, ids.filter((id) => !taken.has(id))) };
}

// byNumber keeps segment 2 before segment 10, which sorting as text does not.
function byNumber(a: string, b: string): number {
  const at = (id: string) => Number.parseInt(id.match(/_(\d+)$/)?.[1] ?? "0", 10);
  return at(a) - at(b);
}

// order walks a layout's patterns in turn, taking what each one claims, and puts whatever is left at the
// end so nothing is dropped.
function order(layout: Group[] | undefined, entityIds: string[]): Section[] {
  const left = new Set(entityIds);
  const out: Section[] = [];

  for (const group of layout ?? []) {
    const found: string[] = [];

    for (const pattern of group.rows) {
      for (const entityId of [...left].sort()) {
        if (pattern.test(entityId)) {
          found.push(entityId);
          left.delete(entityId);
        }
      }
    }
    if (found.length) out.push({ title: group.title, entities: found });
  }

  if (left.size) out.push({ title: out.length ? "More" : null, entities: [...left].sort() });
  return out;
}
