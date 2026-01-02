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
// Scenario Orchestrator
//
function scenarioOrchestrator() {
  const file = path.join(SCENARIO, "festivalScenarioOrchestrator.js");
  const marker = "// FE_FESTIVAL_SCENARIO_ORCHESTRATOR";

  const block = `
// FE_FESTIVAL_SCENARIO_ORCHESTRATOR

import { ScenarioLibrary } from "./festivalScenarioLibrary";
import { ScenarioState, setActiveScene, updateSceneDuration } from "./festivalScenarioState";
import { computeScenarioTriggers } from "./festivalScenarioTriggers";
import { resolveScenario } from "./festivalScenarioResolver";

// Akcje scen — placeholdery do integracji z UI, Vision, Audio, itp.
export const ScenarioActions = {
  vision_overlay_burst: () => {},
  vision_overlay_peak: () => {},
  vision_overlay_focus: () => {},
  vision_overlay_chaos: () => {},

  hud_ultra_enable: () => {},
  hud_ultra_pulse: () => {},
  hud_dim: () => {},
  hud_update: () => {},

  pulse_surge: () => {},
  pulse_decay: () => {},
  pulse_rise: () => {},
  pulse_hold: () => {},
  pulse_spike: () => {},
  pulse_stabilize: () => {},

  wave_rise: () => {},
  wave_soften: () => {},
  wave_surge: () => {},
  wave_stabilize: () => {},

  director_focus: () => {},
  director_mood_change: () => {},
  director_profile_change: () => {}
};

// Wykonaj akcje sceny
export function executeSceneActions(sceneName) {
  const scene = ScenarioLibrary[sceneName];
  if (!scene || !scene.actions) return;

  for (const action of scene.actions) {
    const fn = ScenarioActions[action];
    if (fn) fn();
  }
}

// Główna funkcja orchestratora
export function computeScenarioOrchestration({
  pulse,
  wave,
  mood,
  audience,
  narrativePhase,
  manual
}) {
  // 1. Aktualizuj czas trwania sceny
  updateSceneDuration();

  // 2. Oblicz triggery
  const triggers = computeScenarioTriggers({
    pulse,
    wave,
    mood,
    audience,
    narrativePhase,
    manual
  });

  if (!triggers || triggers.length === 0) {
    return {
      scene: ScenarioState.activeScene,
      triggers: [],
      changed: false
    };
  }

  // 3. Resolver wybiera finalną scenę
  const resolvedScene = resolveScenario({
    triggers,
    narrativePhase
  });

  if (!resolvedScene) {
    return {
      scene: ScenarioState.activeScene,
      triggers,
      changed: false
    };
  }

  // 4. Jeśli scena się nie zmieniła → nic nie rób
  if (ScenarioState.activeScene === resolvedScene) {
    return {
      scene: resolvedScene,
      triggers,
      changed: false
    };
  }

  // 5. Ustaw nową scenę
  setActiveScene(resolvedScene);

  // 6. Wykonaj akcje sceny
  executeSceneActions(resolvedScene);

  return {
    scene: resolvedScene,
    triggers,
    changed: true
  };
}
`;

  appendIfMissing(file, marker, block);
}

//
// Integracja z Scenario Engine
//
function integrateWithScenarioEngine() {
  const file = path.join(CORE, "festivalScenarioEngine.js");
  const marker = "// FE_FESTIVAL_SCENARIO_ORCHESTRATOR_INTEGRATION";

  const block = `
// FE_FESTIVAL_SCENARIO_ORCHESTRATOR_INTEGRATION
import { computeScenarioOrchestration } from "./scenario/festivalScenarioOrchestrator";

// Przykład użycia:
// const orchestration = computeScenarioOrchestration({
//   pulse,
//   wave,
//   mood: director.mood,
//   audience,
//   narrativePhase,
//   manual: uiState.manualScene
// });
//
// orchestration.scene → finalna scena
// orchestration.changed → czy scena się zmieniła
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalScenarioOrchestrator Generator ===");
  ensureDir(CORE);
  ensureDir(SCENARIO);
  scenarioOrchestrator();
  integrateWithScenarioEngine();
  console.log("=== DONE ===");
}

main();
