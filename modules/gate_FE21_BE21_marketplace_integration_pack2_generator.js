/**
 * CITYOF-GATE :: Marketplace 5.0 — Integration Pack 2 Generator (ESM)
 * Visualizer, Scenario Engine, Data Lake, Knowledge Graph, Telemetry
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
    path: "integration/marketplace/visualizerBridge.js",
    content: `/**
 * Marketplace Visualizer Bridge 5.0
 * Dane do wizualizacji: heatmapy, cykle, shard'y, instancje.
 */

import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";

export const MarketplaceVisualizerBridge = {
  extractOverview(state) {
    return {
      season: state.season || null,
      weather: state.weather || null,
      economy: state.economy || null,
      eventsCount: Array.isArray(state.events) ? state.events.length : 0
    };
  },

  extractInstances(instances = {}) {
    return Object.entries(instances).map(([id, inst]) => ({
      id,
      createdAt: inst.createdAt || null,
      snapshots: inst.snapshots ? inst.snapshots.length : 0
    }));
  },

  extractShards(shardingEngine) {
    if (!shardingEngine || !shardingEngine.shards) return [];
    return Object.entries(shardingEngine.shards).map(([id, shard]) => ({
      id,
      entities: shard.entities ? shard.entities.length : 0
    }));
  }
};`
  },
  {
    path: "integration/marketplace/scenarioEngineBridge.js",
    content: `/**
 * Marketplace Scenario Engine Bridge 5.0
 * Symulacje: ekonomia, społeczność, eventy, pogoda, sezony.
 */

import { MarketplaceAIDirectorBridge } from "./aiDirectorBridge.js";

export const MarketplaceScenarioEngineBridge = {
  applyEconomyShock(state, delta) {
    const current = state.economy?.value || 0;
    return MarketplaceAIDirectorBridge.applyEconomyPreset(state, {
      value: current + delta
    });
  },

  triggerFestival(state, cityName) {
    return MarketplaceAIDirectorBridge.triggerEvent(state, {
      type: "Festival",
      city: cityName
    });
  },

  switchSeason(state, season) {
    return MarketplaceAIDirectorBridge.applySeason(state, season);
  },

  forceWeather(state, weather) {
    return MarketplaceAIDirectorBridge.applyWeatherOverride(state, weather);
  }
};`
  },
  {
    path: "integration/marketplace/dataLakeBridge.js",
    content: `/**
 * Marketplace Data Lake Bridge 5.0
 * Logowanie ticków, eventów, ekonomii, społeczności.
 */

export const MarketplaceDataLakeBridge = {
  logTick(logger, tick) {
    logger?.write?.({
      type: "tick",
      timestamp: tick.timestamp,
      timePhase: tick.timePhase,
      weather: tick.weather
    });
  },

  logEvent(logger, event) {
    logger?.write?.({
      type: "event",
      timestamp: event.timestamp,
      payload: event
    });
  },

  logEconomy(logger, state) {
    logger?.write?.({
      type: "economy",
      timestamp: Date.now(),
      economy: state.economy || null
    });
  },

  logStateSnapshot(logger, state) {
    logger?.write?.({
      type: "stateSnapshot",
      timestamp: Date.now(),
      state
    });
  }
};`
  },
  {
    path: "integration/marketplace/knowledgeGraphBridge.js",
    content: `/**
 * Marketplace Knowledge Graph Bridge 5.0
 * Relacje: instancje, shard'y, miasta, użytkownicy.
 */

export const MarketplaceKnowledgeGraphBridge = {
  linkInstanceToShard(graph, instanceId, shardId) {
    graph?.addEdge?.({
      from: \`instance:\${instanceId}\`,
      to: \`shard:\${shardId}\`,
      type: "HOSTED_IN"
    });
  },

  linkInstanceToCity(graph, instanceId, cityName) {
    graph?.addEdge?.({
      from: \`instance:\${instanceId}\`,
      to: \`city:\${cityName}\`,
      type: "BELONGS_TO"
    });
  },

  linkUserToInstance(graph, userId, instanceId) {
    graph?.addEdge?.({
      from: \`user:\${userId}\`,
      to: \`instance:\${instanceId}\`,
      type: "PARTICIPATES_IN"
    });
  }
};`
  },
  {
    path: "integration/marketplace/telemetryBridge.js",
    content: `/**
 * Marketplace Telemetry Bridge 5.0
 * Metryki: performance, load, tick time, event time, shard load.
 */

export const MarketplaceTelemetryBridge = {
  measureTick(telemetry, tickStart, tickEnd) {
    telemetry?.record?.("marketplace.tick.duration", tickEnd - tickStart);
  },

  measureShardLoad(telemetry, shardingEngine) {
    if (!shardingEngine || !shardingEngine.shards) return;
    Object.entries(shardingEngine.shards).forEach(([id, shard]) => {
      const load = shard.entities ? shard.entities.length : 0;
      telemetry?.record?.("marketplace.shard.load", load, { shardId: id });
    });
  },

  measureInstanceCount(telemetry, instances = {}) {
    const count = Object.keys(instances).length;
    telemetry?.record?.("marketplace.instances.count", count);
  }
};`
  }
];

export function run() {
  console.log("🌐 Marketplace Integration Pack 2 Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Integration Pack 2 Generator — DONE");
}

run();
