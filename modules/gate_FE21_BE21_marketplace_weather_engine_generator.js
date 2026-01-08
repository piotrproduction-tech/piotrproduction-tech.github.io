/**
 * CITYOF-GATE :: Marketplace 5.0 — Weather Engine Generator (ESM)
 * FE21 / BE21 — Warstwa 7 — Meta-World Systems
 *
 * Tworzy:
 *  - world/marketplace/weatherEngine.js
 *  - world/marketplace/weatherConfig.js
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
    path: "world/marketplace/weatherEngine.js",
    content: `/**
 * Marketplace Weather Engine 5.0
 * Pogoda wpływa na:
 *  - eventy
 *  - ruch uliczny
 *  - glow
 *  - ekonomię
 *  - nastroje społeczności
 */

export const MarketplaceWeatherEngine = {
  generateWeather() {
    const types = ["sunny", "rain", "storm", "fog", "cloudy", "snow"];
    return types[Math.floor(Math.random() * types.length)];
  },

  applyWeatherModifiers(state, weather) {
    const modifiers = {
      sunny: { activityBoost: 0.2, eventBoost: 0.1 },
      rain: { activityBoost: -0.2, eventBoost: -0.1 },
      storm: { activityBoost: -0.4, eventBoost: -0.3 },
      fog: { activityBoost: -0.1, eventBoost: 0 },
      cloudy: { activityBoost: 0, eventBoost: 0 },
      snow: { activityBoost: -0.3, eventBoost: -0.2 }
    };

    return {
      ...state,
      weather,
      modifiers: {
        ...state.modifiers,
        weather: modifiers[weather] || {}
      }
    };
  },

  tick(state) {
    const weather = this.generateWeather();
    return this.applyWeatherModifiers(state, weather);
  }
};`
  },

  {
    path: "world/marketplace/weatherConfig.js",
    content: `/**
 * Marketplace Weather Config 5.0
 */

export const MarketplaceWeatherConfig = {
  changeIntervalMs: 5000,
  enableWeatherEffects: true
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
  console.log("🌦️ Marketplace Weather Engine Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Weather Engine Generator — DONE");
}

run();
