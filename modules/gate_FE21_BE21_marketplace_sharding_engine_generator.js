/**
 * CITYOF-GATE :: Marketplace 5.0 — Sharding Engine Generator (ESM)
 * FE21 / BE21 — Warstwa 8
 *
 * Tworzy:
 *  - sharding/marketplace/shardingEngine.js
 *  - sharding/marketplace/shardingConfig.js
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
    path: "sharding/marketplace/shardingEngine.js",
    content: `/**
 * Marketplace Sharding Engine 5.0
 */

export const MarketplaceShardingEngine = {
  shards: {},

  createShard(id, initialState = {}) {
    this.shards[id] = {
      id,
      state: JSON.parse(JSON.stringify(initialState))
    };
    return { created: true, id };
  },

  assignToShard(entityId) {
    const shardIds = Object.keys(this.shards);
    if (!shardIds.length) return null;
    const index = entityId.length % shardIds.length;
    return shardIds[index];
  },

  getShard(id) {
    return this.shards[id] || null;
  }
};`
  },

  {
    path: "sharding/marketplace/shardingConfig.js",
    content: `/**
 * Marketplace Sharding Config 5.0
 */

export const MarketplaceShardingConfig = {
  maxShards: 16,
  autoAssign: true
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
  console.log("🧩 Marketplace Sharding Engine Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Sharding Engine Generator — DONE");
}

run();
