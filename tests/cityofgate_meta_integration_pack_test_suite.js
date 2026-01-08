/**
 * CITYOF‑GATE :: Meta‑Integration Pack Test Suite
 * Testy:
 *  1. Importy bridge’y
 *  2. City Clock Bridge
 *  3. City Event Bus Bridge
 *  4. City Reputation Bridge
 *  5. City Token Bridge
 *  6. City Role Bridge
 *  7. City Router Bridge
 *  8. City AI Director Bridge
 */

import path from "path";

async function safeImport(modulePath) {
  try {
    const full = path.resolve("tests", modulePath);
    const mod = await import("file://" + full.replace(/\\/g, "/"));
    return { ok: true, mod };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

const REQUIRED = [
  "../integration/city/cityClockBridge.js",
  "../integration/city/cityEventBusBridge.js",
  "../integration/city/cityReputationBridge.js",
  "../integration/city/cityTokenBridge.js",
  "../integration/city/cityRoleBridge.js",
  "../integration/city/cityRouterBridge.js",
  "../integration/city/cityAIDirectorBridge.js"
];

async function testImports() {
  console.log("\n📦 TEST 1: Importy CITYOF‑GATE bridge’y");
  for (const p of REQUIRED) {
    const result = await safeImport(p);
    if (result.ok) console.log("  ✔ OK:", p);
    else console.log("  ❌ BŁĄD IMPORTU:", p, "→", result.error);
  }
}

async function testCityClock() {
  console.log("\n⏰ TEST 2: City Clock Bridge");
  const { CityClockBridge } =
    await safeImport("../integration/city/cityClockBridge.js").then(r => r.mod);

  const cityClock = { now: () => 123456789 };
  let state = {};
  state = CityClockBridge.syncTimeToMarketplace(state, cityClock);

  console.log("  ✔ syncTimeToMarketplace:", state.globalTime === 123456789);
}

async function testCityEventBus() {
  console.log("\n📡 TEST 3: City Event Bus Bridge");
  const { CityEventBusBridge } =
    await safeImport("../integration/city/cityEventBusBridge.js").then(r => r.mod);

  let state = { events: [] };
  state = CityEventBusBridge.forwardEventToMarketplace(state, {
    type: "GlobalAnnouncement",
    payload: "Welcome to CITYOF‑GATE"
  });

  console.log("  ✔ forwardEventToMarketplace:",
    state.events.length === 1 &&
    state.events[0].forwardedFromCity === true
  );
}

async function testCityReputation() {
  console.log("\n⭐ TEST 4: City Reputation Bridge");
  const { CityReputationBridge } =
    await safeImport("../integration/city/cityReputationBridge.js").then(r => r.mod);

  const reputationEngine = {
    getReputation: userId => (userId === "U1" ? 900 : 0)
  };

  let state = {};
  state = CityReputationBridge.applyUserReputation(state, "U1", reputationEngine);

  console.log("  ✔ applyUserReputation:",
    state.userReputation.userId === "U1" &&
    state.userReputation.value === 900
  );
}

async function testCityToken() {
  console.log("\n🪙 TEST 5: City Token Bridge");
  const { CityTokenBridge } =
    await safeImport("../integration/city/cityTokenBridge.js").then(r => r.mod);

  const tokenEngine = {
    getBalance: userId => (userId === "U1" ? 1234 : 0)
  };

  let state = {};
  state = CityTokenBridge.applyTokenBalance(state, "U1", tokenEngine);

  console.log("  ✔ applyTokenBalance:",
    state.tokenBalance.userId === "U1" &&
    state.tokenBalance.balance === 1234
  );
}

async function testCityRole() {
  console.log("\n🎭 TEST 6: City Role Bridge");
  const { CityRoleBridge } =
    await safeImport("../integration/city/cityRoleBridge.js").then(r => r.mod);

  const roleEngine = {
    getRole: userId => (userId === "U1" ? "GATE_KING" : "CITIZEN")
  };

  let state = {};
  state = CityRoleBridge.applyUserRole(state, "U1", roleEngine);

  console.log("  ✔ applyUserRole:",
    state.userRole.userId === "U1" &&
    state.userRole.role === "GATE_KING"
  );
}

async function testCityRouter() {
  console.log("\n🧭 TEST 7: City Router Bridge");
  const { CityRouterBridge } =
    await safeImport("../integration/city/cityRouterBridge.js").then(r => r.mod);

  const router = {
    route: (district, request) => ({
      district,
      handled: true,
      request
    })
  };

  const response = CityRouterBridge.routeToMarketplace({ path: "/market" }, router);

  console.log("  ✔ routeToMarketplace:",
    response.district === "marketplace" &&
    response.handled === true &&
    response.request.path === "/market"
  );
}

async function testCityAIDirector() {
  console.log("\n🧠 TEST 8: City AI Director Bridge");
  const { CityAIDirectorBridge } =
    await safeImport("../integration/city/cityAIDirectorBridge.js").then(r => r.mod);

  let state = {};
  const directive = {
    type: "GLOBAL_POLICY",
    payload: { mode: "Festival" }
  };

  state = CityAIDirectorBridge.applyGlobalDirective(state, directive);

  console.log("  ✔ applyGlobalDirective:",
    state.globalDirective.type === "GLOBAL_POLICY" &&
    state.globalDirective.payload.mode === "Festival"
  );
}

async function runAllTests() {
  console.log("======================================");
  console.log("  CITYOF‑GATE — META‑INTEGRATION PACK TEST SUITE START");
  console.log("======================================");

  await testImports();
  await testCityClock();
  await testCityEventBus();
  await testCityReputation();
  await testCityToken();
  await testCityRole();
  await testCityRouter();
  await testCityAIDirector();

  console.log("\n======================================");
  console.log("  CITYOF‑GATE — META‑INTEGRATION PACK TEST SUITE END");
  console.log("======================================");
}

runAllTests();
