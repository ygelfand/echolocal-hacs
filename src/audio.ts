// Pulling a recording off a device in pages, because the noise frame's 16-bit length caps a protobuf
// message at 64 KiB and base64 costs a third again.

import type { Audio } from "./contract";
import type { HomeAssistant } from "./types";

// A recording is seconds long, not minutes. Anything asking for more pages than this is a device
// answering wrongly, and the loop should end rather than run forever.
const MOST = 64;

const held = new Map<string, string>();

export function cached(id: string): string | undefined {
  return held.get(id);
}

// The esphome integration names an action <node>_<action>. Slugging the device name usually gives the
// node, but it is a guess, so it is checked against the registered services.
export function actionOf(
  hass: HomeAssistant,
  deviceName: string,
  action: string
): string | undefined {
  const node = deviceName.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  const name = `${node}_${action}`;

  return hass?.services?.esphome?.[name] ? name : undefined;
}

// A blob URL for the whole recording, or null. Kept, so replaying then saving costs one transfer.
// action is the fully qualified esphome service name, from actionOf.
export async function fetchTurnAudio(
  hass: HomeAssistant,
  action: string,
  id: string
): Promise<string | null> {
  const already = held.get(id);
  if (already) return already;

  const parts: Uint8Array[] = [];
  let mime = "audio/wav";
  let pages = 1;

  for (let page = 0; page < Math.min(pages, MOST); page++) {
    const answer = await call(hass, action, id, page);
    if (!answer) return null;

    pages = answer.pages || 1;
    mime = answer.mime || mime;
    parts.push(bytes(answer.data));
  }

  const url = URL.createObjectURL(new Blob(parts as BlobPart[], { type: mime }));
  held.set(id, url);
  return url;
}

async function call(
  hass: HomeAssistant,
  action: string,
  id: string,
  page: number
): Promise<Audio | null> {
  try {
    // The trailing true is returnResponse, which is what makes Home Assistant wait for the device's
    // answer instead of firing the action and forgetting it.
    const reply = await hass.callService("esphome", action, { id, page }, undefined, true, true);

    const answer = reply?.response as Audio | undefined;
    return answer?.version === 1 && typeof answer.data === "string" ? answer : null;
  } catch {
    return null;
  }
}

function bytes(base64: string): Uint8Array {
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);

  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}
