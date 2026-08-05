// Turns out of the logbook, past and live on one subscription.
//
// The recorder keeps every event a device fires, so the past is already there — what makes it readable is
// the describer the integration registers, which returns the turn's own fields alongside the sentence.
// Without the integration there is nothing to read, which is the point: the device needs none of this.

import { TURN_EVENT, fromEvent, type Turn } from "./contract";
import type { HomeAssistant } from "./types";

// when is seconds, as the logbook counts time.
interface Entry {
  when: number;
  [key: string]: unknown;
}

interface Message {
  events?: Entry[];
}

export interface Heard {
  at: number;
  turn: Turn;
}

// streamTurns answers with what the recorder holds, then keeps reporting. devices narrows it to those
// devices; empty means every device Home Assistant knows, which is what the whole-house view wants.
export function streamTurns(
  hass: HomeAssistant,
  since: Date,
  devices: string[],
  found: (turns: Heard[]) => void
): Promise<() => void> {
  if (!hass.connection) return Promise.resolve(() => {});

  const request: Record<string, unknown> = {
    type: "logbook/event_stream",
    start_time: since.toISOString(),
  };
  if (devices.length) request.device_ids = devices;

  return hass.connection.subscribeMessage<Message>((message) => {
    const turns: Heard[] = [];

    for (const entry of message.events ?? []) {
      const turn = fromEvent(entry);
      if (turn) turns.push({ at: entry.when * 1000, turn });
    }
    if (turns.length) found(turns);
  }, request);
}

// The event type, for anything that wants to say what it is listening to.
export { TURN_EVENT };
