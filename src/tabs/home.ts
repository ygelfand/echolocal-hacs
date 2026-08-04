// Home: every satellite as the same card, grouped or flat.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import type { EchoLocalSatelliteCard } from "../card";
import { UNGROUPED, group, labels, type Group } from "../groups";
import { register } from "../nav";
import { findSatellites } from "../satellite";
import type { HassLabel, HomeAssistant } from "../types";

import "../groupbar";
import styles from "./home.css";

register({ path: "", title: "Home", icon: "mdi:view-grid-outline", element: "echolocal-home", order: 0 });

// Which view somebody last chose, kept in the browser rather than in the config entry: it is a preference
// about looking, not about the house, and two people at two screens should not fight over it.
const REMEMBER = "echolocal:home:grouped";

@customElement("echolocal-home")
export class EchoLocalHome extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Boolean }) narrow = false;

  @state() private known: HassLabel[] = [];
  @state() private asked = false;
  @state() private grouped = localStorage.getItem(REMEMBER) !== "no";

  private cards = new Map<string, EchoLocalSatelliteCard>();

  protected updated() {
    if (this.asked || !this.hass) return;

    this.asked = true;
    this.load();
  }

  render() {
    if (!this.hass) return nothing;

    const found = findSatellites(this.hass);
    if (!found.length) {
      return html`<div class="empty">
        No EchoLocal devices yet. One appears here once Home Assistant has adopted it over the ESPHome
        integration.
      </div>`;
    }

    const groups = group(found, this.known);

    // Nothing grouped is not a grouping, so it is drawn as a plain grid with no heading over it and the
    // choice of views is not offered — a toggle between two identical screens is worse than no toggle.
    if (groups.length === 1 && groups[0].id === UNGROUPED) {
      return html`<div class="grid">${found.map((device) => this.card(UNGROUPED, device.id))}</div>`;
    }

    return html`
      <div class="view">
        <div class="pair">
          ${this.button(true, "mdi:group", "Grouped")}${this.button(false, "mdi:view-grid-outline", "All")}
        </div>
      </div>
      ${this.grouped
        ? groups.map((one) => this.group(one))
        : html`<div class="grid">${found.map((device) => this.card("all", device.id))}</div>`}
    `;
  }

  private button(grouped: boolean, icon: string, label: string) {
    return html`<button
      data-on=${String(this.grouped === grouped)}
      @click=${() => {
        this.grouped = grouped;
        localStorage.setItem(REMEMBER, grouped ? "yes" : "no");
      }}
    >
      <ha-icon .icon=${icon}></ha-icon>${label}
    </button>`;
  }

  private group(one: Group) {
    return html`<div class="group">
      <echolocal-groupbar .hass=${this.hass} .group=${one}></echolocal-groupbar>
      <div class="grid">${one.devices.map((device) => this.card(one.id, device.id))}</div>
    </div>`;
  }

  // Keyed by group as well as device, because labels overlap: a device in two groups has to draw in both,
  // and one element cannot be in two places — appending it to the second takes it out of the first.
  private card(groupId: string, deviceId: string): EchoLocalSatelliteCard {
    const key = `${groupId}/${deviceId}`;
    let card = this.cards.get(key);

    if (!card) {
      card = document.createElement("echolocal-satellite-card") as unknown as EchoLocalSatelliteCard;
      card.setConfig({ device_id: deviceId });
      this.cards.set(key, card);
    }
    card.hass = this.hass;
    return card;
  }

  private async load() {
    this.known = await labels(this.hass);
  }
}
