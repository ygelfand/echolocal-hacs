// Health: one row per device. Each column is a diagnostic entity found by pattern, and colours itself
// when the reading is bad. A device missing one gets a dash.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { register } from "../nav";
import { deviceName, findSatellites, resolve } from "../satellite";
import type { HassDevice, HomeAssistant } from "../types";
import styles from "./health.css";

register({ path: "health", title: "Health", icon: "mdi:heart-pulse", element: "echolocal-health", order: 40 });

interface Column {
  title: string;
  match: RegExp;

  // How wrong a value is, which is what the sort uses and what colors the cell. Nothing means fine.
  wrong?: (value: number | string) => "warn" | "bad" | undefined;
  show?: (value: string, unit: string) => string;
}

const COLUMNS: Column[] = [
  {
    title: "Version",
    match: /_(?:current_version|installed_version)$/,
  },
  {
    title: "Update",
    match: /^update\./,
    show: (value) => (value === "on" ? "waiting" : value === "off" ? "current" : value),
    wrong: (value) => (value === "on" ? "warn" : undefined),
  },
  {
    title: "Wifi",
    match: /_wifi_signal$/,
    show: (value, unit) => `${Math.round(Number(value))} ${unit || "dBm"}`,
    wrong: (value) => (Number(value) < -80 ? "bad" : Number(value) < -70 ? "warn" : undefined),
  },
  {
    title: "CPU",
    match: /_cpu_temperature$/,
    show: (value, unit) => `${Math.round(Number(value))}${unit || "°C"}`,
    wrong: (value) => (Number(value) > 80 ? "bad" : Number(value) > 70 ? "warn" : undefined),
  },
  {
    title: "Load",
    match: /_load_average$/,
    show: (value) => Number(value).toFixed(2),
  },
  {
    title: "Memory",
    match: /_memory_available$/,
    show: (value, unit) => `${Math.round(Number(value))} ${unit || "MB"}`,
    wrong: (value) => (Number(value) < 40 ? "bad" : Number(value) < 80 ? "warn" : undefined),
  },
  {
    title: "Disk",
    match: /_free_space$/,
    show: (value, unit) => `${Math.round(Number(value))} ${unit || "MB"}`,
    wrong: (value) => (Number(value) < 50 ? "bad" : Number(value) < 150 ? "warn" : undefined),
  },
  {
    title: "Address",
    match: /_ip_address$/,
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
    const state = resolve(this.hass, device.id);
    const ids = (state?.entities ?? []).map((entity) => entity.entity_id);
    const cells: Record<string, { text: string; sort: number | string; wrong?: string }> = {};

    let up = false;

    for (const column of COLUMNS) {
      const found = ids.find((id) => column.match.test(id));
      const reading = found ? this.hass.states[found] : undefined;
      if (!reading) continue;

      const raw = reading.state;
      if (raw === "unavailable" || raw === "unknown") continue;

      up = true;
      const unit = reading.attributes.unit_of_measurement ?? "";
      const number = Number(raw);

      cells[column.title] = {
        text: column.show ? column.show(raw, unit) : unit ? `${raw} ${unit}` : raw,
        sort: Number.isFinite(number) && raw !== "" ? number : raw,
        wrong: column.wrong?.(Number.isFinite(number) ? number : raw),
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
