// The "?" and the panel it opens. Closes on the next click anywhere.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import styles from "./bubble.css";

@customElement("echolocal-bubble")
export class EchoLocalBubble extends LitElement {
  static styles = unsafeCSS(styles);

  @property() text = "";

  @state() private open = false;

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.elsewhere, true);
  }

  render() {
    if (!this.text) return nothing;

    return html`
      <button
        data-open=${String(this.open)}
        aria-label="What this does"
        aria-expanded=${String(this.open)}
        @click=${this.toggle}
      >
        ?
      </button>
      ${this.open ? html`<div class="said" role="tooltip">${this.text}</div>` : nothing}
    `;
  }

  private toggle = (event: Event) => {
    // Rows and widgets are clickable themselves, and asking what something does is not asking to change
    // it.
    event.stopPropagation();
    event.preventDefault();

    this.open = !this.open;

    if (this.open) {
      this.place();
      document.addEventListener("click", this.elsewhere, true);
    } else {
      document.removeEventListener("click", this.elsewhere, true);
    }
  };

  private elsewhere = (event: Event) => {
    if (event.composedPath().includes(this)) return;

    this.open = false;
    document.removeEventListener("click", this.elsewhere, true);
  };

  // Nudged back inside whatever it is in, measured after it opens. Anchoring alone is not enough: these
  // sit beside labels anywhere in a two-column popup, so either edge can be the near one.
  private async place() {
    const said = (await this.updateComplete, this.shadowRoot?.querySelector(".said"));
    if (!(said instanceof HTMLElement)) return;

    said.style.removeProperty("transform");

    const room = (this.closest(".sheet") ?? this.offsetParent ?? document.body).getBoundingClientRect();
    const at = said.getBoundingClientRect();
    const edge = 10;

    const push = Math.max(0, room.left + edge - at.left) - Math.max(0, at.right - room.right + edge);
    if (push) said.style.transform = `translateX(${Math.round(push)}px)`;
  }
}
