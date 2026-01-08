/**
 * CITYOF‑GATE :: AUTO‑PATCHER 5 — CITY INTELLIGENCE SYSTEM
 *
 * Dodaje:
 *  - CityBrainEngine
 *  - CityMemoryEngine
 *  - CityTrendEngine
 *  - CityPredictionEngine
 *  - CityMoodEngine
 *  - CityLoadBalancer
 *
 * Integruje z:
 *  - HyperOrchestrator (Marketplace)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeFile(relativePath, content) {
  const full = path.join(ROOT, relativePath);
  ensureDir(full);
  fs.writeFileSync(full, content);
  console.log("📄 Utworzono:", relativePath);
}

// 1. Tworzymy City Intelligence Engines

writeFile(
  "integration/city/cityIntelligenceEngines.js",
  `/**
 * CITY INTELLIGENCE ENGINES
 * Brain • Memory • Trends • Prediction • Mood • Load
 */

export const CityMemoryEngine = {
  history: [],
  remember(snapshot) {
    this.history.push({ timestamp: Date.now(), snapshot });
    if (this.history.length > 1000) this.history.shift();
  },
  getHistory() {
    return this.history;
  }
};

export const CityTrendEngine = {
  computeTrends(city) {
    const trends = {
      economy: city.economy?.value ?? 0,
      mood: city.social?.mood ?? 0,
      events: Array.isArray(city.globalEvents) ? city.globalEvents.length : 0
    };
    city.trends = trends;
    return city;
  }
};

export const CityPredictionEngine = {
  predict(city) {
    const prediction = {
      economyFuture: (city.trends?.economy ?? 0) * 1.05,
      moodFuture: (city.trends?.mood ?? 0) * 1.02
    };
    city.prediction = prediction;
    return city;
  }
};

export const CityMoodEngine = {
  updateMood(city) {
    const base = city.social?.mood ?? 0;
    const events = Array.isArray(city.globalEvents) ? city.globalEvents.length : 0;
    city.cityMood = base + events * 0.01;
    return city;
  }
};

export const CityLoadBalancer = {
  balance(city) {
    if (!city.shards || typeof city.shards !== "object") return city;
    city.load = Object.entries(city.shards).map(([id, shard]) => ({
      id,
      load: Array.isArray(shard.entities) ? shard.entities.length : 0
    }));
    return city;
  }
};

export const CityBrainEngine = {
  tick(city, snapshotEngine, memoryEngine, trendEngine, predictionEngine, moodEngine, loadBalancer) {
    const snapshot = snapshotEngine.takeSnapshot(city);
    memoryEngine.remember(snapshot);
    city = trendEngine.computeTrends(city);
    city = predictionEngine.predict(city);
    city = moodEngine.updateMood(city);
    city = loadBalancer.balance(city);
    return city;
  }
};`
);

// 2. Patch HyperOrchestrator — integracja CityBrain

const HYPER_PATH = "integration/marketplace/hyperOrchestratorBridge.js";
const hyperFull = path.join(ROOT, HYPER_PATH);

if (fs.existsSync(hyperFull)) {
  let content = fs.readFileSync(hyperFull, "utf8");

  if (!content.includes("CITY_INTELLIGENCE_PATCH")) {
    content =
      `import { CityBrainEngine, CityMemoryEngine, CityTrendEngine, CityPredictionEngine, CityMoodEngine, CityLoadBalancer } from "../city/cityIntelligenceEngines.js";\n` +
      content.replace(
        /state.city = CityWatchdogEngine.tick\([\s\S]*?CityRecoveryEngine\s*\);\s*/m,
        `state.city = CityWatchdogEngine.tick(
  state.city || {},
  CitySnapshotEngine,
  CityAnomalyDetector,
  CityRecoveryEngine
);

// CITY_INTELLIGENCE_PATCH
state.city = CityBrainEngine.tick(
  state.city || {},
  CitySnapshotEngine,
  CityMemoryEngine,
  CityTrendEngine,
  CityPredictionEngine,
  CityMoodEngine,
  CityLoadBalancer
);`
      );

    fs.writeFileSync(hyperFull, content);
    console.log("✔ Naprawiono:", HYPER_PATH);
  } else {
    console.log("⏭ Już poprawne:", HYPER_PATH);
  }
}

console.log("\n🏁 AUTO‑PATCHER 5 ZAKOŃCZONY — CITY INTELLIGENCE SYSTEM ACTIVE");
