// Guards the two hand-maintained content files against silent drift.
//
//   1. home_en.ts and home_th.ts must have the same shape: same keys, same array lengths, and
//      identical language-independent values (numbers, booleans, slugs, icons, image paths,
//      hrefs, section kinds, …). Only free-text strings are allowed to differ.
//   2. Every icon name used as data (or as a literal in the UI) must exist in icon-paths.ts,
//      otherwise <MaterialIcon> silently renders nothing.
//
// Run with `npm run check:content` (also part of `npm run check` and CI).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import * as en from "../app/features/home/content/home_en";
import * as th from "../app/features/home/content/home_th";
import { FILLED_ICONS, ICONS } from "../app/features/home/ui/icon-paths";

/** String-valued keys whose value must be identical in every language. */
const NEUTRAL_STRING_KEYS = new Set([
  "slug",
  "category_key",
  "accent",
  "icon",
  "imageSrc",
  "imagePosition",
  "imagePath",
  "src",
  "href",
  "ctaHref",
  "kind",
  "id",
  "verdict",
  "badge",
]);

const PAIRS: [string, unknown, unknown][] = [
  ["SITE_BRAND", en.SITE_BRAND_EN, th.SITE_BRAND_TH],
  ["HERO_HEADLINE_NAME_LINES", en.HERO_HEADLINE_NAME_LINES_EN, th.HERO_HEADLINE_NAME_LINES_TH],
  ["HERO_HEADLINE_ROLE", en.HERO_HEADLINE_ROLE_EN, th.HERO_HEADLINE_ROLE_TH],
  ["HERO_SUBTITLE", en.HERO_SUBTITLE_EN, th.HERO_SUBTITLE_TH],
  ["SITE_NAV", en.SITE_NAV_EN, th.SITE_NAV_TH],
  ["PORTFOLIO_PROJECTS", en.PORTFOLIO_PROJECTS_EN, th.PORTFOLIO_PROJECTS_TH],
  ["SKILL_ITEMS", en.SKILL_ITEMS_EN, th.SKILL_ITEMS_TH],
  ["FOOTER_SOCIAL_LINKS", en.FOOTER_SOCIAL_LINKS_EN, th.FOOTER_SOCIAL_LINKS_TH],
];

const errors: string[] = [];

const kindOf = (v: unknown) => (Array.isArray(v) ? "array" : v === null ? "null" : typeof v);

function compare(a: unknown, b: unknown, path: string, key: string) {
  if (kindOf(a) !== kindOf(b)) {
    errors.push(`${path}: type differs (en: ${kindOf(a)}, th: ${kindOf(b)})`);
    return;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) errors.push(`${path}: array length differs (en: ${a.length}, th: ${b.length})`);
    for (let i = 0; i < Math.min(a.length, b.length); i++) compare(a[i], b[i], `${path}[${i}]`, key);
    return;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const ka = Object.keys(a).sort();
    const kb = Object.keys(b).sort();
    for (const k of ka.filter((k) => !kb.includes(k))) errors.push(`${path}.${k}: missing in th`);
    for (const k of kb.filter((k) => !ka.includes(k))) errors.push(`${path}.${k}: missing in en`);
    for (const k of ka.filter((k) => kb.includes(k))) {
      compare((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k], `${path}.${k}`, k);
    }
    return;
  }
  // primitives
  if (typeof a === "string") {
    if (NEUTRAL_STRING_KEYS.has(key) && a !== b) {
      errors.push(`${path}: must be identical in both languages (en: ${JSON.stringify(a)}, th: ${JSON.stringify(b)})`);
    }
    return;
  }
  if (a !== b) errors.push(`${path}: value differs (en: ${String(a)}, th: ${String(b)})`);
}

for (const [name, a, b] of PAIRS) compare(a, b, name, name);

// ---- icon names ----
const ICON_NAME = /^[a-z][a-z0-9_]*$/; // emoji icons in the content are rendered as text, not icons
const usedIcons = new Map<string, string>(); // name -> where

function collectIcons(v: unknown, path: string) {
  if (Array.isArray(v)) v.forEach((x, i) => collectIcons(x, `${path}[${i}]`));
  else if (v && typeof v === "object") {
    for (const [k, x] of Object.entries(v)) {
      if (k === "icon" && typeof x === "string" && ICON_NAME.test(x)) usedIcons.set(x, `${path}.icon`);
      else collectIcons(x, `${path}.${k}`);
    }
  }
}
for (const [name, a, b] of PAIRS) {
  collectIcons(a, `${name}(en)`);
  collectIcons(b, `${name}(th)`);
}

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (full.endsWith(".tsx")) out.push(full);
  }
  return out;
}
for (const file of walk("app")) {
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(/<MaterialIcon\s+name="([a-z0-9_]+)"([^>]*?)(\/?)>/g)) {
    usedIcons.set(m[1], file);
    if (/\bfilled\b/.test(m[2]) && !FILLED_ICONS[m[1]]) {
      errors.push(`${file}: <MaterialIcon name="${m[1]}" filled> has no entry in FILLED_ICONS`);
    }
  }
}
for (const [name, where] of usedIcons) {
  if (!ICONS[name]) errors.push(`icon "${name}" (${where}) is not defined in app/features/home/ui/icon-paths.ts`);
}

if (errors.length > 0) {
  console.error(`\ncontent check failed (${errors.length}):\n`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  console.error("");
  process.exit(1);
}
console.log(`content check passed: EN/TH structure matches, ${usedIcons.size} icon names resolved.`);
