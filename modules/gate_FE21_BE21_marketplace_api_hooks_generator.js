/**
 * CITYOF-GATE :: Marketplace 5.0 — API Hooks Generator (ESM)
 * FE21 / BE21 — Nowa Generacja
 *
 * Tworzy:
 *  - hooks/marketplace/useMarketplaceData.js
 *  - hooks/marketplace/useCreatorData.js
 *  - hooks/marketplace/useShopData.js
 *  - hooks/marketplace/useEventData.js
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
    path: "hooks/marketplace/useMarketplaceData.js",
    content: `export function useMarketplaceData() {
  return {
    items: [],
    trending: [],
    recommended: []
  };
}`
  },

  {
    path: "hooks/marketplace/useCreatorData.js",
    content: `export function useCreatorData() {
  return {
    creators: [],
    getCreator: (id) => null
  };
}`
  },

  {
    path: "hooks/marketplace/useShopData.js",
    content: `export function useShopData() {
  return {
    shops: [],
    getShop: (id) => null
  };
}`
  },

  {
    path: "hooks/marketplace/useEventData.js",
    content: `export function useEventData() {
  return {
    events: [],
    getEvent: (id) => null
  };
}`
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
  console.log("🔌 Marketplace API Hooks Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace API Hooks Generator — DONE");
}

run();
