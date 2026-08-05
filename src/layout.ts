// What each popup shows, in what order, and what each row is called.
//
// The card names its rows: every name in Home Assistant belongs to the user, so a device renamed "dr gen"
// with a sub-device called "dmic" still has to read the same here. The left of each pair is echod's own
// name for the thing, and the list is also what a popup contains — nothing is discovered.

import { index, type Index, type Tagged } from "./keys";
import type { Satellite } from "./satellite";
import type { Kind, Row, Section } from "./types";

interface Group {
  title: string | null;

  // echod's name, what the card calls it, and optionally a second name whose value shows on the same tile.
  rows: ([string, string] | [string, string, string])[];
}

const LAYOUTS: Partial<Record<Kind, Group[]>> = {
  ring: [
    { title: null, rows: [["ring", "Ring"]] },
    { title: "Segments", rows: [["segment", "Segment"]] },
  ],

  microphone: [
    { title: null, rows: [["mic_mute", "Mute"]] },
    {
      title: "Capture",
      rows: [
        ["microphone_gain", "Gain"],
        ["microphone_mixing", "Mixing"],
        ["microphone_leveling", "Leveling"],
        ["microphone_cancel_echo", "Echo cancellation"],
      ],
    },
    {
      title: "The room",
      rows: [
        ["microphone_sensitivity", "Sensitivity"],
        ["room_level", "Room level"],
        ["room_floor", "Room floor"],
        ["stop_word_sensitivity", "Stop word"],
        ["vad_sensitivity", "End of speech"],
      ],
    },
    { title: "Indicator", rows: [["mute_led_brightness", "Mute light"]] },
  ],

  playback: [
    { title: null, rows: [["headphones", "Headphones"]] },
    { title: "Generated sound", rows: [["noise_layer", "Layer"]] },
    {
      title: "During a turn",
      rows: [
        ["media_on_turn", "Music"],
        ["media_duck_level", "Ducking"],
      ],
    },
    { title: "Voice", rows: [["voice_resampling", "Resampling"]] },
  ],

  // The wake word and pipeline selects are Home Assistant's own and sit on the device rather than on the
  // assistant's sub-device, but they are per assistant, so this is where they belong.
  assistant: [
    {
      title: null,
      rows: [
        ["wake_word", "Wake word"],
        ["pipeline", "Pipeline"],
        ["wake_threshold", "Wake sensitivity"],
      ],
    },
    {
      title: "Timing",
      rows: [
        ["max_listen", "Max listen"],
        ["max_think", "Max think"],
        ["follow_up", "Follow up"],
      ],
    },
    {
      title: "Feedback",
      rows: [
        ["wake_effect", "Ring effect"],
        ["wake_tone", "Chime"],
      ],
    },
    {
      title: "Reply",
      rows: [
        ["reply_buffer", "Buffer"],
        ["reply_delivery", "Delivery"],
      ],
    },
  ],

  device: [
    {
      title: null,
      rows: [
        ["firmware", "Firmware"],
        ["update_channel", "Update channel"],
        ["check_for_updates", "Check for updates"],
      ],
    },
    { title: "Bluetooth", rows: [["bluetooth_proxy", "Proxy enabled"]] },
    {
      title: "Maintenance",
      rows: [
        ["metrics_interval", "Metrics interval"],
        ["purge_cache", "Purge cache", "cached_data"],
        ["test_playback", "Test playback"],
        ["remote_adb", "Remote adb"],
      ],
    },
  ],

  diagnostics: [
    {
      title: "Network",
      rows: [
        ["ip_address", "IP address"],
        ["wifi_signal", "Signal"],
        ["wifi_sent", "Sent"],
        ["wifi_received", "Received"],
        ["ble_advertisements", "Bluetooth advertisements"],
      ],
    },
    {
      title: "Hardware",
      rows: [
        ["cpu_temperature", "CPU"],
        ["radio_temperature", "Radio"],
        ["cpu_cores", "Cores"],
        ["cpu_cores_online", "Cores online"],
        ["load_average", "Load"],
        ["memory_available", "Memory"],
        ["free_space", "Disk"],
      ],
    },
    {
      title: "The room",
      rows: [
        ["room_level", "Room level"],
        ["room_floor", "Room floor"],
      ],
    },
    {
      title: "Updates",
      rows: [
        ["update_status", "Update status"],
        ["update_outcome", "Last update"],
      ],
    },
  ],
};

// A widget is several entities handed to one purpose-built control, and not listed again below it. Every
// role must resolve or the widget is skipped and its entities fall back to ordinary rows.
const WIDGETS: Partial<Record<Kind, Spec[]>> = {
  ring: [
    { widget: "power", place: "header", roles: { light: "ring" } },

    // The segments are claimed so they do not each become a row: they are edited on the card, on the
    // artwork, twelve rows being no way to color a ring.
    {
      widget: "appearance",
      roles: { light: "ring" },
      lists: {
        segments: "segment",
        muted: "ring_muted",
        failure: "failure_effect",
        room: "room_reaction",
      },
    },
  ],

  // The speaker belongs to the device, not to the playback sub-device, so these are composed against the
  // whole tree rather than one component's entities.
  playback: [
    { widget: "player", place: "header", roles: { player: "speaker" } },
    { widget: "volume", roles: { player: "speaker" }, lists: { jack: "headphones" } },
    { widget: "noise", roles: { first: "noise_layer" }, lists: { layers: "noise_layer" } },
  ],

  microphone: [
    // The mute is what the microphone is, so it sits in the popup's header with its indicator rather
    // than taking a row below it. The header has the room for it.
    { widget: "mute", place: "header", roles: { mute: "mic_mute", lamp: "mute_led_brightness" } },
    {
      widget: "array",
      roles: {
        level: "room_level",
        floor: "room_floor",
        gate: "microphone_sensitivity",
        mode: "microphone_mixing",
      },
    },
  ],
};

interface Spec {
  widget: Widget["widget"];
  place?: "header" | "body";
  roles: Record<string, string>;

  // lists take every slot rather than the first, for a widget over a set — the twelve ring segments. An
  // empty list is allowed: the segments ship disabled, so most devices have none.
  lists?: Record<string, string>;
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
    | "history";
  place?: "header" | "body";
  roles: Record<string, string>;
  lists: Record<string, string[]>;
}

export interface Composed {
  widgets: Widget[];
  sections: Section[];
}

// Which components a device has, and the name that proves each one. A square per component rather than
// per sub-device: how echod groups its entities in Home Assistant is not the card's business.
const PROOF: [Kind, string][] = [
  ["ring", "ring"],
  ["microphone", "mic_mute"],
  ["playback", "speaker"],
];

export interface Component {
  kind: Kind;

  // Which assistant, for the several a device can run. Zero for the components it has one of.
  slot: number;
}

export function components(state: Satellite): Component[] {
  const found: Component[] = PROOF.filter(([, name]) => state.by.has(name)).map(([kind]) => ({
    kind,
    slot: 0,
  }));

  for (const one of state.by.get("wake_threshold") ?? []) {
    found.push({ kind: "assistant", slot: one.slot });
  }
  return found;
}

// Every row is looked up against the whole device. An assistant's popup passes its slot, and then every
// row in it is that assistant's — the second one's timings never show up under the first.
export function compose(kind: Kind, state: Satellite, slot = 0): Composed {
  const widgets: Widget[] = [];
  const taken = new Set<string>();

  // Looked up against everything, not against what is left: the ring's light belongs to both the header
  // switch and the picture of the ring. taken only decides what no longer needs a row.
  for (const spec of WIDGETS[kind] ?? []) {
    const roles: Record<string, string> = {};

    for (const [role, name] of Object.entries(spec.roles)) {
      const found = pick(state.by, name, slot)[0];
      if (found) roles[role] = found.entity_id;
    }

    if (Object.keys(roles).length !== Object.keys(spec.roles).length) continue;

    const lists: Record<string, string[]> = {};
    for (const [list, name] of Object.entries(spec.lists ?? {})) {
      lists[list] = pick(state.by, name, slot).map((e) => e.entity_id);
    }

    widgets.push({ widget: spec.widget, place: spec.place ?? "body", roles, lists });
    [...Object.values(roles), ...Object.values(lists).flat()].forEach((id) => taken.add(id));
  }

  return { widgets, sections: order(LAYOUTS[kind] ?? [], state.by, slot, taken) };
}

// A setting is something there is something to set. A reading belongs to diagnostics and an event to the
// activity it reports; echod's own categories disagree about which is which, so the domain decides.
const SETTABLE = new Set(["switch", "select", "number", "button", "text", "time", "update"]);

// The device's own settings. A sub-device's belong to that component's popup, so this stays on the
// entities the device itself declares — everything else would be the same rows a second time.
export function settings(state: Satellite): Section[] {
  return withRest(
    LAYOUTS.device ?? [],
    state.entities.filter(
      (e) => e.device_id === state.device.id && SETTABLE.has(e.entity_id.split(".")[0])
    ),
    new Set()
  );
}

// Grouped by subject across the whole device, not by which sub-device a reading hangs off. The three
// last-heard sensors become one history, whose first row is what they each show anyway.
export function diagnostics(state: Satellite): Composed {
  const mine = state.entities.filter((e) => e.entity_category === "diagnostic");

  const by = index(mine);
  const roles: Record<string, string> = {};

  for (const [role, name] of Object.entries({
    wake: "last_wake_word",
    heard: "last_heard",
    reply: "last_reply",
  })) {
    const found = by.get(name)?.[0];
    if (found) roles[role] = found.entity_id;
  }

  const widgets: Widget[] = roles.wake
    ? [{ widget: "history", place: "body", roles, lists: {} }]
    : [];

  return {
    widgets,
    sections: withRest(LAYOUTS.diagnostics ?? [], mine, new Set(Object.values(roles))),
  };
}

// Home Assistant numbers its own pair wake_word and wake_word_2, so the first assistant's is slot 0 where
// echod's are 1 and 2. An unnumbered one is the first of whatever it is.
function pick(by: Index, name: string, slot: number): Tagged[] {
  const found = by.get(name) ?? [];
  return slot ? found.filter((e) => (e.slot || 1) === slot) : found;
}

// Where a name has several and the popup did not ask for one — the twelve segments, the two noise layers —
// each becomes a row with its slot on the end of the label.
function order(groups: Group[], by: Index, slot: number, taken: Set<string>): Section[] {
  const out: Section[] = [];

  for (const group of groups) {
    const rows: Row[] = [];

    for (const [name, label, beside] of group.rows) {
      const mine = pick(by, name, slot);

      for (const entity of mine) {
        if (taken.has(entity.entity_id)) continue;
        rows.push({
          entityId: entity.entity_id,
          name,
          label: mine.length > 1 ? `${label} ${entity.slot}` : label,
          reading: beside ? pick(by, beside, slot)[0]?.entity_id : undefined,
        });
      }
    }
    if (rows.length) out.push({ title: group.title, rows });
  }
  return out;
}

// Every name any popup names, companions included. What is left over is what no layout mentions at all,
// which is the only thing a leftovers bucket should hold: everything else already has a home, and showing
// it twice is how Settings and Diagnostics ended up repeating each other.
const NAMED = new Set(
  Object.values(LAYOUTS).flatMap((groups) =>
    (groups ?? []).flatMap((group) =>
      group.rows.flatMap(([name, , beside]) => (beside ? [name, beside] : [name]))
    )
  )
);

// The two popups that stand for a whole device rather than one of its components, where a name the card
// does not know still has to be reachable. Everywhere else an unlisted entity is deliberately not shown.
function withRest(groups: Group[], entities: Tagged[], taken: Set<string>): Section[] {
  const out = order(groups, index(entities), 0, taken);
  const shown = new Set(
    out.flatMap((s) => s.rows.flatMap((r) => [r.entityId, r.reading ?? ""]))
  );

  const rest = entities.filter(
    (e) => !shown.has(e.entity_id) && !taken.has(e.entity_id) && !NAMED.has(e.name)
  );
  if (!rest.length) return out;

  return [
    ...out,
    {
      title: out.length ? "More" : null,
      rows: rest
        .map((e) => ({ entityId: e.entity_id, name: e.name, label: e.name || e.entity_id }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    },
  ];
}
