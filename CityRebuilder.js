#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = __dirname;
const CITY_ROOT = path.join(ROOT, "apps", "FE-00__City");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeFile(relPath, content) {
  const full = path.join(CITY_ROOT, relPath);
  ensureDir(path.dirname(full));
  fs.writeFileSync(full, content, "utf8");
  console.log("  ✏️ wrote", relPath);
}

// ======================================================
//  CITY DUMP — wszystkie pliki, które przesłałeś do tej pory
// ======================================================

const FILES = {

  // =========================
  // index.js
  // =========================
  "index.js": `import React from "react";
import { ModuleLoader } from "./modules/ModuleLoader.js";

export function CityApp() {
  return (
    <div>
      <h1>CITYOF-GATE</h1>
      <ModuleLoader />
    </div>
  );
}

import { pushCityNotification } from "./LIFE/CityNotifications";
import { emitMapSignal } from "./MAP/CityMapAnimations";

const evt = new EventSource("/api/city/notify/stream");
evt.onmessage = (e) => pushCityNotification(JSON.parse(e.data));

const evt2 = new EventSource("/api/city/map/signal/stream");
evt2.onmessage = (e) => emitMapSignal(JSON.parse(e.data));
`,

  // =========================
  // access
  // =========================
  "access/cityAccess.js": `export const cityAccess = {};
cityAccess["FE-21__Marketplace"] = {
  marketplace: true,
  creator: true,
  street: true
};
`,

  // =========================
  // ai
  // =========================
  "ai/cityAIEngine.js": `import { cityMemory } from "../memory/cityMemoryEngine";
import { cityPulse } from "../pulse/cityPulseEngine";
import { cityMood } from "../mood/cityMoodEngine";
import { cityWeather } from "../weather/cityWeatherEngine";
import { cityRhythm } from "../rhythm/cityRhythmEngine";
import { cityBroadcast } from "../broadcast/cityBroadcastEngine";

export const cityAI = {
  listeners: [],
  predictions: {
    nextHotDistrict: null,
    nextMood: null,
    nextWeather: null
  },

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this.predictions));
  },

  analyze() {
    const trends = cityMemory.trends;

    const sorted = Object.entries(trends).sort((a, b) => b[1] - a[1]);
    this.predictions.nextHotDistrict = sorted[0]?.[0] || "city";

    if (cityPulse.bpm > 120) this.predictions.nextMood = "Energetic";
    else if (cityPulse.bpm > 80) this.predictions.nextMood = "Creative";
    else this.predictions.nextMood = "Calm";

    if (cityPulse.bpm > 120) this.predictions.nextWeather = "NeonRain";
    else if (cityMood.mood === "Celebratory") this.predictions.nextWeather = "Fireworks";
    else this.predictions.nextWeather = "Clear";

    this.notify();
    this.react();
  },

  react() {
    if (this.predictions.nextHotDistrict === "festival") {
      cityBroadcast.push("Miasto przewiduje falę festiwalową!");
    }

    if (this.predictions.nextHotDistrict === "creator") {
      cityBroadcast.push("Twórcy przejmują miasto!");
    }

    if (this.predictions.nextHotDistrict === "marketplace") {
      cityBroadcast.push("Marketplace wchodzi w gorącą fazę!");
    }
  }
};

setInterval(() => cityAI.analyze(), 5000);
`,

  // =========================
  // broadcast
  // =========================
  "broadcast/cityBroadcastEngine.js": `export const cityBroadcast = {
  queue: [],
  listeners: [],
  active: null,

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this.active));
  },

  push(message) {
    this.queue.push(message);
    this.processQueue();
  },

  processQueue() {
    if (this.active) return;

    this.active = this.queue.shift();
    this.notify();

    setTimeout(() => {
      this.active = null;
      this.notify();
      if (this.queue.length > 0) this.processQueue();
    }, 4000);
  }
};
`,

  "broadcast/cityBroadcastListener.js": `import { cityBroadcast } from "./cityBroadcastEngine";
import { citySync } from "../sync/citySyncEngine";

citySync.subscribe(event => {
  const prefix = event.type.split(".")[0];

  const messages = {
    marketplace: "Nowa aktywność w Marketplace!",
    creator: "Twórca zdobył progres!",
    street: "Nowy sygnał ulicy!",
    festival: "Nowy event festiwalowy!",
    community: "Aktywność społeczności!",
    city: "Globalne wydarzenie miasta!"
  };

  const msg = messages[prefix] || "Nowy event w mieście!";
  cityBroadcast.push(msg);
});
`,

  // =========================
  // config
  // =========================
  "config/districts.json": `[
  {
    "id": "FE-21",
    "name": "Marketplace",
    "path": "/marketplace",
    "type": "district"
  }
]
`,

  // =========================
  // economy
  // =========================
  "economy/cityEconomyEngine.js": `... (tu wklejony cały plik z dumpa) ...`,
  "economy/cityEconomyListener.js": `... (tu wklejony cały plik z dumpa) ...`,

  // =========================
  // emergence
  // =========================
  "emergence/cityEmergenceEngine.js": `... (tu wklejony cały plik z dumpa) ...`,

  // =========================
  // governance
  // =========================
  "governance/cityGovernanceEngine.js": `... (tu wklejony cały plik z dumpa) ...`,

  // =========================
  // heatmap
  // =========================
  "heatmap/cityHeatmapEngine.js": `... (tu wklejony cały plik z dumpa) ...`,
  "heatmap/cityHeatmapListener.js": `... (tu wklejony cały plik z dumpa) ...`,

  // =========================
  // LIFE
  // =========================
  "LIFE/CityLifePanel.js": `... (tu wklejony cały plik z dumpa) ...`
};

// ======================================================
//  EXECUTION
// ======================================================

console.log("🏙️ Rebuilding FE-00__City from dump...");
ensureDir(CITY_ROOT);

Object.entries(FILES).forEach(([rel, content]) => writeFile(rel, content));

console.log("🎉 FE-00__City rebuilt from dump (partial).");
console.log("➡️ Dodawaj kolejne pliki dumpa — dopiszemy je do FILES.");
