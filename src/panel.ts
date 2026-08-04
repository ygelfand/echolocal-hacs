// The dashboard: a tab bar over whatever the subpath asks for. The blank imports are the tab list.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { go, match, pathOf, tabs, type Tab } from "./nav";
import styles from "./panel.css";
import type { HomeAssistant, Route } from "./types";

import "./tabs/home";
import "./tabs/groups";
import "./tabs/activity";
import "./tabs/health";
import "./tabs/words";

@customElement("echolocal-panel")
export class EchoLocalPanel extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Boolean }) narrow = false;
  @property({ attribute: false }) route?: Route;
  @property({ attribute: false }) panel?: unknown;

  // Where the panel thinks it is when nothing tells it. Home Assistant's router normally does, but the
  // preview has no router and a tab still has to open.
  @state() private at = "";

  // One element per tab, kept rather than rebuilt, so a tab holds its scroll position and whatever it has
  // loaded while the panel re-renders around it.
  private made = new Map<string, HTMLElement>();

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("location-changed", this.moved);
    window.addEventListener("popstate", this.moved);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("location-changed", this.moved);
    window.removeEventListener("popstate", this.moved);
  }

  render() {
    if (!this.hass) return nothing;

    const admin = !!this.hass.user?.is_admin;
    const shown = tabs(admin);
    const here = match(this.where(), admin);

    return html`
      <header>
        <div class="bar">${shown.map((tab) => this.button(tab, tab === here))}</div>
      </header>
      <div class="page">${here ? this.body(here) : nothing}</div>
    `;
  }

  private button(tab: Tab, here: boolean) {
    return html`<button
      data-here=${String(here)}
      @click=${() => {
        this.at = tab.path;
        go(this.base(), tab.path);
      }}
    >
      <ha-icon .icon=${tab.icon}></ha-icon><span>${tab.title}</span>
    </button>`;
  }

  private body(tab: Tab): HTMLElement {
    let made = this.made.get(tab.path);

    if (!made) {
      made = document.createElement(tab.element);
      this.made.set(tab.path, made);
    }

    (made as HTMLElement & { hass: HomeAssistant }).hass = this.hass;
    (made as HTMLElement & { narrow: boolean }).narrow = this.narrow;
    return made;
  }

  private where(): string {
    // The route is the router's answer and wins; this.at is what a click set, which is all there is when
    // nothing is routing.
    return this.route ? pathOf(this.base(), this.route.path) : this.at;
  }

  // Not "prefix": HTMLElement has one of those already.
  private base(): string {
    return this.route?.prefix ?? "/echolocal";
  }

  private moved = () => {
    this.at = pathOf(this.base(), undefined);
    this.requestUpdate();
  };
}
