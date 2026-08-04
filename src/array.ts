// The microphone array as one instrument, seen from above like the device itself: seven capsules lit by
// whichever mixing the device is using, the room's level as an arc around them, and the gate as a notch
// on that arc you can drag. Mode, level, threshold and mute in one picture instead of four rows.

import { LitElement, html, nothing, svg, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import styles from "./array.css";
import type { HomeAssistant } from "./types";

// How far above the floor the arc runs, and the sweep it runs over.
const SPAN = 26;
const FROM = 135;
const SWEEP = 270;

const CX = 100;
const CY = 100;
const ARC = 84;
const RING = 38;

@customElement("echolocal-array")
export class EchoLocalArray extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;
  @property() level = "";
  @property() floor = "";
  @property() gate = "";
  @property() mode = "";
  @property({ type: Boolean }) muted = false;

  @state() private held: number | null = null;

  render() {
    const level = this.number(this.level);
    const floor = this.number(this.floor);
    const gate = this.held ?? this.number(this.gate);
    if (level === null || floor === null || gate === null) return nothing;

    const mixing = this.hass.states[this.mode];
    const shape = pattern(mixing?.state);

    const top = Math.max(floor + SPAN, level + 3);
    const loud = clamp((level - floor) / (top - floor));
    const at = clamp(gate / (top - floor));
    const over = level >= floor + gate && !this.muted;

    return html`
      <div class="dial" @pointerdown=${this.grab}>
        <svg viewBox="0 0 200 200" role="img" aria-label="Microphone array">
          <path class="arc-bed" d=${sweep()} pathLength="100"></path>
          ${this.muted
            ? nothing
            : svg`<path
                class="arc-live"
                data-over=${String(over)}
                d=${sweep()}
                pathLength="100"
                stroke-dasharray=${`${loud * 100} 100`}
              ></path>`}
          ${this.muted ? nothing : notch(at)} ${shape === "beam" ? beam() : nothing}
          ${shape === "sum" ? spokes() : nothing} ${capsules(shape, this.muted)}
          ${this.muted
            ? svg`<path class="slash" d="M${CX - 30} ${CY + 30}L${CX + 30} ${CY - 30}"></path>`
            : nothing}
        </svg>
      </div>

      <div class="side">
        <div class="reading">
          ${this.muted
            ? html`<span class="now cut">Cut</span>`
            : html`<span class="now">${level.toFixed(1)}</span><span class="unit">dB</span>
                <span class="caption" data-over=${String(over)}>
                  ${over ? "Over the gate" : "Quiet"}
                </span>`}
        </div>

        <div class="modes">
          ${(mixing?.attributes.options ?? []).map(
            (option) => html`<button
              class="mode"
              data-on=${String(option === mixing?.state)}
              @click=${() =>
                this.hass.callService("select", "select_option", {
                  entity_id: this.mode,
                  option,
                })}
            >
              <svg viewBox="0 0 40 40">${mini(pattern(option))}</svg>
              <span>${option}</span>
            </button>`
          )}
        </div>

        <div class="gate">Gate <b>${gate} dB</b> over a floor of <b>${floor.toFixed(0)} dB</b></div>
      </div>
    `;
  }

  // The gate is dragged on the arc: where round the sweep the pointer is, is what it is set to.
  private grab = (event: PointerEvent) => {
    const dial = event.currentTarget as HTMLElement;
    dial.setPointerCapture(event.pointerId);

    const attrs = this.hass.states[this.gate]?.attributes ?? {};
    const min = attrs.min ?? 0;
    const max = attrs.max ?? 20;
    const step = attrs.step ?? 1;

    const floor = this.number(this.floor) ?? 0;
    const level = this.number(this.level) ?? 0;
    const top = Math.max(floor + SPAN, level + 3);

    const to = (e: PointerEvent) => {
      const box = dial.getBoundingClientRect();
      const x = e.clientX - box.left - box.width / 2;
      const y = e.clientY - box.top - box.height / 2;

      // Measured from the start of the sweep, clockwise, so the dead segment at the bottom does not
      // wrap around and jump the gate from one end to the other.
      let deg = (Math.atan2(y, x) * 180) / Math.PI - FROM;
      while (deg < 0) deg += 360;

      const share = clamp(Math.min(deg, SWEEP) / SWEEP);
      return Math.max(min, Math.min(max, Math.round((share * (top - floor)) / step) * step));
    };

    const move = (e: PointerEvent) => {
      this.held = to(e);
    };

    const drop = (e: PointerEvent) => {
      dial.removeEventListener("pointermove", move);
      dial.removeEventListener("pointerup", drop);
      dial.removeEventListener("pointercancel", drop);

      const value = to(e);
      this.held = null;
      this.hass.callService("number", "set_value", { entity_id: this.gate, value });
    };

    dial.addEventListener("pointermove", move);
    dial.addEventListener("pointerup", drop);
    dial.addEventListener("pointercancel", drop);
    this.held = to(event);
  };

  private number(entityId: string): number | null {
    const raw = Number(this.hass?.states?.[entityId]?.state);
    return Number.isFinite(raw) ? raw : null;
  }
}

// Which capsules a mixing uses. Read off the option's own words, and anything unrecognised lights them
// all, which is true of every mixing that is not the centre one alone.
function pattern(option?: string): "one" | "sum" | "beam" {
  const name = (option ?? "").toLowerCase();

  if (name.includes("center") || name.includes("centre")) return "one";
  if (name.includes("beam")) return "beam";
  return "sum";
}

function capsules(shape: "one" | "sum" | "beam", muted: boolean) {
  const dots = [
    [CX, CY],
    ...Array.from({ length: 6 }, (_, i) => {
      const a = ((-90 + i * 60) * Math.PI) / 180;
      return [CX + RING * Math.cos(a), CY + RING * Math.sin(a)];
    }),
  ];

  return dots.map(([x, y], i) =>
    svg`<circle class="capsule" data-on=${String(!muted && (shape !== "one" || i === 0))}
      cx=${x.toFixed(1)} cy=${y.toFixed(1)} r=${i === 0 ? 7 : 5.5}></circle>`
  );
}

// The same seven capsules at badge size, for the option each mixing is.
function mini(shape: "one" | "sum" | "beam") {
  const dots = [
    [20, 20],
    ...Array.from({ length: 6 }, (_, i) => {
      const a = ((-90 + i * 60) * Math.PI) / 180;
      return [20 + 12 * Math.cos(a), 20 + 12 * Math.sin(a)];
    }),
  ];

  return svg`
    ${
      shape === "beam"
        ? svg`<path class="beam" d="M20 20C9 11 13 1 20 1C27 1 31 11 20 20Z"></path>`
        : nothing
    }
    ${dots.map(
      ([x, y], i) =>
        svg`<circle class="capsule" data-on=${String(shape !== "one" || i === 0)}
          cx=${x.toFixed(1)} cy=${y.toFixed(1)} r=${i === 0 ? 3.4 : 2.6}></circle>`
    )}`;
}

function spokes() {
  return Array.from({ length: 6 }, (_, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return svg`<line class="spoke" x1=${CX} y1=${CY}
      x2=${(CX + RING * Math.cos(a)).toFixed(1)} y2=${(CY + RING * Math.sin(a)).toFixed(1)}></line>`;
  });
}

// A lobe pointing where the beamformer looks.
function beam() {
  return svg`<path class="beam" d="M${CX} ${CY}C${CX - 34} ${CY - 30} ${CX - 24} ${CY - 66} ${CX} ${
    CY - 66
  }C${CX + 24} ${CY - 66} ${CX + 34} ${CY - 30} ${CX} ${CY}Z"></path>`;
}

function sweep() {
  const a0 = (FROM * Math.PI) / 180;
  const a1 = ((FROM + SWEEP) * Math.PI) / 180;

  return `M${(CX + ARC * Math.cos(a0)).toFixed(2)} ${(CY + ARC * Math.sin(a0)).toFixed(2)}
    A${ARC} ${ARC} 0 1 1 ${(CX + ARC * Math.cos(a1)).toFixed(2)} ${(
    CY + ARC * Math.sin(a1)
  ).toFixed(2)}`;
}

function notch(share: number) {
  const a = ((FROM + share * SWEEP) * Math.PI) / 180;
  const inner = ARC - 8;
  const outer = ARC + 8;

  return svg`<line class="notch"
    x1=${(CX + inner * Math.cos(a)).toFixed(1)} y1=${(CY + inner * Math.sin(a)).toFixed(1)}
    x2=${(CX + outer * Math.cos(a)).toFixed(1)} y2=${(CY + outer * Math.sin(a)).toFixed(1)}></line>`;
}

function clamp(v: number) {
  return Math.max(0, Math.min(1, v));
}
