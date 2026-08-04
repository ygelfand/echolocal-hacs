// Groups: the device by label matrix. Everything here writes to Home Assistant's own registries.

import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { createLabel, deleteLabel, group, labels, renameLabel, setLabels } from "../groups";
import { register } from "../nav";
import { deviceName, findSatellites } from "../satellite";
import type { HassDevice, HassLabel, HomeAssistant } from "../types";
import styles from "./groups.css";

register({
  path: "groups",
  title: "Groups",
  icon: "mdi:group",
  element: "echolocal-groups",
  order: 30,
  admin: true,
});

@customElement("echolocal-groups")
export class EchoLocalGroups extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ attribute: false }) hass!: HomeAssistant;

  @state() private known: HassLabel[] = [];
  @state() private asked = false;
  @state() private naming = "";

  protected updated() {
    if (this.asked || !this.hass) return;

    this.asked = true;
    this.load();
  }

  render() {
    if (!this.hass) return nothing;

    const devices = findSatellites(this.hass);
    // Only the labels satellites carry are groups, plus every label that exists so a fresh one can be
    // filled — otherwise a new group would have nowhere to put anybody.
    const columns = this.known;

    return html`
      <div class="make">
        <input
          class="new"
          placeholder="New group"
          .value=${this.naming}
          @input=${(e: Event) => (this.naming = (e.target as HTMLInputElement).value)}
          @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this.make()}
        />
        <button class="make" ?disabled=${!this.naming.trim()} @click=${this.make}>Add</button>
      </div>

      ${devices.length
        ? html`<table>
            <thead>
              <tr>
                <th class="who">Device</th>
                ${columns.map((label) => this.head(label))}
              </tr>
            </thead>
            <tbody>
              ${devices.map((device) => this.row(device, columns))}
            </tbody>
          </table>`
        : html`<div class="none">
            No EchoLocal devices yet, so there is nothing to group.
          </div>`}
    `;
  }

  private head(label: HassLabel) {
    const count = group(findSatellites(this.hass), this.known).find((one) => one.id === label.label_id)
      ?.devices.length;

    return html`<th>
      <div class="label">
        <input
          .value=${label.name}
          style=${`width:${Math.max(6, label.name.length + 1)}ch`}
          @change=${(e: Event) => this.rename(label, (e.target as HTMLInputElement).value)}
        />
        <button
          aria-label="Delete ${label.name}"
          title=${count ? `${count} still in it` : "Delete this group"}
          @click=${() => this.discard(label)}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    </th>`;
  }

  private row(device: HassDevice, columns: HassLabel[]) {
    const mine = device.labels ?? [];

    return html`<tr>
      <td class="who">${deviceName(device)}</td>
      ${columns.map(
        (label) => html`<td>
          <input
            type="checkbox"
            aria-label="${deviceName(device)} in ${label.name}"
            .checked=${mine.includes(label.label_id)}
            @change=${(e: Event) =>
              this.set(device, label.label_id, (e.target as HTMLInputElement).checked)}
          />
        </td>`
      )}
    </tr>`;
  }

  private async make() {
    const name = this.naming.trim();
    if (!name) return;

    this.naming = "";
    await createLabel(this.hass, name);
    await this.load();
  }

  private async rename(label: HassLabel, name: string) {
    if (!name.trim() || name === label.name) return;

    await renameLabel(this.hass, label.label_id, name.trim());
    await this.load();
  }

  private async discard(label: HassLabel) {
    // Deleting the label is what deletes the group; Home Assistant takes it off every device itself.
    await deleteLabel(this.hass, label.label_id);
    await this.load();
  }

  private async set(device: HassDevice, id: string, wanted: boolean) {
    const mine = new Set(device.labels ?? []);
    if (wanted) mine.add(id);
    else mine.delete(id);

    await setLabels(this.hass, device.id, [...mine]);
  }

  private async load() {
    this.known = await labels(this.hass);
  }
}
