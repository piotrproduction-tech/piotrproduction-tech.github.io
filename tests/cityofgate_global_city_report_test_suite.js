/**
 * CITYOF‑GATE :: GLOBAL CITY REPORT TEST SUITE
 * Jeden test, który przechodzi przez:
 *  - Marketplace 5.0
 *  - AI Engines (Economy, Social, Event, Weather, Season)
 *  - Integration Pack 2 (Visualizer, Scenario, Data Lake, Knowledge Graph, Telemetry)
 *  - Meta‑Integration Pack (Clock, EventBus, Reputation, Token, Role, Router, Global AI Director)
 *  - 10 000 cykli symulacji
 *
 * Wynik: jeden globalny raport miasta.
 */

import path from "path";

// ------------------------------
// IMPORTY WSZYSTKICH WARSTW
// ------------------------------

async function load(p) {
  const full = path.resolve(p);
  return import("file://" + full.replace(/\\/g, "/"));
}

// Marketplace
const Hyper = await load("./integration/marketplace/hyperOrchestratorBridge.js");
const AIDir = await load("./integration/marketplace/aiDirectorBridge.js");

// AI Engines
const AIEco = await load("./integration/marketplace/aiEconomyEngine.js");
const AISoc = await load("./integration/marketplace/aiSocialEngine.js");
const AIEvent = await load("./integration/marketplace/aiEventEngine.js");
const AIWeather = await load("./integration/marketplace/aiWeatherEngine.js");
const AISeason = await load("./integration/marketplace/aiSeasonEngine.js");

// Integration Pack 2
const Visual = await load("./integration/marketplace/visualizerBridge.js");
const Scenario = await load("./integration/marketplace/scenarioEngineBridge.js");
const DataLake = await load("./integration/marketplace/dataLakeBridge.js");
const KG = await load("./integration/marketplace/knowledgeGraphBridge.js");
const Telemetry = await load("./integration/marketplace/telemetryBridge.js");

// Meta‑Integration Pack
const CityClock = await load("./integration/city/cityClockBridge.js");
const CityEventBus = await load("./integration/city/cityEventBusBridge.js");
const CityRep = await load("./integration/city/cityReputationBridge.js");
const CityToken = await load("./integration/city/cityTokenBridge.js");
const CityRole = await load("./integration/city/cityRoleBridge.js");
const CityRouter = await load("./integration/city/cityRouterBridge.js");
const CityAID = await load("./integration/city/cityAIDirectorBridge.js");

// ------------------------------
// MOCKI GLOBALNYCH SYSTEMÓW MIASTA
// ------------------------------

const cityClock = { now: () => Date.now() };
const reputationEngine = { getReputation: () => 777 };
const tokenEngine = { getBalance: () => 12345 };
const roleEngine = { getRole: () => "CITIZEN" };
const router = { route: (d, req) => ({ district: d, handled: true, req }) };
const globalDirective = { type: "GLOBAL_POLICY", payload: { mode: "Festival" } };

// ------------------------------
// GLOBALNE LOGI
// ------------------------------

const logs = [];
const logger = { write: entry => logs.push(entry) };
const metrics = [];
const telemetry = { record: (name, value, tags) => metrics.push({ name, value, tags }) };
const edges = [];
const graph = { addEdge: e => edges.push(e) };

// ------------------------------
// START ŚWIATA
// ------------------------------

let world = Hyper.MarketplaceHyperOrchestratorBridge.init({
  economy: { value: 100 },
  social: { mood: 0, trust: 0, tension: 0 },
  weather: "Clear",
  season: "Spring",
  events: []
});

// ------------------------------
// 10 000 CYKLI SYMULACJI
// ------------------------------

for (let i = 0; i < 10000; i++) {
  const tickStart = Date.now();

  // HyperOrchestrator tick
  const tick = Hyper.MarketplaceHyperOrchestratorBridge.tick(world);

  // AI Engines
  AIEco.MarketplaceAIEconomyEngine.applyGrowth(world.state, 0.0005);
  AISoc.MarketplaceAISocialEngine.adjustMood(world.state, +0.001);
  AIWeather.MarketplaceAIWeatherEngine.cycleWeather(world.state);
  AISeason.MarketplaceAISeasonEngine.cycleSeason(world.state);

  // Scenario Engine
  if (i % 500 === 0) {
    Scenario.MarketplaceScenarioEngineBridge.triggerFestival(world.state, "Poznan");
  }

  // Data Lake
  DataLake.MarketplaceDataLakeBridge.logTick(logger, tick);

  // Knowledge Graph
  KG.MarketplaceKnowledgeGraphBridge.linkInstanceToCity(graph, "marketplace", "CITYOF‑GATE");

  // Telemetry
  const tickEnd = Date.now();
  Telemetry.MarketplaceTelemetryBridge.measureTick(telemetry, tickStart, tickEnd);

  // Meta‑Integration
  CityClock.CityClockBridge.syncTimeToMarketplace(world.state, cityClock);
  CityEventBus.CityEventBusBridge.forwardEventToMarketplace(world.state, {
    type: "CityBroadcast",
    payload: "Heartbeat"
  });
  CityRep.CityReputationBridge.applyUserReputation(world.state, "U1", reputationEngine);
  CityToken.CityTokenBridge.applyTokenBalance(world.state, "U1", tokenEngine);
  CityRole.CityRoleBridge.applyUserRole(world.state, "U1", roleEngine);
  CityAID.CityAIDirectorBridge.applyGlobalDirective(world.state, globalDirective);

  // Router test
  CityRouter.CityRouterBridge.routeToMarketplace({ path: "/heartbeat" }, router);
}

// ------------------------------
// GLOBALNY RAPORT MIASTA
// ------------------------------

console.log("======================================");
console.log("        CITYOF‑GATE — GLOBAL REPORT");
console.log("======================================");

console.log("\n🌍 STAN ŚWIATA:");
console.log({
  economy: world.state.economy,
  social: world.state.social,
  weather: world.state.weather,
  season: world.state.season,
  events: world.state.events.length
});

console.log("\n📊 TELEMETRIA:");
console.log({
  ticks: metrics.length,
  avgTickMs: metrics.reduce((a, b) => a + b.value, 0) / metrics.length
});

console.log("\n💾 DATA LAKE:");
console.log("log entries:", logs.length);

console.log("\n🧠 KNOWLEDGE GRAPH:");
console.log("edges:", edges.length);

console.log("\n⭐ META‑INTEGRATION:");
console.log({
  reputation: world.state.userReputation,
  tokens: world.state.tokenBalance,
  role: world.state.userRole,
  directive: world.state.globalDirective
});

console.log("\n======================================");
console.log("  CITYOF‑GATE — GLOBAL REPORT END");
console.log("======================================");

import { renderCityDashboard } from "../tools/cityofgate_ascii_dashboard.js";

renderCityDashboard(
  world.state.city,
  world.state,
  metrics,
  logs,
  edges
);
