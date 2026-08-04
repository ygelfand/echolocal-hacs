// Play and save for a turn's recording. Shared by the per-device history and the activity log.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { actionOf, cached, fetchTurnAudio } from "./audio";
import { AUDIO_ACTION } from "./contract";
import styles from "./recording.css";
import type { HomeAssistant } from "./types";

// Whatever is playing, across every one of these on the page. Two recordings at once is never what somebody
// pressing a second play button meant.
let sounding: { audio: HTMLAudioElement; stop: () => void } | null = null;

@customElement("echolocal-recording")
export class EchoLocalRecording extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;

  // The device's own name, which the action to fetch a recording is named after.
  @property() device = "";
  @property() turn = "";
  @property() filename = "recording.wav";

  @state() private busy = false;
  @state() private playing = false;

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.playing) sounding?.audio.pause();
  }

  render() {
    if (!this.turn || !this.action()) return nothing;

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
      return await fetchTurnAudio(this.hass, action, this.turn);
    } finally {
      this.busy = false;
    }
  }
}
