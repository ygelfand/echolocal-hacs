// Save what the device's log daemon still holds.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { actionOf } from "./audio";
import { LOGS_ACTION, type Logs } from "./contract";
import styles from "./logs.css";
import type { HomeAssistant } from "./types";

const MOST = 64;

@customElement("echolocal-logs")
export class EchoLocalLogs extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;

  @property() device = "";

  @state() private busy = false;
  @state() private failed = false;

  render() {
    if (!this.action()) return nothing;

    return html`
      <button
        ?disabled=${this.busy}
        class=${this.failed ? "failed" : ""}
        title=${this.failed ? "Could not read the logs" : "Diagnostic logs"}
        aria-label=${this.failed ? "Could not read the logs" : "Download diagnostic logs"}
        @click=${this.save}
      >
        <ha-icon
          .icon=${this.busy ? "mdi:timer-outline" : "mdi:tray-arrow-down"}
        ></ha-icon>
        <span>${this.failed ? "Could not read the logs" : "Diagnostic logs"}</span>
      </button>
    `;
  }

  private action(): string | undefined {
    return this.device ? actionOf(this.hass, this.device, LOGS_ACTION) : undefined;
  }

  private save = async () => {
    const action = this.action();
    if (!action) return;

    this.busy = true;
    this.failed = false;

    try {
      const lines = await this.read(action);
      if (!lines) {
        this.failed = true;
        return;
      }
      save(`${this.device}_logs_${stamp()}.txt`, lines.join("\n") + "\n");
    } finally {
      this.busy = false;
    }
  };

  private async read(action: string): Promise<string[] | null> {
    const lines: string[] = [];
    let pages = 1;

    for (let page = 0; page < Math.min(pages, MOST); page++) {
      const answer = await this.call(action, page);
      if (!answer) return null;

      pages = answer.pages || 1;
      lines.push(...(answer.lines ?? []));
    }
    return lines;
  }

  private async call(action: string, page: number): Promise<Logs | null> {
    try {
      const reply = await this.hass.callService("esphome", action, { page }, undefined, true, true);

      const answer = reply?.response as Logs | undefined;
      return answer?.version === 1 && Array.isArray(answer.lines) ? answer : null;
    } catch {
      return null;
    }
  }
}

function stamp(): string {
  return new Date()
    .toISOString()
    .replace(/\.\d+Z$/, "")
    .replace(/:/g, "-");
}

function save(filename: string, text: string): void {
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}
