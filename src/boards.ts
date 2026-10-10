export type Lens = "round" | "square";

export type Look = { shape: "dot" } | { shape: "show"; lens: Lens; width: number };

const LOOKS: Record<string, Look> = {
  biscuit: { shape: "dot" },
  checkers: { shape: "show", lens: "round", width: 300 },
  cronos: { shape: "show", lens: "square", width: 300 },
  crown: { shape: "show", lens: "round", width: 360 },
};

export function lookOf(board: string): Look {
  return LOOKS[board] ?? LOOKS.biscuit;
}

export function isBoard(name?: string | null): name is string {
  return !!name && name in LOOKS;
}
