// What each setting does, for the "?" beside it. Matched on the tail of an entity id, as layout.ts does.
// A setting with nothing written about it gets no "?".

const HELP: [RegExp, string][] = [
  // The microphone
  [
    /_microphone_mute$/,
    "Cuts the microphones in hardware. The device cannot hear anything at all while this is on, including its wake word — it is a switch on the power to the capsules, not a software mute.",
  ],
  [
    /_microphone_gain$/,
    "How much the capsules are amplified before anything else happens. Raise it in a large or quiet room; lower it if speech close to the device clips and comes out distorted.",
  ],
  [
    /_microphone_mixing$/,
    "How the seven capsules are combined into the one channel the speech engine hears. Beamforming favours whichever direction someone is talking from and rejects the rest of the room; averaging treats every direction equally and is steadier when several people talk.",
  ],
  [
    /_microphone_leveling$/,
    "Evens out loud and quiet talkers so a whisper across the room and a shout beside it arrive at similar volume. Helps transcription, and costs a little dynamic range.",
  ],
  [
    /_microphone_echo_cancellation$/,
    "Subtracts what the speaker is playing from what the microphones hear, so the device can be interrupted while it is talking and does not answer its own reply.",
  ],
  [
    /_room_sensitivity$/,
    "How much louder than the room's own noise floor a sound has to be before the device treats it as somebody talking. Raise it in a noisy room to stop the device reacting to the room itself; lower it if quiet speech is missed.",
  ],
  [
    /_room_level$/,
    "How loud the room is right now, in decibels below full scale. Nothing to set — it is what the sensitivity is measured against, and watching it is how you pick a sensible one.",
  ],
  [
    /_room_floor$/,
    "The quietest the room has been recently, which is the baseline the device compares against. It drifts with the room, so a fridge switching on raises it rather than fooling the device.",
  ],
  [
    /_mute_led_brightness$/,
    "How bright the red ring is while the microphones are cut. Dim is enough to see in a dark room without lighting it up.",
  ],

  // The ring
  [
    /_led_ring$/,
    "The whole ring, as one light. Turning it off leaves the device working normally and silent about it.",
  ],
  [
    /_led_ring_segment_\d+$/,
    "One of the twelve segments, addressable on its own. They ship switched off in Home Assistant because twelve extra lights in every list is rarely what anyone wants — enable one and it can be coloured individually from the card.",
  ],
  [
    /_ring_while_muted$/,
    "What the ring does while the microphones are cut. Something visible is worth choosing: a muted device that looks identical to a listening one is how people end up talking to a device that cannot hear them.",
  ],
  [
    /_ring_on_failure$/,
    "What the ring does when a turn fails — no network, no pipeline, nothing understood. Distinct from the normal colours on purpose.",
  ],
  [
    /_ring_follows_the_room$/,
    "Lets the ring track how loud the room is while the device is listening, so somebody can see that it is hearing them before it answers.",
  ],

  // Playback
  [
    /_headphones$/,
    "Sends audio out of the jack instead of the speaker. The speaker goes quiet while this is on.",
  ],
  [
    /_white_noise_layer_\d+$/,
    "Plays a generated sound the device makes itself — rain, a fan, a brook. Nothing is streamed and nothing is stored: it is synthesised as it plays, so it never loops or runs out. Two layers can overlap, so rain over a fan is one choice in each.",
  ],
  [
    /_music_during_a_turn$/,
    "What happens to music when someone says the wake word. Ducking drops the volume and keeps playing, which resumes on the same note; stopping does not.",
  ],
  [
    /_music_ducking$/,
    "How far the volume drops while the device is listening or talking. Far enough that the microphones are not fighting the music, not so far that the room goes silent.",
  ],
  [
    /_voice_resampling$/,
    "How the reply's audio is resampled to what the speaker wants. Better quality costs a little more work on a device that has four small cores.",
  ],

  // The assistant
  [
    /_wake_word/,
    "What this assistant listens for. The list is what the device has on disk plus whatever Home Assistant is offering from its custom_wake_words directory.",
  ],
  [
    /_(?:wake_)?threshold$/,
    "How sure the device has to be before it decides it heard its wake word. Lower it if it misses you; raise it if the television sets it off.",
  ],
  [
    /_follow_up$/,
    "Keeps listening for a moment after a reply, so a second question needs no second wake word.",
  ],
  [
    /_max_listen/,
    "How long the device will wait for someone to finish talking before giving up on the turn.",
  ],
  [
    /_max_think/,
    "How long to wait for Home Assistant's pipeline to answer. Generous is usually right — a slow answer beats a turn that dies just before it arrives.",
  ],
  [
    /_effect$/,
    "What the ring does at this point in a turn. Cosmetic, but it is how somebody knows the device heard them.",
  ],
  [
    /_tone$/,
    "A short sound at this point in a turn. Some people want the confirmation; some find it grating.",
  ],
  [
    /_reply_buffer/,
    "How much of a reply to collect before starting to play it. More is steadier on a poor network, at the cost of answering a beat later.",
  ],
  [
    /_reply_delivery/,
    "Whether a reply starts playing as it arrives or once all of it has. Streaming is faster to start and stutters on a bad connection.",
  ],

  // The device
  [
    /_update_channel$/,
    "Which releases this device is offered. Stable only, or the ones that are still being tried out.",
  ],
  [
    /_check_for_updates$/,
    "Looks now rather than waiting for the next scheduled check. Nothing is installed by pressing it.",
  ],
  [
    /_bluetooth_proxy$/,
    "Forwards nearby Bluetooth advertisements to Home Assistant, so this device extends Bluetooth coverage into its room. It costs some radio time it would otherwise spend on wifi.",
  ],
  [
    /_metrics_interval$/,
    "How often the device reports its own temperature, memory and load. Often enough to be useful; every report is work the device does instead of listening.",
  ],
  [
    /_purge_cache$/,
    "Deletes what Android's runtime has cached. It comes back on its own, so this buys disk space for a while rather than permanently.",
  ],
  [
    /_test_playback$/,
    "Plays a short sound, which is the quickest way to find out whether the speaker, the volume and the output route are all what you think they are.",
  ],
  [
    /_remote_adb$/,
    "Opens Android's debugging port over the network. Off by default, and worth leaving off: it is an unauthenticated way onto the device for anything on the same network.",
  ],

  // Diagnostics
  [
    /_wifi_signal$/,
    "How strong the connection to the access point is. Above about -70 dBm is comfortable; below -80 dBm is where audio starts arriving late.",
  ],
  [
    /_cpu_temperature$/,
    "The chip's own temperature. These run warm by design — it is a sustained climb rather than a number that matters.",
  ],
  [
    /_load_average$/,
    "How much work is queued across the cores. Listening for a wake word is continuous work, so this is never zero.",
  ],
  [
    /_memory_available$/,
    "How much memory is free. Wake models and the audio path are what use it.",
  ],
  [/_free_space$/, "Disk left. Wake models and saved recordings are what fill it."],
  [
    /_update_status$/,
    "What the last self-update did. Worth reading when a device is on an older version than the rest.",
  ],
];

// Widgets replace several rows at once, so they carry their own text rather than borrowing one row's.
const WIDGETS: Record<string, string> = {
  array:
    "The seven capsules and what the room sounds like to them. The arc is how loud the room is right now; the notch is how far above the room's own noise floor something has to be before the device treats it as speech. Drag the notch, then talk from where you normally would and watch whether the arc crosses it.",
  appearance:
    "Everything the ring does, in one place. Brightness applies to all of it; the four situations below are what colour it takes when the device is idle, muted, has failed, or is showing how loud the room is.",
  turn: "A turn's budget, end to end. The two grips are how long the device will wait for someone to finish talking, and how long it will wait for Home Assistant to answer. The band is what a slow turn would spend.",
  noise: "Sounds the device generates itself, mixed live rather than played from a file, so nothing loops. Two layers overlap — pick rain in one and a fan in the other.",
  volume:
    "The speaker's volume, in the same thirty steps the buttons on the device move it through, so this dial and the device agree.",
  history:
    "What the device has been hearing. Rows rebuilt from Home Assistant's recorder show what was said; rows the device itself reported also show where the time went and can be played back.",
};

// What a whole component is for, which is the one thing no single row can say.
const KINDS: Record<string, string> = {
  microphone:
    "The seven microphones and how the room sounds to them. Everything here changes what the device hears before a word of it reaches Home Assistant, so it is the first place to look when it mishears or does not wake at all.",
  ring:
    "The twelve-segment light. None of it changes what the device does — it changes what somebody in the room can tell about it, which is why the muted and failed colours are worth setting.",
  playback:
    "The speaker: what comes out of it, how loud, and what happens to music when somebody talks to the device.",
  assistant:
    "One wake word and the turn that follows it. A device can run more than one, each with its own word, sensitivity and timings, which is how one device answers to two names.",
  device:
    "The device itself rather than anything it hears or says: which releases it takes, what else it does for the network, and the housekeeping.",
  diagnostics:
    "What the device reports about itself. Nothing here is a setting — it is the evidence, and it is what to read before changing anything else.",
};

export function helpFor(entityId: string): string | undefined {
  return HELP.find(([match]) => match.test(entityId))?.[1];
}

export function helpForWidget(widget: string): string | undefined {
  return WIDGETS[widget];
}

export function helpForKind(kind: string): string {
  return KINDS[kind] ?? "";
}
