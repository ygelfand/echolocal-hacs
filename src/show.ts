import { svg, type SVGTemplateResult } from "lit";

export type Lens = "round" | "square";

const LENS: Record<string, Lens> = {
  checkers: "round",
  cronos: "square",
};

export function lensOf(board: string): Lens | null {
  return LENS[board] ?? null;
}

export interface Palette {
  background: string;
  text: string;
  muted: string;
  accent: string;
}

export const THEMES: Record<string, Palette> = {
  Midnight: { background: "#0b0e14", text: "#e6edf3", muted: "#8b97a8", accent: "#4c9aff" },
  Nocturne: { background: "#11131a", text: "#e8e6e3", muted: "#9a97a3", accent: "#c8a2ff" },
  Slate: { background: "#14171c", text: "#dfe4ea", muted: "#8a929e", accent: "#5ec8c8" },
  Ember: { background: "#14100e", text: "#f3e7dd", muted: "#a8948a", accent: "#ff8c42" },
  Forest: { background: "#0e1512", text: "#dfeae2", muted: "#85998c", accent: "#5fbf8f" },
  Ocean: { background: "#081620", text: "#dceaf2", muted: "#7d9aa8", accent: "#36b6d6" },
  Plum: { background: "#150f1a", text: "#ece4f5", muted: "#9b8fae", accent: "#d86fd8" },
  Carbon: { background: "#000000", text: "#f2f2f2", muted: "#8c8c8c", accent: "#ffffff" },
  Paper: { background: "#f7f5f1", text: "#22252a", muted: "#6d7480", accent: "#2f6fdb" },
  Linen: { background: "#f3ece2", text: "#2b2622", muted: "#7b6f63", accent: "#b5652f" },
  Mist: { background: "#eef2f5", text: "#1f2933", muted: "#66737f", accent: "#2b93b6" },
  Bloom: { background: "#faf0f3", text: "#2e2329", muted: "#7d6a73", accent: "#d1547d" },
};

export const DEFAULT_THEME = "Paper";

export const INKS: Record<string, string> = {
  Amber: "#f2a63b",
  Red: "#e5544b",
  Green: "#4caf78",
  Cyan: "#35b8c4",
  Blue: "#4f8ef7",
  Violet: "#9a7bf0",
  Pink: "#e86aa6",
};

const CLOCK: Record<string, number> = {
  Nano: 9,
  Micro: 12,
  Mini: 15,
  Small: 19,
  Medium: 25,
  Large: 33,
};

export interface Screen {
  palette: Palette;
  ink: string;
  lit: number;
  time: string;
  date: string | null;
  size: string;
  place: string;
  line: string;
}

export interface ShowState {
  lens: Lens | null;
  screen: Screen;
  muted: boolean;
  covered: boolean;
}

const SX = 27;
const SY = 33;
const SW = 186;
const SH = 93;

export function show(
  state: ShowState,
  tap: {
    screen: () => void;
    camera: () => void;
    mute: () => void;
    volume: (step: number) => void;
  }
): SVGTemplateResult {
  const { screen } = state;

  return svg`
    <svg viewBox="0 0 240 150" role="img" aria-label="Echo Show">
      ${key(140, svg`<path d="M-3 0h6"></path>`, "Volume down", () => tap.volume(-1))}
      ${key(166, svg`<path d="M-3 0h6M0 -3v6"></path>`, "Volume up", () => tap.volume(1))}
      ${key(
        192,
        svg`<path d="M-1.6 -2.6a1.6 1.6 0 0 1 3.2 0v1.8a1.6 1.6 0 0 1-3.2 0z"></path>
          <path d="M-2.8 -0.6a2.8 2.8 0 0 0 5.6 0"></path>`,
        state.muted ? "Microphone muted" : "Microphone live",
        tap.mute,
        state.muted
      )}

      <rect x="4" y="14" width="232" height="130" rx="16" fill="var(--el-shell)"></rect>
      <rect x="4" y="14" width="232" height="130" rx="16" fill="none" stroke="var(--el-edge)"></rect>
      <rect x="11" y="21" width="218" height="116" rx="10" fill="var(--el-glass)"></rect>

      <g class="screen" role="button" tabindex="0" aria-label="Screen" @click=${tap.screen}>
        <rect x=${SX} y=${SY} width=${SW} height=${SH} rx="2" fill=${screen.palette.background}></rect>
        ${face(screen)}
        <rect
          x=${SX}
          y=${SY}
          width=${SW}
          height=${SH}
          rx="2"
          fill="#000"
          style="opacity:${(1 - screen.lit) * 0.7}"
        ></rect>
        <rect
          class="bar"
          data-muted=${String(state.muted)}
          x=${SX}
          y=${SY + SH - 3}
          width=${SW}
          height="3"
        ></rect>
      </g>

      ${lens(state.lens, state.covered, tap.camera)}
    </svg>
  `;
}

function face(screen: Screen) {
  const size = CLOCK[screen.size] ?? CLOCK.Medium;
  const lines = screen.date ? size * 0.42 : 0;
  const block = size * 0.8 + lines;
  const middle = SX + SW / 2;

  let top: number;
  if (screen.place === "Top") top = SY + 8;
  else if (screen.place === "Bottom") top = SY + SH - 12 - block;
  else top = SY + (SH - block) / 2;

  const lineY = screen.place === "Bottom" ? SY + 12 : SY + SH - 9;

  return svg`
    <text
      class="clock"
      x=${middle}
      y=${top + size * 0.8}
      text-anchor="middle"
      style="font-size:${size}px;fill:${screen.ink}"
    >${screen.time}</text>
    ${screen.date
      ? svg`<text
          class="date"
          x=${middle}
          y=${top + block}
          text-anchor="middle"
          style="font-size:${size * 0.3}px;fill:${screen.palette.muted}"
        >${screen.date}</text>`
      : ""}
    ${screen.line
      ? svg`<text
          class="line"
          x=${middle}
          y=${lineY}
          text-anchor="middle"
          style="fill:${screen.palette.muted}"
        >${clip(screen.line, 44)}</text>`
      : ""}
  `;
}

function lens(shape: Lens | null, covered: boolean, tap: () => void) {
  if (!shape) return "";

  const hole =
    shape === "round"
      ? svg`<circle cx="0" cy="0" r="3.4"></circle>`
      : svg`<rect x="-3.2" y="-3.2" width="6.4" height="6.4" rx="0.8"></rect>`;

  return svg`<g
    class="lens"
    data-covered=${String(covered)}
    transform="translate(203 27)"
    role="button"
    tabindex="0"
    aria-label=${covered ? "Camera covered" : "Camera"}
    @click=${tap}
  >
    <circle class="hit" cx="0" cy="0" r="8" fill="transparent"></circle>
    ${hole}
  </g>`;
}

function key(
  x: number,
  glyph: SVGTemplateResult,
  label: string,
  tap: () => void,
  lit = false
) {
  return svg`<g class="btn key" data-lit=${String(lit)} transform="translate(${x} 12)"
    role="button" tabindex="0" aria-label=${label} @click=${tap}>
    <rect class="hit" x="-13" y="-12" width="26" height="18" fill="transparent"></rect>
    <rect class="face" x="-11" y="-5" width="22" height="9" rx="4.5"></rect>
    <g class="glyph" transform="translate(0 -0.5)">${glyph}</g>
  </g>`;
}

function clip(text: string, most: number): string {
  return text.length > most ? `${text.slice(0, most - 1)}…` : text;
}
