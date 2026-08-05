// Activity: every device's turns in one list. The recorder keeps every turn a device reported, so this
// opens with the past already in it and then follows along.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { phases, total, type Turn } from "../contract";
import { register } from "../nav";
import "../recording";
import { deviceName, findSatellites } from "../satellite";
import { streamTurns } from "../turns";
import type { HomeAssistant } from "../types";
import styles from "./activity.css";

register({ path: "activity", title: "Activity", icon: "mdi:timeline-text-outline", element: "echolocal-activity", order: 20 });

const DAYS = 14;

// What a device is called, and what it calls itself.
interface Known {
  label: string;
  node: string;
}

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
    const shown = this.only ? this.seen.filter((one) => one.turn.device === this.only) : this.seen;
    const longest = Math.max(1, ...shown.map((one) => total(one.turn)));

    return html`
      ${this.seen.length > 0 && Object.keys(names).length > 1
        ? html`<div class="filters">
            <button data-on=${String(!this.only)} @click=${() => (this.only = "")}>Everything</button>
            ${[...new Set(this.seen.map((one) => one.turn.device))].map(
              (id) => html`<button
                data-on=${String(this.only === id)}
                @click=${() => (this.only = id)}
              >
                ${names[id]?.label ?? id}
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
            No turns in the last ${DAYS} days. They appear here as they happen, across every device.
          </div>`}
    `;
  }

  private row(one: Seen, names: Record<string, Known>, longest: number) {
    const spans = phases(one.turn);
    const took = total(one.turn);
    const bad = one.turn.outcome !== "completed";
    const known = names[one.turn.device];
    const who = known?.label ?? "elsewhere";

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
              .device=${known?.node ?? ""}
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

  // A turn names its device by registry id. What to call it and what the device calls itself are both
  // needed and are not the same: the second is what its actions are named after, and a rename leaves it.
  private names(): Record<string, Known> {
    const out: Record<string, Known> = {};

    for (const device of findSatellites(this.hass)) {
      out[device.id] = { label: deviceName(device), node: device.name ?? "" };
    }
    return out;
  }

  // Every device, so a turn from one Home Assistant knows about but this dashboard does not still shows.
  private async listen() {
    const since = new Date(Date.now() - DAYS * 86_400_000);

    try {
      this.stop = await streamTurns(this.hass, since, [], (turns) => {
        this.seen = [...turns, ...this.seen].sort((a, b) => b.at - a.at);
      });
    } catch {
      // No logbook, or nothing has taught it to read a turn. The empty state says what that means.
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
