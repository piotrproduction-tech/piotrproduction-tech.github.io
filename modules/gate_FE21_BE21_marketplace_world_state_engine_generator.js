/**
 * CITYOF-GATE :: Marketplace 5.0 — World State Engine Generator (ESM)
 * FE21 / BE21 — Warstwa 7 — Meta-World Systems
 *
 * Tworzy:
 *  - world/marketplace/worldStateEngine.js
 *  - world/marketplace/worldStateSchema.js
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
    path: "world/marketplace/worldStateEngine.js",
    content: `/**
 * Marketplace World State Engine 5.0
 * Globalny stan świata Marketplace:
 *  - aktywne sezony
 *  - globalne modyfikatory
 *  - stan ekonomii
 *  - stan społeczności
 *  - stan eventów
 */

export const MarketplaceWorldStateEngine = {
  createEmptyState() {
    return {
      season: null,
      economy: {
        health: 1.0,
        volatility: 0.0
      },
      community: {
        mood: "neutral",
        activityLevel: 0.5
      },
      events: {
        active: [],
        history: []
      },
      modifiers: {}
    };
  },

  applyPatch(state, patch) {
    return {
      ...state,
      ...patch,
      economy: {
        ...state.economy,
        ...(patch.economy || {})
      },
      community: {
        ...state.community,
        ...(patch.community || {})
      },
      events: {
        ...state.events,
        ...(patch.events || {})
      },
      modifiers: {
        ...state.modifiers,
        ...(patch.modifiers || {})
      }
    };
  },

  snapshot(state) {
    return {
      timestamp: Date.now(),
      state: JSON.parse(JSON.stringify(state))
    };
  },

  restore(snapshot) {
    return JSON.parse(JSON.stringify(snapshot.state));
  }
};`
  },

  {
    path: "world/marketplace/worldStateSchema.js",
    content: `/**
 * Marketplace World State Schema 5.0
 */

export const MarketplaceWorldStateSchema = {
  season: "string|null",
  economy: {
    health: "number",
    volatility: "number"
  },
  community: {
    mood: "string",
    activityLevel: "number"
  },
  events: {
    active: "array",
    history: "array"
  },
  modifiers: "object"
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
  console.log("🌍 Marketplace World State Engine Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace World State Engine Generator — DONE");
}

run();
