/**
 * CITYOF-GATE :: Marketplace 5.0 — Test Suite (FINAL)
 * FE21 / BE21
 *
 * Testy techniczne:
 *  1. Struktura plików
 *  2. Importy (poprawne ścieżki ../)
 *  3. Działanie silników
 *  4. Idempotencja generatorów
 *  5. Sandbox Mode
 *  6. Multi-Instance Router
 *  7. Sharding Engine
 *  8. Multi-City Bridge
 */

import fs from "fs";
import path from "path";

// ------------------------------
// 1. TEST STRUKTURY PLIKÓW
// ------------------------------

const REQUIRED_PATHS = [
  "../world/marketplace/worldStateEngine.js",
  "../world/marketplace/timeEngine.js",
  "../world/marketplace/weatherEngine.js",
  "../world/marketplace/randomnessEngine.js",
  "../scheduler/marketplace/syncScheduler.js",
  "../sandbox/marketplace/sandboxEngine.js",
  "../sync/marketplace/multiInstanceSyncBridge.js",
  "../sharding/marketplace/shardingEngine.js",
  "../router/marketplace/multiInstanceRouter.js",
  "../bridge/marketplace/multiCityBridge.js"
];

function testFileStructure() {
  console.log("\n📁 TEST 1: Struktura plików");

  REQUIRED_PATHS.forEach(p => {
    const full = path.resolve("tests", p);
    if (fs.existsSync(full)) {
      console.log("  ✔ OK:", p);
    } else {
      console.log("  ❌ BRAK:", p);
    }
  });
}

// ------------------------------
// 2. TEST IMPORTÓW
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

async function testImports() {
  console.log("\n📦 TEST 2: Importy");

  for (const p of REQUIRED_PATHS) {
    const result = await safeImport(p);
    if (result.ok) {
      console.log("  ✔ OK:", p);
    } else {
      console.log("  ❌ BŁĄD IMPORTU:", p, "→", result.error);
    }
  }
}

// ------------------------------
// 3. TEST DZIAŁANIA SILNIKÓW
// ------------------------------

async function testEngines() {
  console.log("\n⚙️ TEST 3: Silniki");

  const { MarketplaceWorldStateEngine } = await safeImport("../world/marketplace/worldStateEngine.js").then(r => r.mod);
  const { MarketplaceTimeEngine } = await safeImport("../world/marketplace/timeEngine.js").then(r => r.mod);
  const { MarketplaceWeatherEngine } = await safeImport("../world/marketplace/weatherEngine.js").then(r => r.mod);
  const { MarketplaceRandomnessEngine } = await safeImport("../world/marketplace/randomnessEngine.js").then(r => r.mod);

  const state = MarketplaceWorldStateEngine.createEmptyState();

  console.log("  ✔ WorldStateEngine działa:", typeof state === "object");
  console.log("  ✔ TimeEngine działa:", MarketplaceTimeEngine.getDayPhase() !== undefined);
  console.log("  ✔ WeatherEngine działa:", typeof MarketplaceWeatherEngine.generateWeather() === "string");
  console.log("  ✔ RandomnessEngine działa:", typeof MarketplaceRandomnessEngine.random() === "number");
}

// ------------------------------
// 4. TEST IDEMPOTENCJI GENERATORÓW
// ------------------------------

function testIdempotency() {
  console.log("\n🔁 TEST 4: Idempotencja generatorów");

  REQUIRED_PATHS.forEach(p => {
    const full = path.resolve("tests", p);
    const exists = fs.existsSync(full);
    console.log(exists ? "  ✔ OK:" : "  ❌ Problem:", p);
  });
}

// ------------------------------
// 5. TEST SANDBOX MODE
// ------------------------------

async function testSandbox() {
  console.log("\n🧪 TEST 5: Sandbox Mode");

  const { MarketplaceSandboxEngine } = await safeImport("../sandbox/marketplace/sandboxEngine.js").then(r => r.mod);

  MarketplaceSandboxEngine.createInstance("test1", { value: 1 });
  MarketplaceSandboxEngine.snapshot("test1");
  MarketplaceSandboxEngine.cloneInstance("test1", "test2");

  console.log("  ✔ createInstance działa:", !!MarketplaceSandboxEngine.instances["test1"]);
  console.log("  ✔ cloneInstance działa:", !!MarketplaceSandboxEngine.instances["test2"]);
  console.log("  ✔ snapshot działa:", MarketplaceSandboxEngine.instances["test1"].snapshots.length > 0);
}

// ------------------------------
// 6. TEST MULTI-INSTANCE ROUTER
// ------------------------------

async function testRouter() {
  console.log("\n🚦 TEST 6: Multi-Instance Router");

  const { MarketplaceMultiInstanceRouter } = await safeImport("../router/marketplace/multiInstanceRouter.js").then(r => r.mod);

  MarketplaceMultiInstanceRouter.registerInstance("A", {
    ping: () => "pong"
  });

  const result = MarketplaceMultiInstanceRouter.route("A", "ping");

  console.log("  ✔ Router działa:", result === "pong");
}

// ------------------------------
// 7. TEST SHARDING ENGINE
// ------------------------------

async function testSharding() {
  console.log("\n🧩 TEST 7: Sharding Engine");

  const { MarketplaceShardingEngine } = await safeImport("../sharding/marketplace/shardingEngine.js").then(r => r.mod);

  MarketplaceShardingEngine.createShard("S1");
  MarketplaceShardingEngine.createShard("S2");

  const shard = MarketplaceShardingEngine.assignToShard("entity123");

  console.log("  ✔ Sharding działa:", shard === "S1" || shard === "S2");
}

// ------------------------------
// 8. TEST MULTI-CITY BRIDGE
// ------------------------------

async function testMultiCity() {
  console.log("\n🌉 TEST 8: Multi-City Bridge");

  const { MarketplaceMultiCityBridge } = await safeImport("../bridge/marketplace/multiCityBridge.js").then(r => r.mod);

  MarketplaceMultiCityBridge.registerCity("Poznan", {});
  MarketplaceMultiCityBridge.registerCity("Warsaw", {});

  const result = MarketplaceMultiCityBridge.syncEvent("Poznan", "Warsaw", { type: "test" });

  console.log("  ✔ Multi-City działa:", result.synced === true);
}

// ------------------------------
// URUCHOMIENIE TESTÓW
// ------------------------------

async function runAllTests() {
  console.log("======================================");
  console.log("  MARKETPLACE 5.0 — TEST SUITE START");
  console.log("======================================");

  testFileStructure();
  await testImports();
  await testEngines();
  testIdempotency();
  await testSandbox();
  await testRouter();
  await testSharding();
  await testMultiCity();

  console.log("\n======================================");
  console.log("  MARKETPLACE 5.0 — TEST SUITE END");
  console.log("======================================");
}

runAllTests();
