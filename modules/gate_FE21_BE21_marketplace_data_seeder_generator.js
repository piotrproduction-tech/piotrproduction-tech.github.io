/**
 * CITYOF-GATE :: Marketplace 5.0 — Data Seeder Generator (ESM)
 * FE21 / BE21 — Nowa Generacja
 *
 * Tworzy:
 *  - data/marketplace/mockData.js
 *
 * Niczego nie nadpisuje.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();

const FILE = {
  path: "data/marketplace/mockData.js",
  content: `/**
 * Marketplace 5.0 — Mock Data
 */

export const mockCreators = [
  { id: "c1", name: "Creator One", reputation: 120 },
  { id: "c2", name: "Creator Two", reputation: 300 }
];

export const mockItems = [
  { id: "i1", title: "Item One", creatorId: "c1", price: 10 },
  { id: "i2", title: "Item Two", creatorId: "c2", price: 20 }
];

export const mockShops = [
  { id: "s1", creatorId: "c1", name: "Shop One" },
  { id: "s2", creatorId: "c2", name: "Shop Two" }
];

export const mockEvents = [
  { id: "e1", type: "drop", items: ["i1"] },
  { id: "e2", type: "flashSale", items: ["i2"] }
];

export const mockTransactions = [
  { id: "t1", buyerId: "u1", sellerId: "c1", itemId: "i1", price: 10 },
  { id: "t2", buyerId: "u2", sellerId: "c2", itemId: "i2", price: 20 }
];`
};

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
  console.log("🌱 Marketplace Data Seeder Generator — START");
  writeFile(FILE);
  console.log("🏁 Marketplace Data Seeder Generator — DONE");
}

run();
