// Fleet: one page over every Echo, so a change is made once.
//
// Every row is a setting the device popups already know, gathered across the devices in scope: the
// value they agree on, or "mixed" where they do not. Changing one writes to every device in scope
// that has it — except a device set to Local, whose own values take precedence and are never
// written here; its pill on the card is what says so. Nothing here is stored — the devices hold
// their own values, as ever.

import { LitElement, html, nothing, unsafeCSS, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { group, isLocal, labels, LOCAL_READY } from "../groups";
import { helpFor } from "../help";
import { KEYS_READY } from "../keys";
import { GLOBAL, named } from "../layout";
import { register } from "../nav";
import { deviceName, findSatellites, resolve } from "../satellite";
import type { HassDevice, HassLabel, HomeAssistant, HassState, Kind } from "../types";

import "../bubble";
import styles from "./settings.css";
import pills from "../pills.css";

register({
  path: "fleet",
  title: "Fleet",
  icon: "mdi:tune-variant",
  element: "echolocal-settings",
  order: 1,
  admin: true,
});

// Which devices a change reaches. "" is every satellite; otherwise it is one label's members.
const SCOPE = "echolocal:settings:scope";

// What this page changes: a value every device can hold. Buttons are one-shot actions, updates are
// firmware installs and lights are the ring — none of those is a setting to set everywhere.
const CHANGEABLE = new Set(["switch", "select", "number", "text", "time"]);

const ICON: Record<Kind, string> = {
  ring: "mdi:record-circle-outline",
  microphone: "mdi:microphone",
  playback: "mdi:speaker",
  screen: "mdi:monitor",
  poster: "mdi:image-multiple",
  camera: "mdi:camera",
  assistant: "mdi:account-voice",
  device: "mdi:cog-outline",
  diagnostics: "mdi:stethoscope",
  activity: "mdi:timeline-text-outline",
};

const TITLE: Record<Kind, string> = {
  ring: "Ring",
  microphone: "Microphone",
  playback: "Playback",
  screen: "Screen",
  poster: "Posters",
  camera: "Camera",
  assistant: "Assistant",
  device: "Device",
  diagnostics: "Diagnostics",
  activity: "Activity",
};

// One setting, across every device in scope. Cells keep a device without the setting so the count can
// say "3 of 5" rather than quietly dropping the other two from the page.
interface Cell {
  device: HassDevice;
  entityId?: string;
  state?: HassState;
}

interface Setting {
  key: string;
  kind: Kind;
  section: string | null;
  name: string;
  label: string;
  domain: string;
  cells: Cell[];

  // The value every reachable device holds, or null where they disagree.
  value: string | null;
  mixed: boolean;

  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;

  // A credential is shown as dots here the same way the popup shows it.
  secret?: boolean;
}

@customElement("echolocal-settings")
export class EchoLocalSettings extends LitElement {
  static styles = [unsafeCSS(pills), unsafeCSS(styles)];

  @property({ attribute: false }) hass!: HomeAssistant;

  @state() private known: HassLabel[] = [];
  @state() private loaded = false;
  @state() private asked = false;
  @state() private scope = localStorage.getItem(SCOPE) ?? "";
  @state() private open: string | null = null;
  @state() private busy: string | null = null;
  @state() private said = "";

  // While a slider is dragged its own value wins, so an incoming state does not fight the thumb.
  @state() private held: Record<string, number> = {};

  private again = () => this.requestUpdate();
  private stop?: () => void;
  private timer?: number;

  connectedCallback() {
    super.connectedCallback();

    // Settings live under the names the integration answers with, groups live in the label registry,
    // and the Fleet/Local flag is a label too — all three are followed rather than read once.
    window.addEventListener(KEYS_READY, this.again);
    window.addEventListener(LOCAL_READY, this.again);
    this.hass?.connection
      ?.subscribeEvents(() => this.load(), "label_registry_updated")
      .then((off) => (this.stop = off))
      .catch(() => {});
  }

  disconnectedCallback() {
    window.removeEventListener(KEYS_READY, this.again);
    window.removeEventListener(LOCAL_READY, this.again);
    this.stop?.();
    window.clearTimeout(this.timer);
    super.disconnectedCallback();
  }

  protected updated() {
    if (this.asked || !this.hass) return;

    this.asked = true;
    this.load();
  }

  render() {
    if (!this.hass) return nothing;

    const devices = this.scoped();
    const rows = this.settings(devices);

    return html`
      ${this.filters(devices)}
      ${this.said ? html`<div class="said">${this.said}</div>` : nothing}
      ${!devices.length
        ? html`<div class="empty">No EchoLocal devices in this scope.</div>`
        : rows.length
          ? GLOBAL.map((kind) => this.kind(kind, rows))
          : html`<div class="empty">
              Nothing here: no device in scope carries a setting this page can change.
            </div>`}
    `;
  }

  private filters(devices: HassDevice[]) {
    // Only labels that hold a satellite earn a pill; an empty group is nothing to scope to.
    const groups = group(findSatellites(this.hass), this.known).filter(
      (one) => one.devices.length
    );

    return html`<div class="filters">
      ${this.pill("", "All devices", devices.length)}
      ${groups.map((one) => this.pill(one.id, one.name, one.devices.length))}
    </div>`;
  }

  private pill(id: string, name: string, count: number) {
    return html`<button
      data-on=${String(this.scope === id)}
      @click=${() => this.pick(id)}
    >
      ${name}<span class="count">${count}</span>
    </button>`;
  }

  private pick(id: string) {
    this.scope = id;
    this.open = null;
    localStorage.setItem(SCOPE, id);
  }

  private scoped(): HassDevice[] {
    const all = findSatellites(this.hass);

    // A deleted label leaves the remembered scope pointing at nothing; every device is the sensible
    // place to land rather than an empty page. Checked only once the registry has answered, or the
    // first render would read its own empty list as a deletion.
    if (
      this.loaded &&
      this.scope &&
      !this.known.some((one) => one.label_id === this.scope)
    ) {
      this.scope = "";
      return all;
    }

    if (!this.scope) return all;
    return all.filter((device) => (device.labels ?? []).includes(this.scope));
  }

  // The same settings the popups show, once per device-in-scope rather than once per device.
  private settings(devices: HassDevice[]): Setting[] {
    const trees = devices.map((device) => ({ device, mine: resolve(this.hass, device.id) }));
    const out: Setting[] = [];

    for (const { kind, section, name, label } of named()) {
      // Which slots this name has anywhere in scope. An unnumbered one is the first of whatever it
      // is — the first assistant's wake word, the first noise layer.
      const slots = new Set<number>();
      for (const { mine } of trees) {
        for (const entity of mine?.by.get(name) ?? []) slots.add(entity.slot || 1);
      }

      for (const slot of [...slots].sort((a, b) => a - b)) {
        const cells: Cell[] = trees.map(({ device, mine }) => {
          const entity = (mine?.by.get(name) ?? []).find((one) => (one.slot || 1) === slot);
          return { device, entityId: entity?.entity_id, state: entity && this.hass.states[entity.entity_id] };
        });

        const domain = cells.find((cell) => cell.entityId)?.entityId?.split(".")[0] ?? "";
        if (!CHANGEABLE.has(domain)) continue;

        const live = cells.filter((cell) => cell.state && cell.state.state !== "unavailable");
        if (!live.length) continue;

        const values = [...new Set(live.map((cell) => cell.state!.state))];
        const attrs = live[0].state!.attributes;

        out.push({
          key: `${name}:${slot}`,
          kind,
          section,
          name,
          label: slots.size > 1 ? `${label} ${slot}` : label,
          domain,
          cells,
          value: values.length === 1 ? values[0] : null,
          mixed: values.length > 1,
          options: attrs.options,
          min: attrs.min,
          max: attrs.max,
          step: attrs.step,
          unit: attrs.unit_of_measurement,
          secret: attrs.mode === "password",
        });
      }
    }

    return out;
  }

  private kind(kind: Kind, rows: Setting[]) {
    const mine = rows.filter((row) => row.kind === kind);
    if (!mine.length) return nothing;

    const sections: (string | null)[] = [];
    for (const row of mine) if (!sections.includes(row.section)) sections.push(row.section);

    return html`<div class="kind">
      <div class="head">
        <ha-icon .icon=${ICON[kind]}></ha-icon><span>${TITLE[kind]}</span>
      </div>
      <div class="columns">
        ${sections.map(
          (section) => html`<section class="group">
            ${section ? html`<div class="section">${section}</div>` : nothing}
            ${mine
              .filter((row) => row.section === section)
              .map((row) => this.row(row))}
          </section>`
        )}
      </div>
    </div>`;
  }

  private row(setting: Setting): TemplateResult {
    const said = helpFor(setting.name);
    const here = setting.cells.filter((cell) => cell.state).length;

    return html`<div class="tile">
      <div class="top">
        <div class="icon"><ha-icon .icon=${this.iconFor(setting)}></ha-icon></div>
        <div class="named">
          <div class="name">${setting.label}</div>
          ${said ? html`<echolocal-bubble .text=${said}></echolocal-bubble>` : nothing}
        </div>
        <div class="trail">${this.control(setting)}</div>
        <button
          class="fold"
          data-on=${String(this.open === setting.key)}
          aria-label="Which devices have what"
          @click=${() => (this.open = this.open === setting.key ? null : setting.key)}
        >
          <ha-icon
            .icon=${this.open === setting.key ? "mdi:chevron-up" : "mdi:chevron-down"}
          ></ha-icon>
        </button>
      </div>
      <div class="state">
        ${setting.mixed
          ? html`<span class="mix">mixed</span>`
          : html`<span class="agree">${this.shown(setting)}</span>`}
        <span class="count">${here} of ${setting.cells.length} devices</span>
      </div>
      ${this.open === setting.key ? this.list(setting) : nothing}
    </div>`;
  }

  // Which control a row gets comes from the domain, the same rule the popup follows.
  private control(setting: Setting): TemplateResult | typeof nothing {
    const busy = this.busy === setting.key;

    switch (setting.domain) {
      case "switch":
        return html`<ha-control-switch
          .checked=${setting.value === "on"}
          .disabled=${busy}
          .label=${setting.label}
          @change=${(e: Event) =>
            this.apply(setting, (e.target as HTMLInputElement).checked)}
        ></ha-control-switch>`;

      case "select":
        return this.picker(setting, busy);

      case "number":
        return this.slider(setting, busy);

      default:
        return nothing;
    }
  }

  // Two choices are a this-or-that and read as pills; more is a menu, however long.
  private picker(setting: Setting, busy: boolean) {
    const options = setting.options ?? [];

    if (options.length === 2) {
      return html`<div class="pills">
        ${options.map(
          (option) => html`<button
            class="pill"
            data-on=${String(option === setting.value)}
            ?disabled=${busy}
            @click=${() => this.apply(setting, option)}
          >
            ${option}
          </button>`
        )}
      </div>`;
    }

    return html`<ha-control-select-menu
      .options=${options.map((value) => ({ value, label: value }))}
      .value=${setting.value ?? ""}
      .disabled=${busy}
      .label=${setting.label}
      hide-label
      show-arrow
      @wa-select=${(e: CustomEvent<{ item?: { value?: string } }>) => {
        const picked = e.detail.item?.value;
        if (picked) this.apply(setting, picked);
      }}
    ></ha-control-select-menu>`;
  }

  private slider(setting: Setting, busy: boolean) {
    const current = this.held[setting.key] ?? Number(setting.value ?? setting.min ?? 0);

    return html`<ha-control-slider
      .value=${Number.isNaN(current) ? 0 : current}
      .min=${setting.min ?? 0}
      .max=${setting.max ?? 100}
      .step=${setting.step ?? 1}
      .unit=${setting.unit ?? ""}
      .disabled=${busy}
      @slider-moved=${(e: CustomEvent<{ value: number }>) => {
        this.held = { ...this.held, [setting.key]: e.detail.value };
      }}
      @value-changed=${(e: CustomEvent<{ value: number }>) => {
        const { [setting.key]: _drop, ...rest } = this.held;
        this.held = rest;
        this.apply(setting, e.detail.value);
      }}
    ></ha-control-slider>`;
  }

  // The per-device view: what each Echo holds, and which of them stand away from the rest. A device
  // set to Local wears the Local badge whether or not its value differs — the badge says why this
  // page cannot bring it into line, which is the whole point of it.
  private list(setting: Setting) {
    return html`<div class="who">
      ${setting.cells.map((cell) => {
        if (!cell.entityId || !cell.state) {
          return html`<div class="line">
            <span class="name">${deviceName(cell.device)}</span>
            <span class="gone">not on this device</span>
          </div>`;
        }

        const local = isLocal(this.hass, cell.device);
        const dead = cell.state.state === "unavailable";
        const differs = !dead && setting.value !== null && cell.state.state !== setting.value;

        return html`<div class="line" data-differs=${String(differs && !local)}>
          <span class="name">${deviceName(cell.device)}</span>
          ${dead
            ? html`<span class="gone">unavailable</span>`
            : html`<button
                class="reading"
                @click=${() => this.moreInfo(cell.entityId!)}
              >
                ${setting.secret ? "••••••" : cell.state.state}
              </button>`}
          ${local
            ? html`<span class="badge local">Local</span>`
            : differs
              ? html`<span class="badge">differs</span>`
              : nothing}
        </div>`;
      })}
    </div>`;
  }

  private shown(setting: Setting): string {
    if (setting.value === null) return "mixed";
    if (setting.secret) return "••••••";
    return setting.unit ? `${setting.value} ${setting.unit}` : setting.value;
  }

  private iconFor(setting: Setting): string {
    return this.hass.states[setting.cells.find((cell) => cell.entityId)?.entityId ?? ""]
      ?.attributes.icon ?? "mdi:tune";
  }

  // One change, every device in scope that has the setting — except the ones set to Local, whose own
  // values win and are left exactly as they are. Failures are counted rather than thrown, so one
  // unreachable Dot does not stop the rest of the room from changing.
  private async apply(setting: Setting, value: string | number | boolean) {
    if (this.busy) return;
    this.busy = setting.key;

    const present = setting.cells.filter(
      (cell) => cell.entityId && this.hass.states[cell.entityId]
    );
    const fleet = present.filter((cell) => !isLocal(this.hass, cell.device));
    const kept = present.length - fleet.length;

    let done = 0;
    let failed = 0;

    await Promise.all(
      fleet.map(async (cell) => {
        try {
          if (setting.domain === "switch") {
            await this.hass.callService("switch", value ? "turn_on" : "turn_off", {
              entity_id: cell.entityId,
            });
          } else if (setting.domain === "select") {
            await this.hass.callService("select", "select_option", {
              entity_id: cell.entityId,
              option: value,
            });
          } else {
            await this.hass.callService("number", "set_value", {
              entity_id: cell.entityId,
              value,
            });
          }
          done += 1;
        } catch {
          failed += 1;
        }
      })
    );

    const skipped = setting.cells.length - present.length;
    const parts = [`${done} set`];
    if (kept) parts.push(`${kept} Local kept`);
    if (failed) parts.push(`${failed} failed`);
    if (skipped) parts.push(`${skipped} without it`);
    this.said = `${setting.label}: ${parts.join(", ")}`;

    this.busy = null;
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => (this.said = ""), 5000);
  }

  private moreInfo(entityId: string) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true })
    );
  }

  private async load() {
    this.known = await labels(this.hass);
    this.loaded = true;
  }
}
