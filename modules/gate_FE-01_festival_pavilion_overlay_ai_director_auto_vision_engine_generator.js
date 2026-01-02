const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function ensureFile(file, base = "") {
  if (!fs.existsSync(file)) {
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, base, "utf8");
    console.log("[CREATE]", file);
  }
}

function appendIfMissing(file, marker, block) {
  ensureFile(file);
  const content = fs.readFileSync(file, "utf8");
  if (!content.includes(marker)) {
    fs.writeFileSync(file, content + "\n\n" + block, "utf8");
    console.log("[UPDATED]", file, "→", marker);
  }
}

//
// AUTO‑VISION ENGINE
//
function autoVisionEngine() {
  const file = path.join(CORE, "festivalAIDirectorAutoVisionEngine.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_AUTO_VISION_ENGINE";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_AUTO_VISION_ENGINE

// Tryby wizji:
export const VisionModes = {
  OFF: "OFF",
  HUD: "HUD",
  HUD_ULTRA: "HUD_ULTRA",
  VISION: "VISION"
};

// Auto‑vision logika:
export function computeVisionMode({ pulse, wave, mood, narrativePhase, trustLevel }) {
  // 1. Tryb OFF — jeśli festiwal jest w stanie spoczynku
  if (pulse < 60 && wave < 0.2) {
    return VisionModes.OFF;
  }

  // 2. Tryb HUD — normalny stan
  if (pulse < 100 && wave < 0.5 && trustLevel !== "low") {
    return VisionModes.HUD;
  }

  // 3. Tryb HUD Ultra — wysoka energia lub kreatywność
  if (pulse >= 100 || mood === "Creative" || narrativePhase === "opening") {
    return VisionModes.HUD_ULTRA;
  }

  // 4. Tryb Vision Overlay — momenty kulminacyjne
  if (
    pulse > 130 ||
    wave > 0.8 ||
    mood === "Chaotic" ||
    narrativePhase === "awards" ||
    trustLevel === "low"
  ) {
    return VisionModes.VISION;
  }

  return VisionModes.HUD;
}
`;

  appendIfMissing(file, marker, block);
}

//
// Integracja z HyperOrchestrator
//
function integrateWithHyperOrchestrator() {
  const file = path.join(CORE, "festivalHyperOrchestrator.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_AUTO_VISION_INTEGRATION";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_AUTO_VISION_INTEGRATION
import { computeVisionMode } from "./festivalAIDirectorAutoVisionEngine";

// Przykład użycia:
// const autoVision = computeVisionMode({
//   pulse,
//   wave,
//   mood: director.mood,
//   narrativePhase,
//   trustLevel
// });
// state.visionMode = manualOverride ?? autoVision;
`;

  appendIfMissing(file, marker, block);
}

//
// Integracja z VisionModeSwitcher
//
function integrateWithSwitcher() {
  const file = path.join(CORE, "festivalUIState.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_AUTO_VISION_SWITCHER";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_AUTO_VISION_SWITCHER
// UI może ustawić manualOverride:
// uiState.visionModeOverride = "HUD_ULTRA";
// auto‑vision działa tylko gdy override = null
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalAIDirectorAutoVisionEngine Generator ===");
  ensureDir(CORE);
  autoVisionEngine();
  integrateWithHyperOrchestrator();
  integrateWithSwitcher();
  console.log("=== DONE ===");
}

main();
