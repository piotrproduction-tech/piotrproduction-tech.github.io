/**
 * CITYOF-GATE :: Marketplace 5.0 — Integration Pack 3 (AI Engines) Test Suite
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
  "../integration/marketplace/aiEconomyEngine.js",
  "../integration/marketplace/aiSocialEngine.js",
  "../integration/marketplace/aiEventEngine.js",
  "../integration/marketplace/aiWeatherEngine.js",
  "../integration/marketplace/aiSeasonEngine.js"
];

async function testImports() {
  console.log("\n📦 TEST 1: Importy AI Engines");
  for (const p of REQUIRED) {
    const result = await safeImport(p);
    if (result.ok) console.log("  ✔ OK:", p);
    else console.log("  ❌ BŁĄD IMPORTU:", p, "→", result.error);
  }
}

async function testAIEconomy() {
  console.log("\n💰 TEST 2: AI Economy Engine");
  const { MarketplaceAIEconomyEngine } =
    await safeImport("../integration/marketplace/aiEconomyEngine.js").then(r => r.mod);

  let state = { economy: { value: 100 } };
  state = MarketplaceAIEconomyEngine.applyGrowth(state, 0.1);
  console.log("  ✔ applyGrowth:", state.economy.value === 110);

  state = MarketplaceAIEconomyEngine.applyRecession(state, 0.1);
  console.log("  ✔ applyRecession:", state.economy.value === 99);

  state = MarketplaceAIEconomyEngine.stabilize(state, 200);
  console.log("  ✔ stabilize:", state.economy.value === 200);
}

async function testAISocial() {
  console.log("\n👥 TEST 3: AI Social Engine");
  const { MarketplaceAISocialEngine } =
    await safeImport("../integration/marketplace/aiSocialEngine.js").then(r => r.mod);

  let state = { social: { mood: 0, trust: 0, tension: 0 } };

  state = MarketplaceAISocialEngine.adjustMood(state, +5);
  state = MarketplaceAISocialEngine.adjustTrust(state, +3);
  state = MarketplaceAISocialEngine.adjustTension(state, -2);

  console.log("  ✔ adjustMood:", state.social.mood === 5);
  console.log("  ✔ adjustTrust:", state.social.trust === 3);
  console.log("  ✔ adjustTension:", state.social.tension === -2);
}

async function testAIEvent() {
  console.log("\n🎉 TEST 4: AI Event Engine");
  const { MarketplaceAIEventEngine } =
    await safeImport("../integration/marketplace/aiEventEngine.js").then(r => r.mod);

  let state = { events: [] };

  state = MarketplaceAIEventEngine.createCrisis(state, "Inflation");
  state = MarketplaceAIEventEngine.createHoliday(state, "GateFest");
  state = MarketplaceAIEventEngine.createPromotion(state, "50% OFF");

  console.log("  ✔ createCrisis:", state.events[0].type === "Crisis");
  console.log("  ✔ createHoliday:", state.events[1].type === "Holiday");
  console.log("  ✔ createPromotion:", state.events[2].type === "Promotion");
}

async function testAIWeather() {
  console.log("\n🌦️ TEST 5: AI Weather Engine");
  const { MarketplaceAIWeatherEngine } =
    await safeImport("../integration/marketplace/aiWeatherEngine.js").then(r => r.mod);

  let state = { weather: "Clear" };

  state = MarketplaceAIWeatherEngine.setWeather(state, "Rain");
  console.log("  ✔ setWeather:", state.weather === "Rain");

  state = MarketplaceAIWeatherEngine.cycleWeather(state, ["Rain", "Storm"]);
  console.log("  ✔ cycleWeather:", state.weather === "Storm");
}

async function testAISeason() {
  console.log("\n🍂 TEST 6: AI Season Engine");
  const { MarketplaceAISeasonEngine } =
    await safeImport("../integration/marketplace/aiSeasonEngine.js").then(r => r.mod);

  let state = { season: "Spring" };

  state = MarketplaceAISeasonEngine.setSeason(state, "Winter");
  console.log("  ✔ setSeason:", state.season === "Winter");

  state = MarketplaceAISeasonEngine.cycleSeason(state, ["Winter", "Summer"]);
  console.log("  ✔ cycleSeason:", state.season === "Summer");
}

async function runAllTests() {
  console.log("======================================");
  console.log("  MARKETPLACE 5.0 — INTEGRATION PACK 3 (AI ENGINES) TEST SUITE START");
  console.log("======================================");

  await testImports();
  await testAIEconomy();
  await testAISocial();
  await testAIEvent();
  await testAIWeather();
  await testAISeason();

  console.log("\n======================================");
  console.log("  MARKETPLACE 5.0 — INTEGRATION PACK 3 (AI ENGINES) TEST SUITE END");
  console.log("======================================");
}

runAllTests();
