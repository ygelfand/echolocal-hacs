// A turn as a budget rather than two numbers.
//
// Wake, listen, think, reply: the band is the longest a turn can take, each phase takes its share of it,
// and the two handles are the timeouts. Dragging the first says how long somebody has to start speaking,
// the second how long Home Assistant has to answer — and it is obvious at a glance which of the two is
// eating the wait.
//
// It is also where a turn's history belongs once the device reports one, which is why the phases are
// drawn rather than listed.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import styles from "./turn.css";
import type { HomeAssistant } from "./types";

@customElement("echolocal-turn")
export class EchoLocalTurn extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;
  @property() listen = "";
  @property() think = "";

  @state() private held: Record<string, number> = {};

  render() {
    const listen = this.reading(this.listen);
    const think = this.reading(this.think);
    if (!listen || !think) return nothing;

    // The band is as long as both timeouts could be, so the phases keep their scale as they are dragged
    // rather than always filling it.
    const span = listen.max + think.max;
    const share = (value: number) => (value / span) * 100;

    return html`
      <div class="top">
        <div class="caption">A turn</div>
        <div class="total">
          longest <b>${(listen.value + think.value).toFixed(0)}s</b> of ${span.toFixed(0)}s
        </div>
      </div>

      <div class="band">
        <div class="phase wake">Wake</div>
        <div class="phase listen" style=${`flex:0 0 ${share(listen.value)}%`}>
          ${listen.value >= 3 ? "Listen" : ""}
        </div>
        <div class="phase think" style=${`flex:0 0 ${share(think.value)}%`}>
          ${think.value >= 3 ? "Think" : ""}
        </div>
        <div class="phase reply">Reply</div>

        ${this.grip(this.listen, listen, 64, share(listen.value))}
        ${this.grip(this.think, think, 64, share(listen.value) + share(think.value))}
      </div>

      <div class="legend">
        <span>Listening <b>${listen.value}s</b></span>
        <span>Thinking <b>${think.value}s</b></span>
      </div>
    `;
  }

  // The handle sits at the end of its phase, and dragging it measures from where that phase started.
  private grip(
    entityId: string,
    reading: Reading,
    offsetPx: number,
    at: number
  ) {
    return html`<div
      class="grip"
      style=${`left:calc(${offsetPx}px + ${at}% - ${(offsetPx * at) / 100}px)`}
      role="slider"
      aria-label=${entityId}
      aria-valuenow=${reading.value}
      @pointerdown=${(e: PointerEvent) => this.drag(e, entityId, reading)}
    ></div>`;
  }

  private drag(event: PointerEvent, entityId: string, reading: Reading) {
    const band = (event.currentTarget as HTMLElement).parentElement!;
    band.setPointerCapture(event.pointerId);

    const other = entityId === this.listen ? this.reading(this.think) : this.reading(this.listen);
    const before = entityId === this.think ? (this.reading(this.listen)?.value ?? 0) : 0;
    const span = (reading.max ?? 0) + (other?.max ?? 0);

    const to = (e: PointerEvent) => {
      const box = band.getBoundingClientRect();
      const wake = 64;
      const usable = box.width - wake;
      const share = Math.max(0, Math.min(1, (e.clientX - box.left - wake) / usable));

      const seconds = share * span - before;
      const stepped = Math.round(seconds / (reading.step || 1)) * (reading.step || 1);
      return Math.max(reading.min, Math.min(reading.max, stepped));
    };

    const move = (e: PointerEvent) => {
      this.held = { ...this.held, [entityId]: to(e) };
    };

    const drop = (e: PointerEvent) => {
      band.removeEventListener("pointermove", move);
      band.removeEventListener("pointerup", drop);
      band.removeEventListener("pointercancel", drop);

      const value = to(e);
      const { [entityId]: _drop, ...rest } = this.held;
      this.held = rest;
      this.hass.callService("number", "set_value", { entity_id: entityId, value });
    };

    band.addEventListener("pointermove", move);
    band.addEventListener("pointerup", drop);
    band.addEventListener("pointercancel", drop);
  }

  private reading(entityId: string): Reading | null {
    const state = this.hass?.states?.[entityId];
    if (!state) return null;

    const value = this.held[entityId] ?? Number(state.state);
    if (!Number.isFinite(value)) return null;

    return {
      value,
      min: state.attributes.min ?? 0,
      max: state.attributes.max ?? 30,
      step: state.attributes.step ?? 1,
    };
  }
}

interface Reading {
  value: number;
  min: number;
  max: number;
  step: number;
}
