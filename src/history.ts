// The last few turns: what woke the device, what it heard, what it said back, how long each phase took,
// and the recording if there is one.
//
// Two sources, deliberately. Home Assistant's recorder already holds the three sensors echod publishes,
// so a history exists before the device reports anything — a wake word changing is a turn starting, and
// whatever the other two say before the next one belongs to it. The turns in contract.ts carry what state
// history cannot: the durations, the outcome, and whether there is audio. A row with one behind it shows
// its bar and its play button; a row rebuilt from the recorder shows neither.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { TURN_EVENT, fromEvent, phases, total, type Turn } from "./contract";
import styles from "./history.css";
import "./recording";
import type { HomeAssistant } from "./types";

interface Point {
  at: number;
  value: string;
}

export interface Row {
  at: number;
  wake: string;
  heard?: string;
  reply?: string;
  turn?: Turn;
}

const HOURS = 24;
const MOST = 12;

// Two turns within this of each other are the same turn seen twice: once as an event, once as the state
// changes the event caused.
const SAME_MS = 4000;

@customElement("echolocal-history")
export class EchoLocalHistory extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;
  @property() mac = "";
  @property() wake = "";
  @property() heard = "";
  @property() reply = "";

  // What the device calls itself, which the action to fetch a recording is named after — not what anybody
  // renamed it to. When the device does not offer that action there is nothing to play, and the buttons
  // stay away.
  @property() device = "";

  @state() private recorded: Row[] = [];
  @state() private live: Row[] = [];
  @state() private asked = false;

  private stop?: () => void;

  protected updated() {
    if (this.asked || !this.hass || !this.wake) return;

    this.asked = true;
    this.load();
    this.listen();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stop?.();
  }

  render() {
    const turns = this.merged();

    return html`
      <div class="caption">
        Recent turns ${turns.length ? html`<span>last ${HOURS} hours</span>` : nothing}
      </div>
      ${turns.length
        ? html`<div class="turns">${turns.map((turn) => this.row(turn, this.scale(turns)))}</div>`
        : html`<div class="none">${this.asked ? "Nothing in the last day." : "Looking…"}</div>`}
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
                ></div>`
              )}
            </div>
            <div class="legend">
              ${spans.map((phase) => html`<span>${phase.label} ${(phase.ms / 1000).toFixed(1)}s</span>`)}
            </div>`
        : nothing}
    </div>`;
  }

  // The device's own turns win where they overlap: they say everything the recorder does and more.
  private merged(): Row[] {
    const out = [...this.live];

    for (const row of this.recorded) {
      if (!out.some((seen) => Math.abs(seen.at - row.at) < SAME_MS)) out.push(row);
    }
    return out.sort((a, b) => b.at - a.at).slice(0, MOST);
  }

  private async load() {
    const ids = [this.wake, this.heard, this.reply].filter(Boolean);
    const start = new Date(Date.now() - HOURS * 3600_000).toISOString();

    try {
      const history = await this.hass.callWS<Record<string, RawPoint[]>>({
        type: "history/history_during_period",
        start_time: start,
        entity_ids: ids,
        minimal_response: true,
        no_attributes: true,
      });

      this.recorded = assemble(
        points(history[this.wake]),
        points(history[this.heard]),
        points(history[this.reply])
      );
    } catch {
      this.recorded = [];
    }
  }

  private async listen() {
    if (!this.hass.connection) return;

    try {
      this.stop = await this.hass.connection.subscribeEvents<Record<string, string>>((message) => {
        const turn = fromEvent(message.data);
        if (!turn) return;
        if (this.mac && turn.mac && turn.mac !== this.mac) return;

        this.live = [
          { at: Date.now(), wake: turn.wake_word, heard: turn.heard, reply: turn.reply, turn },
          ...this.live,
        ].slice(0, MOST);
      }, TURN_EVENT);
    } catch {
      // No event bus, or it refused: the recorder's version is still there.
    }
  }

}

interface RawPoint {
  s?: string;
  state?: string;
  lu?: number;
  last_updated?: string;
}

function points(raw?: RawPoint[]): Point[] {
  return (raw ?? [])
    .map((entry) => ({
      at: entry.lu ? entry.lu * 1000 : Date.parse(entry.last_updated ?? ""),
      value: entry.s ?? entry.state ?? "",
    }))
    .filter((point) => Number.isFinite(point.at) && real(point.value));
}

// assemble walks the wake words newest first, and for each takes the transcript and the reply that came
// after it but before the wake word after it — which is what belonging to a turn means here.
function assemble(wake: Point[], heard: Point[], reply: Point[]): Row[] {
  const ordered = [...wake].sort((a, b) => b.at - a.at);
  const forward = (list: Point[]) => [...list].sort((a, b) => a.at - b.at);

  return ordered.map((point, i) => {
    const next = ordered[i - 1]?.at ?? Infinity;
    const between = (list: Point[]) =>
      forward(list).find((entry) => entry.at >= point.at && entry.at < next)?.value;

    return { at: point.at, wake: point.value, heard: between(heard), reply: between(reply) };
  });
}

function real(value: string): boolean {
  return !!value && value !== "unknown" && value !== "unavailable" && value !== "None";
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
