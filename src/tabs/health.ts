// Health: one row per device. Each column is one of echod's readings, looked up by name, and colours
// itself when the value is bad. A device missing one gets a dash.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { register } from "../nav";
import { deviceName, findSatellites, resolve } from "../satellite";
import type { HassDevice, HassState, HomeAssistant } from "../types";
import styles from "./health.css";

register({ path: "health", title: "Health", icon: "mdi:heart-pulse", element: "echolocal-health", order: 40 });

interface Column {
  title: string;

  // echod's name for the entity this column reads.
  name: string;

  // What to show, and how wrong it is. wrong decides the colour; nothing means fine.
  show?: (state: HassState) => string;
  wrong?: (state: HassState) => "warn" | "bad" | undefined;

  // What to sort on, when it is not the state read as a number.
  sort?: (state: HassState) => number | string;
}

// Home Assistant converts a temperature to whatever the user's unit system asks for, so a threshold has
// to know which scale it is being handed: 114 is a cold chip in Fahrenheit and a hot one in Celsius.
function celsius(state: HassState): number {
  const value = Number(state.state);
  return state.attributes.unit_of_measurement === "°F" ? ((value - 32) * 5) / 9 : value;
}

const COLUMNS: Column[] = [
  {
    title: "Version",
    name: "firmware",
    show: (state) => String(state.attributes.installed_version ?? "—"),
    sort: (state) => String(state.attributes.installed_version ?? ""),
  },
  {
    title: "Update",
    name: "firmware",
    show: (state) => (state.state === "on" ? "waiting" : state.state === "off" ? "current" : state.state),
    wrong: (state) => (state.state === "on" ? "warn" : undefined),
    sort: (state) => state.state,
  },
  {
    title: "Wifi",
    name: "wifi_signal",
    show: (state) => `${Math.round(Number(state.state))} ${state.attributes.unit_of_measurement || "dBm"}`,
    wrong: (state) =>
      Number(state.state) < -80 ? "bad" : Number(state.state) < -70 ? "warn" : undefined,
  },
  {
    title: "CPU",
    name: "cpu_temperature",
    show: (state) =>
      `${Math.round(Number(state.state))}${state.attributes.unit_of_measurement || "°C"}`,
    wrong: (state) => (celsius(state) > 85 ? "bad" : celsius(state) > 70 ? "warn" : undefined),
    sort: celsius,
  },
  {
    title: "Load",
    name: "load_average",
    show: (state) => Number(state.state).toFixed(2),
  },
  {
    title: "Memory",
    name: "memory_available",
    show: (state) => `${Math.round(Number(state.state))} ${state.attributes.unit_of_measurement || "MB"}`,
    wrong: (state) =>
      Number(state.state) < 40 ? "bad" : Number(state.state) < 80 ? "warn" : undefined,
  },
  {
    title: "Disk",
    name: "free_space",
    show: (state) => `${Math.round(Number(state.state))} ${state.attributes.unit_of_measurement || "MB"}`,
    wrong: (state) =>
      Number(state.state) < 50 ? "bad" : Number(state.state) < 150 ? "warn" : undefined,
  },
  {
    title: "Address",
    name: "ip_address",

    // Three addresses on one row is unreadable, and the first is the one somebody wants.
    show: (state) => state.state.split(", ")[0] ?? state.state,
  },
];

@customElement("echolocal-health")
export class EchoLocalHealth extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;

  @state() private by = "";
  @state() private down = false;

  render() {
    if (!this.hass) return nothing;

    const found = findSatellites(this.hass);
    if (!found.length) return html`<div class="none">No EchoLocal devices yet.</div>`;

    const rows = found.map((device) => this.read(device));
    const sorted = this.sort(rows);

    return html`<div class="scroll">
      <table>
        <thead>
          <tr>
            ${this.head("Device")}${COLUMNS.map((column) => this.head(column.title))}
          </tr>
        </thead>
        <tbody>
          ${sorted.map(
            (row) => html`<tr data-off=${String(!row.up)}>
              <td class="who">
                <button @click=${() => this.open(row.device)}>${row.name}</button>
              </td>
              ${COLUMNS.map((column) => {
                const cell = row.cells[column.title];
                return html`<td data-wrong=${cell?.wrong ?? ""}>${cell?.text ?? "—"}</td>`;
              })}
            </tr>`
          )}
        </tbody>
      </table>
    </div>`;
  }

  private head(title: string) {
    return html`<th
      data-by=${String(this.by === title)}
      @click=${() => {
        this.down = this.by === title ? !this.down : false;
        this.by = title;
      }}
    >
      ${title}
    </th>`;
  }

  private read(device: HassDevice) {
    const found = resolve(this.hass, device.id);
    const cells: Record<string, { text: string; sort: number | string; wrong?: string }> = {};

    let up = false;

    for (const column of COLUMNS) {
      const entityId = found?.by.get(column.name)?.[0]?.entity_id;
      const reading = entityId ? this.hass.states[entityId] : undefined;
      if (!reading || reading.state === "unavailable" || reading.state === "unknown") continue;

      up = true;
      const number = Number(reading.state);
      const unit = reading.attributes.unit_of_measurement ?? "";

      cells[column.title] = {
        text: column.show
          ? column.show(reading)
          : unit
            ? `${reading.state} ${unit}`
            : reading.state,
        sort: column.sort
          ? column.sort(reading)
          : Number.isFinite(number) && reading.state !== ""
            ? number
            : reading.state,
        wrong: column.wrong?.(reading),
      };
    }

    return { device, name: deviceName(device), cells, up };
  }

  private sort(rows: ReturnType<EchoLocalHealth["read"]>[]) {
    if (!this.by) return rows;

    const key = (row: (typeof rows)[number]) =>
      this.by === "Device" ? row.name : (row.cells[this.by]?.sort ?? "");

    return [...rows].sort((a, b) => {
      const left = key(a);
      const right = key(b);
      const order =
        typeof left === "number" && typeof right === "number"
          ? left - right
          : String(left).localeCompare(String(right));

      return this.down ? -order : order;
    });
  }

  // The device page is where everything else about a device lives, so the name is a way there rather than
  // a place to duplicate it. It is a route, not a dialog — more-info only opens entities.
  private open(device: HassDevice) {
    history.pushState(null, "", `/config/devices/device/${device.id}`);
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
  }
}
