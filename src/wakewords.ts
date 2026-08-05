// The wake word library in config/custom_wake_words/, and the drop zone that adds to it. Entries Home
// Assistant would silently ignore are shown with what is wrong with them.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import type { HomeAssistant } from "./types";
import styles from "./wakewords.css";

export interface WakeWord {
  id: string;
  wake_word: string;
  type: string;
  trained_languages: string[];
  size: number;
  hash: string;

  // Where the two files are served, for looking at what a renamed entry actually is.
  model_url: string;
  config_url: string;

  // What core would silently ignore about this one. Empty means it is being offered.
  problems: string[];
}

export async function listWakeWords(hass: HomeAssistant): Promise<WakeWord[]> {
  try {
    const answer = await hass.callWS<{ wake_words: WakeWord[] }>({
      type: "echolocal/wake_words/list",
    });
    return answer?.wake_words ?? [];
  } catch {
    return [];
  }
}

@customElement("echolocal-wake-words")
export class EchoLocalWakeWords extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;

  // The spoken words some device has selected, so an entry can say whether anything listens for it.
  @property({ attribute: false }) inUse: Set<string> = new Set();

  @state() private words: WakeWord[] = [];
  @state() private over = false;
  @state() private busy = false;
  @state() private said = "";
  @state() private asked = false;

  protected updated() {
    if (this.asked || !this.hass) return;

    this.asked = true;
    this.refresh();
  }

  render() {
    return html`
      <div
        class="zone"
        data-over=${String(this.over)}
        @click=${() => this.shadowRoot?.querySelector<HTMLInputElement>("input[type=file]")?.click()}
        @dragover=${(e: DragEvent) => {
          e.preventDefault();
          this.over = true;
        }}
        @dragleave=${() => (this.over = false)}
        @drop=${this.dropped}
      >
        ${this.busy
          ? html`<ha-spinner></ha-spinner>`
          : html`<ha-icon icon="mdi:tray-arrow-up"></ha-icon>`}
        <div>
          <div class="lead">${this.busy ? "Adding…" : "Drop a .tflite wake model here"}</div>
          <div class="sub">
            ${this.said ||
            "Every satellite is offered the whole set and downloads what it is told to listen for"}
          </div>
        </div>
        <input
          type="file"
          accept=".tflite"
          multiple
          @change=${(e: Event) => this.add((e.target as HTMLInputElement).files)}
        />
      </div>

      ${this.words.length
        ? html`<div class="scroll">
            <table>
              <thead>
                <tr>
                  <th class="say">Wake word</th>
                  <th>File</th>
                  <th>Model</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${this.words.map((word) => this.row(word))}
              </tbody>
            </table>
          </div>`
        : html`<div class="none">
            Nothing in custom_wake_words yet. Whatever the firmware ships with is unaffected.
          </div>`}
    `;
  }

  private row(word: WakeWord) {
    const parts = [
      word.type || "no type",
      word.size ? `${Math.round(word.size / 1024)} KB` : "no model",
      ...(word.trained_languages.length ? [word.trained_languages.join(", ")] : []),
    ];

    const used = this.inUse.has(word.wake_word);

    return html`<tr data-bad=${String(word.problems.length > 0)} data-used=${String(used)}>
      <td class="say">
        <ha-input
          appearance="outlined"
          .value=${word.wake_word}
          placeholder="what wakes it"
          @change=${(e: Event) => this.rename(word, (e.target as HTMLInputElement).value)}
        ></ha-input>
      </td>
      <td class="id">${word.id}</td>
      <td class="facts">${parts.join(" · ")}</td>
      <td class="end">
        <div class="acts">
          ${word.model_url
            ? html`<a class="act" href=${word.model_url} download title=${`${word.id}.tflite`}>
                <ha-icon icon="mdi:waveform"></ha-icon>
              </a>`
            : nothing}
          ${word.config_url
            ? html`<a class="act" href=${word.config_url} download title=${`${word.id}.json`}>
                <ha-icon icon="mdi:code-json"></ha-icon>
              </a>`
            : nothing}
          <button class="act bin" title=${`Remove ${word.id}`} @click=${() => this.discard(word)}>
            <ha-icon icon="mdi:trash-can-outline"></ha-icon>
          </button>
        </div>
      </td>
    </tr>
    ${word.problems.length
      ? html`<tr class="wrong" data-bad="true">
          <td colspan="4">${word.problems.join(". ")}.</td>
        </tr>`
      : nothing}`;
  }

  private dropped = (event: DragEvent) => {
    event.preventDefault();
    this.over = false;
    this.add(event.dataTransfer?.files ?? null);
  };

  private async add(files: FileList | null) {
    const models = [...(files ?? [])].filter((file) => file.name.endsWith(".tflite"));
    if (!models.length) {
      this.said = "A wake model is a .tflite file.";
      return;
    }

    this.busy = true;
    this.said = "";

    for (const file of models) {
      const body = new FormData();
      body.append("file", file);

      try {
        const response = await fetch("/api/echolocal/wake_words", {
          method: "POST",
          body,
          headers: this.credentials(),
        });

        if (!response.ok) {
          const answer = await response.json().catch(() => ({}));
          this.said = answer.error ?? `Home Assistant refused ${file.name}.`;
          break;
        }
      } catch (err) {
        this.said = `That did not reach Home Assistant: ${err}`;
        break;
      }
    }

    this.busy = false;
    await this.refresh();
  }

  // The wake word is what somebody says, so it is the one field worth editing in place — and correcting
  // an empty one is what makes a dropped model start being offered.
  private async rename(word: WakeWord, spoken: string) {
    if (spoken === word.wake_word) return;

    await this.hass.callWS({
      type: "echolocal/wake_words/update",
      wake_word_id: word.id,
      wake_word: spoken,
    });
    await this.refresh();
  }

  private async discard(word: WakeWord) {
    await this.hass.callWS({ type: "echolocal/wake_words/delete", wake_word_id: word.id });
    await this.refresh();
  }

  private async refresh() {
    this.words = await listWakeWords(this.hass);
  }

  // The websocket connection carries the auth this session was issued; a plain fetch does not, so it is
  // borrowed rather than asking anyone to log in twice.
  private credentials(): Record<string, string> {
    const token = (this.hass as { auth?: { data?: { access_token?: string } } }).auth?.data
      ?.access_token;

    return token ? { authorization: `Bearer ${token}` } : {};
  }
}
