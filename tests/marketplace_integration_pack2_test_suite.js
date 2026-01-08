/**
 * CITYOF-GATE :: Marketplace 5.0 — Integration Pack 2 Test Suite
 * Testy:
 *  1. Importy
 *  2. Visualizer Bridge
 *  3. Scenario Engine Bridge
 *  4. Data Lake Bridge
 *  5. Knowledge Graph Bridge
 *  6. Telemetry Bridge
 */

import path from "path";

// ------------------------------
// HELPER: dynamiczny import file://
// ------------------------------

async function safeImport(modulePath) {
  try {
    const full = path.resolve("tests", modulePath);
    const mod = await import("file://" + full.replace(/\\/g, "/"));
    return { ok: true, mod };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// ------------------------------
// 1. TEST IMPORTÓW
// ------------------------------

const REQUIRED = [
  "../integration/marketplace/visualizerBridge.js",
  "../integration/marketplace/scenarioEngineBridge.js",
  "../integration/marketplace/dataLakeBridge.js",
  "../integration/marketplace/knowledgeGraphBridge.js",
  "../integration/marketplace/telemetryBridge.js"
];

async function testImports() {
  console.log("\n📦 TEST 1: Importy bridge’y");

  for (const p of REQUIRED) {
    const result = await safeImport(p);
    if (result.ok) {
      console.log("  ✔ OK:", p);
    } else {
      console.log("  ❌ BŁĄD IMPORTU:", p, "→", result.error);
    }
  }
}

// ------------------------------
// 2. TEST VISUALIZER BRIDGE
// ------------------------------

async function testVisualizer() {
  console.log("\n🗺️ TEST 2: Visualizer Bridge");

  const { MarketplaceVisualizerBridge } =
    await safeImport("../integration/marketplace/visualizerBridge.js").then(r => r.mod);

  const state = {
    season: "Winter",
    weather: "Snow",
    economy: { value: 200 },
    events: [{}, {}, {}]
  };

  const overview = MarketplaceVisualizerBridge.extractOverview(state);

  console.log("  ✔ extractOverview:", overview.eventsCount === 3);

  const instances = MarketplaceVisualizerBridge.extractInstances({
    A: { createdAt: 1, snapshots: [1, 2] },
    B: { createdAt: 2, snapshots: [] }
  });

  console.log("  ✔ extractInstances:", instances.length === 2);

  const shards = MarketplaceVisualizerBridge.extractShards({
    shards: {
      S1: { entities: [1, 2, 3] },
      S2: { entities: [] }
    }
  });

  console.log("  ✔ extractShards:", shards.length === 2);
}

// ------------------------------
// 3. TEST SCENARIO ENGINE BRIDGE
// ------------------------------

async function testScenarioEngine() {
  console.log("\n🎭 TEST 3: Scenario Engine Bridge");

  const { MarketplaceScenarioEngineBridge } =
    await safeImport("../integration/marketplace/scenarioEngineBridge.js").then(r => r.mod);

  let state = {
    economy: { value: 100 },
    events: []
  };

  state = MarketplaceScenarioEngineBridge.applyEconomyShock(state, +50);
  console.log("  ✔ applyEconomyShock:", state.economy.value === 150);

  state = MarketplaceScenarioEngineBridge.triggerFestival(state, "Poznan");
  console.log("  ✔ triggerFestival:", state.events.length === 1);

  state = MarketplaceScenarioEngineBridge.switchSeason(state, "Summer");
  console.log("  ✔ switchSeason:", state.season === "Summer");

  state = MarketplaceScenarioEngineBridge.forceWeather(state, "Rain");
  console.log("  ✔ forceWeather:", state.weather === "Rain");
}

// ------------------------------
// 4. TEST DATA LAKE BRIDGE
// ------------------------------

async function testDataLake() {
  console.log("\n💾 TEST 4: Data Lake Bridge");

  const { MarketplaceDataLakeBridge } =
    await safeImport("../integration/marketplace/dataLakeBridge.js").then(r => r.mod);

  const logs = [];
  const logger = { write: entry => logs.push(entry) };

  MarketplaceDataLakeBridge.logTick(logger, {
    timestamp: 123,
    timePhase: "Morning",
    weather: "Clear"
  });

  MarketplaceDataLakeBridge.logEconomy(logger, {
    economy: { value: 200 }
  });

  MarketplaceDataLakeBridge.logEvent(logger, {
    timestamp: 999,
    type: "Festival"
  });

  console.log("  ✔ logTick:", logs[0].type === "tick");
  console.log("  ✔ logEconomy:", logs[1].type === "economy");
  console.log("  ✔ logEvent:", logs[2].type === "event");
}

// ------------------------------
// 5. TEST KNOWLEDGE GRAPH BRIDGE
// ------------------------------

async function testKnowledgeGraph() {
  console.log("\n🧠 TEST 5: Knowledge Graph Bridge");

  const { MarketplaceKnowledgeGraphBridge } =
    await safeImport("../integration/marketplace/knowledgeGraphBridge.js").then(r => r.mod);

  const edges = [];
  const graph = { addEdge: edge => edges.push(edge) };

  MarketplaceKnowledgeGraphBridge.linkInstanceToShard(graph, "I1", "S1");
  MarketplaceKnowledgeGraphBridge.linkInstanceToCity(graph, "I1", "Poznan");
  MarketplaceKnowledgeGraphBridge.linkUserToInstance(graph, "U1", "I1");

  console.log("  ✔ linkInstanceToShard:", edges[0].type === "HOSTED_IN");
  console.log("  ✔ linkInstanceToCity:", edges[1].type === "BELONGS_TO");
  console.log("  ✔ linkUserToInstance:", edges[2].type === "PARTICIPATES_IN");
}

// ------------------------------
// 6. TEST TELEMETRY BRIDGE
// ------------------------------

async function testTelemetry() {
  console.log("\n📊 TEST 6: Telemetry Bridge");

  const { MarketplaceTelemetryBridge } =
    await safeImport("../integration/marketplace/telemetryBridge.js").then(r => r.mod);

  const metrics = [];
  const telemetry = { record: (name, value, tags) => metrics.push({ name, value, tags }) };

  MarketplaceTelemetryBridge.measureTick(telemetry, 100, 150);
  MarketplaceTelemetryBridge.measureInstanceCount(telemetry, { A: {}, B: {} });
  MarketplaceTelemetryBridge.measureShardLoad(telemetry, {
    shards: {
      S1: { entities: [1, 2] },
      S2: { entities: [] }
    }
  });

  console.log("  ✔ measureTick:", metrics[0].name === "marketplace.tick.duration");
  console.log("  ✔ measureInstanceCount:", metrics[1].value === 2);
  console.log("  ✔ measureShardLoad:", metrics.length === 4);
}

// ------------------------------
// URUCHOMIENIE TESTÓW
// ------------------------------

async function runAllTests() {
  console.log("======================================");
  console.log("  MARKETPLACE 5.0 — INTEGRATION PACK 2 TEST SUITE START");
  console.log("======================================");

  await testImports();
  await testVisualizer();
  await testScenarioEngine();
  await testDataLake();
  await testKnowledgeGraph();
  await testTelemetry();

  console.log("\n======================================");
  console.log("  MARKETPLACE 5.0 — INTEGRATION PACK 2 TEST SUITE END");
  console.log("======================================");
}

runAllTests();
