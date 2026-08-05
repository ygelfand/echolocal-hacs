// The "?" and the panel it opens.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from "./bubble.css";

// ha-tooltip finds its anchor by id within the same root, so every bubble needs one of its own.
let seq = 0;

@customElement("echolocal-bubble")
export class EchoLocalBubble extends LitElement {
  static styles = unsafeCSS(styles);

  @property() text = "";

  private anchor = `ask-${++seq}`;

  render() {
    if (!this.text) return nothing;

    return html`
      <button id=${this.anchor} aria-label="What this does" @click=${this.swallow}>?</button>
      <ha-tooltip for=${this.anchor} trigger="click" placement="top">${this.text}</ha-tooltip>
    `;
  }

  // Rows and widgets are clickable themselves, and asking what something does is not asking to change it.
  // The tooltip's own listener is on the button too, so stopping the bubble does not stop it opening.
  private swallow(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }
}
