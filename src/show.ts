import { svg, type SVGTemplateResult } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import type { Lens } from "./boards";

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
  lens: Lens;
  screen: Screen;
  muted: boolean;
  covered: boolean;

  // Which of the picture's controls are drawn. Absent, or a flag left off, keeps the control.
  controls?: { volume?: boolean; mute?: boolean; camera?: boolean };
}

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

const SHOW: Box = { x: 27, y: 33, w: 186, h: 93 };

export interface PanelState {
  picture: string;
  box: Box;
  screen: Screen;
  muted: boolean;
}

export function panel(state: PanelState, tap: () => void): SVGTemplateResult {
  const view = state.picture.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 320 190";
  const inner = state.picture.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");

  return svg`
    <svg viewBox=${view} role="img" aria-label="Display">
      ${unsafeSVG(inner)}
      ${display(state.screen, state.box, state.muted, tap)}
    </svg>
  `;
}

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

  const controls = state.controls ?? {};
  const volume = controls.volume !== false;
  const mute = controls.mute !== false;
  const camera = controls.camera !== false;

  return svg`
    <svg viewBox="0 0 240 150" role="img" aria-label="Echo Show">
      ${volume ? key(140, svg`<path d="M-3 0h6"></path>`, "Volume down", () => tap.volume(-1)) : ""}
      ${volume ? key(166, svg`<path d="M-3 0h6M0 -3v6"></path>`, "Volume up", () => tap.volume(1)) : ""}
      ${mute
        ? key(
            192,
            svg`<path d="M-1.6 -2.6a1.6 1.6 0 0 1 3.2 0v1.8a1.6 1.6 0 0 1-3.2 0z"></path>
              <path d="M-2.8 -0.6a2.8 2.8 0 0 0 5.6 0"></path>`,
            state.muted ? "Microphone muted" : "Microphone live",
            tap.mute,
            state.muted
          )
        : ""}

      <rect x="4" y="14" width="232" height="130" rx="16" fill="var(--el-shell)"></rect>
      <rect x="4" y="14" width="232" height="130" rx="16" fill="none" stroke="var(--el-edge)"></rect>
      <rect x="11" y="21" width="218" height="116" rx="10" fill="var(--el-glass)"></rect>

      ${display(screen, SHOW, state.muted, tap.screen)}

      ${camera ? lens(state.lens, state.covered, tap.camera) : ""}
    </svg>
  `;
}

function display(screen: Screen, box: Box, muted: boolean, tap: () => void) {
  const scale = box.h / SHOW.h;

  return svg`<g class="screen" role="button" tabindex="0" aria-label="Screen" @click=${tap}>
    <rect x=${box.x} y=${box.y} width=${box.w} height=${box.h} rx="2" fill=${screen.palette.background}></rect>
    ${face(screen, box, scale)}
    <rect
      x=${box.x}
      y=${box.y}
      width=${box.w}
      height=${box.h}
      rx="2"
      fill="#000"
      style="opacity:${(1 - screen.lit) * 0.7}"
    ></rect>
    <rect
      class="bar"
      data-muted=${String(muted)}
      x=${box.x}
      y=${box.y + box.h - 3 * scale}
      width=${box.w}
      height=${3 * scale}
    ></rect>
  </g>`;
}

function face(screen: Screen, box: Box, scale: number) {
  const size = (CLOCK[screen.size] ?? CLOCK.Medium) * scale;
  const lines = screen.date ? size * 0.42 : 0;
  const block = size * 0.8 + lines;
  const middle = box.x + box.w / 2;

  let top: number;
  if (screen.place === "Top") top = box.y + 8 * scale;
  else if (screen.place === "Bottom") top = box.y + box.h - 12 * scale - block;
  else top = box.y + (box.h - block) / 2;

  const lineY = screen.place === "Bottom" ? box.y + 12 * scale : box.y + box.h - 9 * scale;
  const most = Math.round((44 * box.w) / (SHOW.w * scale));

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
          style="font-size:${6.5 * scale}px;fill:${screen.palette.muted}"
        >${clip(screen.line, most)}</text>`
      : ""}
  `;
}

function lens(shape: Lens, covered: boolean, tap: () => void) {
  const hole = {
    round: svg`<circle cx="0" cy="0" r="3.4"></circle>`,
    square: svg`<rect x="-3.2" y="-3.2" width="6.4" height="6.4" rx="0.8"></rect>`,
    wide: svg`<rect x="-6" y="-2.8" width="12" height="5.6" rx="1.2"></rect>`,
  }[shape];

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
