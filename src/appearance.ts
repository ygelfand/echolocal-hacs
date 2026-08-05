// What the ring shows, and when.
//
// Four things pick an animation: the ring at rest, and the three situations that take it over — muted, a
// failure, and following the room. They were four dropdowns over the same forty names. Here the situation
// is chosen first and the list belongs to whichever is selected, so there is one list on screen instead
// of four, and what each situation currently shows is visible without opening anything.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import styles from "./appearance.css";
import type { HomeAssistant } from "./types";

interface Situation {
  key: string;
  label: string;
  icon: string;
  entity?: string;
}

@customElement("echolocal-appearance")
export class EchoLocalAppearance extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;
  @property() light = "";
  @property() muted = "";
  @property() failure = "";
  @property() room = "";

  @state() private target = "rest";

  render() {
    const light = this.hass.states[this.light];
    if (!light) return nothing;

    const situations = this.situations();
    const chosen = situations.find((s) => s.key === this.target) ?? situations[0];
    const brightness = (light.attributes.brightness as number | undefined) ?? 255;

    return html`
      <div class="dim">
        <span>Brightness</span>
        <ha-control-slider
          min="1"
          max="255"
          .value=${brightness}
          .disabled=${light.state !== "on"}
          @value-changed=${(e: CustomEvent<{ value: number }>) =>
            this.hass.callService("light", "turn_on", {
              entity_id: this.light,
              brightness: e.detail.value,
            })}
        ></ha-control-slider>
        <b>${Math.round((brightness / 255) * 100)}%</b>
      </div>

      <div class="when">
        ${situations.map(
          (situation) => html`<button
            class="situation"
            data-on=${String(situation.key === chosen.key)}
            @click=${() => (this.target = situation.key)}
          >
            <ha-icon .icon=${situation.icon}></ha-icon>
            <div class="text">
              <div class="label">${situation.label}</div>
              <div class="shows">${this.showing(situation) || "—"}</div>
            </div>
          </button>`
        )}
      </div>

      <div class="caption">${chosen.label} shows</div>
      <ha-control-select-menu
        .options=${this.options(chosen).map((value) => ({ value, label: value }))}
        .value=${this.showing(chosen)}
        .label=${chosen.label}
        hide-label
        show-arrow
        @wa-select=${(e: CustomEvent<{ item?: { value?: string } }>) => {
          const name = e.detail.item?.value;
          if (name) this.choose(chosen, name);
        }}
      ></ha-control-select-menu>
    `;
  }

  // The ring at rest is the light's own effect; the rest are selects, each carrying its own list — the
  // room's animations are not the same set as the others.
  private situations(): Situation[] {
    const all: Situation[] = [
      { key: "rest", label: "At rest", icon: "mdi:record-circle-outline" },
      { key: "muted", label: "Muted", icon: "mdi:microphone-off", entity: this.muted },
      { key: "failure", label: "On failure", icon: "mdi:alert-circle-outline", entity: this.failure },
      { key: "room", label: "Follows the room", icon: "mdi:motion-sensor", entity: this.room },
    ];

    return all.filter((s) => s.key === "rest" || (s.entity && this.hass.states[s.entity]));
  }

  // Home Assistant drops a light's effect while it is off, so at rest has nothing to report then. Saying
  // None would be a lie: it is not that no animation is chosen, it is that the ring is not lit.
  private showing(situation: Situation): string {
    if (situation.entity) return this.hass.states[situation.entity]?.state ?? "";

    const light = this.hass.states[this.light];
    if (light?.state !== "on") return "";
    return (light.attributes.effect as string) ?? "";
  }

  private options(situation: Situation): string[] {
    const from = situation.entity
      ? this.hass.states[situation.entity]?.attributes.options
      : this.hass.states[this.light]?.attributes.effect_list;

    return (from as string[] | undefined) ?? [];
  }

  private choose(situation: Situation, name: string) {
    if (!situation.entity) {
      this.hass.callService("light", "turn_on", { entity_id: this.light, effect: name });
      return;
    }
    this.hass.callService("select", "select_option", {
      entity_id: situation.entity,
      option: name,
    });
  }
}
