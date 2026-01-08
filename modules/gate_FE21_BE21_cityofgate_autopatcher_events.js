/**
 * CITYOF‑GATE :: AUTO‑PATCHER — EVENTS STABILITY FIX
 *
 * Naprawia:
 *  - world/marketplace/worldStateEngine.js
 *  - integration/marketplace/aiDirectorBridge.js
 *  - integration/city/cityEventBusBridge.js
 *
 * Cel:
 *  - gwarantować, że state.events ZAWSZE jest tablicą
 *  - zapobiec TypeError: state.events.push is not a function
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

// ---------------------------------------------
// 1. WorldStateEngine — gwarantuje events: []
// ---------------------------------------------

patchFile("world/marketplace/worldStateEngine.js", content => {
  if (content.includes("events: Array.isArray(initial.events)")) return content;

  return content.replace(
    /createEmptyState\s*\([^)]*\)\s*{[^}]*return\s*{([\s\S]*?)}/m,
    `createEmptyState(initial = {}) {
    return {
      economy: initial.economy || { value: 0 },
      social: initial.social || { mood: 0, trust: 0, tension: 0 },
      weather: initial.weather || "Clear",
      season: initial.season || "Spring",
      events: Array.isArray(initial.events) ? initial.events : [],
      ...initial
    };
  }`
  );
});

// ---------------------------------------------
// 2. AI Director Bridge — triggerEvent fix
// ---------------------------------------------

patchFile("integration/marketplace/aiDirectorBridge.js", content => {
  return content.replace(
    /if\s*\(!state\.events\)/g,
    "if (!Array.isArray(state.events))"
  );
});

// ---------------------------------------------
// 3. City Event Bus Bridge — forwardEvent fix
// ---------------------------------------------

patchFile("integration/city/cityEventBusBridge.js", content => {
  return content.replace(
    /if\s*\(!state\.events\)/g,
    "if (!Array.isArray(state.events))"
  );
});

console.log("\n🏁 AUTO‑PATCHER ZAKOŃCZONY — EVENTS STABILITY FIX COMPLETE");
