/**
 * CITYOF-GATE :: Marketplace 5.0 — Heatmap Engine Generator (ESM)
 * FE21 / BE21 — Nowa Generacja
 *
 * Tworzy:
 *  - heatmap/marketplace/heatmapEngine.js
 *  - heatmap/marketplace/heatmapConfig.js
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
    path: "heatmap/marketplace/heatmapEngine.js",
    content: `/**
 * Marketplace Heatmap Engine 5.0
 */

export const MarketplaceHeatmapEngine = {
  generateActivityMap(events) {
    return events.map(e => ({
      zone: e.zone || "unknown",
      intensity: Math.random()
    }));
  },

  generateTransactionMap(transactions) {
    return transactions.map(t => ({
      itemId: t.itemId,
      intensity: Math.random()
    }));
  },

  generateGlowMap(items) {
    return items.map(i => ({
      itemId: i.id,
      glow: Math.random()
    }));
  },

  generateStreetHeatmap(zones) {
    return zones.map(z => ({
      zone: z.id,
      intensity: Math.random()
    }));
  },

  buildFullHeatmap(data) {
    return {
      activity: this.generateActivityMap(data.events),
      transactions: this.generateTransactionMap(data.transactions),
      glow: this.generateGlowMap(data.items),
      street: this.generateStreetHeatmap(data.zones)
    };
  }
};`
  },

  {
    path: "heatmap/marketplace/heatmapConfig.js",
    content: `/**
 * Marketplace Heatmap Config 5.0
 */

export const MarketplaceHeatmapConfig = {
  maxIntensity: 1.0,
  minIntensity: 0.0,
  smoothing: 0.3,
  resolution: 64
};`
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
  console.log("🔥 Marketplace Heatmap Engine Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Heatmap Engine Generator — DONE");
}

run();
