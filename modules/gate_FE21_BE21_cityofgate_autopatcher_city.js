/**
 * CITYOF‑GATE :: AUTO‑PATCHER 3 — CITY‑LEVEL STABILITY FIX
 *
 * Stabilizuje:
 *  - instancje
 *  - shardy
 *  - router
 *  - globalny event bus
 *  - heartbeat miasta
 *
 * Dodaje:
 *  - CitySelfHealingEngine
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();

function patchFile(relativePath, replacer) {
  const full = path.join(ROOT, relativePath);

  if (!fs.existsSync(full)) {
    console.log("❌ Nie znaleziono pliku:", relativePath);
    return;
  }

  let content = fs.readFileSync(full, "utf8");
  const updated = replacer(content);

  if (updated !== content) {
    fs.writeFileSync(full, updated);
    console.log("✔ Naprawiono:", relativePath);
  } else {
    console.log("⏭ Już poprawne:", relativePath);
  }
}

// ---------------------------------------------------------
// 1. Dodajemy CitySelfHealingEngine
// ---------------------------------------------------------

const ENGINE_PATH = "integration/city/citySelfHealingEngine.js";

if (!fs.existsSync(path.join(ROOT, ENGINE_PATH))) {
  fs.mkdirSync(path.join(ROOT, "integration/city"), { recursive: true });

  fs.writeFileSync(
    path.join(ROOT, ENGINE_PATH),
    `/**
 * CITY SELF‑HEALING ENGINE
 * Automatyczna regeneracja struktury miasta.
 */

export const CitySelfHealingEngine = {
  healCity(city) {
    if (!city) city = {};

    if (!city.instances || typeof city.instances !== "object") {
      city.instances = {};
    }

    for (const [id, inst] of Object.entries(city.instances)) {
      if (!inst.createdAt) inst.createdAt = Date.now();
      if (!Array.isArray(inst.snapshots)) inst.snapshots = [];
      if (!inst.state || typeof inst.state !== "object") inst.state = {};
    }

    if (!city.shards || typeof city.shards !== "object") {
      city.shards = {};
    }

    for (const [id, shard] of Object.entries(city.shards)) {
      if (!Array.isArray(shard.entities)) shard.entities = [];
    }

    if (!city.globalEvents || !Array.isArray(city.globalEvents)) {
      city.globalEvents = [];
    }

    return city;
  }
};`
  );

  console.log("📄 Utworzono: integration/city/citySelfHealingEngine.js");
}

// ---------------------------------------------------------
// 2. Patch router — nigdy nie zwraca undefined
// ---------------------------------------------------------

patchFile("integration/city/cityRouterBridge.js", content => {
  if (content.includes("CITY_ROUTER_STABILITY_PATCH")) return content;

  return content.replace(
    /routeToMarketplace\(request, router\) {/,
    `routeToMarketplace(request, router) {
    // CITY_ROUTER_STABILITY_PATCH
    if (!router || typeof router.route !== "function") {
      return { district: "marketplace", handled: false, error: "RouterMissing" };
    }`
  );
});

// ---------------------------------------------------------
// 3. Patch EventBus — globalne eventy zawsze tablicą
// ---------------------------------------------------------

patchFile("integration/city/cityEventBusBridge.js", content => {
  if (content.includes("CITY_EVENTBUS_STABILITY_PATCH")) return content;

  return content.replace(
    /forwardEventToMarketplace\(state, event\) {/,
    `forwardEventToMarketplace(state, event) {
    // CITY_EVENTBUS_STABILITY_PATCH
    if (!Array.isArray(state.events)) state.events = [];`
  );
});

// ---------------------------------------------------------
// 4. Patch HyperOrchestrator — heartbeat miasta
// ---------------------------------------------------------

patchFile("integration/marketplace/hyperOrchestratorBridge.js", content => {
  if (content.includes("CITY_HEARTBEAT_PATCH")) return content;

  return content.replace(
    /return { tick:/,
    `
// CITY_HEARTBEAT_PATCH
if (typeof state.cityHeartbeat !== "number") state.cityHeartbeat = 0;
state.cityHeartbeat++;

return { tick:`
  );
});

// ---------------------------------------------------------
// 5. Patch Scenario Engine — ochrona instancji
// ---------------------------------------------------------

patchFile("integration/marketplace/scenarioEngineBridge.js", content => {
  if (content.includes("CITY_INSTANCE_STABILITY_PATCH")) return content;

  return content.replace(
    /return MarketplaceAIDirectorBridge/,
    `
// CITY_INSTANCE_STABILITY_PATCH
if (!state.instances || typeof state.instances !== "object") {
  state.instances = {};
}

return MarketplaceAIDirectorBridge`
  );
});

console.log("\n🏁 AUTO‑PATCHER 3 ZAKOŃCZONY — CITY‑LEVEL STABILITY FIX COMPLETE");
