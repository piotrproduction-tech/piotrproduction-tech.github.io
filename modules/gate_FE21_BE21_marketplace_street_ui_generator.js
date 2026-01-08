/**
 * CITYOF-GATE :: Marketplace 5.0 — Street UI Generator (ESM)
 * FE21 / BE21 — Nowa Generacja
 *
 * Tworzy:
 *  - street/StreetMap.js
 *  - street/StreetZone.js
 *  - street/StreetGlowLayer.js
 *  - street/components/StreetShopMarker.js
 *  - street/components/StreetEventMarker.js
 *  - street/styles/street.css
 *
 * Niczego nie nadpisuje.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();

const FILES = [
  {
    path: "street/StreetMap.js",
    content: `export function StreetMap() {
  return "<div>Street Map</div>";
}`
  },

  {
    path: "street/StreetZone.js",
    content: `export function StreetZone(zone) {
  return "<div>Street Zone</div>";
}`
  },

  {
    path: "street/StreetGlowLayer.js",
    content: `export function StreetGlowLayer(data) {
  return "<div>Street Glow Layer</div>";
}`
  },

  {
    path: "street/components/StreetShopMarker.js",
    content: `export function StreetShopMarker(shop) {
  return "<div>Shop Marker</div>";
}`
  },

  {
    path: "street/components/StreetEventMarker.js",
    content: `export function StreetEventMarker(event) {
  return "<div>Event Marker</div>";
}`
  },

  {
    path: "street/styles/street.css",
    content: `/* Marketplace Street UI Styles */`
  }
];

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log("📁 Utworzono:", dir);
  }
}

function writeFile(file) {
  const full = path.join(ROOT, file.path);

  if (fs.existsSync(full)) {
    console.log("⏭ Istnieje:", file.path);
    return;
  }

  ensureDir(full);
  fs.writeFileSync(full, file.content);
  console.log("📄 Utworzono:", file.path);
}

export function run() {
  console.log("🗺️ Marketplace Street UI Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Street UI Generator — DONE");
}

run();
