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
    description: "An EchoLocal satellite, drawn as itself, with its ring and mute live.",
    preview: true,
    documentationURL: "https://github.com/ygelfand/echolocal-hacs",
  });
}
