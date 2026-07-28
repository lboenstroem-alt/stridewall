/**
 * Renders the brand assets from the wordmark: public/og.png (1200x630),
 * public/apple-touch-icon.png (180x180) and public/logo.png.
 *
 * Fonts are decompressed from the same self-hosted woff2 files the site ships,
 * so the assets and the pages always use one typeface. Run via `npm run build`.
 */
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import wawoff2 from 'wawoff2';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');

const PINE = '#122b22';
const PINE_DEEP = '#0d211a';
const CREAM = '#f5f0e4';
const GOLD = '#c4a254';

/**
 * resvg matches on the family name stored inside the font, which is not the
 * family name our CSS assigns (@fontsource ships e.g. "Cormorant Garamond
 * Light"). Read it from the name table rather than guessing, preferring the
 * typographic family (nameID 16) over the legacy one (nameID 1).
 */
function familyName(buf) {
  const numTables = buf.readUInt16BE(4);
  let nameOff = 0;
  for (let i = 0; i < numTables; i++) {
    const o = 12 + i * 16;
    if (buf.toString('ascii', o, o + 4) === 'name') nameOff = buf.readUInt32BE(o + 8);
  }
  if (!nameOff) throw new Error('font has no name table');

  const count = buf.readUInt16BE(nameOff + 2);
  const strOff = nameOff + buf.readUInt16BE(nameOff + 4);
  const found = {};
  for (let i = 0; i < count; i++) {
    const r = nameOff + 6 + i * 12;
    const nameId = buf.readUInt16BE(r + 6);
    if (nameId !== 1 && nameId !== 16) continue;
    const off = strOff + buf.readUInt16BE(r + 10);
    const raw = Buffer.from(buf.subarray(off, off + buf.readUInt16BE(r + 8)));
    // platformID 3 (Windows) stores UTF-16BE; platformID 1 (Mac) stores ASCII.
    found[nameId] ??= buf.readUInt16BE(r) === 3 ? raw.swap16().toString('utf16le') : raw.toString('latin1');
  }
  const name = found[16] ?? found[1];
  if (!name) throw new Error('font has no family name record');
  return name;
}

/**
 * resvg 2.6 accepts `fontFiles` but silently ignores `fontBuffers`, so the
 * decompressed sfnt has to reach it as a file on disk.
 */
const work = await mkdtemp(join(tmpdir(), 'stridewall-fonts-'));
async function loadFont(woff2Name) {
  const buf = Buffer.from(await wawoff2.decompress(await readFile(join(pub, 'fonts', woff2Name))));
  const path = join(work, woff2Name.replace(/\.woff2$/, '.ttf'));
  await writeFile(path, buf);
  return { path, family: familyName(buf) };
}

const serif = await loadFont('cormorant-garamond-latin-600-normal.woff2');
const sans = await loadFont('ibm-plex-sans-latin-400-normal.woff2');
const fontFiles = [serif.path, sans.path];

const wordmark = (o) => `
  <text x="${o.cx}" y="${o.y}" text-anchor="middle" fill="${CREAM}"
        font-family="${serif.family}" font-size="${o.size}" letter-spacing="${o.tracking}"
        >STRIDEWALL</text>
  <rect x="${o.cx - o.ruleW / 2}" y="${o.y + o.ruleGap}" width="${o.ruleW}" height="${o.ruleH}" fill="${GOLD}"/>`;

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PINE}"/>
  ${wordmark({ cx: 615, y: 300, size: 112, tracking: 32, ruleW: 150, ruleGap: 62, ruleH: 3 })}
  <text x="600" y="428" text-anchor="middle" fill="${CREAM}" opacity="0.72"
        font-family="${sans.family}" font-size="26" letter-spacing="1"
        >KI mit Methode für den Mittelstand</text>
</svg>`;

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${PINE}"/>
  <text x="90" y="118" text-anchor="middle" fill="${CREAM}"
        font-family="${serif.family}" font-size="104">S</text>
  <rect x="56" y="138" width="68" height="4" fill="${GOLD}"/>
</svg>`;

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="320" viewBox="0 0 1000 320">
  <rect width="1000" height="320" fill="${PINE_DEEP}"/>
  ${wordmark({ cx: 512, y: 175, size: 82, tracking: 24, ruleW: 110, ruleGap: 48, ruleH: 2.5 })}
</svg>`;

function png(svg, width) {
  return new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { fontFiles, defaultFontFamily: serif.family, loadSystemFonts: false },
  })
    .render()
    .asPng();
}

// The logo ships as PNG, not SVG: an SVG would reference the font by name and
// fall back to whatever serif the viewer happens to have.
await writeFile(join(pub, 'og.png'), png(ogSvg, 1200));
await writeFile(join(pub, 'apple-touch-icon.png'), png(iconSvg, 180));
await writeFile(join(pub, 'logo.png'), png(logoSvg, 1000));
await rm(work, { recursive: true, force: true });

console.log(`brand assets written using "${serif.family}" / "${sans.family}"`);
