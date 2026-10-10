import type { HomeAssistant } from "./types";

export const RATE = 48000;
export const LONGEST = 30;

export interface Tone {
  key: string;
  name: string;
  source: string;
  added: number;
  length: number;
  original: boolean;
}

export interface Processed {
  wav: Blob;
  seconds: number;
  cut: boolean;
  start: number;
  end: number;
}

export async function listTones(hass: HomeAssistant): Promise<Tone[]> {
  const answer = await hass.callWS<{ tones: Tone[] }>({ type: "echolocal/tones/list" });
  return answer.tones;
}

export function credentials(hass: HomeAssistant): Record<string, string> {
  const token = (hass as { auth?: { data?: { access_token?: string } } }).auth?.data?.access_token;
  return token ? { authorization: `Bearer ${token}` } : {};
}

export async function uploadTone(
  hass: HomeAssistant,
  name: string,
  original: File,
  processed: Processed,
  key = ""
): Promise<Tone> {
  const body = new FormData();
  body.append("name", name);
  if (key) body.append("key", key);
  body.append("start", String(processed.start));
  body.append("end", String(processed.end));
  body.append("original", original, original.name);
  body.append("tone", processed.wav, "tone.wav");

  const response = await fetch("/api/echolocal/tones", {
    method: "POST",
    body,
    headers: credentials(hass),
  });
  const answer = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(answer.error ?? "Home Assistant refused the tone.");
  return answer as Tone;
}

export async function toneAudio(hass: HomeAssistant, key: string): Promise<string> {
  const response = await fetch(`/api/echolocal/tones/${encodeURIComponent(key)}/tone`, {
    headers: credentials(hass),
  });
  if (!response.ok) throw new Error("Home Assistant did not send the tone.");
  return URL.createObjectURL(await response.blob());
}

export async function processTone(
  file: File,
  options: { trim: boolean; even: boolean }
): Promise<Processed> {
  const context = new AudioContext();
  let decoded: AudioBuffer;
  try {
    decoded = await context.decodeAudioData(await file.arrayBuffer());
  } catch {
    throw new Error("This browser cannot read that file as audio.");
  } finally {
    void context.close();
  }

  const frames = Math.ceil(decoded.duration * RATE);
  const offline = new OfflineAudioContext(1, Math.max(frames, 1), RATE);
  const source = offline.createBufferSource();
  source.buffer = decoded;
  source.connect(offline.destination);
  source.start();
  let samples = (await offline.startRendering()).getChannelData(0);

  let start = 0;
  let end = samples.length;
  if (options.trim) {
    const quiet = 0.003;
    while (start < end && Math.abs(samples[start]) < quiet) start++;
    while (end > start && Math.abs(samples[end - 1]) < quiet) end--;
  }
  const most = LONGEST * RATE;
  const cut = end - start > most;
  if (cut) end = start + most;
  samples = samples.slice(start, end);
  if (!samples.length) throw new Error("That file is silent.");

  if (options.even) {
    let peak = 0;
    for (const v of samples) peak = Math.max(peak, Math.abs(v));
    if (peak > 0) {
      const gain = 0.9 / peak;
      for (let i = 0; i < samples.length; i++) samples[i] *= gain;
    }
  }

  return {
    wav: wav(samples),
    seconds: samples.length / RATE,
    cut,
    start: start / RATE,
    end: end / RATE,
  };
}

function wav(samples: Float32Array): Blob {
  const data = samples.length * 2;
  const out = new DataView(new ArrayBuffer(44 + data));
  const text = (at: number, s: string) => {
    for (let i = 0; i < s.length; i++) out.setUint8(at + i, s.charCodeAt(i));
  };
  text(0, "RIFF");
  out.setUint32(4, 36 + data, true);
  text(8, "WAVE");
  text(12, "fmt ");
  out.setUint32(16, 16, true);
  out.setUint16(20, 1, true);
  out.setUint16(22, 1, true);
  out.setUint32(24, RATE, true);
  out.setUint32(28, RATE * 2, true);
  out.setUint16(32, 2, true);
  out.setUint16(34, 16, true);
  text(36, "data");
  out.setUint32(40, data, true);
  for (let i = 0; i < samples.length; i++) {
    const v = Math.max(-1, Math.min(1, samples[i]));
    out.setInt16(44 + i * 2, Math.round(v * 32767), true);
  }
  return new Blob([out.buffer], { type: "audio/wav" });
}

export function nameFrom(file: string): string {
  const stem = file.replace(/\.[^.]+$/, "");
  const words = stem.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  return words ? words[0].toUpperCase() + words.slice(1) : "Tone";
}
