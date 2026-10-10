import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { KEYS_READY } from "../keys";
import { register } from "../nav";
import { deviceName, findSatellites, resolve } from "../satellite";
import {
  listTones,
  nameFrom,
  processTone,
  toneAudio,
  uploadTone,
  type Processed,
  type Tone,
} from "../tones";
import type { HomeAssistant } from "../types";

import styles from "./tones.css";

register({
  path: "tones",
  title: "Tones",
  icon: "mdi:music-note",
  element: "echolocal-tones",
  order: 11,
  admin: true,
});

interface Holder {
  id: string;
  name: string;
  online: boolean;
  supported: boolean;
  tones: Set<string>;
}

interface Draft {
  file: File;
  name: string;
  trim: boolean;
  even: boolean;
  processed?: Processed;
  replace?: Tone;
}

@customElement("echolocal-tones")
export class EchoLocalTones extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;

  @state() private tones: Tone[] = [];
  @state() private asked = false;
  @state() private draft?: Draft;
  @state() private said = "";
  @state() private busy = false;
  @state() private open = "";
  @state() private search = "";
  @state() private sending = new Set<string>();
  @state() private renaming = "";
  @state() private doomed = "";

  private player?: HTMLAudioElement;
  private playing = "";
  private again = () => this.requestUpdate();

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(KEYS_READY, this.again);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(KEYS_READY, this.again);
    this.stop();
  }

  protected updated() {
    if (this.asked || !this.hass) return;
    this.asked = true;
    void this.refresh();
  }

  render() {
    if (!this.hass) return nothing;
    const holders = this.holders();

    return html`
      <div class="heading">
        <h2 class="first">Tones</h2>
        <label class="add">
          <ha-icon icon="mdi:plus"></ha-icon><span>Add tone</span>
          <input
            type="file"
            accept="audio/*"
            @change=${(e: Event) => this.pick((e.target as HTMLInputElement).files)}
          />
        </label>
      </div>
      ${this.draft ? this.renderDraft(this.draft) : nothing}
      ${this.said ? html`<div class="said">${this.said}</div>` : nothing}
      ${this.tones.length
        ? html`<div class="list">${this.tones.map((tone) => this.renderTone(tone, holders))}</div>`
        : html`<div class="spare">No tones yet. Add one to use it for alerts, timers and wake chimes.</div>`}
    `;
  }

  private renderDraft(draft: Draft) {
    const p = draft.processed;
    return html`
      <div class="draft">
        <div class="row">
          <input
            class="name"
            .value=${draft.name}
            placeholder="Name"
            @input=${(e: Event) => this.edit({ name: (e.target as HTMLInputElement).value })}
          />
          <button class="icon" ?disabled=${!p} @click=${() => p && this.preview("draft", URL.createObjectURL(p.wav))}>
            <ha-icon icon=${this.playing === "draft" ? "mdi:stop" : "mdi:play"}></ha-icon>
          </button>
          <span class="length">${p ? `${p.seconds.toFixed(1)} s` : "…"}</span>
        </div>
        <div class="row options">
          <label><input type="checkbox" .checked=${draft.trim} @change=${(e: Event) => this.edit({ trim: (e.target as HTMLInputElement).checked }, true)} />Trim silence</label>
          <label><input type="checkbox" .checked=${draft.even} @change=${(e: Event) => this.edit({ even: (e.target as HTMLInputElement).checked }, true)} />Even out loudness</label>
          <span class="source">${draft.file.name}</span>
        </div>
        ${p?.cut ? html`<div class="note">Using the first 30 seconds.</div>` : nothing}
        ${draft.replace ? html`<div class="note">Replaces "${draft.replace.name}" on the devices that have it.</div>` : nothing}
        <div class="row actions">
          <button class="text" @click=${() => (this.draft = undefined)}>Cancel</button>
          <button class="primary" ?disabled=${!p || !draft.name.trim() || this.busy} @click=${() => this.save(draft)}>
            ${this.busy ? "Uploading…" : draft.replace ? "Replace" : "Upload"}
          </button>
        </div>
      </div>
    `;
  }

  private renderTone(tone: Tone, holders: Holder[]) {
    const having = holders.filter((h) => h.tones.has(tone.name));
    const shown = this.search
      ? holders.filter((h) => h.name.toLowerCase().includes(this.search.toLowerCase()))
      : holders;

    return html`
      <div class="tone">
        <div class="row">
          ${this.renaming === tone.key
            ? html`<input
                class="name"
                .value=${tone.name}
                @keydown=${(e: KeyboardEvent) => {
                  if (e.key === "Enter") void this.rename(tone, (e.target as HTMLInputElement).value);
                  if (e.key === "Escape") this.renaming = "";
                }}
                @blur=${(e: Event) => void this.rename(tone, (e.target as HTMLInputElement).value)}
              />`
            : html`<span class="title" @click=${() => (this.renaming = tone.key)}>${tone.name}</span>`}
          <span class="length">${tone.length.toFixed(1)} s</span>
          <button class="icon" title="Play" @click=${() => void this.play(tone)}>
            <ha-icon icon=${this.playing === tone.key ? "mdi:stop" : "mdi:play"}></ha-icon>
          </button>
          <button class="icon" title="Rename" @click=${() => (this.renaming = tone.key)}>
            <ha-icon icon="mdi:pencil"></ha-icon>
          </button>
          <button
            class="icon ${this.doomed === tone.key ? "danger" : ""}"
            title=${this.doomed === tone.key ? "Tap again to delete" : "Delete"}
            @click=${() => void this.discard(tone)}
          >
            <ha-icon icon=${this.doomed === tone.key ? "mdi:delete-alert" : "mdi:delete"}></ha-icon>
          </button>
        </div>
        <button class="devices" @click=${() => (this.open = this.open === tone.key ? "" : tone.key)}>
          <ha-icon icon="mdi:speaker-multiple"></ha-icon>
          <span>${having.length ? having.map((h) => h.name).join(", ") : "On no devices"}</span>
          <ha-icon icon=${this.open === tone.key ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
        </button>
        ${this.open === tone.key
          ? html`<div class="picker">
              ${holders.length > 6
                ? html`<input
                    class="search"
                    placeholder="Search devices"
                    .value=${this.search}
                    @input=${(e: Event) => (this.search = (e.target as HTMLInputElement).value)}
                  />`
                : nothing}
              ${shown.map((h) => {
                const id = `${tone.key}:${h.id}`;
                const usable = h.online && h.supported;
                return html`<label class="device" data-offline=${String(!usable)}>
                  <input
                    type="checkbox"
                    .checked=${h.tones.has(tone.name)}
                    ?disabled=${!usable || this.sending.has(id)}
                    @change=${(e: Event) => void this.toggle(tone, h, (e.target as HTMLInputElement).checked)}
                  />
                  <span>${h.name}</span>
                  ${!h.online
                    ? html`<span class="state">offline</span>`
                    : !h.supported
                      ? html`<span class="state">needs an update</span>`
                      : nothing}
                  ${this.sending.has(id) ? html`<span class="state">sending…</span>` : nothing}
                </label>`;
              })}
            </div>`
          : nothing}
      </div>
    `;
  }

  private holders(): Holder[] {
    return findSatellites(this.hass)
      .map((device) => {
        const own = resolve(this.hass, device.id);
        const select = own?.by.get("alerts_info")?.[0];
        const entity = select ? this.hass.states[select.entity_id] : undefined;
        const options = (entity?.attributes?.options as string[] | undefined) ?? [];
        const states = [...(own?.by.values() ?? [])].flat().map((e) => this.hass.states[e.entity_id]);
        return {
          id: device.id,
          name: deviceName(device),
          online: states.some((s) => s && s.state !== "unavailable"),
          supported: !!entity,
          tones: new Set(options),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  private pick(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    const name = nameFrom(file.name);
    const replace = this.tones.find((t) => t.name.toLowerCase() === name.toLowerCase());
    this.said = "";
    this.draft = { file, name, trim: true, even: true, replace };
    void this.process();
  }

  private edit(change: Partial<Draft>, reprocess = false) {
    if (!this.draft) return;
    this.draft = { ...this.draft, ...change };
    if ("name" in change) {
      const name = (change.name ?? "").trim().toLowerCase();
      this.draft.replace = this.tones.find((t) => t.name.toLowerCase() === name);
    }
    if (reprocess) void this.process();
  }

  private async process() {
    const draft = this.draft;
    if (!draft) return;
    try {
      const processed = await processTone(draft.file, { trim: draft.trim, even: draft.even });
      if (this.draft?.file === draft.file) this.draft = { ...this.draft, processed };
    } catch (err) {
      this.said = String((err as Error).message ?? err);
      this.draft = undefined;
    }
  }

  private async save(draft: Draft) {
    if (!draft.processed) return;
    this.busy = true;
    this.said = "";
    try {
      const tone = await uploadTone(this.hass, draft.name.trim(), draft.file, draft.processed, draft.replace?.key);
      this.draft = undefined;
      if (draft.replace) {
        const having = this.holders().filter((h) => h.online && h.tones.has(draft.replace!.name));
        if (having.length) await this.assign(tone, having.map((h) => h.id));
      }
    } catch (err) {
      this.said = String((err as Error).message ?? err);
    }
    this.busy = false;
    await this.refresh();
  }

  private async toggle(tone: Tone, holder: Holder, on: boolean) {
    const id = `${tone.key}:${holder.id}`;
    this.sending = new Set([...this.sending, id]);
    this.said = "";
    try {
      if (on) await this.assign(tone, [holder.id]);
      else await this.hass.callService("echolocal", "unassign_tone", { tone: tone.key, device_id: [holder.id] });
    } catch (err) {
      this.said = `${holder.name}: ${(err as Error).message ?? err}`;
    }
    const next = new Set(this.sending);
    next.delete(id);
    this.sending = next;
  }

  private async assign(tone: Tone, devices: string[]) {
    await this.hass.callService("echolocal", "assign_tone", { tone: tone.key, device_id: devices });
  }

  private async rename(tone: Tone, name: string) {
    this.renaming = "";
    name = name.trim();
    if (!name || name === tone.name) return;
    try {
      await this.hass.callWS({ type: "echolocal/tones/rename", key: tone.key, name });
    } catch (err) {
      this.said = String((err as Error).message ?? err);
    }
    await this.refresh();
  }

  private async discard(tone: Tone) {
    if (this.doomed !== tone.key) {
      this.doomed = tone.key;
      return;
    }
    this.doomed = "";
    try {
      await this.hass.callWS({ type: "echolocal/tones/delete", key: tone.key });
    } catch (err) {
      this.said = String((err as Error).message ?? err);
    }
    await this.refresh();
  }

  private async play(tone: Tone) {
    if (this.playing === tone.key) {
      this.stop();
      return;
    }
    try {
      this.preview(tone.key, await toneAudio(this.hass, tone.key));
    } catch (err) {
      this.said = String((err as Error).message ?? err);
    }
  }

  private preview(id: string, url: string) {
    const was = this.playing;
    this.stop();
    if (was === id) return;
    this.player = new Audio(url);
    this.playing = id;
    this.player.onended = () => this.stop();
    void this.player.play();
    this.requestUpdate();
  }

  private stop() {
    if (this.player) {
      this.player.pause();
      URL.revokeObjectURL(this.player.src);
    }
    this.player = undefined;
    this.playing = "";
    this.requestUpdate();
  }

  private async refresh() {
    try {
      this.tones = await listTones(this.hass);
    } catch (err) {
      this.said = String((err as Error).message ?? err);
    }
  }
}
