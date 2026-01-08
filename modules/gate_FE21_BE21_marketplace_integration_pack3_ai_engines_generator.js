/**
 * CITYOF-GATE :: Marketplace 5.0 — Integration Pack 3 (AI Engines) Generator
 * Tworzy:
 *  - integration/marketplace/aiEconomyEngine.js
 *  - integration/marketplace/aiSocialEngine.js
 *  - integration/marketplace/aiEventEngine.js
 *  - integration/marketplace/aiWeatherEngine.js
 *  - integration/marketplace/aiSeasonEngine.js
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
    path: "integration/marketplace/aiEconomyEngine.js",
    content: `/**
 * Marketplace AI Economy Engine 5.0
 * Sterowanie ekonomią: wzrost, spadki, stabilizacja.
 */

export const MarketplaceAIEconomyEngine = {
  applyGrowth(state, rate = 0.05) {
    const current = state.economy?.value || 0;
    const updated = Math.round(current * (1 + rate));
    state.economy = { ...(state.economy || {}), value: updated };
    return state;
  },

  applyRecession(state, rate = 0.05) {
    const current = state.economy?.value || 0;
    const updated = Math.round(current * (1 - rate));
    state.economy = { ...(state.economy || {}), value: updated };
    return state;
  },

  stabilize(state, target) {
    state.economy = { ...(state.economy || {}), value: target };
    return state;
  }
};`
  },
  {
    path: "integration/marketplace/aiSocialEngine.js",
    content: `/**
 * Marketplace AI Social Engine 5.0
 * Sterowanie nastrojem społecznym, zaufaniem, napięciem.
 */

export const MarketplaceAISocialEngine = {
  adjustMood(state, delta) {
    const current = state.social?.mood || 0;
    state.social = {
      ...(state.social || {}),
      mood: current + delta
    };
    return state;
  },

  adjustTrust(state, delta) {
    const current = state.social?.trust || 0;
    state.social = {
      ...(state.social || {}),
      trust: current + delta
    };
    return state;
  },

  adjustTension(state, delta) {
    const current = state.social?.tension || 0;
    state.social = {
      ...(state.social || {}),
      tension: current + delta
    };
    return state;
  }
};`
  },
  {
    path: "integration/marketplace/aiEventEngine.js",
    content: `/**
 * Marketplace AI Event Engine 5.0
 * Generowanie eventów: kryzysy, święta, promocje.
 */

export const MarketplaceAIEventEngine = {
  createCrisis(state, reason) {
    if (!state.events) state.events = [];
    state.events.push({
      type: "Crisis",
      reason,
      timestamp: Date.now()
    });
    return state;
  },

  createHoliday(state, name) {
    if (!state.events) state.events = [];
    state.events.push({
      type: "Holiday",
      name,
      timestamp: Date.now()
    });
    return state;
  },

  createPromotion(state, description) {
    if (!state.events) state.events = [];
    state.events.push({
      type: "Promotion",
      description,
      timestamp: Date.now()
    });
    return state;
  }
};`
  },
  {
    path: "integration/marketplace/aiWeatherEngine.js",
    content: `/**
 * Marketplace AI Weather Engine 5.0
 * Sterowanie pogodą: dynamiczne zmiany, scenariusze.
 */

export const MarketplaceAIWeatherEngine = {
  setWeather(state, weather) {
    state.weather = weather;
    return state;
  },

  cycleWeather(state, sequence = ["Clear", "Cloudy", "Rain", "Storm"]) {
    const current = state.weather;
    const idx = sequence.indexOf(current);
    const next = idx === -1 ? sequence[0] : sequence[(idx + 1) % sequence.length];
    state.weather = next;
    return state;
  }
};`
  },
  {
    path: "integration/marketplace/aiSeasonEngine.js",
    content: `/**
 * Marketplace AI Season Engine 5.0
 * Sterowanie sezonami: cykle, scenariusze.
 */

export const MarketplaceAISeasonEngine = {
  setSeason(state, season) {
    state.season = season;
    return state;
  },

  cycleSeason(state, sequence = ["Spring", "Summer", "Autumn", "Winter"]) {
    const current = state.season;
    const idx = sequence.indexOf(current);
    const next = idx === -1 ? sequence[0] : sequence[(idx + 1) % sequence.length];
    state.season = next;
    return state;
  }
};`
  }
];

export function run() {
  console.log("🤖 Marketplace Integration Pack 3 (AI Engines) Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Integration Pack 3 (AI Engines) Generator — DONE");
}

run();
