// One satellite, drawn as itself, with its controls wrapped around two sides.
//
// Muting and volume are the buttons on the artwork, where somebody looking at a picture of the device
// would reach for them. The squares open a popup per component.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { SEGMENTS, art, type Segment } from "./art";
import styles from "./card.css";
import "./dialog";
import { helpForKind } from "./help";
import { compose, diagnostics, settings, type Widget } from "./layout";
import { disabledSegments, enable } from "./registry";
import {
  activity,
  deviceName,
  findSatellites,
  isOn,
  kindOf,
  lit,
  partEntities,
  resolve,
  type Satellite,
} from "./satellite";
import type { CardConfig, HassDevice, HomeAssistant, Kind, Section, Shell } from "./types";

const ICON: Record<Kind | "follow" | "close", string> = {
  ring: "mdi:record-circle-outline",
  microphone: "mdi:microphone",
  playback: "mdi:speaker",
  assistant: "mdi:account-voice",
  device: "mdi:cog-outline",
  diagnostics: "mdi:stethoscope",
  follow: "mdi:backup-restore",
  close: "mdi:check",
};

// A handful of colors worth reaching for on a card. The full wheel is a tap away in Home Assistant's
// own dialog for that segment.
const SWATCHES: [string, [number, number, number]][] = [
  ["White", [255, 255, 255]],
  ["Warm", [255, 190, 120]],
  ["Red", [255, 40, 40]],
  ["Orange", [255, 130, 20]],
  ["Yellow", [250, 230, 60]],
  ["Green", [60, 220, 90]],
  ["Teal", [40, 220, 200]],
  ["Blue", [60, 140, 255]],
  ["Violet", [150, 90, 255]],
  ["Pink", [255, 90, 200]],
];

const ACTIVITY: Record<string, string> = {
  idle: "Idle",
  listening: "Listening",
  processing: "Thinking",
  responding: "Speaking",
  unavailable: "Unavailable",
  unknown: "Unknown",
};

type Opened = {
  kind: Kind;
  part?: HassDevice;
  cross?: "settings" | "diagnostics";

  // Which assistant, when the part is one: the popup's uploads go to a slot.
  slot?: number;
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
    this.config = { shell: "grey", ...config };
  }

  getCardSize() {
    return 6;
  }

  protected updated() {
    if (this.asked || !this.hass || !this.config) return;

    const state = resolve(this.hass, this.config.device_id);
    if (!state || state.segments.some(Boolean)) return;

    this.asked = true;
    disabledSegments(this.hass, new Set([state.device.id, ...state.parts.map((p) => p.id)])).then(
      (found) => (this.hiddenSegments = found)
    );
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
          <div class="art" data-shell=${this.config.shell ?? "grey"} data-activity=${doing}>
            ${art(
              {
                segments: this.segments(state),
                glow: this.glow(state),
                muted: isOn(this.hass, state.mute),
                picked: this.picked,
                divisible: [...state.segments, ...this.hiddenSegments].some(Boolean),
              },
              {
                ring: () => this.moreInfo(state.ring),
                segment: (i) => this.tapped(state, i),
                action: () => this.moreInfo(state.satellite),
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
        ${this.square(ICON.device, "Settings", () =>
          this.open({ kind: "device", cross: "settings" })
        )}
        ${this.square(ICON.diagnostics, "Diagnostics", () =>
          this.open({ kind: "diagnostics", cross: "diagnostics" })
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
    this.moreInfo(state.ring);
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

  // One square per sub-device. Assistants come one per wake word slot, so they are numbered — two of the
  // same icon would say nothing.
  private kinds(state: Satellite): Record<string, Kind> {
    return Object.fromEntries(state.parts.map((part) => [part.id, kindOf(this.hass, state, part)]));
  }

  private side(state: Satellite) {
    const kinds = state.parts.map((part) => kindOf(this.hass, state, part));
    const assistants = kinds.filter((k) => k === "assistant").length;
    let seen = 0;

    return state.parts.map((part, i) => {
      const kind = kinds[i];
      const slot = kind === "assistant" ? ++seen : undefined;
      const badge = kind === "assistant" && assistants > 1 ? slot! : null;

      return this.square(
        ICON[kind],
        deviceName(part),
        () => this.open({ kind, part, slot }),
        badge
      );
    });
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

    const { kind, part, cross } = this.opened;
    let list: Section[];
    let widgets: Widget[] = [];
    let title: string;
    const strip = [deviceName(state.device)];

    if (cross === "settings") {
      list = settings(state, this.kinds(state));
      title = "Settings";
    } else if (cross === "diagnostics") {
      ({ widgets, sections: list } = diagnostics(state));
      title = "Diagnostics";
    } else if (part) {
      ({ widgets, sections: list } = compose(kind, partEntities(state, part.id)));
      title = deviceName(part);
      strip.push(title);
    } else {
      return nothing;
    }

    return html`<echolocal-dialog
      .hass=${this.hass}
      .heading=${title}
      .subtitle=${deviceName(state.device)}
      .icon=${ICON[kind]}
      .sections=${list}
      .widgets=${widgets}
      .strip=${strip}
      .device=${deviceName(state.device)}
      .mac=${state.device.connections?.find(([kind]) => kind === "mac")?.[1] ?? ""}
      .help=${this.config.help !== false}
      .about=${helpForKind(kind)}
      @closed=${() => (this.opened = null)}
    ></echolocal-dialog>`;
  }

  private open(opened: Opened) {
    this.opened = opened;
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
    this.config = { shell: "grey", ...config };
  }

  render() {
    if (!this.hass || !this.config) return nothing;

    const found = findSatellites(this.hass);

    return html`
      <style>
        .field {
          display: block;
          margin-bottom: 12px;
        }
        label {
          display: block;
          font-size: 0.85rem;
          color: var(--secondary-text-color);
          margin-bottom: 4px;
        }
        select {
          width: 100%;
          padding: 8px;
        }
      </style>
      <div class="field">
        <label>Device</label>
        <select @change=${(e: Event) => this.emit({ device_id: (e.target as HTMLSelectElement).value })}>
          ${found.map(
            (device) => html`<option
              value=${device.id}
              ?selected=${device.id === this.config.device_id}
            >
              ${deviceName(device)}
            </option>`
          )}
        </select>
      </div>
      <div class="field">
        <label>Shell</label>
        <select
          @change=${(e: Event) =>
            this.emit({ shell: (e.target as HTMLSelectElement).value as Shell })}
        >
          ${(
            [
              ["grey", "Grey (unknown)"],
              ["black", "Black"],
              ["white", "White"],
            ] as [Shell, string][]
          ).map(
            ([value, label]) =>
              html`<option value=${value} ?selected=${(this.config.shell ?? "grey") === value}>
                ${label}
              </option>`
          )}
        </select>
      </div>
    `;
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
