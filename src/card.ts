// One satellite, drawn as itself, with its controls wrapped around two sides.
//
// Muting and volume are the buttons on the artwork, where somebody looking at a picture of the device
// would reach for them. The squares open a popup per component.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { HOLD, SEGMENTS, art, type Segment } from "./art";
import styles from "./card.css";
import "./dialog";
import { helpForKind } from "./help";
import { components, compose, diagnostics, settings, type Widget } from "./layout";
import { disabledSegments, enable } from "./registry";
import {
  activity,
  deviceName,
  findSatellites,
  isOn,
  lit,
  resolve,
  wakeButtons,
  type Satellite,
} from "./satellite";
import { SWATCHES } from "./swatches";
import type { CardConfig, HomeAssistant, Kind, Section, Shell } from "./types";

const LABELS: Record<string, string> = {
  device_id: "Device",
  shell: "Shell",
  help: "Explain each setting",
};

const ICON: Record<Kind | "follow" | "close", string> = {
  ring: "mdi:record-circle-outline",
  microphone: "mdi:microphone",
  playback: "mdi:speaker",
  assistant: "mdi:account-voice",
  device: "mdi:cog-outline",
  diagnostics: "mdi:stethoscope",
  activity: "mdi:timeline-text-outline",
  follow: "mdi:backup-restore",
  close: "mdi:check",
};

const ACTIVITY: Record<string, string> = {
  idle: "Idle",
  listening: "Listening",
  processing: "Thinking",
  responding: "Speaking",
  unavailable: "Unavailable",
  unknown: "Unknown",
};

// Which assistant a popup is for, when it is one of several. Zero everywhere else.
type Opened = {
  kind: Kind;
  slot: number;
};

@customElement("echolocal-satellite-card")
export class EchoLocalSatelliteCard extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private config!: CardConfig;
  @state() private opened: Opened | null = null;

  // Which ring segment is being given a color. Editing happens on the artwork, since that is the ring:
  // the foot of the card turns into the palette while one is picked.
  @state() private picked: number | null = null;

  // Whether the action button's press has become a hold, which is what decides the assistant it wakes.
  @state() private holding = false;
  private timer = 0;

  // Segments that exist in the registry but are switched off, indexed by segment number, and which one
  // is being offered. Looked up once per card.
  @state() private hiddenSegments: (string | undefined)[] = [];
  @state() private offering: number | null = null;
  private asked = false;

  static getConfigElement() {
    return document.createElement("echolocal-satellite-card-editor");
  }

  static getStubConfig(hass: HomeAssistant): CardConfig {
    return { device_id: findSatellites(hass)[0]?.id ?? "" };
  }

  setConfig(config: CardConfig) {
    if (!config?.device_id) throw new Error("Choose an EchoLocal device");
    this.config = { ...config };
  }

  getCardSize() {
    return 6;
  }

  protected updated() {
    if (this.asked || !this.hass || !this.config) return;

    const state = resolve(this.hass, this.config.device_id);
    if (!state || state.segments.some(Boolean)) return;

    this.asked = true;
    disabledSegments(this.hass, state).then((found) => (this.hiddenSegments = found));
  }

  // The shell the artwork wears: a real colour set in the config forces it, otherwise the device's own
  // detected colour, and grey when it has not reported one (or reads unknown).
  private shellFor(state: Satellite): Shell {
    const forced = this.config?.shell;
    if (forced && forced !== "auto") return forced;

    const id = state.by.get("hardware_color")?.[0]?.entity_id;
    const detected = id ? this.hass.states[id]?.state : undefined;
    return detected === "black" || detected === "white" ? detected : "grey";
  }

  render() {
    if (!this.hass || !this.config) return nothing;

    const state = resolve(this.hass, this.config.device_id);
    if (!state) {
      return html`<ha-card><div class="missing">Device not found</div></ha-card>`;
    }

    const doing = activity(this.hass, state.satellite);

    return html`
      <ha-card>
        <div class="frame">
          <div class="art" data-shell=${this.shellFor(state)} data-activity=${doing}>
            ${art(
              {
                segments: this.segments(state),
                glow: this.glow(state),
                muted: isOn(this.hass, state.mute),
                holding: this.holding,
                picked: this.picked,
                divisible: [...state.segments, ...this.hiddenSegments].some(Boolean),
              },
              {
                ring: () => this.open({ kind: "ring", slot: 0 }),
                segment: (i) => this.tapped(state, i),
                action: (phase) => this.pressed(state, phase),
                mute: () => this.toggle("switch", state.mute),
                volume: (step) => this.volume(state, step),
              }
            )}
          </div>

          <div class="side">${this.side(state)}</div>

          ${this.offering !== null
            ? this.offer(this.offering)
            : this.picked === null
              ? this.foot(state, doing)
              : this.palette(state)}
        </div>
      </ha-card>

      ${this.popup(state)}
    `;
  }

  private foot(state: Satellite, doing: string) {
    return html`<div class="foot">
      <div class="label">
        <div class="name">${deviceName(state.device)}</div>
        <div class="status">${ACTIVITY[doing] ?? doing}</div>
      </div>
      <div class="tail">
        ${this.square(ICON.activity, "Activity", () => this.open({ kind: "activity", slot: 0 }))}
        ${this.square(ICON.device, "Settings", () => this.open({ kind: "device", slot: 0 }))}
        ${this.square(ICON.diagnostics, "Diagnostics", () =>
          this.open({ kind: "diagnostics", slot: 0 })
        )}
      </div>
    </div>`;
  }

  private tapped(state: Satellite, i: number) {
    if (state.segments[i]) {
      this.picked = this.picked === i ? null : i;
      return;
    }
    if (this.hiddenSegments[i]) {
      this.offering = i;
      return;
    }
    this.open({ kind: "ring", slot: 0 });
  }

  // A segment with no entity behind it cannot be colored, and a tap that does nothing explains nothing.
  // Either that one is switched on, or all of them, since somebody who wants one usually wants the rest.
  private offer(at: number) {
    const enableOne = async (entityIds: (string | undefined)[]) => {
      for (const entityId of entityIds) {
        if (entityId) await enable(this.hass, entityId);
      }
      this.hiddenSegments = this.hiddenSegments.map((id) => (entityIds.includes(id) ? undefined : id));
      this.offering = null;
      this.picked = at;
    };

    return html`<div class="foot">
      <div class="label">
        <div class="name">Segment ${at + 1} disabled</div>
      </div>
      <div class="tail">
        <button class="plain" @click=${() => enableOne([this.hiddenSegments[at]])}>Enable</button>
        <button class="plain" @click=${() => enableOne(this.hiddenSegments)}>Enable all</button>
        <button class="plain quiet" @click=${() => (this.offering = null)}>Cancel</button>
      </div>
    </div>`;
  }

  // The palette takes the foot's place while a segment is picked: a color, or handing it back to the
  // ring, which for a segment means turning it off.
  private palette(state: Satellite) {
    const entityId = state.segments[this.picked!];

    // Two lines rather than one: a card is narrow, and ten colors beside a label and two buttons is how
    // the label ends up broken across three words.
    return html`<div class="foot palette">
      <div class="top">
        <div class="name">Segment ${this.picked! + 1}</div>
        <div class="tail">
          ${this.square(ICON.follow, "Follow the ring", () => {
            this.hass.callService("light", "turn_off", { entity_id: entityId });
            this.picked = null;
          })}
          ${this.square(ICON.close, "Done", () => (this.picked = null))}
        </div>
      </div>
      <div class="swatches">
        ${SWATCHES.map(
          ([name, rgb]) => html`<button
            class="swatch"
            title=${name}
            aria-label=${name}
            style=${`background:rgb(${rgb.join(",")})`}
            @click=${() =>
              this.hass.callService("light", "turn_on", { entity_id: entityId, rgb_color: rgb })}
          ></button>`
        )}
      </div>
    </div>`;
  }

  // A segment shows its own color when somebody has overridden it, the ring's color otherwise, and
  // nothing when the ring is off.
  private segments(state: Satellite): Segment[] {
    const ring = lit(this.hass, state.ring);

    return Array.from({ length: SEGMENTS }, (_, i) => {
      const show = lit(this.hass, state.segments[i]) ?? ring;

      return {
        fill: show ? `rgb(${show.rgb.join(",")})` : "var(--el-ring-off)",
        opacity: show ? 0.25 + 0.75 * show.level : 1,
      };
    });
  }

  private glow(state: Satellite): number {
    const anything = lit(this.hass, state.ring) || state.segments.some((s) => lit(this.hass, s));
    return anything ? 0.55 : 0;
  }

  // One square per component. Assistants come one per wake word slot, so they are numbered — two of the
  // same icon would say nothing.
  private side(state: Satellite) {
    const found = components(state);
    const many = found.filter((c) => c.kind === "assistant").length > 1;

    return found.map(({ kind, slot }) =>
      this.square(
        ICON[kind],
        this.titled(kind, slot),
        () => this.open({ kind, slot }),
        many && kind === "assistant" ? slot : null
      )
    );
  }

  // The card names its components, since it decides what is in each one. A device's own names belong to
  // whoever renamed them and say nothing about which popup this is.
  private titled(kind: Kind, slot: number): string {
    const said = {
      ring: "Ring",
      microphone: "Microphone",
      playback: "Playback",
      assistant: "Assistant",
      device: "Settings",
      diagnostics: "Diagnostics",
      activity: "Activity",
    }[kind];

    return slot ? `${said} ${slot}` : said;
  }

  private square(icon: string, label: string, tap: () => void, badge: number | null = null) {
    return html`<button class="sq" title=${label} aria-label=${label} @click=${tap}>
      <ha-icon .icon=${icon}></ha-icon>
      ${badge ? html`<span class="badge">${badge}</span>` : nothing}
    </button>`;
  }

  // The popup is built at render time rather than when it opens, so what it shows stays live.
  private popup(state: Satellite) {
    if (!this.opened) return nothing;

    const { kind, slot } = this.opened;
    let list: Section[];
    let widgets: Widget[] = [];

    if (kind === "device") {
      list = settings(state);
    } else if (kind === "diagnostics") {
      ({ widgets, sections: list } = diagnostics(state));
    } else {
      ({ widgets, sections: list } = compose(kind, state, slot));
    }

    return html`<echolocal-dialog
      .hass=${this.hass}
      .heading=${this.titled(kind, slot)}
      .subtitle=${deviceName(state.device)}
      .icon=${ICON[kind]}
      .sections=${list}
      .widgets=${widgets}
      .device=${state.device.name ?? ""}
      .deviceId=${state.device.id}
      .help=${this.config.help !== false}
      .about=${helpForKind(kind)}
      @closed=${() => (this.opened = null)}
    ></echolocal-dialog>`;
  }

  private open(opened: Opened) {
    this.opened = opened;
  }

  // The device's own action button: a press wakes the first assistant, a hold the second. Held on the card
  // rather than in the artwork, so a re-render partway through a press does not lose the timer.
  private pressed(state: Satellite, phase: "down" | "up" | "cancel") {
    if (phase === "down") {
      this.holding = false;
      this.timer = window.setTimeout(() => (this.holding = true), HOLD);
      return;
    }

    clearTimeout(this.timer);
    const held = this.holding;
    this.holding = false;

    if (phase === "cancel") return;

    // With one assistant a hold has nowhere else to go, so it wakes the only one there is.
    const wake = wakeButtons(state);
    const press = wake[held && wake.length > 1 ? 1 : 0];

    if (press) this.hass.callService("button", "press", { entity_id: press });
    else this.moreInfo(state.satellite);
  }

  private toggle(domain: string, entityId?: string) {
    if (entityId) this.hass.callService(domain, "toggle", { entity_id: entityId });
  }

  private volume(state: Satellite, step: number) {
    if (!state.player) return;

    this.hass.callService("media_player", step > 0 ? "volume_up" : "volume_down", {
      entity_id: state.player,
    });
  }

  private moreInfo(entityId?: string) {
    if (!entityId) return;

    this.dispatchEvent(
      new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true })
    );
  }
}

@customElement("echolocal-satellite-card-editor")
export class EchoLocalSatelliteCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private config!: CardConfig;

  setConfig(config: CardConfig) {
    this.config = { ...config };
  }

  render() {
    if (!this.hass || !this.config) return nothing;

    // Our own list of devices rather than a device selector's: being one of ours means having esphome
    // sub-devices, which no selector filter can ask for.
    const schema = [
      {
        name: "device_id",
        required: true,
        selector: {
          select: {
            mode: "dropdown",
            options: findSatellites(this.hass).map((device) => ({
              value: device.id,
              label: deviceName(device),
            })),
          },
        },
      },
      {
        name: "shell",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "auto", label: "Auto (from device)" },
              { value: "black", label: "Black" },
              { value: "white", label: "White" },
              { value: "grey", label: "Grey" },
            ],
          },
        },
      },
      { name: "help", selector: { boolean: {} } },
    ];

    return html`<ha-form
      .hass=${this.hass}
      .data=${{ help: true, shell: "auto", ...this.config }}
      .schema=${schema}
      .computeLabel=${(entry: { name: string }) => LABELS[entry.name] ?? entry.name}
      @value-changed=${(e: CustomEvent<{ value: CardConfig }>) => this.emit(e.detail.value)}
    ></ha-form>`;
  }

  private emit(change: Partial<CardConfig>) {
    this.config = { ...this.config, ...change };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this.config },
        bubbles: true,
        composed: true,
      })
    );
  }
}
