// A Dot from above: the light ring around the edge, and the four buttons on the top — volume up, action,
// volume down and the microphone, clockwise from the top as they sit on the real thing.

import { svg, type SVGTemplateResult } from "lit";

export const SEGMENTS = 12;

const GAP = 2.2;
const CX = 100;
const CY = 100;

export interface Segment {
  fill: string;
  opacity: number;
}

export interface ArtState {
  segments: Segment[];
  glow: number;
  muted: boolean;

  // The action button is lit once a press has become a hold, so which assistant it will wake is visible
  // before letting go.
  holding: boolean;

  // Which segment is being given a colour, if any, and whether any of them can be: the twelve entities
  // ship disabled, so on most devices the ring is not divisible and tapping it opens its light instead.
  picked: number | null;
  divisible: boolean;

  // What the room measures, for the middle of the top face, which the four buttons leave empty. Null on
  // a device with no light sensor.
  lux: Lux | null;
}

export interface Lux {
  value: number;

  // 0 to 1, how warm the reading is drawn.
  lit: number;
}

// How long a press has to last to count as a hold, as on the device: a quick press wakes the first
// assistant, a hold the second. The card keeps the timer, since a re-render here would lose it.
export const HOLD = 500;

export function art(
  state: ArtState,
  tap: {
    ring: () => void;
    segment: (i: number) => void;
    action: (phase: "down" | "up" | "cancel") => void;
    mute: () => void;
    volume: (step: number) => void;
  }
): SVGTemplateResult {
  const paths = Array.from({ length: SEGMENTS }, (_, i) => {
    const from = -90 + (360 / SEGMENTS) * i + GAP / 2;
    const to = -90 + (360 / SEGMENTS) * (i + 1) - GAP / 2;
    return annulus(93, 82, from, to);
  });

  return svg`
    <svg viewBox="0 0 200 200" role="img" aria-label="Echo Dot">
      <defs>
        <radialGradient id="top" cx="38%" cy="30%" r="78%">
          <stop offset="0%" stop-color="var(--el-top-high)"></stop>
          <stop offset="100%" stop-color="var(--el-top)"></stop>
        </radialGradient>
        <filter id="blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4"></feGaussianBlur>
        </filter>
      </defs>

      <circle cx=${CX} cy=${CY} r="97" fill="var(--el-shell)"></circle>
      <circle cx=${CX} cy=${CY} r="97" fill="none" stroke="var(--el-edge)" stroke-width="1"></circle>

      <g class="halo" filter="url(#blur)" style="opacity:${state.glow}">
        ${paths.map(
          (d, i) => svg`<path d=${d} style="fill:${
            state.segments[i].opacity ? state.segments[i].fill : "transparent"
          }"></path>`
        )}
      </g>

      ${paths.map(
        (d, i) => svg`<path
          class="segment"
          data-picked=${String(state.picked === i)}
          data-divisible=${String(state.divisible)}
          d=${d}
          style="fill:${state.segments[i].fill};opacity:${state.segments[i].opacity}"
          @click=${state.divisible ? () => tap.segment(i) : tap.ring}
        ></path>`
      )}

      <circle cx=${CX} cy=${CY} r="79" fill="url(#top)"></circle>
      <circle cx=${CX} cy=${CY} r="79" fill="none" stroke="var(--el-edge)" stroke-width="1"></circle>

      ${state.lux
        ? svg`<text
            class="lux"
            x=${CX}
            y=${CY + 5}
            text-anchor="middle"
            style="--lit:${state.lux.lit}"
          >${Math.round(state.lux.value)}<tspan class="unit" dx="3.5">lx</tspan></text>`
        : ""}


      ${button(CX, CY - 46, svg`<path d="M-4.5 0h9M0 -4.5v9"></path>`, "Volume up", () =>
        tap.volume(1)
      )}
      <g
        class="btn"
        data-lit=${String(state.holding)}
        transform="translate(${CX + 46} ${CY})"
        role="button"
        tabindex="0"
        aria-label=${state.holding ? "Wake the second assistant" : "Wake"}
        @pointerdown=${() => tap.action("down")}
        @pointerup=${() => tap.action("up")}
        @pointerleave=${() => tap.action("cancel")}
        @pointercancel=${() => tap.action("cancel")}
      >
        <circle class="face" cx="0" cy="0" r="13"></circle>
        <g class="glyph"><circle cx="0" cy="0" r="4.5"></circle></g>
      </g>
      ${button(CX, CY + 46, svg`<path d="M-4.5 0h9"></path>`, "Volume down", () => tap.volume(-1))}
      ${button(
        CX - 46,
        CY,
        micOff(state.muted),
        state.muted ? "Microphone muted" : "Microphone live",
        tap.mute,
        state.muted
      )}
    </svg>
  `;
}

function button(
  x: number,
  y: number,
  glyph: SVGTemplateResult,
  label: string,
  tap: () => void,
  lit = false
) {
  return svg`<g class="btn" data-lit=${String(lit)} transform="translate(${x} ${y})"
    role="button" tabindex="0" aria-label=${label} @click=${tap}>
    <circle class="face" cx="0" cy="0" r="13"></circle>
    <g class="glyph">${glyph}</g>
  </g>`;
}

function micOff(muted: boolean) {
  return svg`
    <path d="M-2.6 -5.2a2.6 2.6 0 0 1 5.2 0v4a2.6 2.6 0 0 1-5.2 0z"></path>
    <path d="M-4.6 -0.6a4.6 4.6 0 0 0 9.2 0"></path>
    <path d="M0 3.8v2.6"></path>
    ${muted ? svg`<path d="M-6.4 6.4L6.4 -6.4"></path>` : nothingPath()}
  `;
}

function nothingPath() {
  return svg``;
}

// annulus is one segment of the ring: an arc out at the rim, an arc back at the inner edge.
function annulus(outer: number, inner: number, from: number, to: number): string {
  const at = (r: number, deg: number) => {
    const a = (deg * Math.PI) / 180;
    return [(CX + r * Math.cos(a)).toFixed(2), (CY + r * Math.sin(a)).toFixed(2)];
  };

  const [x0, y0] = at(outer, from);
  const [x1, y1] = at(outer, to);
  const [x2, y2] = at(inner, to);
  const [x3, y3] = at(inner, from);

  return `M${x0} ${y0}A${outer} ${outer} 0 0 1 ${x1} ${y1}L${x2} ${y2}A${inner} ${inner} 0 0 0 ${x3} ${y3}Z`;
}
