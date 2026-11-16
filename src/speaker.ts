import { html, nothing, unsafeCSS } from "lit";

import type { Turn } from "./contract";
import css from "./speaker.css";
import type { HomeAssistant } from "./types";

const UNKNOWN = "Unknown";

export const speakerStyles = unsafeCSS(css);

export function speaker(hass: HomeAssistant, turn?: Turn) {
  if (!turn?.speaker) return nothing;
  const score =
    turn.speaker_score !== undefined ? `Voice match ${turn.speaker_score.toFixed(2)}` : "";
  if (turn.speaker === UNKNOWN) {
    return html`<span class="speaker unknown" title=${score}>${UNKNOWN}</span>`;
  }
  const picture = turn.speaker_person
    ? (hass.states[turn.speaker_person]?.attributes?.entity_picture as string | undefined)
    : undefined;
  return html`<span class="speaker" title=${score}>
    ${picture
      ? html`<img class="face" src=${picture} alt="" />`
      : html`<span class="face initials">${initials(turn.speaker)}</span>`}
    <span class="name">${turn.speaker}</span>
  </span>`;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}
