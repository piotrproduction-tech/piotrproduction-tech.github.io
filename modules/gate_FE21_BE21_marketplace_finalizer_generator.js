/**
 * CITYOF-GATE :: Marketplace 5.0 — Finalizer Generator (ESM)
 * FE21 / BE21 — Warstwa 9 — World Packaging
 *
 * Tworzy:
 *  - world/marketplace/worldManifest.js
 *  - world/marketplace/worldIndex.js
 *  - world/marketplace/worldSummary.json
 *
 * Niczego nie nadpisuje.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();

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

const FILES = [
  {
    path: "world/marketplace/worldManifest.js",
    content: `/**
 * Marketplace World Manifest 5.0
 * Zawiera listę wszystkich modułów świata Marketplace.
 */

export const MarketplaceWorldManifest = {
  layers: {
    core: ["models", "api", "hooks"],
    engines: [
      "economySimulator",
      "heatmapEngine",
      "achievementEngine",
      "socialEngine",
      "reputationEngine",
      "tokenEngine"
    ],
    world: [
      "worldStateEngine",
      "timeEngine",
      "weatherEngine",
      "randomnessEngine",
      "syncScheduler"
    ],
    sandbox: [
      "sandboxEngine",
      "exportImportEngine",
      "multiInstanceSyncBridge",
      "shardingEngine",
      "multiInstanceRouter",
      "multiCityBridge"
    ],
    devtools: [
      "debugConsole",
      "developerTools"
    ]
  }
};`
  },

  {
    path: "world/marketplace/worldIndex.js",
    content: `/**
 * Marketplace World Index 5.0
 * Centralny punkt wejścia dla całego świata Marketplace.
 */

export const MarketplaceWorldIndex = {
  version: "5.0",
  build: Date.now(),
  modules: [
    "state",
    "time",
    "weather",
    "randomness",
    "economy",
    "social",
    "reputation",
    "tokens",
    "sandbox",
    "sync",
    "sharding",
    "router",
    "bridge"
  ]
};`
  },

  {
    path: "world/marketplace/worldSummary.json",
    content: JSON.stringify(
      {
        version: "5.0",
        description: "Marketplace 5.0 — Final World Package",
        layers: 9,
        modules: 50,
        timestamp: Date.now()
      },
      null,
      2
    )
  }
];

export function run() {
  console.log("🌐 Marketplace Finalizer Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Finalizer Generator — DONE");
}

run();
