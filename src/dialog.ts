// A popup for one component of a satellite.
//
// Which control a row gets comes from its domain and its attributes, never from its name: a number is a
// slider with its unit and range, a select with few options is chips, a switch is a switch. Anything
// without a control of its own shows its value and opens Home Assistant's own dialog.

import { LitElement, html, nothing, unsafeCSS, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import "./array";
import "./bubble";
import styles from "./dialog.css";
import "./appearance";
import { helpFor, helpForWidget } from "./help";
import type { Widget } from "./layout";
import "./history";
import "./playback";
import "./turn";
import type { HomeAssistant, Row, Section } from "./types";

@customElement("echolocal-dialog")
export class EchoLocalDialog extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;
  @property() heading = "";
  @property() subtitle = "";
  @property() icon = "";
  @property({ attribute: false }) sections: Section[] = [];
  @property({ attribute: false }) widgets: Widget[] = [];

  // The device's own name, which the actions it offers are named after — not its registry id.
  @property() device = "";

  // Its mac, which is how a turn says which device it came from.
  @property() mac = "";

  // Whether each setting gets a "?" explaining it. On unless the card says otherwise: most of these are
  // not guessable from their names, and somebody who already knows can turn them off once.
  @property({ type: Boolean }) help = true;

  // What this whole component is for, which no single row can say.
  @property() about = "";

  // While a slider is being dragged its own value wins, so an incoming state does not fight the thumb.
  @state() private held: Record<string, number> = {};

  render() {
    // Filtered against the states that exist, not against what the layout asked for: an entity that is
    // disabled or gone should take its heading with it rather than leaving an empty section.
    const groups = this.sections
      .map((section) => ({
        ...section,
        rows: section.rows.filter((row) => this.hass.states?.[row.entityId]),
      }))
      .filter((section) => section.rows.length);

    // Only the width; the stylesheet decides how many columns fit. A couple of rows gets the narrow
    // sheet so it reads as a panel.
    const rows = groups.reduce((n, g) => n + g.rows.length, 0);
    const width = rows > 3 || this.widgets.some((w) => w.place !== "header") ? 820 : 460;

    // ha-dialog wraps wa-dialog and takes its width from this one variable, capped against the viewport
    // on its own. Sizing the sheet inside it only overflows the surface, which clips the second column.
    const sizing = `--ha-dialog-width-md:${width}px`;

    return html`
      <ha-dialog open hideActions style=${sizing} @closed=${this.dismiss}>
        <div class="sheet">
          <div class="head">
            <div class="crest"><ha-icon .icon=${this.icon}></ha-icon></div>
            <div class="titles">
              <div class="title">
                ${this.heading}
                ${this.help && this.about
                  ? html`<echolocal-bubble .text=${this.about}></echolocal-bubble>`
                  : nothing}
              </div>
              ${this.subtitle ? html`<div class="subtitle">${this.subtitle}</div>` : nothing}
            </div>
            ${this.widgets.filter((w) => w.place === "header").map((w) => this.widget(w))}
          </div>
          ${this.widgets.filter((w) => w.place !== "header").map((w) => this.explained(w))}
          <div class="groups">
            ${groups.length
              ? groups.map((section) => this.group(section))
              : this.widgets.length
                ? nothing
                : html`<div class="empty">Nothing to show here.</div>`}
          </div>
        </div>
      </ha-dialog>
    `;
  }

  // The return type is annotated so a widget added to the union without a case here fails to compile.
  private widget({ widget, roles, lists }: Widget): TemplateResult {
    const one = (list?: string[]) => list?.[0] ?? "";

    switch (widget) {
      case "appearance":
        return html`<echolocal-appearance
          class="hero"
          .hass=${this.hass}
          .light=${roles.light}
          .muted=${one(lists.muted)}
          .failure=${one(lists.failure)}
          .room=${one(lists.room)}
        ></echolocal-appearance>`;

      case "array":
        return html`<echolocal-array
          class="hero"
          .hass=${this.hass}
          .level=${roles.level}
          .floor=${roles.floor}
          .gate=${roles.gate}
          .mode=${roles.mode}
          .muted=${this.muted}
        ></echolocal-array>`;

      case "history":
        return html`<echolocal-history
          class="hero"
          .hass=${this.hass}
          .wake=${roles.wake}
          .heard=${roles.heard ?? ""}
          .reply=${roles.reply ?? ""}
          .device=${this.device}
          .mac=${this.mac}
        ></echolocal-history>`;

      case "turn":
        return html`<echolocal-turn
          class="hero"
          .hass=${this.hass}
          .listen=${roles.listen}
          .think=${roles.think}
        ></echolocal-turn>`;

      case "volume":
        return html`<echolocal-volume
          class="hero"
          .hass=${this.hass}
          .player=${roles.player}
          .jack=${one(lists.jack)}
        ></echolocal-volume>`;

      case "noise":
        return html`<echolocal-noise
          class="hero"
          .hass=${this.hass}
          .layers=${lists.layers ?? []}
        ></echolocal-noise>`;

      case "player":
        return this.crownPlayer(roles.player);

      case "power":
        return this.crownPower(roles.light);

      case "mute":
        return this.crownMute(roles.mute, roles.lamp);
    }
  }

  // Play and pause in the header, since a player that is playing is the first thing about it.
  private crownPlayer(player: string): TemplateResult {
    const state = this.hass.states[player];
    const playing = state?.state === "playing";
    const sound = state?.attributes.is_volume_muted !== true;

    return html`<div class="crown">
      <ha-icon-button
        .label=${playing ? "Pause" : "Play"}
        @click=${() =>
          this.hass.callService("media_player", playing ? "media_pause" : "media_play", {
            entity_id: player,
          })}
      >
        <ha-icon .icon=${playing ? "mdi:pause" : "mdi:play"}></ha-icon>
      </ha-icon-button>
      ${this.crownSwitch(sound, "Sound", (on) =>
        this.hass.callService("media_player", "volume_mute", {
          entity_id: player,
          is_volume_muted: !on,
        })
      )}
    </div>`;
  }

  private crownPower(light: string): TemplateResult {
    return html`<div class="crown">
      ${this.crownSwitch(this.hass.states[light]?.state === "on", "Ring", (on) =>
        this.hass.callService("light", on ? "turn_on" : "turn_off", { entity_id: light })
      )}
    </div>`;
  }

  // A lamp setting belongs to the switch it lights, not to a section of its own further down.
  private crownMute(mute: string, lamp: string): TemplateResult {
    const indicator = this.hass.states[lamp];

    return html`<div class="crown">
      ${indicator
        ? html`<ha-control-select
            class="lamp"
            .options=${(indicator.attributes.options ?? []).map((value) => ({
              value,
              label: value,
            }))}
            .value=${indicator.state}
            label="Mute indicator"
            @value-changed=${(e: CustomEvent<{ value: string }>) =>
              this.hass.callService("select", "select_option", {
                entity_id: lamp,
                option: e.detail.value,
              })}
          ></ha-control-select>`
        : nothing}
      ${this.crownSwitch(
        this.hass.states[mute]?.state === "on",
        "Microphone mute",
        (on) => this.hass.callService("switch", on ? "turn_on" : "turn_off", { entity_id: mute }),
        "warn"
      )}
    </div>`;
  }

  private crownSwitch(on: boolean, label: string, write: (on: boolean) => void, tone = "") {
    return html`<ha-control-switch
      class=${tone}
      .checked=${on}
      .label=${label}
      @change=${(e: Event) => write((e.target as HTMLInputElement).checked)}
    ></ha-control-switch>`;
  }

  // Whether the microphones are cut, which more than one widget needs to know.
  private get muted(): boolean {
    const mute = this.widgets.find((w) => w.roles.mute)?.roles.mute;
    return !!mute && this.hass.states[mute]?.state === "on";
  }

  // A widget replaces several rows, so its "?" goes in its corner rather than on any one of them.
  private explained(spec: Widget) {
    const said = this.help ? helpForWidget(spec.widget) : undefined;
    if (!said) return this.widget(spec);

    return html`<div class="explained">
      ${this.widget(spec)}
      <echolocal-bubble class="corner" .text=${said}></echolocal-bubble>
    </div>`;
  }

  private group(section: Section) {
    return html`<section class="group">
      ${section.title ? html`<div class="section">${section.title}</div>` : nothing}
      ${section.rows.map((row) => this.row(row))}
    </section>`;
  }

  private row(row: Row): TemplateResult | typeof nothing {
    if (!this.hass.states?.[row.entityId]) return nothing;

    switch (row.entityId.split(".")[0]) {
      case "switch":
        return this.toggle(row, "switch");
      case "light":
        return this.toggle(row, "light");
      case "number":
        return this.slider(row);
      case "select":
        return this.options(row);
      case "button":
        return this.press(row);
      case "update":
        return this.version(row);
      default:
        return this.reading(row);
    }
  }

  // An update entity's state is on when something newer exists, which on its own reads as "Firmware off".
  // The version installed is what somebody wants to see, and the newer one is the button that takes it.
  private version(row: Row) {
    const state = this.hass.states[row.entityId];
    const installed = state.attributes.installed_version;
    const latest = state.attributes.latest_version;

    return this.tile(row, false, {
      trail: state.attributes.in_progress
        ? html`<ha-spinner size="tiny"></ha-spinner>`
        : html`<button class="reading" @click=${() => this.moreInfo(row.entityId)}>
              ${installed ? String(installed) : state.state}
            </button>
            ${state.state === "on"
              ? html`<ha-button
                  size="small"
                  @click=${() =>
                    this.hass.callService("update", "install", { entity_id: row.entityId })}
                >
                  ${String(latest)}
                </ha-button>`
              : nothing}`,
    });
  }

  private toggle(row: Row, domain: string) {
    const { entityId, label } = row;
    const value = this.hass.states[entityId].state;

    return this.tile(row, value === "on", {
      trail: html`<ha-control-switch
        .checked=${value === "on"}
        .disabled=${value === "unavailable"}
        .label=${label}
        @change=${(e: Event) =>
          this.hass.callService(
            domain,
            (e.target as HTMLInputElement).checked ? "turn_on" : "turn_off",
            { entity_id: entityId }
          )}
      ></ha-control-switch>`,
    });
  }

  private slider(row: Row) {
    const { entityId } = row;
    const state = this.hass.states[entityId];
    const attrs = state.attributes;
    const min = attrs.min ?? 0;
    const max = attrs.max ?? 100;
    const value = this.held[entityId] ?? Number(state.state);

    return this.tile(row, false, {
      trail: html`<span class="reading">${Number.isNaN(value) ? "—" : value}</span>
        ${attrs.unit_of_measurement
          ? html`<span class="unit">${attrs.unit_of_measurement}</span>`
          : nothing}`,
      under: html`<ha-control-slider
        .value=${value}
        .min=${min}
        .max=${max}
        .step=${attrs.step ?? 1}
        .unit=${attrs.unit_of_measurement ?? ""}
        .disabled=${state.state === "unavailable"}
        @slider-moved=${(e: CustomEvent<{ value: number }>) => {
          this.held = { ...this.held, [entityId]: e.detail.value };
        }}
        @value-changed=${(e: CustomEvent<{ value: number }>) => {
          const { [entityId]: _drop, ...rest } = this.held;
          this.held = rest;
          this.hass.callService("number", "set_value", {
            entity_id: entityId,
            value: e.detail.value,
          });
        }}
      ></ha-control-slider>`,
    });
  }

  // Segmented while the names fit across a column, a menu once they do not: thirty-eight ring effects
  // as segments would be a wall. What counts as fitting is the text, not the count.
  private options(row: Row) {
    const { entityId } = row;
    const state = this.hass.states[entityId];
    const names = state.attributes.options ?? [];
    const choices = names.map((value) => ({ value, label: value }));

    const pick = (option?: string) => {
      if (option && option !== state.state) {
        this.hass.callService("select", "select_option", { entity_id: entityId, option });
      }
    };

    // "Band limited / Linear / Repeat samples" is thirty-two characters and still fits beside its name in
    // a column of a wide popup; a fifth option or a longer set does not.
    const disabled = state.state === "unavailable";
    const segmented = names.length <= 4 && names.join("").length <= 36;

    return this.tile(row, false, {
      trail: segmented
        ? html`<ha-control-select
            .options=${choices}
            .value=${state.state}
            .disabled=${disabled}
            .label=${row.label}
            @value-changed=${(e: CustomEvent<{ value: string }>) => pick(e.detail.value)}
          ></ha-control-select>`
        : html`<ha-control-select-menu
            .options=${choices}
            .value=${state.state}
            .disabled=${disabled}
            .label=${row.label}
            hide-label
            show-arrow
            @wa-select=${(e: CustomEvent<{ item?: { value?: string } }>) =>
              pick(e.detail.item?.value)}
          ></ha-control-select-menu>`,
    });
  }

  private press(row: Row) {
    return this.tile(row, false, {
      trail: html`<ha-button
        size="small"
        @click=${() => this.hass.callService("button", "press", { entity_id: row.entityId })}
      >
        Run
      </ha-button>`,
    });
  }

  private reading(row: Row) {
    const state = this.hass.states[row.entityId];
    const unit = state.attributes.unit_of_measurement;

    return this.tile(row, false, {
      trail: html`<button class="reading" @click=${() => this.moreInfo(row.entityId)}>
          ${state.state}
        </button>
        ${unit ? html`<span class="unit">${unit}</span>` : nothing}`,
    });
  }

  private tile(
    { entityId, label, name }: Row,
    active: boolean,
    parts: { trail?: unknown; under?: unknown }
  ) {
    const icon = this.hass.states[entityId].attributes.icon;
    const alert = active && icon?.includes("mic") && icon.includes("off");
    const said = this.help ? helpFor(name) : undefined;

    return html`<div class="tile" data-active=${String(active && !alert)} data-alert=${String(!!alert)}>
      <div class="top">
        <div class="icon"><ha-icon .icon=${icon ?? "mdi:tune"}></ha-icon></div>
        <div class="named">
          <div class="name">${label}</div>
          ${said ? html`<echolocal-bubble .text=${said}></echolocal-bubble>` : nothing}
        </div>
        ${parts.trail ? html`<div class="trail">${parts.trail}</div>` : nothing}
      </div>
      ${parts.under ?? nothing}
    </div>`;
  }

  private moreInfo(entityId: string) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true })
    );
  }

  private dismiss() {
    this.dispatchEvent(new CustomEvent("closed", { bubbles: true, composed: true }));
  }
}
