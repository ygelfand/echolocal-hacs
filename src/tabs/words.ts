// Wake words: the library, plus which devices are listening for what and which entries nobody picked.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { KEYS_READY } from "../keys";
import { register } from "../nav";
import { deviceName, findSatellites, resolve } from "../satellite";
import type { HomeAssistant } from "../types";
import { listWakeWords, type WakeWord } from "../wakewords";

import "../wakewords";
import styles from "./words.css";

register({
  path: "wake-words",
  title: "Wake words",
  icon: "mdi:waveform",
  element: "echolocal-words",
  order: 10,
  admin: true,
});

@customElement("echolocal-words")
export class EchoLocalWords extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;

  @state() private words: WakeWord[] = [];
  @state() private asked = false;

  private again = () => this.requestUpdate();

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(KEYS_READY, this.again);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(KEYS_READY, this.again);
  }

  protected updated() {
    if (this.asked || !this.hass) return;

    this.asked = true;
    this.load();
  }

  render() {
    if (!this.hass) return nothing;

    const chosen = this.chosen();

    // A device can be listening for a wake word whose library entry has since broken, which is the one
    // failure nobody would otherwise notice: core stops offering it and the device just never wakes.
    const broken = new Set(
      this.words.filter((word) => word.problems.length && word.wake_word).map((w) => w.wake_word)
    );

    // A custom wake word nobody has selected is a file doing nothing, which is only visible from here.
    const spare = this.words.filter(
      (word) => !word.problems.length && !chosen.some((one) => one.words.includes(word.wake_word))
    );

    return html`
      <h2 class="first">Listening for</h2>
      ${chosen.length
        ? html`<div class="listening">
            ${chosen.map(
              (one) => html`<div class="who">
                <span class="name">${one.name}</span>
                ${one.words.map(
                  (word) =>
                    html`<span
                      class="word"
                      data-gone=${String(broken.has(word))}
                      title=${broken.has(word) ? "Its library entry is broken, so it is not offered" : ""}
                      >${word}</span
                    >`
                )}
              </div>`
            )}
          </div>`
        : html`<div class="spare">No devices have picked a wake word yet.</div>`}

      <h2>The library</h2>
      <echolocal-wake-words .hass=${this.hass}></echolocal-wake-words>

      ${spare.length
        ? html`<div class="spare">
            Unused: ${spare.map((word) => word.wake_word).join(", ")} — offered to every satellite, picked
            by none of them.
          </div>`
        : nothing}
    `;
  }

  // What each device has selected. Home Assistant makes these selects itself for an assist satellite, and
  // names them wake_word — matching the entity id instead catches the ring animation and the chime, which
  // are named for the wake word but are not one.
  private chosen(): { name: string; words: string[] }[] {
    return findSatellites(this.hass)
      .map((device) => {
        const state = resolve(this.hass, device.id);
        const words = (state?.by.get("wake_word") ?? [])
          .map((entity) => this.hass.states[entity.entity_id]?.state)
          .filter((word): word is string => !!word && word !== "unknown" && word !== "None");

        return { name: deviceName(device), words };
      })
      .filter((one) => one.words.length);
  }

  private async load() {
    this.words = await listWakeWords(this.hass);
  }
}
