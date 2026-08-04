// Activity: every device's turns in one list, from the live event. It fills as turns happen; the recorder
// holds no timings, so there is no past to load.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { TURN_EVENT, fromEvent, phases, total, type Turn } from "../contract";
import { register } from "../nav";
import "../recording";
import { deviceName, findSatellites } from "../satellite";
import type { HomeAssistant } from "../types";
import styles from "./activity.css";

register({ path: "activity", title: "Activity", icon: "mdi:timeline-text-outline", element: "echolocal-activity", order: 20 });

const MOST = 60;

interface Seen {
  at: number;
  turn: Turn;
}

@customElement("echolocal-activity")
export class EchoLocalActivity extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;

  @state() private seen: Seen[] = [];
  @state() private only = "";
  @state() private asked = false;

  private stop?: () => void;

  protected updated() {
    if (this.asked || !this.hass) return;

    this.asked = true;
    this.listen();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stop?.();
  }

  render() {
    if (!this.hass) return nothing;

    const names = this.names();
    const shown = this.only ? this.seen.filter((one) => one.turn.mac === this.only) : this.seen;
    const longest = Math.max(1, ...shown.map((one) => total(one.turn)));

    return html`
      ${this.seen.length > 0 && Object.keys(names).length > 1
        ? html`<div class="filters">
            <button data-on=${String(!this.only)} @click=${() => (this.only = "")}>Everything</button>
            ${[...new Set(this.seen.map((one) => one.turn.mac))].map(
              (mac) => html`<button
                data-on=${String(this.only === mac)}
                @click=${() => (this.only = mac)}
              >
                ${names[mac] ?? mac}
              </button>`
            )}
          </div>`
        : nothing}

      ${shown.length
        ? html`<div class="legend">
              ${[
                ["wake_ms", "Wake"],
                ["listen_ms", "Listen"],
                ["think_ms", "Think"],
                ["speak_ms", "Reply"],
              ].map(
                ([key, label]) => html`<span class="key"
                  ><span class="dot slice" data-phase=${key}></span>${label}</span
                >`
              )}
            </div>
            <div class="turns">${shown.map((one) => this.row(one, names, longest))}</div>`
        : html`<div class="none">
            Nothing yet. Turns appear here as they happen, across every device — the timings come from the
            device rather than from the recorder, so there is no past to load.
          </div>`}
    `;
  }

  private row(one: Seen, names: Record<string, string>, longest: number) {
    const spans = phases(one.turn);
    const took = total(one.turn);
    const bad = one.turn.outcome !== "completed";
    const who = names[one.turn.mac] ?? "elsewhere";

    return html`<div class="turn">
      <div class="when">${clock(one.at)}</div>
      <div class="who">${who}</div>
      <div class="said">${one.turn.heard || one.turn.wake_word}</div>
      <div class="right">
        <div class="took" data-bad=${String(bad)}>
          ${bad ? one.turn.outcome : `${(took / 1000).toFixed(1)}s`}
        </div>
        ${one.turn.audio_seconds
          ? html`<echolocal-recording
              .hass=${this.hass}
              .device=${who}
              .turn=${one.turn.id}
              .filename=${filename(one, who)}
            ></echolocal-recording>`
          : nothing}
      </div>
      ${spans.length
        ? html`<div class="bar">
            ${spans.map(
              (phase) => html`<div
                class="slice"
                data-phase=${phase.key}
                title=${`${phase.label} ${phase.ms} ms`}
                style=${`flex:0 0 ${(phase.ms / longest) * 100}%`}
              ></div>`
            )}
          </div>`
        : nothing}
    </div>`;
  }

  // A turn names its device by mac, so the display name comes from the registry. Lower case throughout,
  // which is how Home Assistant normalises one.
  private names(): Record<string, string> {
    const out: Record<string, string> = {};

    for (const device of findSatellites(this.hass)) {
      const mac = device.connections?.find(([kind]) => kind === "mac")?.[1];
      if (mac) out[mac.toLowerCase()] = deviceName(device);
    }
    return out;
  }

  private async listen() {
    if (!this.hass.connection) return;

    try {
      this.stop = await this.hass.connection.subscribeEvents<Record<string, string>>((message) => {
        const turn = fromEvent(message.data);
        if (!turn) return;

        this.seen = [{ at: Date.now(), turn }, ...this.seen].slice(0, MOST);
      }, TURN_EVENT);
    } catch {
      // No event bus. The empty state already says what that means.
    }
  }
}

// Across a fleet the device belongs in the filename, which the per-device history has no need of.
function filename(one: Seen, who: string): string {
  const stamp = new Date(one.at).toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return `${stamp}-${slug(who)}-${slug(one.turn.wake_word)}.wav`;
}

function clock(at: number): string {
  return new Date(at).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}
