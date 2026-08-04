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
import { keys } from "./keys";
import type { Widget } from "./layout";
import "./history";
import "./playback";
import "./turn";
import type { HomeAssistant, Section } from "./types";

@customElement("echolocal-dialog")
export class EchoLocalDialog extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;
  @property() heading = "";
  @property() subtitle = "";
  @property() icon = "";
  @property({ attribute: false }) sections: Section[] = [];
  @property({ attribute: false }) widgets: Widget[] = [];
  @property({ attribute: false }) strip: string[] = [];

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
        entities: section.entities.filter((entityId) => this.hass.states?.[entityId]),
      }))
      .filter((section) => section.entities.length);

    // Only the width; the stylesheet decides how many columns fit. A couple of rows gets the narrow
    // sheet so it reads as a panel.
    const rows = groups.reduce((n, g) => n + g.entities.length, 0);
    const width = rows > 3 || this.widgets.some((w) => w.place !== "header") ? 820 : 460;

    // ha-dialog caps its own surface, so the width has to be set on the dialog's variables. Sizing the
    // sheet inside it only overflows the surface, which clips the right-hand column.
    const sizing = `--mdc-dialog-min-width:min(94vw,${width}px);--mdc-dialog-max-width:min(94vw,${width}px)`;

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
      <button
        class="round"
        aria-label=${playing ? "Pause" : "Play"}
        @click=${() =>
          this.hass.callService("media_player", playing ? "media_pause" : "media_play", {
            entity_id: player,
          })}
      >
        <ha-icon .icon=${playing ? "mdi:pause" : "mdi:play"}></ha-icon>
      </button>
      <button
        class="toggle big power"
        data-on=${String(sound)}
        aria-label="Sound"
        @click=${() =>
          this.hass.callService("media_player", "volume_mute", {
            entity_id: player,
            is_volume_muted: sound,
          })}
      ></button>
    </div>`;
  }

  private crownPower(light: string): TemplateResult {
    return html`<div class="crown">
      <button
        class="toggle big power"
        data-on=${String(this.hass.states[light]?.state === "on")}
        aria-label="Ring"
        @click=${() => this.hass.callService("light", "toggle", { entity_id: light })}
      ></button>
    </div>`;
  }

  // A lamp setting belongs to the switch it lights, not to a section of its own further down.
  private crownMute(mute: string, lamp: string): TemplateResult {
    const indicator = this.hass.states[lamp];

    return html`<div class="crown">
      ${indicator
        ? html`<div class="lamp" title="Mute indicator">
            <ha-icon icon="mdi:brightness-6"></ha-icon>
            ${(indicator.attributes.options ?? []).map(
              (option) => html`<button
                class="pip"
                data-on=${String(option === indicator.state)}
                @click=${() =>
                  this.hass.callService("select", "select_option", { entity_id: lamp, option })}
              >
                ${option}
              </button>`
            )}
          </div>`
        : nothing}
      <button
        class="toggle big"
        data-on=${String(this.hass.states[mute]?.state === "on")}
        aria-label="Microphone mute"
        @click=${() => this.hass.callService("switch", "toggle", { entity_id: mute })}
      ></button>
    </div>`;
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
      ${section.entities.map((entityId) => this.row(entityId))}
    </section>`;
  }

  private row(entityId: string): TemplateResult | typeof nothing {
    const state = this.hass.states?.[entityId];
    if (!state) return nothing;

    const domain = entityId.split(".")[0];
    const label = this.name(entityId);
    const icon = state.attributes.icon;

    switch (domain) {
      case "switch":
      case "light":
        return this.toggle(entityId, label, icon, domain);
      case "number":
        return this.slider(entityId, label, icon);
      case "select":
        return this.options(entityId, label, icon);
      case "button":
        return this.press(entityId, label, icon);
      default:
        return this.reading(entityId, label, icon);
    }
  }

  private toggle(entityId: string, label: string, icon: string | undefined, domain: string) {
    const value = this.hass.states[entityId].state;
    const on = value === "unavailable" ? "unavailable" : String(value === "on");

    return this.tile(entityId, label, icon, on === "true", {
      trail: html`<button
        class="toggle"
        data-on=${on}
        aria-label=${label}
        @click=${() => this.hass.callService(domain, "toggle", { entity_id: entityId })}
      ></button>`,
    });
  }

  private slider(entityId: string, label: string, icon: string | undefined) {
    const state = this.hass.states[entityId];
    const attrs = state.attributes;
    const min = attrs.min ?? 0;
    const max = attrs.max ?? 100;
    const value = this.held[entityId] ?? Number(state.state);
    const fill = max > min ? ((value - min) / (max - min)) * 100 : 0;

    return this.tile(entityId, label, icon, false, {
      trail: html`<span class="reading">${Number.isNaN(value) ? "—" : value}</span>
        ${attrs.unit_of_measurement
          ? html`<span class="unit">${attrs.unit_of_measurement}</span>`
          : nothing}`,
      under: html`<input
        type="range"
        style="--fill:${fill}%"
        .value=${String(value)}
        min=${min}
        max=${max}
        step=${attrs.step ?? 1}
        ?disabled=${state.state === "unavailable"}
        @input=${(e: Event) => {
          this.held = { ...this.held, [entityId]: Number((e.target as HTMLInputElement).value) };
        }}
        @change=${(e: Event) => {
          const next = Number((e.target as HTMLInputElement).value);
          const { [entityId]: _drop, ...rest } = this.held;
          this.held = rest;
          this.hass.callService("number", "set_value", { entity_id: entityId, value: next });
        }}
      />`,
    });
  }

  // Chips while there are few enough to see at once. A long list stays a dropdown: eleven noise sounds
  // as chips would be a wall.
  private options(entityId: string, label: string, icon: string | undefined) {
    const state = this.hass.states[entityId];
    const choices = state.attributes.options ?? [];
    const pick = (option: string) =>
      this.hass.callService("select", "select_option", { entity_id: entityId, option });

    // A long list stays a dropdown, under its label rather than beside it: in a column half a popup wide
    // there is no room next to the name, and a clipped option reads as a broken control.
    if (choices.length > 4) {
      return this.tile(entityId, label, icon, false, {
        under: html`<select
          ?disabled=${state.state === "unavailable"}
          @change=${(e: Event) => pick((e.target as HTMLSelectElement).value)}
        >
          ${choices.map(
            (option) =>
              html`<option value=${option} ?selected=${option === state.state}>${option}</option>`
          )}
        </select>`,
      });
    }

    const chips = html`<div class="options">
      ${choices.map(
        (option) => html`<button
          class="chip"
          data-on=${String(option === state.state)}
          @click=${() => pick(option)}
        >
          ${option}
        </button>`
      )}
    </div>`;

    // Short ones sit beside the label; a row of its own for two words is a wasted line. What counts as
    // short is the text, not the count: "Whole file" and "Streamed" fit where four long names would not.
    const room = choices.join("").length <= 22 && choices.length <= 3;
    return this.tile(entityId, label, icon, false, room ? { trail: chips } : { under: chips });
  }

  private press(entityId: string, label: string, icon: string | undefined) {
    return this.tile(entityId, label, icon, false, {
      trail: html`<button
        class="press"
        @click=${() => this.hass.callService("button", "press", { entity_id: entityId })}
      >
        Run
      </button>`,
    });
  }

  private reading(entityId: string, label: string, icon: string | undefined) {
    const state = this.hass.states[entityId];
    const unit = state.attributes.unit_of_measurement;

    return this.tile(entityId, label, icon, false, {
      trail: html`<button class="reading" @click=${() => this.moreInfo(entityId)}>
          ${state.state}
        </button>
        ${unit ? html`<span class="unit">${unit}</span>` : nothing}`,
    });
  }

  private tile(
    entityId: string,
    label: string,
    icon: string | undefined,
    active: boolean,
    parts: { trail?: unknown; under?: unknown }
  ) {
    const alert = active && icon?.includes("mic") && icon.includes("off");
    const said = this.help ? helpFor(keys(this.hass)?.get(entityId)?.key ?? "") : undefined;

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

  // The name the integration gave the entity, which carries no device or component prefix — so there is
  // nothing to strip. The friendly name is the fallback, and that one does need stripping.
  private name(entityId: string): string {
    const known = keys(this.hass)?.get(entityId);
    if (known) return known.name;

    let label = this.hass.states[entityId]?.attributes.friendly_name ?? entityId;
    const prefixes = this.strip.filter(Boolean).sort((a, b) => b.length - a.length);

    for (let peeled = true; peeled; ) {
      peeled = false;

      for (const prefix of prefixes) {
        if (label.toLowerCase().startsWith(`${prefix.toLowerCase()} `)) {
          label = label.slice(prefix.length + 1);
          peeled = true;
          break;
        }
      }
    }
    return label.charAt(0).toUpperCase() + label.slice(1);
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
