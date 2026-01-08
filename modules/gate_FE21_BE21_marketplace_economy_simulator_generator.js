/**
 * CITYOF-GATE :: Marketplace 5.0 — Economy Simulator Generator (ESM)
 * FE21 / BE21 — Nowa Generacja
 *
 * Tworzy:
 *  - simulation/marketplace/economySimulator.js
 *  - simulation/marketplace/economyConfig.js
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
    path: "simulation/marketplace/economySimulator.js",
    content: `/**
 * Marketplace Economy Simulator 5.0
 */

export const MarketplaceEconomySimulator = {
  simulateDemand(items) {
    return items.map(i => ({ ...i, demand: Math.random() }));
  },

  simulateSupply(items) {
    return items.map(i => ({ ...i, supply: Math.random() }));
  },

  simulatePrice(items) {
    return items.map(i => ({
      ...i,
      price: Math.max(1, (i.basePrice || 10) * (0.5 + Math.random()))
    }));
  },

  simulateTransactions(items) {
    return items.map(i => ({
      itemId: i.id,
      volume: Math.floor(Math.random() * 20)
    }));
  },

  runFullSimulation(data) {
    const demand = this.simulateDemand(data.items);
    const supply = this.simulateSupply(demand);
    const priced = this.simulatePrice(supply);
    const transactions = this.simulateTransactions(priced);

    return { priced, transactions };
  }
};`
  },

  {
    path: "simulation/marketplace/economyConfig.js",
    content: `/**
 * Marketplace Economy Config 5.0
 */

export const MarketplaceEconomyConfig = {
  demandVolatility: 0.3,
  supplyVolatility: 0.4,
  priceVolatility: 0.5,
  maxTransactions: 100
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
  console.log("💹 Marketplace Economy Simulator Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Economy Simulator Generator — DONE");
}

run();
