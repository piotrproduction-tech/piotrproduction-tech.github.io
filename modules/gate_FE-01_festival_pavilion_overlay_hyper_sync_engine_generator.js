const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");
const HYPER = path.join(CORE, "hyper");

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

function hyperSyncEngine() {
  const file = path.join(HYPER, "festivalHyperSyncEngine.js");
  const marker = "// FE_FESTIVAL_HYPER_SYNC_ENGINE";

  const block = `
// FE_FESTIVAL_HYPER_SYNC_ENGINE

import { computeFestivalScenario } from "../festivalScenarioEngine";
import { computeFestivalVisuals } from "../festivalVisualEngine";
import { computeHyperDecision } from "./festivalHyperDecisionEngine";
import { resolveHyperPriority } from "./festivalHyperPriorityResolver";
import { collectHyperInputs } from "./festivalHyperInputCollector";

// Główna funkcja synchronizująca wszystkie warstwy
export function computeHyperSync({
  experience,
  scenario,
  director,
  uiState,
  audience
}) {
  // 1. Zbierz wejścia
  const inputs = collectHyperInputs({
    experience,
    scenario,
    director,
    visual: null, // zostanie obliczone później
    uiState,
    audience
  });

  // 2. Priorytety
  const priority = resolveHyperPriority(inputs);

  // 3. Decyzje nadrzędne
  const decision = computeHyperDecision(inputs, priority);

  // 4. Zastosuj decyzje do scenariusza
  const scenarioOut = computeFestivalScenario({
    pulse: inputs.pulse,
    wave: inputs.wave,
    mood: inputs.directorMood,
    audience: { energy: inputs.audienceEnergy },
    narrativePhase: inputs.narrativePhase,
    manual: decision.finalScene !== inputs.scene ? decision.finalScene : null
  });

  // 5. Zastosuj decyzje do wizji
  const visualOut = computeFestivalVisuals({
    experience,
    scenario: scenarioOut,
    director: {
      mood: inputs.directorMood,
      intent: decision.finalDirectorIntent
    },
    uiState: {
      forcedOverlayMode: decision.finalOverlay
    }
  });

  // 6. Finalny stan
  return {
    priority,
    decision,
    scenario: scenarioOut,
    visual: visualOut,
    inputs
  };
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalHyperSyncEngine Generator ===");
  ensureDir(CORE);
  ensureDir(HYPER);
  hyperSyncEngine();
  console.log("=== DONE ===");
}

main();
