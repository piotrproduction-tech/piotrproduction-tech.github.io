/**
 * CITYOF-GATE :: Marketplace 5.0 — Sandbox Mode Generator (ESM)
 * FE21 / BE21 — Warstwa 8 — Sandbox & Multi-Instance Systems
 *
 * Tworzy:
 *  - sandbox/marketplace/sandboxEngine.js
 *  - sandbox/marketplace/sandboxConfig.js
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
    path: "sandbox/marketplace/sandboxEngine.js",
    content: `/**
 * Marketplace Sandbox Engine 5.0
 * Tryb piaskownicy dla świata Marketplace:
 *  - izolowane instancje świata
 *  - snapshoty i rewinding
 *  - klonowanie instancji
 *  - resetowanie instancji
 *  - symulacje bez wpływu na świat główny
 */

export const MarketplaceSandboxEngine = {
  instances: {},

  createInstance(id, initialState = {}) {
    this.instances[id] = {
      id,
      state: JSON.parse(JSON.stringify(initialState)),
      snapshots: []
    };
    return { created: true, id };
  },

  cloneInstance(sourceId, targetId) {
    if (!this.instances[sourceId]) return { error: "Source not found" };
    this.instances[targetId] = JSON.parse(JSON.stringify(this.instances[sourceId]));
    this.instances[targetId].id = targetId;
    return { cloned: true, from: sourceId, to: targetId };
  },

  resetInstance(id) {
    if (!this.instances[id]) return { error: "Instance not found" };
    this.instances[id].state = {};
    this.instances[id].snapshots = [];
    return { reset: true, id };
  },

  snapshot(id) {
    if (!this.instances[id]) return { error: "Instance not found" };
    const snap = {
      timestamp: Date.now(),
      state: JSON.parse(JSON.stringify(this.instances[id].state))
    };
    this.instances[id].snapshots.push(snap);
    return { snapshot: true, id, timestamp: snap.timestamp };
  },

  restore(id, timestamp) {
    if (!this.instances[id]) return { error: "Instance not found" };
    const snap = this.instances[id].snapshots.find(s => s.timestamp === timestamp);
    if (!snap) return { error: "Snapshot not found" };
    this.instances[id].state = JSON.parse(JSON.stringify(snap.state));
    return { restored: true, id, timestamp };
  },

  getInstanceState(id) {
    return this.instances[id] || null;
  }
};`
  },

  {
    path: "sandbox/marketplace/sandboxConfig.js",
    content: `/**
 * Marketplace Sandbox Config 5.0
 */

export const MarketplaceSandboxConfig = {
  allowMultipleInstances: true,
  maxInstances: 10,
  enableSnapshots: true,
  enableCloning: true,
  enableRewind: true
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
  console.log("🧪 Marketplace Sandbox Mode Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Sandbox Mode Generator — DONE");
}

run();
