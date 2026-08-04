// The dashboard's tab registry. A tab registers itself and declares its order.

export interface Tab {
  // The path under the panel. Home is the empty one.
  path: string;
  title: string;
  icon: string;

  // The custom element to render, handed hass and narrow.
  element: string;

  order: number;
  admin?: boolean;
}

const registered: Tab[] = [];

export function register(tab: Tab): void {
  registered.push(tab);
  registered.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function tabs(admin: boolean): Tab[] {
  return registered.filter((tab) => admin || !tab.admin);
}

export function match(path: string, admin: boolean): Tab | undefined {
  const wanted = trim(path);
  const shown = tabs(admin);

  return shown.find((tab) => tab.path === wanted) ?? shown[0];
}

// go pushes the address and tells Home Assistant's router, which is what makes the browser's own back
// button work. Without a router the event goes nowhere and the panel falls back to its own state.
export function go(prefix: string, path: string): void {
  const url = path ? `${prefix}/${path}` : prefix;

  if (location.pathname !== url) history.pushState(null, "", url);
  window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
}

// The path a route gives is relative to the panel and arrives with a leading slash; the one read off
// location has the prefix still on it. This takes either.
export function pathOf(prefix: string, path: string | undefined): string {
  if (path !== undefined) return trim(path);

  const here = location.pathname;
  return trim(here.startsWith(prefix) ? here.slice(prefix.length) : "");
}

function trim(path: string): string {
  return path.replace(/^\/+|\/+$/g, "");
}
