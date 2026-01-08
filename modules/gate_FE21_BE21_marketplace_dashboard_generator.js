/**
 * CITYOF-GATE :: Marketplace 5.0 — Dashboard UI Generator (ESM)
 * FE21 / BE21 — Nowa Generacja
 *
 * Tworzy:
 *  - panels/marketplace/MarketplaceDashboard.js
 *  - panels/marketplace/components/StatsWidget.js
 *  - panels/marketplace/components/CreatorStatsWidget.js
 *  - panels/marketplace/components/ShopStatsWidget.js
 *  - panels/marketplace/styles/dashboard.css
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
    path: "panels/marketplace/MarketplaceDashboard.js",
    content: `export function MarketplaceDashboard() {
  return "<div>Marketplace Dashboard</div>";
}`
  },

  {
    path: "panels/marketplace/components/StatsWidget.js",
    content: `export function StatsWidget(stats) {
  return "<div>Stats Widget</div>";
}`
  },

  {
    path: "panels/marketplace/components/CreatorStatsWidget.js",
    content: `export function CreatorStatsWidget(creator) {
  return "<div>Creator Stats Widget</div>";
}`
  },

  {
    path: "panels/marketplace/components/ShopStatsWidget.js",
    content: `export function ShopStatsWidget(shop) {
  return "<div>Shop Stats Widget</div>";
}`
  },

  {
    path: "panels/marketplace/styles/dashboard.css",
    content: `/* Marketplace Dashboard Styles */`
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
  console.log("📊 Marketplace Dashboard Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Dashboard Generator — DONE");
}

run();
