/**
 * CITYOF-GATE :: Marketplace 5.0 — Randomness Engine Generator (ESM)
 * FE21 / BE21 — Warstwa 7 — Meta-World Systems
 *
 * Tworzy:
 *  - world/marketplace/randomnessEngine.js
 *  - world/marketplace/randomnessConfig.js
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
    path: "world/marketplace/randomnessEngine.js",
    content: `/**
 * Marketplace Randomness Engine 5.0
 * Globalny RNG dla całego świata Marketplace.
 * Zapewnia:
 *  - deterministyczne seedy
 *  - kontrolowaną losowość
 *  - spójność między silnikami
 */

export const MarketplaceRandomnessEngine = {
  seed: 123456789,

  setSeed(newSeed) {
    this.seed = newSeed;
    return { seed: this.seed };
  },

  random() {
    // Linear Congruential Generator (deterministyczny RNG)
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
    return this.seed / 4294967296;
  },

  randomInt(min, max) {
    return Math.floor(this.random() * (max - min + 1)) + min;
  },

  randomChoice(array) {
    if (!array.length) return null;
    return array[this.randomInt(0, array.length - 1)];
  },

  randomWeighted(weights) {
    const total = weights.reduce((a, b) => a + b.weight, 0);
    let r = this.random() * total;

    for (const w of weights) {
      if (r < w.weight) return w.value;
      r -= w.weight;
    }
    return null;
  }
};`
  },

  {
    path: "world/marketplace/randomnessConfig.js",
    content: `/**
 * Marketplace Randomness Config 5.0
 */

export const MarketplaceRandomnessConfig = {
  defaultSeed: 987654321,
  enableDeterministicMode: true,
  enableWeightedRandomness: true
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
  console.log("🎲 Marketplace Randomness Engine Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Randomness Engine Generator — DONE");
}

run();
