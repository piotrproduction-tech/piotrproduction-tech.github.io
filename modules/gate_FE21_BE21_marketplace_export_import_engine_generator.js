/**
 * CITYOF-GATE :: Marketplace 5.0 — Export/Import Engine Generator (ESM)
 * FE21 / BE21 — Warstwa 8 — Sandbox & Multi-Instance Systems
 *
 * Tworzy:
 *  - export/marketplace/exportEngine.js
 *  - export/marketplace/importEngine.js
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
    path: "export/marketplace/exportEngine.js",
    content: `/**
 * Marketplace Export Engine 5.0
 * Eksportuje:
 *  - stan świata
 *  - snapshoty
 *  - instancje sandbox
 *  - konfiguracje
 */

export const MarketplaceExportEngine = {
  exportState(state) {
    return JSON.stringify(state, null, 2);
  },

  exportSnapshot(snapshot) {
    return JSON.stringify(snapshot, null, 2);
  },

  exportInstance(instance) {
    return JSON.stringify(instance, null, 2);
  }
};`
  },

  {
    path: "export/marketplace/importEngine.js",
    content: `/**
 * Marketplace Import Engine 5.0
 * Importuje:
 *  - stan świata
 *  - snapshoty
 *  - instancje sandbox
 */

export const MarketplaceImportEngine = {
  importState(json) {
    return JSON.parse(json);
  },

  importSnapshot(json) {
    return JSON.parse(json);
  },

  importInstance(json) {
    return JSON.parse(json);
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
  console.log("📤 Marketplace Export/Import Engine Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Export/Import Engine Generator — DONE");
}

run();
