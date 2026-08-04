// A group's header: name, count, and the controls that apply to every member.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from "./groupbar.css";
import { fanOut, reading, type Group } from "./groups";
import type { HomeAssistant } from "./types";

const MUTE = /_microphone_mute$/;
const RING = /_led_ring$/;
const PLAYER = /^media_player\./;

@customElement("echolocal-groupbar")
export class EchoLocalGroupBar extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) group!: Group;

  render() {
    if (!this.hass || !this.group) return nothing;

    const devices = this.group.devices;
    const mute = reading(this.hass, devices, MUTE);
    const ring = reading(this.hass, devices, RING);

    return html`<div class="bar">
      ${this.group.icon ? html`<ha-icon .icon=${this.group.icon}></ha-icon>` : nothing}
      <div class="name">${this.group.name}</div>
      <div class="count">${devices.length} ${devices.length === 1 ? "device" : "devices"}</div>
      <div class="spacer"></div>

      ${mute.entities.length
        ? this.toggle("mdi:microphone-off", "Mute all", mute, () =>
            this.write(MUTE, "switch", mute.value === "on" ? "turn_off" : "turn_on")
          )
        : nothing}
      ${ring.entities.length
        ? this.toggle("mdi:lightbulb-outline", "Ring", ring, () =>
            this.write(RING, "light", ring.value === "on" ? "turn_off" : "turn_on")
          )
        : nothing}
      ${this.has(PLAYER)
        ? html`<button title="Stop whatever is playing" @click=${() => this.write(PLAYER, "media_player", "media_stop")}>
            <ha-icon icon="mdi:stop"></ha-icon>Stop
          </button>`
        : nothing}
    </div>`;
  }

  private toggle(
    icon: string,
    label: string,
    state: { value: string | null; mixed: boolean },
    press: () => void
  ) {
    return html`<button data-on=${String(state.value === "on")} @click=${press}>
      <ha-icon .icon=${icon}></ha-icon>${label}
      ${state.mixed ? html`<span class="mixed">mixed</span>` : nothing}
    </button>`;
  }

  private has(match: RegExp): boolean {
    return reading(this.hass, this.group.devices, match).entities.length > 0;
  }

  private write(match: RegExp, domain: string, service: string) {
    return fanOut(this.hass, this.group.devices, match, (entityId) =>
      this.hass.callService(domain, service, { entity_id: entityId })
    );
  }
}
