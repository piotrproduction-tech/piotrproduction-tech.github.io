const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");
const VISUAL = path.join(CORE, "visual");

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
// Visual Orchestrator
//
function visualOrchestrator() {
  const file = path.join(VISUAL, "festivalVisualOrchestrator.js");
  const marker = "// FE_FESTIVAL_VISUAL_ORCHESTRATOR";

  const block = `
// FE_FESTIVAL_VISUAL_ORCHESTRATOR

import { computeVisualSync } from "./festivalVisualSyncEngine";

// Główna funkcja orkiestratora wizualnego
export function computeVisualOrchestration({
  experience,
  scenario,
  director,
  uiState
}) {
  const pulse = experience?.pulse ?? 80;
  const wave = experience?.wave ?? 0.4;
  const phase = experience?.experienceState?.phase ?? "RISING";

  const scene = scenario?.activeScene ?? null;
  const directorMood = director?.mood ?? "Neutral";

  const overlayModeOverride = uiState?.forcedOverlayMode ?? null;

  const visual = computeVisualSync({
    pulse,
    wave,
    phase,
    scene,
    directorMood,
    overlayModeOverride
  });

  return {
    pulse,
    wave,
    phase,
    scene,
    directorMood,
    overlay: visual.overlay,
    hud: visual.hud,
    effects: visual.effects
  };
}
`;

  appendIfMissing(file, marker, block);
}

//
// Integracja z Visual Engine
//
function integrateWithVisualEngine() {
  const file = path.join(CORE, "festivalVisualEngine.js");
  const marker = "// FE_FESTIVAL_VISUAL_ORCHESTRATOR_INTEGRATION";

  const block = `
// FE_FESTIVAL_VISUAL_ORCHESTRATOR_INTEGRATION
import { computeVisualOrchestration } from "./visual/festivalVisualOrchestrator";

// Przykład użycia:
// const visualOrchestration = computeVisualOrchestration({
//   experience: experienceState.full,
//   scenario: scenarioState,
//   director,
//   uiState
// });
//
// visualOrchestration.overlay
// visualOrchestration.hud
// visualOrchestration.effects
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalVisualOrchestrator Generator ===");
  ensureDir(CORE);
  ensureDir(VISUAL);
  visualOrchestrator();
  integrateWithVisualEngine();
  console.log("=== DONE ===");
}

main();
