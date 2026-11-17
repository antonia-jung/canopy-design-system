/** Eigene Beispielbilder für die Templates: abstrakte Waldlandschaften als SVG, ohne externe Dateien. */
const svg = (body: string, bg: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice"><rect width="640" height="360" fill="${bg}"/>${body}</svg>`,
  )}`;

const tree = (x: number, y: number, h: number, c: string) =>
  `<path d="M${x} ${y - h} L${x + h * 0.32} ${y} L${x - h * 0.32} ${y} Z" fill="${c}"/>` +
  `<path d="M${x} ${y - h * 0.72} L${x + h * 0.4} ${y - h * 0.18} L${x - h * 0.4} ${y - h * 0.18} Z" fill="${c}"/>`;

export const sampleHero = svg(
  `<circle cx="470" cy="104" r="52" fill="#f1e3b0"/>
   <path d="M0 230 C120 170 220 210 330 180 C440 150 540 200 640 170 V360 H0Z" fill="#9db78f"/>
   <path d="M0 270 C140 220 260 270 380 235 C490 205 570 250 640 230 V360 H0Z" fill="#5f8a6c"/>
   <path d="M0 315 C160 275 300 320 440 290 C530 270 590 300 640 290 V360 H0Z" fill="#1f4d3a"/>
   ${tree(90, 300, 120, '#163a2b')}${tree(150, 310, 90, '#163a2b')}${tree(540, 300, 130, '#163a2b')}${tree(590, 312, 80, '#163a2b')}`,
  '#dbe6d0',
);

export const sampleCanopy = svg(
  `<circle cx="320" cy="180" r="120" fill="#cfe0c8"/>
   ${[0, 1, 2, 3, 4].map((i) => `<circle cx="${190 + i * 65}" cy="${i % 2 ? 205 : 160}" r="${i % 2 ? 46 : 56}" fill="${['#1f4d3a', '#5f8a6c', '#9db78f', '#5f8a6c', '#1f4d3a'][i]}"/>`).join('')}`,
  '#e3ecd8',
);

export const sampleLichtung = svg(
  `<path d="M320 40 L560 360 H80 Z" fill="#cfe0c8"/>
   <path d="M320 110 L480 360 H160 Z" fill="#9db78f"/>
   <path d="M320 190 L410 360 H230 Z" fill="#1f4d3a"/>
   <circle cx="320" cy="80" r="22" fill="#f1e3b0"/>`,
  '#dbe6d0',
);

export const sampleKaesslight = svg(
  `${Array.from({ length: 14 }, (_, i) => `<rect x="${30 + i * 42}" y="${250 - (Math.sin(i * 1.3) + 1.4) * 70}" width="26" height="${110 + (Math.sin(i * 1.3) + 1.4) * 70}" rx="13" fill="${i % 3 === 0 ? '#1f4d3a' : i % 3 === 1 ? '#5f8a6c' : '#9db78f'}"/>`).join('')}
   <circle cx="540" cy="70" r="30" fill="#f1e3b0"/>`,
  '#e3ecd8',
);
