import amber from "./devices/amber.svg";
import blueberry from "./devices/blueberry.svg";
import ivy from "./devices/ivy.svg";
import opal from "./devices/opal.svg";
import penghu from "./devices/penghu.svg";
import type { Box } from "./show";

export type Lens = "round" | "square" | "wide";

export type Look =
  | { shape: "dot"; body?: boolean }
  | { shape: "show"; lens: Lens; width: number }
  | { shape: "panel"; picture: string; width: number; screen: Box };

const LOOKS: Record<string, Look> = {
  athena: { shape: "show", lens: "wide", width: 360 },
  biscuit: { shape: "dot" },
  radar: { shape: "dot", body: true },
  checkers: { shape: "show", lens: "round", width: 300 },
  cronos: { shape: "show", lens: "square", width: 300 },
  crown: { shape: "show", lens: "round", width: 360 },
  amber: { shape: "panel", picture: amber, width: 340, screen: { x: 104, y: 61, w: 175, h: 108 } },
  blueberry: { shape: "panel", picture: blueberry, width: 380, screen: { x: 98, y: 24, w: 202, h: 142 } },
  ivy: { shape: "panel", picture: ivy, width: 320, screen: { x: 80, y: 24, w: 160, h: 92 } },
  opal: { shape: "panel", picture: opal, width: 340, screen: { x: 96, y: 62, w: 128, h: 80 } },
  penghu: { shape: "panel", picture: penghu, width: 380, screen: { x: 104, y: 61, w: 175, h: 108 } },
};

export function lookOf(board: string): Look {
  return LOOKS[board] ?? LOOKS.biscuit;
}

export function isBoard(name?: string | null): name is string {
  return !!name && name in LOOKS;
}
