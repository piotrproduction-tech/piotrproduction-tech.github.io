const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");
const SCENARIO = path.join(CORE, "scenario");

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
// MAIN SCENARIO ENGINE
//
function scenarioEngine() {
  const file = path.join(CORE, "festivalScenarioEngine.js");
  const marker = "// FE_FESTIVAL_SCENARIO_ENGINE";

  const block = `
// FE_FESTIVAL_SCENARIO_ENGINE

import { ScenarioLibrary, ScenarioSequences, NarrativeArcs } from "./scenario/festivalScenarioLibrary";
import {
  ScenarioState,
  resetScenarioState,
  setActiveScene,
  setActiveSequence,
  setNarrativePhase,
  updateSceneDuration,
  setTrigger,
  resetTriggers
} from "./scenario/festivalScenarioState";

import { computeScenarioTriggers } from "./scenario/festivalScenarioTriggers";
import { resolveScenario } from "./scenario/festivalScenarioResolver";
import { computeScenarioOrchestration } from "./scenario/festivalScenarioOrchestrator";

// Główna funkcja Scenario Engine
export function computeFestivalScenario({
  pulse,
  wave,
  mood,
  audience,
  narrativePhase,
  manual
}) {
  // 1. Orkiestracja dramaturgii
  const orchestration = computeScenarioOrchestration({
    pulse,
    wave,
    mood,
    audience,
    narrativePhase,
    manual
  });

  // 2. Aktualizacja narrative phase (jeśli potrzebne)
  if (narrativePhase && ScenarioState.narrativePhase !== narrativePhase) {
    setNarrativePhase(narrativePhase);
  }

  return {
    activeScene: ScenarioState.activeScene,
    activeSequence: ScenarioState.activeSequence,
    narrativePhase: ScenarioState.narrativePhase,
    sceneDuration: ScenarioState.sceneDuration,
    triggers: orchestration.triggers,
    changed: orchestration.changed
  };
}

// Debug snapshot
export function getScenarioSnapshot() {
  return {
    activeScene: ScenarioState.activeScene,
    activeSequence: ScenarioState.activeSequence,
    narrativePhase: ScenarioState.narrativePhase,
    sceneDuration: ScenarioState.sceneDuration,
    history: ScenarioState.history
  };
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalScenarioEngine Generator ===");
  ensureDir(CORE);
  ensureDir(SCENARIO);
  scenarioEngine();
  console.log("=== DONE ===");
}

main();
