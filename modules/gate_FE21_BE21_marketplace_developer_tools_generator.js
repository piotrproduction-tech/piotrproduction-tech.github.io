/**
 * CITYOF-GATE :: Marketplace 5.0 — Developer Tools Generator (ESM)
 * FE21 / BE21 — Warstwa 7.5 — Developer Layer
 *
 * Tworzy:
 *  - devtools/marketplace/devTools.js
 *  - devtools/marketplace/devShortcuts.js
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
    path: "devtools/marketplace/devTools.js",
    content: `/**
 * Marketplace Developer Tools 5.0
 * Narzędzia dla twórców i testerów:
 *  - szybkie generowanie danych
 *  - szybkie resetowanie świata
 *  - szybkie symulacje
 *  - szybkie inspekcje
 */

export const MarketplaceDevTools = {
  generateMockItems(count = 5) {
    return Array.from({ length: count }).map((_, i) => ({
      id: "mock_item_" + i,
      title: "Mock Item " + i
    }));
  },

  generateMockUsers(count = 3) {
    return Array.from({ length: count }).map((_, i) => ({
      id: "mock_user_" + i,
      name: "User " + i
    }));
  },

  resetWorld() {
    return { reset: true, timestamp: Date.now() };
  },

  simulateActivity(users, items) {
    return {
      events: users.map(u => ({
        userId: u.id,
        itemId: items[Math.floor(Math.random() * items.length)].id
      }))
    };
  }
};`
  },

  {
    path: "devtools/marketplace/devShortcuts.js",
    content: `/**
 * Marketplace Developer Shortcuts 5.0
 */

export const MarketplaceDevShortcuts = {
  quickState() {
    return { state: "quick_state_dump" };
  },

  quickEconomy() {
    return { economy: "quick_economy_dump" };
  },

  quickWeather() {
    return { weather: "quick_weather_dump" };
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
  console.log("🛠️ Marketplace Developer Tools Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Developer Tools Generator — DONE");
}

run();
