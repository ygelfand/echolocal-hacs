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

// The ids a device still holds audio for, one lookup per device rather than one per row. Cached with a
// short life and shared while in flight, so a list of many turns from one device is a single call, and a
// device that never answers resolves to nothing held instead of holding the whole view up.
const INDEX_TTL = 60_000;
const INDEX_TIMEOUT = 6_000;

interface Held {
  at: number;
  ids: Set<string>;
}
const indexes = new Map<string, Held>();
const loading = new Map<string, Promise<Set<string>>>();

// action is the fully qualified esphome service name for the recordings index, from actionOf.
export function availableFor(hass: HomeAssistant, action: string): Promise<Set<string>> {
  const fresh = indexes.get(action);
  if (fresh && Date.now() - fresh.at < INDEX_TTL) return Promise.resolve(fresh.ids);

  const running = loading.get(action);
  if (running) return running;

  const run = withTimeout(loadIndex(hass, action), INDEX_TIMEOUT)
    .catch(() => new Set<string>())
    .then((ids) => {
      // The miss is cached too: a device that is offline should not be asked again on every render.
      indexes.set(action, { at: Date.now(), ids });
      return ids;
    })
    .finally(() => loading.delete(action));

  loading.set(action, run);
  return run;
}

async function loadIndex(hass: HomeAssistant, action: string): Promise<Set<string>> {
  const reply = await hass.callService("esphome", action, {}, undefined, true, true);
  const answer = reply?.response as { version?: number; ids?: string[] } | undefined;
  if (answer?.version === 1 && Array.isArray(answer.ids)) return new Set(answer.ids);
  return new Set();
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

// The esphome integration names an action <node>_<action>, where the node is what the device calls itself.
// That is the device entry's own name and never the one somebody renamed it to: a rename leaves the node,
// and so the action, exactly where it was. Confirmed against the registered services either way.
export function actionOf(hass: HomeAssistant, node: string, action: string): string | undefined {
  const slug = node
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

  const name = `${slug}_${action}`;
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
