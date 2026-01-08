/**
 * CITYOF-GATE :: Marketplace 5.0 — AI Director Bridge Generator (ESM)
 * FE21 / BE21 — Integration Layer
 *
 * Tworzy:
 *  - integration/marketplace/aiDirectorBridge.js
 *
 * Niczego nie nadpisuje.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();

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

const FILES = [
  {
    path: "integration/marketplace/aiDirectorBridge.js",
    content: `/**
 * Marketplace AI Director Bridge 5.0
 *
 * Łączy:
 *  - AI Director → sterowanie sezonami, pogodą, ekonomią, eventami
 */

import { MarketplaceWorldStateEngine } from "../world/marketplace/worldStateEngine.js";
import { MarketplaceWeatherEngine } from "../world/marketplace/weatherEngine.js";
import { MarketplaceRandomnessEngine } from "../world/marketplace/randomnessEngine.js";

export const MarketplaceAIDirectorBridge = {
  applySeason(state, seasonPreset) {
    state.season = seasonPreset;
    return state;
  },

  applyWeatherOverride(state, weatherPreset) {
    state.weather = weatherPreset || MarketplaceWeatherEngine.generateWeather({
      seed: MarketplaceRandomnessEngine.random()
    });
    return state;
  },

  applyEconomyPreset(state, economyPreset) {
    state.economy = {
      ...state.economy,
      ...economyPreset
    };
    return state;
  },

  triggerEvent(state, event) {
    if (!state.events) state.events = [];
    state.events.push({
      ...event,
      timestamp: Date.now()
    });
    return state;
  }
};`
  }
];

export function run() {
  console.log("🧠 Marketplace AI Director Bridge Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace AI Director Bridge Generator — DONE");
}

run();
