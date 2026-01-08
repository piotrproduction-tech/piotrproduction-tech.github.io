/**
 * CITYOF-GATE :: Marketplace 5.0 — Debug Console 2.0 Generator (ESM)
 * FE21 / BE21 — Warstwa 7.5 — Developer Layer
 *
 * Tworzy:
 *  - debug/marketplace/debugConsole.js
 *  - debug/marketplace/debugCommands.js
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
    path: "debug/marketplace/debugConsole.js",
    content: `/**
 * Marketplace Debug Console 2.0
 * Narzędzie do inspekcji świata Marketplace:
 *  - podgląd stanu świata
 *  - podgląd ticków
 *  - podgląd pogody
 *  - podgląd ekonomii
 *  - podgląd społeczności
 *  - podgląd sezonów
 */

import { MarketplaceDebugCommands } from "./debugCommands.js";

export const MarketplaceDebugConsole = {
  run(command, payload) {
    if (!MarketplaceDebugCommands[command]) {
      return { error: "Unknown command", command };
    }
    return MarketplaceDebugCommands[command](payload);
  }
};`
  },

  {
    path: "debug/marketplace/debugCommands.js",
    content: `/**
 * Marketplace Debug Commands 5.0
 */

export const MarketplaceDebugCommands = {
  ping() {
    return { ok: true, timestamp: Date.now() };
  },

  showState(state) {
    return { state };
  },

  showEconomy(state) {
    return { economy: state.economy };
  },

  showWeather(state) {
    return { weather: state.weather };
  },

  showCommunity(state) {
    return { community: state.community };
  },

  showEvents(state) {
    return { events: state.events };
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
  console.log("🖥️ Marketplace Debug Console 2.0 Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Debug Console 2.0 Generator — DONE");
}

run();
