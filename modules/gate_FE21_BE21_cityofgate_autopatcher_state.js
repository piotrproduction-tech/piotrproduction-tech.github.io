/**
 * CITYOF‑GATE :: AUTO‑PATCHER 2 — STATE STABILITY FIX
 *
 * Stabilizuje:
 *  - economy
 *  - social
 *  - weather
 *  - season
 *  - events
 *
 * Naprawia:
 *  - worldStateEngine
 *  - AI Engines
 *  - Scenario Engine
 *  - Meta‑Integration Bridges
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
// 1. WorldStateEngine — pełna stabilizacja stanu
// ---------------------------------------------------------

patchFile("world/marketplace/worldStateEngine.js", content => {
  if (content.includes("STATE_STABILITY_PATCH")) return content;

  return content.replace(
    /export const MarketplaceWorldStateEngine = {/,
    `export const MarketplaceWorldStateEngine = {

  // STATE_STABILITY_PATCH
  stabilize(state) {
    if (!state) state = {};

    if (!state.economy || typeof state.economy.value !== "number") {
      state.economy = { value: state.economy?.value ?? 0 };
    }

    if (!state.social) state.social = {};
    if (typeof state.social.mood !== "number") state.social.mood = 0;
    if (typeof state.social.trust !== "number") state.social.trust = 0;
    if (typeof state.social.tension !== "number") state.social.tension = 0;

    if (typeof state.weather !== "string") state.weather = "Clear";
    if (typeof state.season !== "string") state.season = "Spring";

    if (!Array.isArray(state.events)) state.events = [];

    return state;
  },`
  );
});

// ---------------------------------------------------------
// 2. HyperOrchestrator — automatyczna stabilizacja przy każdym ticku
// ---------------------------------------------------------

patchFile("integration/marketplace/hyperOrchestratorBridge.js", content => {
  if (content.includes("STATE_STABILITY_PATCH")) return content;

  return content.replace(
    /return { tick:/,
    `
// STATE_STABILITY_PATCH
state = MarketplaceWorldStateEngine.stabilize(state);

return { tick:`
  );
});

// ---------------------------------------------------------
// 3. AI Engines — zabezpieczenie przed nadpisaniem state
// ---------------------------------------------------------

const AI_ENGINES = [
  "integration/marketplace/aiEconomyEngine.js",
  "integration/marketplace/aiSocialEngine.js",
  "integration/marketplace/aiEventEngine.js",
  "integration/marketplace/aiWeatherEngine.js",
  "integration/marketplace/aiSeasonEngine.js"
];

AI_ENGINES.forEach(file =>
  patchFile(file, content => {
    if (content.includes("STATE_STABILITY_PATCH")) return content;

    return (
      `import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";\n` +
      content.replace(
        /return state;/g,
        `
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;`
      )
    );
  })
);

// ---------------------------------------------------------
// 4. Scenario Engine — zabezpieczenie
// ---------------------------------------------------------

patchFile("integration/marketplace/scenarioEngineBridge.js", content => {
  if (content.includes("STATE_STABILITY_PATCH")) return content;

  return (
    `import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";\n` +
    content.replace(
      /return state;/g,
      `
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;`
    )
  );
});

// ---------------------------------------------------------
// 5. Meta‑Integration Bridges — zabezpieczenie
// ---------------------------------------------------------

const META = [
  "integration/city/cityClockBridge.js",
  "integration/city/cityEventBusBridge.js",
  "integration/city/cityReputationBridge.js",
  "integration/city/cityTokenBridge.js",
  "integration/city/cityRoleBridge.js",
  "integration/city/cityAIDirectorBridge.js"
];

META.forEach(file =>
  patchFile(file, content => {
    if (content.includes("STATE_STABILITY_PATCH")) return content;

    return (
      `import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";\n` +
      content.replace(
        /return state;/g,
        `
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;`
      )
    );
  })
);

console.log("\n🏁 AUTO‑PATCHER 2 ZAKOŃCZONY — STATE STABILITY FIX COMPLETE");
