// modules/generateOfficialHyperOrchestratorBinding.js
const fs = require("fs");
const path = require("path");

console.log("=== Establishing OFFICIAL HyperOrchestrator binding ===");

// 1. Oficjalna ścieżka do engine
const OFFICIAL_ENGINE_PATH =
  "../apps/FE-05__Festival_HyperOrchestrator/engine/hyperOrchestratorEngine";

// 2. Pliki do poprawienia
const TEST_DIR = "__tests__";
const SYNC_ENGINE_FILE = "SYNC_ENGINE/bridge/SyncBridge.js";
const DOC_FILE = "HYPERORCHESTRATOR/ARCHITECTURE.md";

// 3. Naprawa testów integracyjnych
if (fs.existsSync(TEST_DIR)) {
  const testFiles = fs
    .readdirSync(TEST_DIR)
    .filter((f) => f.endsWith(".test.js"));

  testFiles.forEach((file) => {
    const filePath = path.join(TEST_DIR, file);
    let content = fs.readFileSync(filePath, "utf8");
    let original = content;

    // Zamień wszystkie stare ścieżki na oficjalną
    content = content.replace(
      /require\("\.\.\/.*HyperOrchestrator.*engine.*"\)/g,
      `require("${OFFICIAL_ENGINE_PATH}")`
    );

    if (content !== original) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log("FIXED TEST:", filePath);
    } else {
      console.log("OK TEST:", filePath);
    }
  });
}

// 4. Naprawa SyncBridge
if (fs.existsSync(SYNC_ENGINE_FILE)) {
  let content = fs.readFileSync(SYNC_ENGINE_FILE, "utf8");
  let original = content;

  content = content.replace(
    /require\(".*HyperOrchestrator.*engine.*"\)/g,
    `require("${OFFICIAL_ENGINE_PATH}")`
  );

  if (content !== original) {
    fs.writeFileSync(SYNC_ENGINE_FILE, content, "utf8");
    console.log("FIXED SYNC ENGINE:", SYNC_ENGINE_FILE);
  } else {
    console.log("OK SYNC ENGINE");
  }
}

// 5. Dokumentacja architektury
const docContent = `
# OFFICIAL HyperOrchestrator Binding

## Engine (jedyny oficjalny)
apps/FE-05__Festival_HyperOrchestrator/engine/hyperOrchestratorEngine.js

## Warstwa narzędziowa i UI
HYPERORCHESTRATOR/

## Architektura przepływu

AI Director
  → HyperOrchestratorEngine (apps/FE-05)
  → HYPERORCHESTRATOR (UI + narzędzia)
  → Sync Engine
  → CityAdapter
  → CITY_VISUALIZER
`;

fs.writeFileSync(DOC_FILE, docContent, "utf8");
console.log("UPDATED DOC:", DOC_FILE);

console.log("=== OFFICIAL HyperOrchestrator binding established ===");
