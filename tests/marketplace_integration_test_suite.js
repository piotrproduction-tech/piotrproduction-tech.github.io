/**
 * CITYOF-GATE :: Marketplace 5.0 — Integration Test Suite (FINAL)
 * FE21 / BE21
 *
 * Testy integracyjne:
 *  1. Importy bridge’y
 *  2. HyperOrchestrator Bridge — tick
 *  3. AI Director Bridge — sezony, pogoda, ekonomia, eventy
 */

import fs from "fs";
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
  "../integration/marketplace/hyperOrchestratorBridge.js",
  "../integration/marketplace/aiDirectorBridge.js"
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
// 2. TEST HYPERORCHESTRATOR BRIDGE
// ------------------------------

async function testHyperOrchestrator() {
  console.log("\n🌐 TEST 2: HyperOrchestrator Bridge");

  const { MarketplaceHyperOrchestratorBridge } =
    await safeImport("../integration/marketplace/hyperOrchestratorBridge.js").then(r => r.mod);

  const context = MarketplaceHyperOrchestratorBridge.init({
    economy: { value: 100 }
  });

  const tick = MarketplaceHyperOrchestratorBridge.tick(context);

  console.log("  ✔ tick.timestamp:", typeof tick.timestamp === "number");
  console.log("  ✔ tick.timePhase:", typeof tick.timePhase === "string");
  console.log("  ✔ tick.weather:", typeof tick.weather === "string");
  console.log("  ✔ tick.scheduled:", typeof tick.scheduled === "object");
}

// ------------------------------
// 3. TEST AI DIRECTOR BRIDGE
// ------------------------------

async function testAIDirector() {
  console.log("\n🧠 TEST 3: AI Director Bridge");

  const { MarketplaceAIDirectorBridge } =
    await safeImport("../integration/marketplace/aiDirectorBridge.js").then(r => r.mod);

  let state = {
    season: null,
    weather: null,
    economy: { value: 100 },
    events: []
  };

  // sezon
  state = MarketplaceAIDirectorBridge.applySeason(state, "Winter");
  console.log("  ✔ applySeason:", state.season === "Winter");

  // pogoda
  state = MarketplaceAIDirectorBridge.applyWeatherOverride(state, "Snow");
  console.log("  ✔ applyWeatherOverride:", state.weather === "Snow");

  // ekonomia
  state = MarketplaceAIDirectorBridge.applyEconomyPreset(state, { value: 200 });
  console.log("  ✔ applyEconomyPreset:", state.economy.value === 200);

  // event
  state = MarketplaceAIDirectorBridge.triggerEvent(state, { type: "Festival" });
  console.log("  ✔ triggerEvent:", state.events.length === 1);
}

// ------------------------------
// URUCHOMIENIE TESTÓW
// ------------------------------

async function runAllTests() {
  console.log("======================================");
  console.log("  MARKETPLACE 5.0 — INTEGRATION TEST SUITE START");
  console.log("======================================");

  await testImports();
  await testHyperOrchestrator();
  await testAIDirector();

  console.log("\n======================================");
  console.log("  MARKETPLACE 5.0 — INTEGRATION TEST SUITE END");
  console.log("======================================");
}

runAllTests();
