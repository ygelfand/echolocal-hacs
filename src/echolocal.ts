// One bundle for both: the integration loads it on every dashboard for the card, and points the sidebar
// panel at the same file so the browser reuses this module rather than defining the elements twice.

import "./card";
import "./panel";

interface CustomCard {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
  documentationURL?: string;
}

declare global {
  interface Window {
    customCards?: CustomCard[];
  }
}

window.customCards = window.customCards ?? [];

if (!window.customCards.some((card) => card.type === "echolocal-satellite-card")) {
  window.customCards.push({
    type: "echolocal-satellite-card",
    name: "EchoLocal Satellite",
    description: "An EchoLocal satellite, drawn as itself, with its controls live.",
    preview: true,
    documentationURL: "https://github.com/ygelfand/echolocal-hacs",
  });
}

// The same card, listed separately so it can be chosen by name. It draws identically and both expose the
// element switches; this one has its own type so a dashboard can opt in without touching the original.
if (!window.customCards.some((card) => card.type === "echolocal-elements-card")) {
  window.customCards.push({
    type: "echolocal-elements-card",
    name: "EchoLocal Satellite (Elements)",
    description:
      "An EchoLocal satellite with per-element visibility — turn any button, label or component off.",
    preview: true,
    documentationURL: "https://github.com/ygelfand/echolocal-hacs",
  });
}
