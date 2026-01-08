/**
 * CITYOF-GATE :: Marketplace 5.0 — Sync Bridge Generator (ESM)
 * FE21 / BE21 — Nowa Generacja
 *
 * Tworzy:
 *  - sync/marketplace/MarketplaceSyncBridge.js
 *  - sync/marketplace/syncMap.js
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
    path: "sync/marketplace/MarketplaceSyncBridge.js",
    content: `/**
 * Marketplace Sync Bridge 5.0
 * Łączy Marketplace z innymi modułami miasta
 */

import { MarketplaceSyncMap } from "./syncMap.js";

export const MarketplaceSyncBridge = {
  syncWith(moduleName, payload) {
    return {
      synced: true,
      module: moduleName,
      payload
    };
  },

  getSyncTargets() {
    return MarketplaceSyncMap;
  }
};`
  },

  {
    path: "sync/marketplace/syncMap.js",
    content: `/**
 * Marketplace Sync Map 5.0
 * Definiuje połączenia Marketplace z innymi modułami miasta
 */

export const MarketplaceSyncMap = {
  creatorHub: "syncCreatorData",
  streetEngine: "syncStreetData",
  eventEngine: "syncEventData",
  festivalEngine: "syncFestivalData",
  scenarioEngine: "syncScenarioData",
  hyperOrchestrator: "syncHyperData",
  dataLake: "archiveMarketplaceData",
  telemetry: "broadcastMarketplaceTelemetry"
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
  console.log("🔗 Marketplace Sync Bridge Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Sync Bridge Generator — DONE");
}

run();
