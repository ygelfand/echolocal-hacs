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
  @state() private busy = false;

  private stop?: () => void;

  connectedCallback() {
    super.connectedCallback();

    // Labels change from the device page and from other tabs too, so follow the registry rather than only
    // reacting to what happens here.
    this.hass?.connection
      ?.subscribeEvents(() => this.load(), "label_registry_updated")
      .then((off) => (this.stop = off))
      .catch(() => {});
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stop?.();
  }

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
        <ha-input
          class="new"
          placeholder="New group"
          .value=${this.naming}
          @input=${(e: Event) => (this.naming = (e.target as HTMLInputElement).value)}
          @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this.make()}
        ></ha-input>
        <ha-button
          .disabled=${!this.naming.trim() || this.busy}
          .loading=${this.busy}
          @click=${this.make}
        >
          Add
        </ha-button>
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
        <ha-input
          .value=${label.name}
          style=${`width:${Math.max(8, label.name.length + 2)}ch`}
          @change=${(e: Event) => this.rename(label, (e.target as HTMLInputElement).value)}
        ></ha-input>
        <ha-icon-button
          .label=${count ? `Delete ${label.name}, ${count} still in it` : `Delete ${label.name}`}
          @click=${() => this.discard(label)}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </ha-icon-button>
      </div>
    </th>`;
  }

  private row(device: HassDevice, columns: HassLabel[]) {
    const mine = device.labels ?? [];

    return html`<tr>
      <td class="who">${deviceName(device)}</td>
      ${columns.map(
        (label) => html`<td>
          <ha-checkbox
            aria-label="${deviceName(device)} in ${label.name}"
            .checked=${mine.includes(label.label_id)}
            @change=${(e: Event) =>
              this.set(device, label.label_id, (e.target as HTMLInputElement).checked)}
          ></ha-checkbox>
        </td>`
      )}
    </tr>`;
  }

  // Home Assistant hands back the label it made, so the column appears with the round trip rather than
  // after a second one to list them all again.
  private async make() {
    const name = this.naming.trim();
    if (!name || this.busy) return;

    this.busy = true;
    this.naming = "";

    const made = await createLabel(this.hass, name);
    if (made) this.known = [...this.known, made].sort((a, b) => a.name.localeCompare(b.name));

    this.busy = false;
    if (!made) await this.load();
  }

  private async rename(label: HassLabel, name: string) {
    if (!name.trim() || name === label.name) return;

    this.known = this.known.map((one) =>
      one.label_id === label.label_id ? { ...one, name: name.trim() } : one
    );
    await renameLabel(this.hass, label.label_id, name.trim());
  }

  private async discard(label: HassLabel) {
    // Deleting the label is what deletes the group; Home Assistant takes it off every device itself.
    this.known = this.known.filter((one) => one.label_id !== label.label_id);
    await deleteLabel(this.hass, label.label_id);
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
