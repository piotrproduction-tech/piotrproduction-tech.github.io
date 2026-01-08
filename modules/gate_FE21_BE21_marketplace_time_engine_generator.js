/**
 * CITYOF-GATE :: Marketplace 5.0 — Time Engine Generator (ESM)
 * FE21 / BE21 — Warstwa 7 — Meta-World Systems
 *
 * Tworzy:
 *  - world/marketplace/timeEngine.js
 *  - world/marketplace/timeConfig.js
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
    path: "world/marketplace/timeEngine.js",
    content: `/**
 * Marketplace Time Engine 5.0
 * Zarządza czasem świata Marketplace:
 *  - pory dnia
 *  - cykle dobowo-tygodniowe
 *  - ticki świata
 *  - integracja z sezonami i pogodą
 */

export const MarketplaceTimeEngine = {
  getCurrentTime() {
    return Date.now();
  },

  getDayPhase(timestamp = Date.now()) {
    const hour = new Date(timestamp).getHours();
    if (hour < 6) return "night";
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  },

  getWeekCycle(timestamp = Date.now()) {
    const day = new Date(timestamp).getDay();
    return ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][day];
  },

  tick(state) {
    return {
      ...state,
      time: {
        timestamp: Date.now(),
        phase: this.getDayPhase(),
        cycle: this.getWeekCycle()
      }
    };
  }
};`
  },

  {
    path: "world/marketplace/timeConfig.js",
    content: `/**
 * Marketplace Time Config 5.0
 */

export const MarketplaceTimeConfig = {
  tickIntervalMs: 1000,
  enableDayPhases: true,
  enableWeekCycles: true
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
  console.log("⏱️ Marketplace Time Engine Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Time Engine Generator — DONE");
}

run();
