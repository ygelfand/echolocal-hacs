// What a turn looks like on the wire.
//
// Two channels, with different limits:
//
//   the event   HomeassistantActionRequest with is_event. Its data is HomeassistantServiceMap, so keys
//               and values are strings, flat, no nesting — every number arrives as text.
//   the action  a user-defined action answering with ExecuteServiceResponse.response_data, which Home
//               Assistant json-decodes into an object. Any shape, so long as it is an object.

// Home Assistant fires what the device asked for whole, domain included, so the event type carries the
// esphome prefix. It also adds the device id, which is how a turn says where it came from.
export const TURN_EVENT = "esphome.echolocal_turn";

// The actions, named as echod advertises them. Home Assistant prefixes the device: calling one is
// esphome.<device>_<action>.
export const AUDIO_ACTION = "turn_audio";
export const RECORDINGS_ACTION = "recordings";

export interface Turn {
  // Bumped when a field changes meaning. A version we do not know is ignored rather than guessed at.
  version: 1;

  // Which device, as Home Assistant's own registry id. The device never sends this: the esphome
  // integration adds it when it fires the event, which is why nothing on the wire has to identify itself.
  device: string;

  // Identifies this turn for as long as the device is holding it, which is what asks for its audio.
  id: string;

  slot: number;
  wake_word: string;
  heard?: string;
  reply?: string;

  outcome: "completed" | "cancelled" | "timeout" | "failed";

  // Durations rather than clock times: the device may have no set clock, and a wall clock nobody set is
  // worse than none. Milliseconds.
  listen_ms?: number;
  think_ms?: number;
  speak_ms?: number;

  // How long the recording ran. It says a recording was made, not that there still is one: the device
  // keeps only the last few, and a past event cannot change its mind. What is still held is answered by
  // the action that serves the audio, which is the only thing that knows — asking is what finds out, and
  // a turn whose recording has gone says so when asked.
  audio_seconds?: number;
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
    device: raw.device_id ?? "",
    id: raw.id ?? "",
    slot: number(raw.slot) ?? 1,
    wake_word: raw.wake_word,
    outcome: (raw.outcome as Turn["outcome"]) ?? "completed",
  };

  if (raw.heard) turn.heard = raw.heard;
  if (raw.reply) turn.reply = raw.reply;

  for (const key of ["listen_ms", "think_ms", "speak_ms", "audio_seconds"] as const) {
    const value = number(raw[key]);
    if (value !== undefined) turn[key] = value;
  }
  return turn;
}

function number(value: string | undefined): number | undefined {
  if (value === undefined || value === "") return undefined;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}
