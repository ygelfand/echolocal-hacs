// The last few turns: what woke the device, what it heard, what it said back, how long each phase took,
// and the recording if there is one.
//
// Two sources, deliberately. A turn the device reported carries the durations, the outcome and whether
// there is audio, and shows its bar and its play button. The three sensors echod publishes are the floor
// under that: the recorder has them whether or not anything ever read a turn, so a device on a firmware
// that reports none still says what was said.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { phases, total, type Turn } from "./contract";
import { streamTurns } from "./turns";
import styles from "./history.css";
import "./recording";
import type { HomeAssistant } from "./types";

export interface Row {
  at: number;
  wake: string;
  heard?: string;
  reply?: string;
  turn?: Turn;
}

const DAYS = 14;

@customElement("echolocal-history")
export class EchoLocalHistory extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;

  // What the device calls itself, which the action to fetch a recording is named after — not what anybody
  // renamed it to. When the device does not offer that action there is nothing to play, and the buttons
  // stay away.
  @property() device = "";

  // Home Assistant's registry id, which is how the logbook is asked for this device's turns.
  @property() deviceId = "";

  @state() private live: Row[] = [];
  @state() private asked = false;
  @state() private loading = true;

  private stop?: () => void;

  protected updated() {
    if (this.asked || !this.hass || !this.deviceId) return;

    this.asked = true;
    this.listen();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stop?.();
  }

  render() {
    const turns = this.merged();
    const bars = turns.some((row) => row.turn && phases(row.turn).length > 0);

    return html`
      <div class="caption">
        Recent turns
        ${turns.length ? html`<span>${turns.length === 1 ? "1 turn" : `${turns.length} turns`}</span>` : nothing}
      </div>
      ${bars
        ? html`<div class="legend">
            ${[
              ["listen_ms", "Listen"],
              ["think_ms", "Think"],
              ["speak_ms", "Reply"],
            ].map(
              ([key, label]) => html`<span class="key"
                ><span class="dot slice" data-phase=${key}></span>${label}</span
              >`
            )}
          </div>`
        : nothing}
      ${turns.length
        ? html`<div class="turns">${turns.map((turn) => this.row(turn, this.scale(turns)))}</div>`
        : this.loading
          ? html`<div class="loading"><ha-spinner size="medium"></ha-spinner></div>`
          : html`<div class="none">No recent activity found.</div>`}
    `;
  }

  // Every bar is drawn against the slowest turn on show, so their lengths mean something next to each
  // other: a bar normalised to its own total fills the row whether the turn took two seconds or ten.
  private scale(rows: Row[]): number {
    return Math.max(1, ...rows.map((row) => (row.turn ? total(row.turn) : 0)));
  }

  private row(row: Row, longest: number) {
    const turn = row.turn;
    const spans = turn ? phases(turn) : [];
    const took = turn ? total(turn) : 0;
    return html`<div class="turn">
      <div class="when">${clock(row.at)}</div>
      <div class="wake">${row.wake}</div>
      <div class="right">
        ${turn
          ? html`<div class="outcome" data-bad=${String(turn.outcome !== "completed")}>
              ${turn.outcome === "completed" ? `${(took / 1000).toFixed(1)}s` : turn.outcome}
            </div>`
          : nothing}
        ${turn?.audio_seconds
          ? html`<echolocal-recording
              .hass=${this.hass}
              .device=${this.device}
              .turn=${turn.id}
              .filename=${filename(row)}
            ></echolocal-recording>`
          : nothing}
      </div>
      ${row.heard ? html`<div class="said">${row.heard}</div>` : nothing}
      ${row.reply ? html`<div class="said-back">${row.reply}</div>` : nothing}
      ${spans.length
        ? html`<div class="bar">
            ${spans.map(
              (phase) => html`<div
                class="slice"
                data-phase=${phase.key}
                title=${`${phase.label} ${phase.ms} ms`}
                style=${`flex:0 0 ${(phase.ms / longest) * 100}%`}
              >
                ${(phase.ms / 1000).toFixed(1)}s
              </div>`
            )}
          </div>`
        : nothing}
    </div>`;
  }

  private merged(): Row[] {
    return [...this.live].sort((a, b) => b.at - a.at);
  }

  // One subscription for what the recorder holds and what happens next, in that order and without
  // overlapping: the logbook drops a live event older than the history it just sent.
  private async listen() {
    const since = new Date(Date.now() - DAYS * 86_400_000);
    const devices = this.deviceId ? [this.deviceId] : [];

    try {
      this.stop = await streamTurns(this.hass, since, devices, (turns) => {
        this.loading = false;
        if (!turns.length) return;
        this.live = [
          ...turns.map(({ at, turn }) => ({
            at,
            wake: turn.wake_word,
            heard: turn.heard,
            reply: turn.reply,
            turn,
          })),
          ...this.live,
        ];
      });
    } catch {
      this.loading = false;
    }
  }

}


function clock(at: number): string {
  return new Date(at).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

// A saved recording is worth naming by when it happened and what woke the device, not by whatever the
// device called it.
function filename(row: Row): string {
  const stamp = new Date(row.at).toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const wake = row.wake.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `${stamp}-${wake}.wav`;
}
