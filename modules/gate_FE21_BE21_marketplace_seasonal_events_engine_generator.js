/**
 * CITYOF-GATE :: Marketplace 5.0 — Seasonal Events Engine Generator (ESM)
 * FE21 / BE21 — Nowa Generacja
 *
 * Tworzy:
 *  - seasons/marketplace/seasonEngine.js
 *  - seasons/marketplace/seasonDefinitions.js
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
    path: "seasons/marketplace/seasonEngine.js",
    content: `/**
 * Marketplace Seasonal Events Engine 5.0
 * Zarządza cyklami świata, sezonami i rotacjami.
 */

export const MarketplaceSeasonEngine = {
  startSeason(seasonId) {
    return { started: true, seasonId };
  },

  endSeason(seasonId) {
    return { ended: true, seasonId };
  },

  rotateItems(pool) {
    return pool.slice(0, Math.floor(pool.length / 2));
  },

  applySeasonModifiers(data, modifiers) {
    return { modified: true, data, modifiers };
  },

  getActiveSeason() {
    return { season: "default" };
  }
};`
  },

  {
    path: "seasons/marketplace/seasonDefinitions.js",
    content: `/**
 * Marketplace Season Definitions 5.0
 */

export const MarketplaceSeasonDefinitions = {
  spring: {
    id: "spring",
    title: "Wiosenny Sezon",
    modifiers: {
      priceBoost: 0.1,
      eventFrequency: 0.2
    }
  },

  summer: {
    id: "summer",
    title: "Letni Sezon",
    modifiers: {
      priceBoost: 0.2,
      eventFrequency: 0.4
    }
  },

  autumn: {
    id: "autumn",
    title: "Jesienny Sezon",
    modifiers: {
      priceBoost: 0.05,
      eventFrequency: 0.15
    }
  },

  winter: {
    id: "winter",
    title: "Zimowy Sezon",
    modifiers: {
      priceBoost: 0.3,
      eventFrequency: 0.5
    }
  }
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
  console.log("🍂 Marketplace Seasonal Events Engine Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Seasonal Events Engine Generator — DONE");
}

run();
