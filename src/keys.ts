// Entity identity that survives a rename.
//
// entity_id and friendly_name are both the user's to change, and the display registry a card sees carries
// nothing else. config/entity_registry/list carries unique_id, original_name and platform, and is open to
// every user — only writing to the registry needs an administrator.
//
// An esphome unique_id is <mac>-<platform>-<key>[@<sub-device>], where key is what echod declared. HA makes
// some entities of its own for an assist satellite — wake_word, pipeline, vad_sensitivity — and those have
// neither a platform segment nor a sub-device.

import type { HassEntity, HomeAssistant } from "./types";

// echod's own keys, which are what the frontend matches on. The platform segment is included where it
// disambiguates: sensor-room_level and select-room_reaction are different things on the same component.
export const KEY = {
  // The device
  firmware: /^update-firmware$/,
  updateChannel: /^select-update_channel$/,
  checkUpdates: /^button-check_for_updates$/,
  updateStatus: /^text_sensor-update_status$/,
  updateOutcome: /^event-update_outcome$/,
  bluetooth: /^switch-bluetooth_proxy$/,
  advertisements: /^sensor-ble_advertisements$/,
  metrics: /^number-metrics_interval$/,
  purge: /^button-purge_cache$/,
  cached: /^sensor-cached_data$/,
  testPlayback: /^button-test_playback$/,
  adb: /^switch-remote_adb$/,
  player: /^media_player-speaker$/,

  // Home Assistant's own, for the assist satellite. No platform segment and no sub-device.
  wakeWord: /^wake_word(_\d+)?$/,
  pipeline: /^pipeline(_\d+)?$/,
  vad: /^vad_sensitivity$/,

  // The ring
  ring: /^light-ring$/,
  segment: /^light-segment_(\d+)$/,
  whileMuted: /^select-ring_muted$/,
  onFailure: /^select-failure_effect$/,
  followsRoom: /^select-room_reaction$/,

  // The microphone
  mute: /^switch-mic_mute$/,
  gain: /^number-microphone_gain$/,
  sensitivity: /^number-microphone_sensitivity$/,
  stopWord: /^number-stop_word_sensitivity$/,
  mixing: /^select-microphone_mixing$/,
  muteLamp: /^select-mute_led_brightness$/,
  leveling: /^switch-microphone_leveling$/,
  echo: /^switch-microphone_cancel_echo$/,
  roomLevel: /^sensor-room_level$/,
  roomFloor: /^sensor-room_floor$/,

  // Playback
  noise: /^select-noise_layer_(\d+)$/,
  headphones: /^binary_sensor-headphones$/,
  musicOnTurn: /^select-media_on_turn$/,
  ducking: /^number-media_duck_level$/,
  resampling: /^select-voice_resampling$/,

  // An assistant, one sub-device per wake word slot
  wake: /^button-wake_assistant_\d+$/,
  threshold: /^number-wake_threshold_\d+$/,
  maxListen: /^number-max_listen_\d+$/,
  maxThink: /^number-max_think_\d+$/,
  followUp: /^number-follow_up_\d+$/,
  replyBuffer: /^number-reply_buffer_\d+$/,
  replyDelivery: /^select-reply_delivery_\d+$/,
  wakeEffect: /^select-wake_effect_\d+$/,
  wakeTone: /^select-wake_tone_\d+$/,

  // Diagnostics
  ip: /^text_sensor-ip_address$/,
  wifiSignal: /^sensor-wifi_signal$/,
  wifiSent: /^sensor-wifi_sent$/,
  wifiReceived: /^sensor-wifi_received$/,
  cpuTemperature: /^sensor-cpu_temperature$/,
  radioTemperature: /^sensor-radio_temperature$/,
  cores: /^sensor-cpu_cores(_online)?$/,
  load: /^sensor-load_average$/,
  memory: /^sensor-memory_available$/,
  disk: /^sensor-free_space$/,
  lastWakeWord: /^text_sensor-last_wake_word$/,
  lastHeard: /^text_sensor-last_heard$/,
  lastReply: /^text_sensor-last_reply$/,
} as const;

// An entity with its stable identity attached. key is empty until the registry answers, which makes every
// pattern miss rather than match the wrong thing.
export interface Tagged extends HassEntity {
  key: string;
  part: number;
  label: string;
}

export function tag(hass: HomeAssistant, entities: HassEntity[]): Tagged[] {
  const known = keys(hass);

  return entities.map((entity) => {
    const found = known?.get(entity.entity_id);
    return {
      ...entity,
      key: found?.key ?? "",
      part: found?.part ?? 0,
      label: found?.name ?? hass.states[entity.entity_id]?.attributes.friendly_name ?? entity.entity_id,
    };
  });
}

export interface Known {
  entityId: string;
  deviceId: string;

  // echod's own key, or HA's own name for the entities it invents. Never the user's.
  key: string;

  // Which sub-device declared it, or 0 for the device itself.
  part: number;

  platform: string;
  name: string;
  disabled: boolean;
}

interface Entry {
  entity_id: string;
  device_id: string | null;
  disabled_by: string | null;
  platform: string;
  unique_id: string;
  original_name: string | null;
  name: string | null;
}

// One fetch per page, shared by every card and tab. The registry only changes when somebody renames or
// enables something, and it says so.
export const KEYS_READY = "echolocal-keys";

let cache: Promise<Map<string, Known>> | null = null;
let ready: Map<string, Known> | null = null;

// Null until the registry answers. Callers render what they can and listen for KEYS_READY on window.
export function keys(hass: HomeAssistant): Map<string, Known> | null {
  if (!cache) {
    cache = load(hass);
    cache.then(() => window.dispatchEvent(new Event(KEYS_READY)));
    listen(hass);
  }
  return ready;
}

async function load(hass: HomeAssistant): Promise<Map<string, Known>> {
  const out = new Map<string, Known>();

  try {
    const all = await hass.callWS<Entry[]>({ type: "config/entity_registry/list" });

    for (const entry of all) {
      if (!entry.device_id) continue;
      out.set(entry.entity_id, {
        entityId: entry.entity_id,
        deviceId: entry.device_id,
        ...split(entry.unique_id),
        platform: entry.platform,
        name: entry.name || entry.original_name || entry.entity_id,
        disabled: !!entry.disabled_by,
      });
    }
  } catch {
    // No registry, so every lookup misses and the card falls back to what the display registry gives it.
  }

  ready = out;
  return out;
}

// The mac is stripped because it says nothing a device id does not, and the sub-device is separated because
// it is what says which component an entity belongs to.
function split(uniqueId: string): { key: string; part: number } {
  const withoutMac = uniqueId.replace(/^(?:[0-9a-f]{2}:){5}[0-9a-f]{2}-?/i, "");
  const at = withoutMac.lastIndexOf("@");

  if (at < 0) return { key: withoutMac, part: 0 };
  return { key: withoutMac.slice(0, at), part: Number(withoutMac.slice(at + 1)) || 0 };
}

function listen(hass: HomeAssistant): void {
  hass.connection
    ?.subscribeEvents(() => {
      cache = null;
      ready = null;
      keys(hass);
    }, "entity_registry_updated")
    .catch(() => {});
}
