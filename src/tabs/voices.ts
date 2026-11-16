import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { actionOf } from "../audio";
import { register } from "../nav";
import { deviceName, findSatellites } from "../satellite";
import { initials } from "../speaker";
import type { HassDevice, HomeAssistant } from "../types";

import styles from "./voices.css";

register({
  path: "voices",
  title: "Voices",
  icon: "mdi:account-voice",
  element: "echolocal-voices",
  order: 34,
  admin: true,
});

interface Voice {
  id: string;
  name: string;
  person: string;
  threshold: number;
}

interface Draft {
  voice: string;
  person: string;
  name: string;
  device: string;
}

interface Session {
  draft: Draft;
  node: string;
  step: Record<string, string>;
}

const LOOSEST = 0.3;
const STRICTEST = 0.7;
const STEP = 0.01;
const NOBODY = "none";
const SOMEONE = "someone";
const ENROLL = "voice_enroll";
const CANCEL = "voice_enroll_cancel";
const ACCEPT = "voice_enroll_accept";
const ENROLMENT = "esphome.echolocal_enrolment";
const UPDATED = "echolocal_voices_updated";

@customElement("echolocal-voices")
export class EchoLocalVoices extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;

  @state() private voices: Voice[] = [];
  @state() private loaded = false;
  @state() private error = "";
  @state() private confirming = "";
  @state() private draft?: Draft;
  @state() private session?: Session;

  private asked = false;
  private stops: (() => void)[] = [];

  protected updated() {
    if (this.asked || !this.hass) return;
    this.asked = true;
    void this.load();
    void this.follow();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stops.forEach((stop) => stop());
    this.stops = [];
    this.asked = false;
  }

  render() {
    return html`
      <div class="heading">
        <h2>Voices</h2>
        ${this.draft || this.session
          ? nothing
          : html`<ha-button .disabled=${!this.enrollers().length} @click=${() => this.add()}>
              <ha-icon slot="start" icon="mdi:plus"></ha-icon>Add voice
            </ha-button>`}
      </div>
      ${this.error ? html`<div class="panel bad">${this.error}</div>` : nothing}
      ${this.session ? this.renderSession(this.session) : nothing}
      ${this.draft && !this.session ? this.renderDraft(this.draft) : nothing}
      ${!this.loaded
        ? html`<div class="panel note">Loading…</div>`
        : this.voices.length
          ? html`<div class="list">${this.voices.map((voice) => this.row(voice))}</div>`
          : html`<div class="panel note">No voices yet.</div>`}
    `;
  }

  private renderDraft(draft: Draft) {
    const people = this.people();
    const devices = this.enrollers();
    const picked = draft.person || SOMEONE;
    return html`<div class="panel enrol">
      <div class="row settings">
        <ha-select
          class="person"
          label="Person"
          .value=${picked}
          .options=${[
            ...people.map(([value, label]) => ({ value, label })),
            { value: SOMEONE, label: "Someone else" },
          ]}
          @selected=${(e: CustomEvent<{ value?: string }>) => this.pickPerson(e.detail.value ?? "")}
        ></ha-select>
        <ha-input
          class="person"
          label="Name"
          .value=${draft.name}
          @input=${(e: Event) =>
            (this.draft = { ...draft, name: (e.target as HTMLInputElement).value })}
        ></ha-input>
        <ha-select
          class="person"
          label="Speak to"
          .value=${draft.device}
          .options=${devices.map((d) => ({ value: d.id, label: deviceName(d) }))}
          @selected=${(e: CustomEvent<{ value?: string }>) =>
            (this.draft = { ...draft, device: e.detail.value ?? "" })}
        ></ha-select>
      </div>
      <div class="row end">
        <button class="text" @click=${() => (this.draft = undefined)}>Cancel</button>
        <ha-button .disabled=${!draft.name.trim() || !draft.device} @click=${() => this.start(draft)}>
          Start
        </ha-button>
      </div>
    </div>`;
  }

  private renderSession(session: Session) {
    const step = session.step;
    const device = deviceName(this.hass.devices?.[session.draft.device]);
    switch (step.stage) {
      case "ready":
        return this.outcome(`Voice match is ready for ${step.name}`, "mdi:check-circle-outline", false);
      case "unconfirmed":
        return this.outcome("That didn't sound like the same voice", "mdi:alert-circle-outline", true);
      case "failed":
        return this.outcome("Voice match couldn't be set up", "mdi:alert-circle-outline", true);
      case "similar":
        return html`<div class="panel enrol live">
          <div class="result">
            <ha-icon icon="mdi:account-multiple-outline"></ha-icon>
            <span>This voice sounds very similar to ${step.like}</span>
          </div>
          <div class="row end">
            <button class="text" @click=${() => this.stop()}>Cancel</button>
            <ha-button @click=${() => this.start(session.draft)}>Try again</ha-button>
            <ha-button appearance="plain" @click=${() => this.accept()}>Accept</ha-button>
          </div>
        </div>`;
    }
    const lead = step.wake ? html`Say “${step.wake}” to ${device}, then` : html`Say the wake word to ${device}, then`;
    return html`<div class="panel enrol live">
      ${step.phrase
        ? html`<div class="lead">${lead}</div>
            <div class="phrase">“${step.phrase}”</div>
            ${this.dots(step)}
            <div class="status">${status(step.stage)}</div>`
        : html`<div class="lead">Getting ready…</div>`}
      <div class="row end">
        <button class="text" @click=${() => this.stop()}>Cancel</button>
      </div>
    </div>`;
  }

  private outcome(title: string, icon: string, retry: boolean) {
    return html`<div class="panel enrol live">
      <div class="result"><ha-icon icon=${icon}></ha-icon><span>${title}</span></div>
      <div class="row end">
        ${retry
          ? html`<button class="text" @click=${() => this.stop()}>Cancel</button>
              <ha-button @click=${() => this.session && this.start(this.session.draft)}>Try again</ha-button>`
          : html`<ha-button @click=${() => this.stop()}>Done</ha-button>`}
      </div>
    </div>`;
  }

  private dots(step: Record<string, string>) {
    const of = Number(step.of);
    const number = Number(step.take);
    const total = step.confirm === "true" ? of : of + 1;
    const done = number - 1 + (step.stage === "heard" ? 1 : 0);
    return html`<div class="dots">
      ${Array.from({ length: total }, (_, i) =>
        html`<span class=${i < done ? "dot done" : i === done ? "dot now" : "dot"}></span>`
      )}
    </div>`;
  }

  private row(voice: Voice) {
    const picture = voice.person
      ? (this.hass.states[voice.person]?.attributes?.entity_picture as string | undefined)
      : undefined;
    const people = this.people();
    if (voice.person && !people.some(([id]) => id === voice.person)) {
      people.push([voice.person, `${voice.person} (missing)`]);
    }
    const busy = !!this.draft || !!this.session;
    return html`<div class="panel voice">
      <div class="row">
        ${picture
          ? html`<img class="face" src=${picture} alt="" />`
          : html`<span class="face initials">${initials(voice.name)}</span>`}
        <span class="name">${voice.name}</span>
        ${this.confirming === voice.id
          ? html`<span class="ask">Remove ${voice.name}?</span>
              <button class="text" @click=${() => (this.confirming = "")}>Cancel</button>
              <button class="text danger" @click=${() => this.forget(voice)}>Remove</button>`
          : html`<button
                class="icon"
                title="Record ${voice.name} again"
                ?disabled=${busy || !this.enrollers().length}
                @click=${() => this.add(voice)}
              >
                <ha-icon icon="mdi:microphone"></ha-icon>
              </button>
              <button
                class="icon danger"
                title="Remove ${voice.name}"
                @click=${() => (this.confirming = voice.id)}
              >
                <ha-icon icon="mdi:delete-outline"></ha-icon>
              </button>`}
      </div>
      <div class="row settings">
        <ha-select
          class="person"
          label="Person"
          .value=${voice.person || NOBODY}
          .options=${[
            { value: NOBODY, label: "Not linked" },
            ...people.map(([value, label]) => ({ value, label })),
          ]}
          @selected=${(e: CustomEvent<{ value?: string }>) => {
            const picked = e.detail.value === NOBODY ? "" : (e.detail.value ?? "");
            if (picked !== voice.person) void this.link(voice, picked);
          }}
        ></ha-select>
        <label class="threshold">
          <span class="label">Match threshold</span>
          <input
            type="range"
            min=${LOOSEST}
            max=${STRICTEST}
            step=${STEP}
            .value=${String(voice.threshold)}
            @input=${(e: Event) => this.preview(voice, e)}
            @change=${(e: Event) => this.save(voice, e)}
          />
          <span class="value">${voice.threshold.toFixed(2)}</span>
        </label>
      </div>
    </div>`;
  }

  private people(): [string, string][] {
    return Object.entries(this.hass.states)
      .filter(([id]) => id.startsWith("person."))
      .map(([id, s]): [string, string] => [id, String(s.attributes?.friendly_name ?? id)])
      .sort((a, b) => a[1].localeCompare(b[1]));
  }

  private enrollers(): HassDevice[] {
    return findSatellites(this.hass).filter((d) => actionOf(this.hass, d.name ?? "", ENROLL));
  }

  private add(voice?: Voice) {
    const devices = this.enrollers();
    const taken = new Set(this.voices.map((v) => v.person).filter(Boolean));
    const free = this.people().find(([id]) => !taken.has(id));
    const person = voice ? voice.person : (free?.[0] ?? "");
    this.draft = {
      voice: voice?.id ?? "",
      person,
      name: voice?.name ?? this.nameOf(person),
      device: this.draft?.device || devices[0]?.id || "",
    };
  }

  private nameOf(person: string): string {
    return person ? String(this.hass.states[person]?.attributes?.friendly_name ?? "") : "";
  }

  private pickPerson(value: string) {
    if (!this.draft) return;
    const person = value === SOMEONE ? "" : value;
    if (person === this.draft.person) return;
    const named = this.draft.name.trim() === "" || this.draft.name === this.nameOf(this.draft.person);
    this.draft = { ...this.draft, person, name: named ? this.nameOf(person) : this.draft.name };
  }

  private async follow() {
    const connection = this.hass.connection;
    if (!connection) return;
    try {
      this.stops.push(
        await connection.subscribeEvents<Record<string, string>>((e) => this.heard(e.data), ENROLMENT),
        await connection.subscribeEvents(() => void this.load(), UPDATED)
      );
    } catch (err) {
      this.error = `Following enrolment failed: ${String((err as Error)?.message ?? err)}`;
    }
  }

  private heard(data: Record<string, string>) {
    const session = this.session;
    if (!session || data.device_id !== session.draft.device) return;
    if (data.stage === "idle") {
      this.session = undefined;
      return;
    }
    this.session = { ...session, step: data };
  }

  private async start(draft: Draft) {
    const device = this.hass.devices?.[draft.device];
    const node = actionOf(this.hass, device?.name ?? "", ENROLL);
    if (!node) return;
    this.error = "";
    this.draft = undefined;
    this.session = { draft, node, step: { stage: "preparing" } };
    try {
      const reply = await this.hass.callService(
        "esphome",
        node,
        { name: draft.name.trim(), person: draft.person, voice: draft.voice },
        undefined,
        false,
        true
      );
      const step = reply?.response as Record<string, string> | undefined;
      if (step && this.session?.node === node && this.session.step.stage === "preparing") {
        this.session = { ...this.session, step };
      }
    } catch (err) {
      this.session = undefined;
      this.draft = draft;
      this.error = `Starting on ${deviceName(device)} failed: ${String((err as Error)?.message ?? err)}`;
    }
  }

  private async accept() {
    const session = this.session;
    if (!session) return;
    const accept = session.node.slice(0, -ENROLL.length) + ACCEPT;
    try {
      await this.hass.callService("esphome", accept, {}, undefined, false, false);
    } catch (err) {
      this.error = `Keeping the voice failed: ${String((err as Error)?.message ?? err)}`;
    }
  }

  private async stop() {
    const session = this.session;
    this.session = undefined;
    if (!session) return;
    const cancel = session.node.slice(0, -ENROLL.length) + CANCEL;
    try {
      await this.hass.callService("esphome", cancel, {}, undefined, false, false);
    } catch (err) {
      this.error = `Stopping failed: ${String((err as Error)?.message ?? err)}`;
    }
  }

  private async link(voice: Voice, person: string) {
    try {
      await this.hass.callWS({ type: "echolocal/voices/person", voice: voice.id, person });
    } catch (err) {
      this.error = `Linking ${voice.name} failed: ${String((err as Error)?.message ?? err)}`;
    }
    await this.load();
  }

  private preview(voice: Voice, e: Event) {
    const value = Number((e.target as HTMLInputElement).value);
    this.voices = this.voices.map((v) => (v.id === voice.id ? { ...v, threshold: value } : v));
  }

  private async save(voice: Voice, e: Event) {
    const threshold = Number((e.target as HTMLInputElement).value);
    try {
      await this.hass.callWS({ type: "echolocal/voices/threshold", voice: voice.id, threshold });
    } catch (err) {
      this.error = `Saving ${voice.name}'s threshold failed: ${String((err as Error)?.message ?? err)}`;
    }
    await this.load();
  }

  private async forget(voice: Voice) {
    this.confirming = "";
    try {
      await this.hass.callWS({ type: "echolocal/voices/remove", voice: voice.id });
    } catch (err) {
      this.error = `Removing ${voice.name} failed: ${String((err as Error)?.message ?? err)}`;
    }
    await this.load();
  }

  private async load() {
    try {
      const reply = await this.hass.callWS<{ voices: Voice[] }>({ type: "echolocal/voices" });
      this.voices = reply.voices;
    } catch (err) {
      this.error = `Reading voices failed: ${String((err as Error)?.message ?? err)}`;
    }
    this.loaded = true;
  }
}

function status(stage: string): string {
  switch (stage) {
    case "heard":
      return "Got it";
    case "missed":
      return "Didn't catch that. Once more.";
    case "prompt":
      return "Listening…";
  }
  return "";
}

declare global {
  interface HTMLElementTagNameMap {
    "echolocal-voices": EchoLocalVoices;
  }
}
