// Playback: how loud, and what the device is making on its own.
//
// The two noise layers are one grid rather than two dropdowns. A tap puts a sound on the first free
// layer and badges it with which; tapping it again takes it off. Two is the limit because the device has
// two, and the grid says so by refusing a third.

import { LitElement, html, nothing, svg, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import noise from "./noise.css";
import type { HomeAssistant } from "./types";
import volume from "./volume.css";

const FROM = 135;
const SWEEP = 270;
const CX = 100;
const CY = 100;
const ARC = 78;

// What each generated sound looks like. A name this build does not know gets a note, which is honest:
// the sound plays, we just have no picture for it.
const SOUND: Record<string, string> = {
  White: "mdi:grain",
  Pink: "mdi:blur",
  Brown: "mdi:waveform",
  Rain: "mdi:weather-pouring",
  Ocean: "mdi:waves",
  Brook: "mdi:water",
  Wind: "mdi:weather-windy",
  Fire: "mdi:fireplace",
  Crickets: "mdi:bug-outline",
  Fan: "mdi:fan",
  Cabin: "mdi:airplane",
};

const OFF = "None";

@customElement("echolocal-volume")
export class EchoLocalVolume extends LitElement {
  static styles = unsafeCSS(volume);

  @property({ attribute: false }) hass!: HomeAssistant;
  @property() player = "";
  @property() jack = "";

  render() {
    const state = this.hass.states[this.player];
    if (!state) return nothing;

    const level = Number(state.attributes.volume_level ?? 0);
    const muted = state.attributes.is_volume_muted === true;
    const plugged = this.jack ? this.hass.states[this.jack]?.state === "on" : false;

    return html`
      <div class="dial" @pointerdown=${this.grab}>
        <svg viewBox="0 0 200 200" role="img" aria-label="Volume">
          <path class="bed" d=${sweep()} pathLength="100"></path>
          ${level > 0
            ? svg`<path class="live" data-muted=${String(muted)} d=${sweep()} pathLength="100"
                stroke-dasharray=${`${level * 100} 100`}></path>`
            : nothing}
          <text class="step" x=${CX} y=${CY + 4}>${Math.round(level * 30)}</text>
          <text class="of" x=${CX} y=${CY + 20}>of 30</text>
        </svg>
      </div>

      <div class="side">
        <div class="state">${label(state.state)}</div>
        <div class="badges">
          <div class="badge" data-on=${String(muted)}>
            <ha-icon .icon=${muted ? "mdi:volume-off" : "mdi:volume-high"}></ha-icon>
            ${muted ? "Muted" : `${Math.round(level * 100)}%`}
          </div>
          ${this.jack
            ? html`<div class="badge" data-on=${String(plugged)}>
                <ha-icon icon="mdi:headphones"></ha-icon>
                ${plugged ? "Headphones" : "Speaker"}
              </div>`
            : nothing}
        </div>
      </div>
    `;
  }

  // The volume is set by where round the arc the pointer is, in the thirty steps the device works in
  // rather than in fractions, so a drag lands where the buttons would.
  private grab = (event: PointerEvent) => {
    const dial = event.currentTarget as HTMLElement;
    dial.setPointerCapture(event.pointerId);

    const to = (e: PointerEvent) => {
      const box = dial.getBoundingClientRect();
      const x = e.clientX - box.left - box.width / 2;
      const y = e.clientY - box.top - box.height / 2;

      let deg = (Math.atan2(y, x) * 180) / Math.PI - FROM;
      while (deg < 0) deg += 360;

      const share = Math.max(0, Math.min(1, Math.min(deg, SWEEP) / SWEEP));
      return Math.round(share * 30) / 30;
    };

    const set = (e: PointerEvent) =>
      this.hass.callService("media_player", "volume_set", {
        entity_id: this.player,
        volume_level: to(e),
      });

    const move = (e: PointerEvent) => set(e);
    const drop = (e: PointerEvent) => {
      dial.removeEventListener("pointermove", move);
      dial.removeEventListener("pointerup", drop);
      dial.removeEventListener("pointercancel", drop);
      set(e);
    };

    dial.addEventListener("pointermove", move);
    dial.addEventListener("pointerup", drop);
    dial.addEventListener("pointercancel", drop);
    set(event);
  };
}

@customElement("echolocal-noise")
export class EchoLocalNoise extends LitElement {
  static styles = unsafeCSS(noise);

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) layers: string[] = [];

  @state() private busy = false;

  render() {
    const playing = this.layers.map((id) => this.hass.states[id]?.state ?? OFF);
    const sounds = (this.hass.states[this.layers[0]]?.attributes.options ?? []).filter(
      (option) => option !== OFF
    );
    const full = playing.every((value) => value !== OFF);
    const on = (sound: string) => playing.indexOf(sound);

    return html`
      <div class="caption">
        Generated sound
        <span>${full ? "Both layers in use" : `${playing.filter((p) => p !== OFF).length} of 2`}</span>
      </div>
      <div class="grid">
        ${sounds.map((sound) => {
          const at = on(sound);

          return html`<button
            class="sound"
            data-on=${String(at >= 0)}
            ?disabled=${this.busy}
            @click=${() => this.pick(sound, at, playing)}
          >
            <ha-icon .icon=${SOUND[sound] ?? "mdi:music-note"}></ha-icon>
            ${sound}
            ${at >= 0 && this.layers.length > 1
              ? html`<span class="layer">${at + 1}</span>`
              : nothing}
          </button>`;
        })}
      </div>
    `;
  }

  // A sound already playing comes off its own layer, otherwise it goes on the first free one. With both
  // in use it replaces the last, so a bed on the first layer stays put and picking never dead-ends.
  private async pick(sound: string, at: number, playing: string[]) {
    const free = playing.findIndex((value) => value === OFF);
    const layer = at >= 0 ? at : free >= 0 ? free : this.layers.length - 1;
    if (layer < 0) return;

    this.busy = true;
    try {
      await this.hass.callService("select", "select_option", {
        entity_id: this.layers[layer],
        option: at >= 0 ? OFF : sound,
      });
    } finally {
      this.busy = false;
    }
  }
}

function label(state: string): string {
  if (state === "playing") return "Playing";
  if (state === "paused") return "Paused";
  if (state === "unavailable") return "Unavailable";
  return "Idle";
}

function sweep() {
  const a0 = (FROM * Math.PI) / 180;
  const a1 = ((FROM + SWEEP) * Math.PI) / 180;

  return `M${(CX + ARC * Math.cos(a0)).toFixed(2)} ${(CY + ARC * Math.sin(a0)).toFixed(2)}
    A${ARC} ${ARC} 0 1 1 ${(CX + ARC * Math.cos(a1)).toFixed(2)} ${(
    CY + ARC * Math.sin(a1)
  ).toFixed(2)}`;
}
