const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");
const EXPERIENCE = path.join(CORE, "experience");

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
// 1. Experience Sync Engine
//
function syncEngine() {
  const file = path.join(EXPERIENCE, "festivalExperienceSyncEngine.js");
  const marker = "// FE_FESTIVAL_EXPERIENCE_SYNC_ENGINE";

  const block = `
// FE_FESTIVAL_EXPERIENCE_SYNC_ENGINE

import { computePulse } from "./festivalPulseEngine";
import { computeWave } from "./festivalWaveEngine";
import { computeExperienceState } from "./festivalExperienceStateEngine";
import { computeExperienceModifiers } from "./festivalExperienceModifiers";
import { computeDirectorVisionState } from "../festivalAIDirectorVisionOrchestrator";

// Main sync function
export function computeExperienceSync({
  director,
  scenario,
  audience,
  narrativePhase,
  visionMode,
  uiState,
  systemTime,
  festivalType
}) {
  // 1. Pulse
  const pulse = computePulse({
    director,
    scenario,
    visionMode,
    audience
  });

  // 2. Wave
  const wave = computeWave({
    pulse,
    director,
    scenario,
    visionMode,
    audience
  });

  // 3. Experience State
  const experienceState = computeExperienceState({
    pulse,
    wave,
    mood: director?.mood,
    narrativePhase
  });

  // 4. Modifiers
  const modifiers = computeExperienceModifiers({
    director,
    scenario,
    visionMode,
    audience,
    phase: experienceState.phase,
    hour: systemTime?.hour ?? 12,
    festivalType
  });

  // 5. Director Vision State (Warstwa 1)
  const visionState = computeDirectorVisionState({
    orchestratorDecision: null,
    autoTunerDecision: null,
    scenarioDecision: null,
    visualDecision: null,
    context: { pulse, wave, narrativePhase, trustLevel: director?.trustLevel },
    uiState
  });

  return {
    pulse,
    wave,
    experienceState,
    modifiers,
    visionState
  };
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. Integracja z ExperienceEngine
//
function integrateWithExperienceEngine() {
  const file = path.join(CORE, "festivalExperienceEngine.js");
  const marker = "// FE_FESTIVAL_EXPERIENCE_SYNC_ENGINE_INTEGRATION";

  const block = `
// FE_FESTIVAL_EXPERIENCE_SYNC_ENGINE_INTEGRATION
import { computeExperienceSync } from "./experience/festivalExperienceSyncEngine";

// Przykład użycia:
// const sync = computeExperienceSync({
//   director,
//   scenario,
//   audience,
//   narrativePhase,
//   visionMode,
//   uiState,
//   systemTime,
//   festivalType
// });
//
// experienceState.full = sync;
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalExperienceEngine — ExperienceSyncEngine Generator ===");
  ensureDir(CORE);
  ensureDir(EXPERIENCE);
  syncEngine();
  integrateWithExperienceEngine();
  console.log("=== DONE ===");
}

main();
