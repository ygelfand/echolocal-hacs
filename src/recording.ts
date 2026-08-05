// Play and save for a turn's recording. Shared by the per-device history and the activity log.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { actionOf, availableFor, cached, fetchTurnAudio } from "./audio";
import { AUDIO_ACTION, RECORDINGS_ACTION } from "./contract";
import styles from "./recording.css";
import type { HomeAssistant } from "./types";

// Whatever is playing, across every one of these on the page. Two recordings at once is never what somebody
// pressing a second play button meant.
let sounding: { audio: HTMLAudioElement; stop: () => void } | null = null;

const RECENT = 5 * 60_000;

@customElement("echolocal-recording")
export class EchoLocalRecording extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;

  // The device's own name, which the action to fetch a recording is named after.
  @property() device = "";
  @property() turn = "";
  @property() filename = "recording.wav";
  @property({ type: Number }) at = 0;

  @state() private busy = false;
  @state() private playing = false;

  // Whether the device still holds this turn's audio: undefined while the per-device index is being
  // asked for, so the buttons arrive lazily and a device that never answers simply shows none.
  @state() private present?: boolean;

  // Which turn the present check was run for, so a reused element rechecks when it is handed a new one
  // and an ordinary hass update does not ask again.
  private checkedTurn?: string;

  // Set when a fetch turns up empty despite the index: the recording was pruned between the index call
  // and the click. A rarer path than the index miss, but the button still has to answer for it.
  @state() private gone = false;

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.playing) sounding?.audio.pause();
  }

  // One index lookup per device, shared across its rows, so what is offered follows what the device
  // actually holds rather than what a turn once had.
  protected updated() {
    if (!this.hass || !this.turn || this.checkedTurn === this.turn) return;
    this.checkedTurn = this.turn;
    this.present = undefined;
    this.gone = false;

    if (this.at && Date.now() - this.at < RECENT) {
      this.present = true;
      return;
    }

    const index = this.device ? actionOf(this.hass, this.device, RECORDINGS_ACTION) : undefined;
    if (!index) return;

    availableFor(this.hass, index).then((ids) => {
      if (this.checkedTurn === this.turn) this.present = ids.has(this.turn);
    });
  }

  render() {
    if (!this.turn || !this.action() || this.present !== true) return nothing;

    if (this.gone) {
      return html`<span class="gone" title="The device no longer has this recording">
        <ha-icon icon="mdi:playlist-remove"></ha-icon>
      </span>`;
    }

    return html`
      <button
        aria-label=${this.playing ? "Stop the recording" : "Play the recording"}
        @click=${this.play}
      >
        <ha-icon
          .icon=${this.busy ? "mdi:timer-outline" : this.playing ? "mdi:pause" : "mdi:play"}
        ></ha-icon>
      </button>
      <button class="keep" aria-label="Save the recording" @click=${this.save}>
        <ha-icon icon="mdi:tray-arrow-down"></ha-icon>
      </button>
    `;
  }

  private action(): string | undefined {
    return this.device ? actionOf(this.hass, this.device, AUDIO_ACTION) : undefined;
  }

  private play = async () => {
    if (this.playing) {
      sounding?.audio.pause();
      return;
    }

    const url = await this.fetch();
    if (!url) return;

    sounding?.stop();

    const audio = new Audio(url);
    const done = () => {
      this.playing = false;
      if (sounding?.audio === audio) sounding = null;
    };

    audio.addEventListener("ended", done);
    audio.addEventListener("pause", done);

    sounding = { audio, stop: () => audio.pause() };
    this.playing = true;
    audio.play().catch(done);
  };

  private save = async () => {
    const url = await this.fetch();
    if (!url) return;

    const link = document.createElement("a");
    link.href = url;
    link.download = this.filename;
    link.click();
  };

  private async fetch(): Promise<string | null> {
    const already = cached(this.turn);
    if (already) return already;

    const action = this.action();
    if (!action) return null;

    this.busy = true;
    try {
      const url = await fetchTurnAudio(this.hass, action, this.turn);
      this.gone = !url;
      if (!url) {
        this.dispatchEvent(
          new CustomEvent("hass-notification", {
            detail: { message: "That recording is no longer on the device." },
            bubbles: true,
            composed: true,
          })
        );
      }
      return url;
    } finally {
      this.busy = false;
    }
  }
}
