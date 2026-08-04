// What a turn looks like on the wire. A specification: echod does not send these yet.
//
// Two channels, with different limits:
//
//   the event   HomeassistantActionRequest with is_event. Its data is HomeassistantServiceMap, so keys
//               and values are strings, flat, no nesting — every number arrives as text.
//   the action  a user-defined action answering with ExecuteServiceResponse.response_data, which Home
//               Assistant json-decodes into an object. Any shape, so long as it is an object.

export const TURN_EVENT = "echolocal_turn";

// The actions, named as echod will advertise them. Home Assistant prefixes the device: calling one is
// esphome.<device>_<action>.
export const TURNS_ACTION = "recent_turns";
export const AUDIO_ACTION = "turn_audio";
export const MODEL_ACTION = "install_wake_model";

// Raw bytes per page. The encrypted transport caps a message at 65515 bytes (16-bit length, less a
// 4-byte header and a 16-byte tag), and base64 costs a third again: 32 KiB encodes to about 43.7 KiB.
export const PAGE = 32 * 1024;

export interface Turn {
  // Bumped when a field changes meaning. A version we do not know is ignored rather than guessed at.
  version: 1;

  // Which device, by the same mac the esphome integration keys its devices on, so a card can tell its
  // own device's turns from the rest of the house.
  mac: string;

  // Identifies this turn for as long as the device is holding it, which is what asks for its audio.
  id: string;

  slot: number;
  wake_word: string;
  heard?: string;
  reply?: string;

  outcome: "completed" | "cancelled" | "timeout" | "failed";

  // Durations rather than clock times: the device may have no set clock, and a wall clock nobody set is
  // worse than none. Milliseconds.
  wake_ms?: number;
  listen_ms?: number;
  think_ms?: number;
  speak_ms?: number;

  // Flat for the same reason the phases are: how long the recording runs, and whether the device still
  // has it. Absent seconds means there is nothing to play.
  audio_seconds?: number;

  // What the room measured while it was talking, which is what the arbitration question in #25 needs.
  peak_db?: number;
  floor_db?: number;
}

// The reply to recent_turns. An object rather than a bare array because json_loads_object demands one.
export interface Turns {
  version: 1;
  turns: Turn[];
}

// The reply to turn_audio(id, page). data is base64; pages is the whole count, so a caller knows when to
// stop without a second round trip.
export interface Audio {
  version: 1;
  id: string;
  page: number;
  pages: number;
  mime: string;
  data: string;
}

export interface Phase {
  key: string;
  label: string;
  ms: number;
}

// PHASES is the order a turn happens in, and the order the bar draws them.
export const PHASES: { key: keyof Turn; label: string }[] = [
  { key: "wake_ms", label: "Wake" },
  { key: "listen_ms", label: "Listen" },
  { key: "think_ms", label: "Think" },
  { key: "speak_ms", label: "Reply" },
];

export function phases(turn: Turn): Phase[] {
  return PHASES.map(({ key, label }) => ({ key, label, ms: Number(turn[key] ?? 0) })).filter(
    (phase) => phase.ms > 0
  );
}

export function total(turn: Turn): number {
  return phases(turn).reduce((sum, phase) => sum + phase.ms, 0);
}

// Everything in an event's data is a string, so the numbers are parsed back here rather than at every
// use. A field that will not parse is dropped instead of becoming NaN.
export function fromEvent(data: unknown): Turn | null {
  const raw = data as Record<string, string> | null;
  if (!raw || raw.version !== "1" || !raw.wake_word) return null;

  const turn: Turn = {
    version: 1,
    // Lower case, because that is how Home Assistant normalises a mac in its device registry and matching
    // one against the other is the only thing this field is for.
    mac: (raw.mac ?? "").toLowerCase(),
    id: raw.id ?? "",
    slot: number(raw.slot) ?? 1,
    wake_word: raw.wake_word,
    outcome: (raw.outcome as Turn["outcome"]) ?? "completed",
  };

  if (raw.heard) turn.heard = raw.heard;
  if (raw.reply) turn.reply = raw.reply;

  for (const key of ["wake_ms", "listen_ms", "think_ms", "speak_ms", "audio_seconds", "peak_db", "floor_db"] as const) {
    const value = number(raw[key]);
    if (value !== undefined) turn[key] = value;
  }
  return turn;
}

// The action's reply is already JSON, so it needs checking rather than parsing.
export function fromAction(reply: unknown): Turn[] {
  const answer = reply as Turns | null;
  if (!answer || answer.version !== 1 || !Array.isArray(answer.turns)) return [];

  return answer.turns.filter((turn) => turn?.version === 1 && typeof turn.wake_word === "string");
}

function number(value: string | undefined): number | undefined {
  if (value === undefined || value === "") return undefined;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}
