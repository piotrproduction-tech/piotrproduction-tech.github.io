/**
 * CITYOF-GATE :: Marketplace 5.0 — Multi-Instance Sync Bridge Generator (ESM)
 * FE21 / BE21 — Warstwa 8 — Sandbox & Multi-Instance Systems
 *
 * Tworzy:
 *  - sync/marketplace/multiInstanceSyncBridge.js
 *  - sync/marketplace/multiInstanceSyncConfig.js
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
    path: "sync/marketplace/multiInstanceSyncBridge.js",
    content: `/**
 * Marketplace Multi-Instance Sync Bridge 5.0
 * Synchronizuje wiele instancji świata Marketplace.
 */

export const MarketplaceMultiInstanceSyncBridge = {
  syncState(source, target) {
    target.state = JSON.parse(JSON.stringify(source.state));
    return { synced: true };
  },

  syncSnapshot(source, target) {
    target.snapshots = JSON.parse(JSON.stringify(source.snapshots));
    return { synced: true };
  },

  syncTick(source, target) {
    target.state.time = JSON.parse(JSON.stringify(source.state.time));
    return { synced: true };
  },

  syncAll(source, target) {
    return {
      state: this.syncState(source, target),
      snapshots: this.syncSnapshot(source, target),
      tick: this.syncTick(source, target)
    };
  }
};`
  },

  {
    path: "sync/marketplace/multiInstanceSyncConfig.js",
    content: `/**
 * Marketplace Multi-Instance Sync Config 5.0
 */

export const MarketplaceMultiInstanceSyncConfig = {
  enableStateSync: true,
  enableSnapshotSync: true,
  enableTickSync: true,
  syncIntervalMs: 2000
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
  console.log("🔗 Marketplace Multi-Instance Sync Bridge Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Multi-Instance Sync Bridge Generator — DONE");
}

run();
