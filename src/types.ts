// Just enough of Home Assistant's frontend types for what this touches. Declared here rather than
// taken from a package: the community typings lag upstream, and this is a short list.

export interface HassDevice {
  id: string;
  name: string | null;
  name_by_user?: string | null;
  manufacturer?: string | null;
  model?: string | null;
  sw_version?: string | null;
  via_device_id?: string | null;
  disabled_by?: string | null;

  // A group is a label, so this is the membership. Home Assistant sends it with every device and
  // automations can target a label directly, which our own list of groups could never be.
  labels?: string[];

  // How the device is reached, as [kind, value] pairs. The esphome integration puts the mac here, which is
  // the only place it appears — echod publishes no sensor for it.
  connections?: [string, string][];

  // [domain, id] pairs from whichever integration created the entry. Sub-devices get one; the device
  // above them gets none.
  identifiers?: [string, string][];
}

export interface HassLabel {
  label_id: string;
  name: string;
  icon?: string | null;
  color?: string | null;
  description?: string | null;
}

// What a custom panel is handed as the address bar moves under it.
export interface Route {
  prefix: string;
  path: string;
}

export interface HassEntity {
  entity_id: string;
  device_id?: string;
  entity_category?: string | null;
  hidden?: boolean;
}

export interface HassState {
  state: string;
  attributes: {
    friendly_name?: string;
    icon?: string;
    unit_of_measurement?: string;
    device_class?: string;
    min?: number;
    max?: number;
    step?: number;
    options?: string[];
    rgb_color?: [number, number, number];
    brightness?: number;
    [key: string]: unknown;
  };
}

export interface HomeAssistant {
  devices: Record<string, HassDevice>;
  entities: Record<string, HassEntity>;
  states: Record<string, HassState>;
  user?: { is_admin?: boolean; name?: string };

  // Every registered service, by domain. A device's own actions only appear here once it has advertised
  // them, which is how the frontend tells what a firmware can do without asking it.
  services?: Record<string, Record<string, unknown>>;
  // The last two are notifyOnError and returnResponse. returnResponse is what makes Home Assistant wait
  // for a device's answer and put it in .response, rather than firing the action and forgetting it.
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: Record<string, unknown>,
    notifyOnError?: boolean,
    returnResponse?: boolean
  ): Promise<{ response?: unknown } | undefined>;
  callWS<T = unknown>(message: Record<string, unknown>): Promise<T>;

  // The live event bus. Absent in anything that only stubs hass, which is why every use of it is
  // guarded rather than assumed.
  connection?: {
    subscribeEvents<T>(
      callback: (event: { data: T }) => void,
      eventType: string
    ): Promise<() => void>;

    // A subscription that answers with past matches before it starts reporting new ones, which is how
    // the logbook serves history and live turns down one channel.
    subscribeMessage<T>(
      callback: (message: T) => void,
      request: Record<string, unknown>
    ): Promise<() => void>;
  };
}

export type Shell = "grey" | "black" | "white";

export interface CardConfig {
  type?: string;
  device_id: string;
  // Which colour the device is. Grey is not a real Echo Dot colour — it is the one to draw when nobody
  // has said, which is every device until echod can tell us.
  // "auto" (and unset) take the shell from the device's detected hardware_color; a real colour forces it.
  shell?: Shell | "auto";

  // The "?" beside each setting. On unless this says otherwise.
  help?: boolean;
}

// The card names its own rows, since every name in Home Assistant belongs to the user.
export interface Row {
  entityId: string;
  label: string;

  // echod's name for it, which is what the "?" text is written against.
  name: string;

  // Another entity to show on the same tile, for a control whose effect is a number somebody wants before
  // pressing it: how much there is to purge belongs with the button that purges it.
  reading?: string;
}

export interface Section {
  title: string | null;
  rows: Row[];
}

export type Kind =
  | "ring"
  | "microphone"
  | "playback"
  | "assistant"
  | "device"
  | "diagnostics"
  | "activity";
