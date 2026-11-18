import { LitElement, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { labels } from "../groups";
import { register } from "../nav";
import pills from "../pills.css";
import type { HassLabel, HomeAssistant } from "../types";

import styles from "./fleet.css";

register({
  path: "fleet",
  title: "Fleet",
  icon: "mdi:compare-horizontal",
  element: "echolocal-fleet",
  order: 32,
  admin: true,
});

interface Setting {
  domain: string;
  section: string;
  group: string;
  name: string;
  title: string;
  kind: string;
  value: string;
  choices?: string[];
}

interface Device {
  id: string;
  name: string;
  online: boolean;
  settings: Setting[];
  error: string | null;
}

interface Fleet {
  devices: Device[];
  local: string[];
}

interface Skipped {
  domain: string;
  name: string;
  why: string;
}

interface Result {
  id: string;
  changed: number;
  skipped: Skipped[];
  errors: string[];
}

interface Row {
  key: string;
  setting: Setting;
}

interface Section {
  title: string;
  rows: Row[];
}

type Mark = "match" | "differs" | "na";

const ICONS: Record<Mark, string> = {
  match: "mdi:check",
  differs: "mdi:not-equal-variant",
  na: "mdi:minus",
};

const LABELS: Record<Mark, string> = {
  match: "Matches",
  differs: "Differs",
  na: "Doesn't apply",
};

const HIDDEN = new Set(["secret", "credential", "password"]);

function keyOf(s: Setting): string {
  return `${s.domain}.${s.name}`;
}

@customElement("echolocal-fleet")
export class EchoLocalFleet extends LitElement {
  static styles = [unsafeCSS(pills), unsafeCSS(styles)];

  @property({ attribute: false }) hass!: HomeAssistant;

  @state() private fleet?: Fleet;
  @state() private failed = "";
  @state() private said = "";
  @state() private master = "";
  @state() private scope = "";
  @state() private known: HassLabel[] = [];
  @state() private keys = new Set<string>();
  @state() private targets = new Set<string>();
  @state() private ignored = new Set<string>();
  @state() private folded = new Set<string>();
  @state() private everything = false;
  @state() private picking = false;
  @state() private search = "";
  @state() private find = "";
  @state() private busy = false;
  @state() private results = new Map<string, Result>();

  private asked = false;

  protected updated() {
    if (this.asked || !this.hass) return;
    this.asked = true;
    void this.load();
    void labels(this.hass).then((known) => (this.known = known));
  }

  render() {
    if (!this.hass) return nothing;
    if (this.failed) return html`<div class="spare">${this.failed}</div>`;
    if (!this.fleet) return html`<div class="spare">Reading every device…</div>`;

    const master = this.masterDevice();
    const sources = this.sources();
    if (!master) {
      return html`<div class="spare">No device is online to compare against.</div>`;
    }

    const sections = this.sections(master);
    const others = this.others(master);

    return html`
      <div class="top">
        <ha-select
          class="primary"
          label="Primary"
          .value=${master.id}
          .options=${sources.map((d) => ({ value: d.id, label: d.name }))}
          @selected=${(e: CustomEvent<{ value?: string }>) => e.detail.value && this.choose(e.detail.value)}
        ></ha-select>
        ${this.renderScope()}
        <div class="spacer"></div>
        <label class="toggle">
          <ha-switch
            .checked=${this.everything}
            @change=${(e: Event) => (this.everything = (e.target as HTMLInputElement).checked)}
          ></ha-switch>
          Show matching
        </label>
        <button class="local" @click=${() => (this.picking = !this.picking)}>
          <ha-icon icon="mdi:pin-outline"></ha-icon>
          Local${this.fleet.local.length ? ` (${this.fleet.local.length})` : ""}
        </button>
        ${this.picking ? this.renderLocal(master) : nothing}
      </div>

      <div class="scroll">${this.renderTable(master, sections, others)}</div>

      <div class="bottom">
        ${this.said ? html`<span class="differs">${this.said}</span>` : nothing}
        <span class="quiet">
          ${this.chosen(sections).length} settings to ${this.targets.size}
          ${this.targets.size === 1 ? "device" : "devices"}
        </span>
        <ha-button
          .disabled=${this.busy || !this.targets.size || !this.chosen(sections).length}
          .loading=${this.busy}
          @click=${() => this.sync(master, sections)}
        >
          Sync
        </ha-button>
      </div>
    `;
  }

  private renderScope() {
    const used = new Set(this.fleet!.devices.flatMap((d) => this.hass.devices?.[d.id]?.labels ?? []));
    const shown = this.known.filter((l) => used.has(l.label_id));
    if (!shown.length) return nothing;
    return html`<div class="pills">
      <button class="pill" data-on=${String(!this.scope)} @click=${() => this.scopeTo("")}>All</button>
      ${shown.map(
        (l) => html`<button
          class="pill"
          data-on=${String(this.scope === l.label_id)}
          @click=${() => this.scopeTo(l.label_id)}
        >
          ${l.name}
        </button>`
      )}
    </div>`;
  }

  private renderLocal(master: Device) {
    const local = new Set(this.fleet!.local);
    const all = new Map<string, string>();
    for (const s of master.settings) all.set(keyOf(s), this.fullTitle(s));
    for (const key of local) if (!all.has(key)) all.set(key, key);
    const wanted = this.search.trim().toLowerCase();
    const listed = [...all.entries()]
      .filter(([key, title]) => !wanted || title.toLowerCase().includes(wanted) || key.includes(wanted))
      .sort((a, b) => Number(local.has(b[0])) - Number(local.has(a[0])) || a[1].localeCompare(b[1]));

    return html`<div class="popover">
      <input
        class="search"
        placeholder="Search settings"
        .value=${this.search}
        @input=${(e: Event) => (this.search = (e.target as HTMLInputElement).value)}
      />
      <div class="hint">Checked settings are never synced.</div>
      <div class="options">
        ${listed.map(
          ([key, title]) => html`<label>
            <ha-checkbox
              .checked=${local.has(key)}
              @change=${(e: Event) => this.setLocal(key, (e.target as HTMLInputElement).checked)}
            ></ha-checkbox>
            <span>${title}</span>
          </label>`
        )}
      </div>
    </div>`;
  }

  private renderTable(master: Device, sections: Section[], others: Device[]) {
    const online = others.filter((d) => this.selectable(d));
    const all = online.length > 0 && online.every((d) => this.targets.has(d.id));
    const keys = sections.flatMap((s) => s.rows.map((r) => r.key));
    const picked = keys.filter((k) => this.keys.has(k)).length;

    return html`<table>
      <thead>
        <tr>
          <th class="corner">
            <input
              class="search find"
              placeholder="Search settings"
              .value=${this.find}
              @input=${(e: Event) => (this.find = (e.target as HTMLInputElement).value)}
            />
            <div class="corner-picks">
              <label>
                <ha-checkbox
                  aria-label="Every setting"
                  .checked=${keys.length > 0 && picked === keys.length}
                  .indeterminate=${picked > 0 && picked < keys.length}
                  @change=${(e: Event) => this.every(keys, (e.target as HTMLInputElement).checked)}
                ></ha-checkbox>
                <span>All settings</span>
              </label>
              <span class="corner-split"></span>
              <label>
                <span>All devices</span>
                <ha-checkbox
                  aria-label="Every device"
                  .checked=${all}
                  .indeterminate=${!all && this.targets.size > 0}
                  @change=${(e: Event) => this.allTargets(online, (e.target as HTMLInputElement).checked)}
                ></ha-checkbox>
              </label>
            </div>
          </th>
          <th class="device primary-device">
            <div class="device-name">${master.name}</div>
            <span class="tag">primary</span>
          </th>
          ${others.map((d, i) => this.renderDeviceHead(d, others.length - i))}
          <th class="gutter"></th>
        </tr>
      </thead>
      <tbody>
        ${sections.length
          ? sections.map((s) => this.renderSection(s, master, others))
          : html`<tr>
              <td class="note" colspan=${others.length + 2}>
                ${this.find.trim()
                  ? "No setting matches the search"
                  : this.everything
                    ? "Nothing to compare"
                    : "Every device matches the primary"}
              </td>
            </tr>`}
      </tbody>
    </table>`;
  }

  private renderDeviceHead(d: Device, stack: number) {
    const result = this.results.get(d.id);
    const ignored = this.ignored.has(d.id);
    return html`<th
      class="device slanted"
      style=${`z-index: ${stack + 2}`}
      title=${d.name}
      data-offline=${String(!this.selectable(d))}
    >
      <div class="device-label">
        <span class="device-title">${d.name}</span>
        ${!d.online
          ? html`<span class="tag">offline</span>`
          : d.error === "update"
            ? html`<span class="tag">needs an update</span>`
            : d.error === "timeout"
              ? html`<span class="tag">didn't answer</span>`
              : d.error
              ? html`<span class="tag">unreadable</span>`
              : nothing}
        ${result ? html`<span class="result">${this.renderResult(result)}</span>` : nothing}
      </div>
      <div class="device-controls">
        <button
          class="ignore"
          data-on=${String(ignored)}
          title=${ignored ? `Compare ${d.name}` : `Ignore ${d.name}`}
          aria-label=${ignored ? `Compare ${d.name}` : `Ignore ${d.name}`}
          @click=${() => this.ignore(d.id, !ignored)}
        >
          <ha-icon icon=${ignored ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
        </button>
        <ha-checkbox
          aria-label=${`Sync ${d.name}`}
          .disabled=${!this.selectable(d)}
          .checked=${this.targets.has(d.id)}
          @change=${(e: Event) => this.toggle("targets", d.id, (e.target as HTMLInputElement).checked)}
        ></ha-checkbox>
      </div>
    </th>`;
  }

  private renderSection(s: Section, master: Device, others: Device[]) {
    const folded = this.folded.has(s.title);
    const on = s.rows.filter((r) => this.keys.has(r.key)).length;
    return html`
      <tr class="section">
        <th class="setting section-head">
          <div class="setting-name">
            <ha-checkbox
              aria-label=${`Every setting in ${s.title}`}
              .checked=${on === s.rows.length}
              .indeterminate=${on > 0 && on < s.rows.length}
              @change=${(e: Event) => this.group(s, (e.target as HTMLInputElement).checked)}
            ></ha-checkbox>
            <button @click=${() => this.fold(s.title)}>
              <ha-icon icon=${folded ? "mdi:chevron-right" : "mdi:chevron-down"}></ha-icon>
              <span>${s.title}</span>
              <span class="quiet">${s.rows.length}</span>
            </button>
          </div>
        </th>
        <td class="section-fill"></td>
        ${others.map((d) => (folded ? this.renderSummary(d, s) : html`<td class="section-fill"></td>`))}
      </tr>
      ${folded ? nothing : s.rows.map((r) => this.renderRow(r, master, others))}
    `;
  }

  private renderRow(r: Row, master: Device, others: Device[]) {
    return html`<tr>
      <th class="setting" title=${this.fullTitle(r.setting)}>
        <label class="setting-name">
          <ha-checkbox
            aria-label=${this.fullTitle(r.setting)}
            .checked=${this.keys.has(r.key)}
            @change=${(e: Event) => this.toggle("keys", r.key, (e.target as HTMLInputElement).checked)}
          ></ha-checkbox>
          <span>${this.shortTitle(r.setting)}</span>
        </label>
      </th>
      <td class="value">${this.shown(master.settings.find((s) => keyOf(s) === r.key) ?? r.setting)}</td>
      ${others.map((d) => this.renderCell(d, r))}
    </tr>`;
  }

  private renderCell(d: Device, r: Row) {
    const mark = this.mark(d, r);
    const theirs = d.settings.find((s) => keyOf(s) === r.key);
    const title = mark === "differs" && theirs ? `${LABELS[mark]}: ${this.shown(theirs)}` : LABELS[mark];
    return html`<td data-offline=${String(!this.selectable(d))}>
      <span class="cell ${mark}" title=${title}><ha-icon icon=${ICONS[mark]}></ha-icon></span>
    </td>`;
  }

  private renderSummary(d: Device, s: Section) {
    const marks = s.rows.map((r) => this.mark(d, r));
    const differs = marks.filter((m) => m === "differs").length;
    if (differs) {
      return html`<td data-offline=${String(!this.selectable(d))}>
        <span class="count">${differs} differ</span>
      </td>`;
    }
    const mark: Mark = marks.includes("match") ? "match" : "na";
    return html`<td data-offline=${String(!this.selectable(d))}>
      <span class="cell ${mark}" title=${LABELS[mark]}><ha-icon icon=${ICONS[mark]}></ha-icon></span>
    </td>`;
  }

  private renderResult(r: Result) {
    if (r.errors.length) return html`<span class="differs" title=${r.errors.join("\n")}>${r.errors[0]}</span>`;
    const skipped = r.skipped.length ? `, ${r.skipped.length} skipped` : "";
    return html`<span class="match">${r.changed} changed${skipped}</span>`;
  }

  private shown(s: Setting): string {
    if (HIDDEN.has(s.kind)) return s.value ? "••••••" : "";
    return s.value;
  }

  private syncable(d: Device): boolean {
    return d.online && !d.error;
  }

  private selectable(d: Device): boolean {
    return this.syncable(d) && !this.ignored.has(d.id);
  }

  private sources(): Device[] {
    return (this.fleet?.devices ?? [])
      .filter((d) => this.syncable(d) && d.settings.length)
      .sort((a, b) => b.settings.length - a.settings.length || a.name.localeCompare(b.name));
  }

  private masterDevice(): Device | undefined {
    const sources = this.sources();
    return sources.find((d) => d.id === this.master) ?? sources[0];
  }

  private others(master: Device): Device[] {
    return this.fleet!.devices
      .filter((d) => d.id !== master.id)
      .filter((d) => !this.scope || (this.hass.devices?.[d.id]?.labels ?? []).includes(this.scope))
      .sort((a, b) => Number(b.online) - Number(a.online) || a.name.localeCompare(b.name));
  }

  private mark(d: Device, r: Row): Mark {
    if (!d.online) return "na";
    const theirs = d.settings.find((s) => keyOf(s) === r.key);
    if (!theirs) return "na";
    if (theirs.choices && !theirs.choices.includes(r.setting.value)) return "na";
    return theirs.value === r.setting.value ? "match" : "differs";
  }

  private differs(r: Row, master: Device): boolean {
    return this.others(master).some((d) => !this.ignored.has(d.id) && this.mark(d, r) === "differs");
  }

  private ignore(id: string, on: boolean) {
    const ignored = new Set(this.ignored);
    const targets = new Set(this.targets);
    if (on) {
      ignored.add(id);
      targets.delete(id);
    } else {
      ignored.delete(id);
    }
    this.ignored = ignored;
    this.targets = targets;
    this.defaults();
  }

  private sections(master: Device): Section[] {
    const local = new Set(this.fleet!.local);
    const wanted = this.find.trim().toLowerCase();
    const out = new Map<string, Section>();
    for (const s of master.settings) {
      const key = keyOf(s);
      if (local.has(key)) continue;
      if (wanted && !this.fullTitle(s).toLowerCase().includes(wanted) && !key.includes(wanted)) continue;
      const row = { key, setting: s };
      if (!this.everything && !this.differs(row, master)) continue;
      const section = out.get(s.section) ?? { title: s.section, rows: [] };
      section.rows.push(row);
      out.set(s.section, section);
    }
    return [...out.values()];
  }

  private chosen(sections: Section[]): string[] {
    return sections.flatMap((s) => s.rows.map((r) => r.key)).filter((k) => this.keys.has(k));
  }

  private shortTitle(s: Setting): string {
    return s.group && s.group !== s.section && /\d/.test(s.group) ? `${s.title} ${s.group.replace(/\D+/g, "")}` : s.title;
  }

  private fullTitle(s: Setting): string {
    return s.group && s.group !== s.section ? `${s.section} › ${s.group} › ${s.title}` : `${s.section} › ${s.title}`;
  }

  private choose(id: string) {
    this.master = id;
    this.results = new Map();
    this.targets = new Set();
    this.defaults();
  }

  private scopeTo(label: string) {
    this.scope = label;
    const shown = new Set(this.others(this.masterDevice()!).map((d) => d.id));
    this.targets = new Set([...this.targets].filter((id) => shown.has(id)));
  }

  private fold(title: string) {
    const next = new Set(this.folded);
    if (!next.delete(title)) next.add(title);
    this.folded = next;
  }

  private toggle(which: "keys" | "targets", key: string, on: boolean) {
    const next = new Set(this[which]);
    if (on) next.add(key);
    else next.delete(key);
    this[which] = next;
  }

  private group(s: Section, on: boolean) {
    this.every(
      s.rows.map((r) => r.key),
      on
    );
  }

  private every(keys: string[], on: boolean) {
    const next = new Set(this.keys);
    for (const k of keys) {
      if (on) next.add(k);
      else next.delete(k);
    }
    this.keys = next;
  }

  private allTargets(online: Device[], on: boolean) {
    this.targets = on ? new Set(online.map((d) => d.id)) : new Set();
  }

  private defaults() {
    const master = this.masterDevice();
    if (!master) return;
    const keys = master.settings
      .map((s) => ({ key: keyOf(s), setting: s }))
      .filter((r) => this.differs(r, master))
      .map((r) => r.key);
    this.keys = new Set(keys);
  }

  private async load() {
    try {
      this.fleet = await this.hass.callWS<Fleet>({ type: "echolocal/fleet" });
      this.failed = "";
      this.defaults();
    } catch (err) {
      this.failed = `Couldn't read the devices: ${(err as Error).message ?? err}`;
    }
  }

  private async setLocal(key: string, on: boolean) {
    const local = new Set(this.fleet!.local);
    if (on) local.add(key);
    else local.delete(key);
    const saved = await this.hass.callWS<{ local: string[] }>({
      type: "echolocal/fleet/local",
      local: [...local],
    });
    this.fleet = { ...this.fleet!, local: saved.local };
    const keys = new Set(this.keys);
    if (on) keys.delete(key);
    this.keys = keys;
  }

  private async sync(master: Device, sections: Section[]) {
    this.busy = true;
    this.said = "";
    try {
      const targets = [...this.targets];
      const reply = await this.hass.callWS<{ results: Result[] }>({
        type: "echolocal/fleet/sync",
        primary: master.id,
        targets,
        keys: this.chosen(sections),
      });
      this.results = new Map(reply.results.map((r) => [r.id, r]));
      const kept = this.keys;
      const fresh = await this.hass.callWS<Fleet>({ type: "echolocal/fleet", devices: targets });
      const read = new Map(fresh.devices.map((d) => [d.id, d]));
      this.fleet = {
        devices: this.fleet!.devices.map((d) => read.get(d.id) ?? d),
        local: fresh.local,
      };
      this.keys = kept;
    } catch (err) {
      this.said = `Sync failed: ${(err as Error).message ?? err}`;
    } finally {
      this.busy = false;
    }
  }
}
