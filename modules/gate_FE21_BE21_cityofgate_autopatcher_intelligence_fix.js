/**
 * CITYOF‑GATE :: AUTO‑PATCHER 5 FIX
 * Naprawia brakujący fragment CityBrainEngine.tick()
 * w pliku hyperOrchestratorBridge.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();

const FILE = "integration/marketplace/hyperOrchestratorBridge.js";
const full = path.join(ROOT, FILE);

if (!fs.existsSync(full)) {
  console.log("❌ Nie znaleziono pliku:", FILE);
  process.exit(1);
}

let content = fs.readFileSync(full, "utf8");

// Jeśli patch już istnieje — nic nie rób
if (content.includes("CITY_INTELLIGENCE_PATCH")) {
  console.log("⏭ CITY_INTELLIGENCE_PATCH już istnieje — pomijam.");
  process.exit(0);
}

// Szukamy miejsca po watchdogu
const watchdogPattern = /state\.city\s*=\s*CityWatchdogEngine\.tick\([\s\S]*?\);/m;

if (!watchdogPattern.test(content)) {
  console.log("❌ Nie znaleziono fragmentu watchdog — patch nie może być zastosowany.");
  process.exit(1);
}

// Kod do wstrzyknięcia
const intelligencePatch = `
// CITY_INTELLIGENCE_PATCH
state.city = CityBrainEngine.tick(
  state.city || {},
  CitySnapshotEngine,
  CityMemoryEngine,
  CityTrendEngine,
  CityPredictionEngine,
  CityMoodEngine,
  CityLoadBalancer
);
`;

// Wstrzyknięcie kodu
content = content.replace(watchdogPattern, match => match + intelligencePatch);

// Zapis
fs.writeFileSync(full, content);

console.log("✔ CITY_INTELLIGENCE_PATCH został poprawnie wstrzyknięty.");
console.log("🏁 AUTO‑PATCHER 5 FIX zakończony.");
