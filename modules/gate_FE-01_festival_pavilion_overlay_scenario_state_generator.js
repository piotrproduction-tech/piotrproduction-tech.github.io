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
// Scenario State
//
function scenarioState() {
  const file = path.join(SCENARIO, "festivalScenarioState.js");
  const marker = "// FE_FESTIVAL_SCENARIO_STATE";

  const block = `
// FE_FESTIVAL_SCENARIO_STATE

// Stan dramaturgii festiwalu
export const ScenarioState = {
  activeScene: null,
  activeSequence: null,
  narrativePhase: "opening",
  sceneStartTime: null,
  sceneDuration: 0,
  history: [],
  triggers: {
    pulse: false,
    wave: false,
    mood: false,
    audience: false,
    manual: false
  }
};

// Reset state
export function resetScenarioState() {
  ScenarioState.activeScene = null;
  ScenarioState.activeSequence = null;
  ScenarioState.narrativePhase = "opening";
  ScenarioState.sceneStartTime = null;
  ScenarioState.sceneDuration = 0;
  ScenarioState.history = [];
  ScenarioState.triggers = {
    pulse: false,
    wave: false,
    mood: false,
    audience: false,
    manual: false
  };
}

// Ustaw aktywną scenę
export function setActiveScene(sceneName) {
  ScenarioState.activeScene = sceneName;
  ScenarioState.sceneStartTime = Date.now();
  ScenarioState.sceneDuration = 0;
  ScenarioState.history.push({
    scene: sceneName,
    timestamp: Date.now()
  });
}

// Ustaw aktywną sekwencję
export function setActiveSequence(sequenceName) {
  ScenarioState.activeSequence = sequenceName;
}

// Ustaw fazę narracyjną
export function setNarrativePhase(phase) {
  ScenarioState.narrativePhase = phase;
}

// Aktualizuj czas trwania sceny
export function updateSceneDuration() {
  if (ScenarioState.sceneStartTime) {
    ScenarioState.sceneDuration = Date.now() - ScenarioState.sceneStartTime;
  }
}

// Ustaw trigger
export function setTrigger(type, value = true) {
  if (ScenarioState.triggers[type] !== undefined) {
    ScenarioState.triggers[type] = value;
  }
}

// Reset triggerów
export function resetTriggers() {
  for (const key in ScenarioState.triggers) {
    ScenarioState.triggers[key] = false;
  }
}
`;

  appendIfMissing(file, marker, block);
}

//
// Integracja z Scenario Engine
//
function integrateWithScenarioEngine() {
  const file = path.join(CORE, "festivalScenarioEngine.js");
  const marker = "// FE_FESTIVAL_SCENARIO_STATE_INTEGRATION";

  const block = `
// FE_FESTIVAL_SCENARIO_STATE_INTEGRATION
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

// Przykład użycia:
// setActiveScene("music_drop");
// ScenarioState.activeScene → "music_drop"
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalScenarioState Generator ===");
  ensureDir(CORE);
  ensureDir(SCENARIO);
  scenarioState();
  integrateWithScenarioEngine();
  console.log("=== DONE ===");
}

main();
