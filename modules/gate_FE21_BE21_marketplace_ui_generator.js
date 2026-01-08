/**
 * CITYOF-GATE :: Marketplace 5.0 — UI Panels Generator (ESM)
 * FE21 / BE21 — Nowa Generacja
 *
 * Tworzy:
 *  - panels/marketplace/MarketplacePanel.js
 *  - panels/marketplace/components/ItemCard.js
 *  - panels/marketplace/components/CreatorCard.js
 *  - panels/marketplace/components/ShopCard.js
 *  - panels/marketplace/components/EventCard.js
 *  - panels/marketplace/styles/marketplace.css
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
    path: "panels/marketplace/MarketplacePanel.js",
    content: `export function MarketplacePanel() {
  return "<div>Marketplace Panel</div>";
}`
  },

  {
    path: "panels/marketplace/components/ItemCard.js",
    content: `export function ItemCard(item) {
  return "<div>Item Card</div>";
}`
  },

  {
    path: "panels/marketplace/components/CreatorCard.js",
    content: `export function CreatorCard(creator) {
  return "<div>Creator Card</div>";
}`
  },

  {
    path: "panels/marketplace/components/ShopCard.js",
    content: `export function ShopCard(shop) {
  return "<div>Shop Card</div>";
}`
  },

  {
    path: "panels/marketplace/components/EventCard.js",
    content: `export function EventCard(event) {
  return "<div>Event Card</div>";
}`
  },

  {
    path: "panels/marketplace/styles/marketplace.css",
    content: `/* Marketplace 5.0 UI Styles */`
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
  console.log("🖼️ Marketplace UI Panels Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace UI Panels Generator — DONE");
}

run();
