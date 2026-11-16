// Erzeugt aus dem Figma-Export die CSS-Variablen, eine Token-Datei im
// W3C-Design-Tokens-Format und eine TypeScript-Liste für die Storybook-Doku.
// Aufruf: npm run tokens
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = JSON.parse(readFileSync(resolve(root, 'tokens/figma-export.json'), 'utf8'));
const C = src.collections;

const PREFIX = 'cp';
const slug = (name) =>
  name
    .replace(/ - Default$/i, '')
    .replace(/\s*\/\s*/g, '-')
    .replace(/\s+/g, '-')
    .toLowerCase();
const cssVar = (name) => `--${PREFIX}-${slug(name)}`;
const ref = (v) => (typeof v === 'string' && v.startsWith('{') ? v.slice(1, -1) : null);

// Variablen, deren Wert eine Länge in px ist (Responsive, Scale)
const isPx = (name) =>
  /^(Scale|Spacing|Stack|Inset|Section|Control|Radius|Border Width|Grid\/(Gutter|Margin)|Container|Breakpoint|Font Size|Line Height|Letter Spacing)\//.test(name);

const fmt = (name, type, value) => {
  const r = ref(value);
  if (r) return `var(${cssVar(r)})`;
  if (type === 'F') {
    if (/^Duration\//.test(name)) return `${value}ms`;
    if (isPx(name)) return `${value}px`;
    return String(value);
  }
  if (type === 'S' && /^Font Family\//.test(name)) return `'${value}'`;
  return String(value);
};

const block = (selector, lines) => `${selector} {\n${lines.map((l) => `  ${l}`).join('\n')}\n}\n`;
const decls = (coll, modeIndex, filter = () => true) =>
  coll.vars.filter(([n, t]) => filter(n, t)).map(([n, t, ...vals]) => `${cssVar(n)}: ${fmt(n, t, vals[modeIndex])};`);

// Schatten aus den Effect Styles
const effectDecls = src.effects.map(([name, layers]) => {
  const parts = layers.map(([kind, x, y, blur, spread, color]) => {
    const c = ref(color) ? `var(${cssVar(ref(color))})` : color;
    return `${kind === 'inset' ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${c}`;
  });
  return `--${PREFIX}-shadow-${slug(name)}: ${parts.join(', ')};`;
});

const notLabel = (n) => n !== 'Label';
const out = [];
out.push('/* Automatisch erzeugt aus tokens/figma-export.json – nicht von Hand bearbeiten. */\n');
out.push('/* Primitive Werte (Brand, Alias) */');
out.push(block(':root', [...decls(C.Brand, 0), ...decls(C.Alias, 0)]));

out.push('/* Semantische Farben: Light (Standard) und Dark */');
out.push(block(':root, [data-theme="light"]', [...decls(C.Mapped, 0, notLabel), 'color-scheme: light;']));
out.push(block('[data-theme="dark"]', [...decls(C.Mapped, 1, notLabel), 'color-scheme: dark;']));
out.push(block('@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"])', [...decls(C.Mapped, 1, notLabel), 'color-scheme: dark;']).replace(/\n}\n$/, '\n  }\n}\n'));

out.push('/* Abgeleitete Werte: Context (Outline-Farben) und Schatten. Sie werden auf jedem\n   Element mit data-theme oder data-context neu berechnet, damit sie zum Theme passen. */');
out.push(block(':root, [data-theme], [data-context]', [...decls(C.Context, 0), ...effectDecls]));
out.push(block('[data-context="on-action"]', decls(C.Context, 1)));

out.push('/* Responsive: Mobile (Standard), Tablet ab 768 px, Desktop ab 1024 px */');
out.push(block(':root', decls(C.Responsive, 0)));
const tabletDiff = C.Responsive.vars.filter(([, , m, t]) => JSON.stringify(m) !== JSON.stringify(t));
const desktopDiff = C.Responsive.vars.filter(([, , , t, d]) => JSON.stringify(t) !== JSON.stringify(d));
out.push(`@media (min-width: 768px) {\n${block('  :root', tabletDiff.map(([n, ty, , t]) => `${cssVar(n)}: ${fmt(n, ty, t)};`)).replace(/^/gm, '').trimEnd()}\n}\n`);
out.push(`@media (min-width: 1024px) {\n${block('  :root', desktopDiff.map(([n, ty, , , d]) => `${cssVar(n)}: ${fmt(n, ty, d)};`)).trimEnd()}\n}\n`);

out.push('/* Motion */');
out.push(block(':root', decls(C.Motion, 0)));
const reduced = [
  `--${PREFIX}-duration-stretch: 0ms;`,
  `--${PREFIX}-duration-settle: 0ms;`,
  `--${PREFIX}-duration-snap: var(--${PREFIX}-duration-fast);`,
  `--${PREFIX}-easing-stretch: linear;`,
  `--${PREFIX}-easing-bounce: var(--${PREFIX}-easing-standard);`,
  `--${PREFIX}-easing-bounce-subtle: var(--${PREFIX}-easing-standard);`,
  `--${PREFIX}-motion-reduced: 1;`,
];
out.push('/* Reduzierte Bewegung: Dehnen, Bounce und Nachfedern entfallen, Wechsel blenden nur über */');
out.push(`@media (prefers-reduced-motion: reduce) {\n${block('  :root:not([data-motion="full"])', reduced).trimEnd()}\n}\n`);
out.push(block('[data-motion="reduced"]', reduced));

// Typografie-Klassen
const weight = { Regular: 400, Medium: 500, SemiBold: 600, Bold: 700 };
const typoKey = { 'Heading/H1': 'H1', 'Heading/H2': 'H2', 'Heading/H3': 'H3', 'Heading/H4': 'H4', 'Heading/H5': 'H5', 'Heading/H6': 'H6', 'Paragraph/Large': 'Paragraph Large', 'Paragraph/Medium': 'Paragraph Medium', 'Paragraph/Small': 'Paragraph Small', Caption: 'Caption', 'Button/Medium': 'Paragraph Medium' };
out.push('/* Typografie */');
for (const [name, family, style, , lh] of src.text) {
  const k = typoKey[name];
  const fam = family === 'Funnel Display' ? 'heading' : 'body';
  out.push(
    block(`.${PREFIX}-text-${slug(name)}`, [
      `font-family: var(--${PREFIX}-font-family-${fam}), system-ui, sans-serif;`,
      `font-weight: ${weight[style] ?? 400};`,
      `font-size: var(${cssVar(`Font Size/${k}`)});`,
      name === 'Button/Medium' ? `line-height: ${lh}px;` : `line-height: var(${cssVar(`Line Height/${k}`)});`,
      `letter-spacing: var(${cssVar(`Letter Spacing/${k}`)});`,
    ]),
  );
}

mkdirSync(resolve(root, 'src/styles'), { recursive: true });
writeFileSync(resolve(root, 'src/styles/tokens.css'), out.join('\n'));

// W3C Design Tokens (DTCG)
const dtcgType = (n, t) => (t === 'C' ? 'color' : /^Duration/.test(n) ? 'duration' : /^Easing/.test(n) ? 'cubicBezier' : /^Font Family/.test(n) ? 'fontFamily' : t === 'F' ? 'number' : 'string');
const dtcgVal = (n, t, v) => {
  const r = ref(v);
  if (r) return `{${r.replace(/\//g, '.')}}`;
  if (/^Duration/.test(n)) return { value: v, unit: 'ms' };
  if (/^Easing/.test(n)) return v.match(/[\d.]+/g).map(Number);
  if (t === 'F' && isPx(n)) return { value: v, unit: 'px' };
  return v;
};
const dtcg = {};
for (const [cname, coll] of Object.entries(C)) {
  for (const [n, t, ...vals] of coll.vars) {
    const path = n.split('/');
    let node = dtcg;
    for (const p of path.slice(0, -1)) node = node[p] ??= {};
    const leaf = { $type: dtcgType(n, t), $value: dtcgVal(n, t, vals[0]) };
    if (coll.modes.length > 1) leaf.$extensions = { 'com.figma.modes': Object.fromEntries(coll.modes.map((m, i) => [m, dtcgVal(n, t, vals[i])])), 'com.figma.collection': cname };
    else leaf.$extensions = { 'com.figma.collection': cname };
    node[path.at(-1)] = leaf;
  }
}
writeFileSync(resolve(root, 'tokens/tokens.json'), JSON.stringify(dtcg, null, 2));

// Liste für die Storybook-Doku
const docs = Object.fromEntries(
  Object.entries(C).map(([cname, coll]) => [
    cname,
    { modes: coll.modes, tokens: coll.vars.filter(([n]) => n !== 'Label').map(([n, t, ...vals]) => ({ name: n, cssVar: cssVar(n), type: t, values: vals })) },
  ]),
);
docs.text = src.text.map(([name, family, style, size, lh, ls]) => ({ name, className: `${PREFIX}-text-${slug(name)}`, family, style, size, lineHeight: lh, letterSpacing: ls }));
docs.effects = src.effects.map(([name]) => ({ name, cssVar: `--${PREFIX}-shadow-${slug(name)}` }));
mkdirSync(resolve(root, 'src/tokens'), { recursive: true });
writeFileSync(
  resolve(root, 'src/tokens/tokens.generated.ts'),
  `// Automatisch erzeugt aus tokens/figma-export.json – nicht von Hand bearbeiten.\nexport const tokens = ${JSON.stringify(docs, null, 2)} as const;\n`,
);

const count = Object.values(C).reduce((a, c) => a + c.vars.length, 0);
console.log(`Tokens erzeugt: ${count} Variablen, ${src.text.length} Textstile, ${src.effects.length} Schatten.`);
