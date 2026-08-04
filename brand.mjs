// The brand icon: a Dot from above, which is what the card draws.
//
// Two of them, because Home Assistant asks for a dark variant and the device comes in two colours: a black
// Dot for the light theme and a white one for the dark theme, each reading against the background it will
// actually be shown on. The palettes are the ones in card.css, so the icon and the card agree.
//
// The geometry is worked out rather than copied because it has to agree with src/art.ts: the ring is twelve
// wedges with a gap between each, and the buttons sit at four points on a circle. It is repeated rather than
// imported because art.ts is TypeScript returning Lit templates, and this needs plain text.

const SEGMENTS = 12;
const GAP = 2.2;
const CX = 100;
const CY = 100;
const BUTTON = 46;

// A hue per segment, which is the one thing no other integration's icon looks like — and it is a state the
// card really shows, since the twelve segments are individually addressable. The ring is what carries the
// icon at small sizes, so it is the same in both variants.
const hue = (i) => hsl((i * 360) / SEGMENTS, 0.95, 0.55);

function hsl(h, s, l) {
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const v = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(v * 255)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${f(0)}${f(8)}${f(4)}`;
}

const SHELLS = {
  // icon.png — shown against a light background, so the black Dot.
  icon: {
    shell: "#24262a",
    top: "#191b1e",
    high: "#2e3237",
    edge: "rgba(255, 255, 255, 0.09)",
    face: "rgba(255, 255, 255, 0.05)",
    glyph: "rgba(255, 255, 255, 0.62)",
  },

  // dark_icon.png — shown against a dark background, so the white one.
  dark_icon: {
    shell: "#e7e4dd",
    top: "#f2f0ea",
    high: "#ffffff",
    edge: "rgba(0, 0, 0, 0.1)",
    face: "rgba(0, 0, 0, 0.05)",
    glyph: "rgba(0, 0, 0, 0.5)",
  },
};

const at = (r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [(CX + r * Math.cos(a)).toFixed(2), (CY + r * Math.sin(a)).toFixed(2)];
};

function annulus(outer, inner, from, to) {
  const [x0, y0] = at(outer, from);
  const [x1, y1] = at(outer, to);
  const [x2, y2] = at(inner, to);
  const [x3, y3] = at(inner, from);

  return `M${x0} ${y0}A${outer} ${outer} 0 0 1 ${x1} ${y1}L${x2} ${y2}A${inner} ${inner} 0 0 0 ${x3} ${y3}Z`;
}

const wedges = Array.from({ length: SEGMENTS }, (_, i) =>
  annulus(
    93,
    82,
    -90 + (360 / SEGMENTS) * i + GAP / 2,
    -90 + (360 / SEGMENTS) * (i + 1) - GAP / 2,
  ),
);

// The four buttons as they sit on the real thing, clockwise from the top. Their glyphs are heavier than the
// card's: this is rasterised as small as 24px, where a hairline disappears altogether. Below about 32px the
// faces are what carry the shape and the glyphs are a bonus.
function buttons(c) {
  const one = (x, y, glyph) => `  <g transform="translate(${x} ${y})">
    <circle r="13" fill="${c.face}"/>
${glyph}
  </g>`;

  const line = (d) =>
    `    <path d="${d}" stroke="${c.glyph}" stroke-width="2.4" stroke-linecap="round" fill="none"/>`;

  return [
    one(CX, CY - BUTTON, line("M-5 0h10M0 -5v10")),
    one(CX + BUTTON, CY, `    <circle r="5" fill="${c.glyph}"/>`),
    one(CX, CY + BUTTON, line("M-5 0h10")),
    one(
      CX - BUTTON,
      CY,
      `    <path d="M-2.8 -5.4a2.8 2.8 0 0 1 5.6 0v4.2a2.8 2.8 0 0 1-5.6 0z" fill="${c.glyph}"/>\n` +
        line("M-5 -0.6a5 5 0 0 0 10 0M0 4.2v2.4"),
    ),
  ].join("\n");
}

function draw(c) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="512" height="512">
  <defs>
    <radialGradient id="top" cx="38%" cy="30%" r="78%">
      <stop offset="0%" stop-color="${c.high}"/>
      <stop offset="100%" stop-color="${c.top}"/>
    </radialGradient>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3.5"/>
    </filter>
  </defs>

  <circle cx="${CX}" cy="${CY}" r="97" fill="${c.shell}"/>

  <g filter="url(#glow)" opacity="0.5">
${wedges.map((d, i) => `    <path d="${d}" fill="${hue(i)}"/>`).join("\n")}
  </g>
${wedges.map((d, i) => `  <path d="${d}" fill="${hue(i)}"/>`).join("\n")}

  <circle cx="${CX}" cy="${CY}" r="79" fill="url(#top)"/>
  <circle cx="${CX}" cy="${CY}" r="79" fill="none" stroke="${c.edge}" stroke-width="1"/>

${buttons(c)}
</svg>
`;
}

const [, , which] = process.argv;
const colours = SHELLS[which];

if (!colours) {
  console.error(`usage: node brand.mjs <${Object.keys(SHELLS).join("|")}>`);
  process.exit(1);
}

process.stdout.write(draw(colours));
