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
// Scenario Triggers
//
function scenarioTriggers() {
  const file = path.join(SCENARIO, "festivalScenarioTriggers.js");
  const marker = "// FE_FESTIVAL_SCENARIO_TRIGGERS";

  const block = `
// FE_FESTIVAL_SCENARIO_TRIGGERS

import { ScenarioLibrary } from "./festivalScenarioLibrary";
import { ScenarioState, setTrigger } from "./festivalScenarioState";

// Pulse-based triggers
export function pulseTriggers(pulse) {
  if (pulse > 130) {
    setTrigger("pulse");
    return "peak_phase";
  }
  if (pulse > 100) {
    setTrigger("pulse");
    return "rising_phase";
  }
  if (pulse < 60) {
    setTrigger("pulse");
    return "calm_phase";
  }
  return null;
}

// Wave-based triggers
export function waveTriggers(wave) {
  if (wave > 0.8) {
    setTrigger("wave");
    return "chaotic_phase";
  }
  if (wave > 0.5) {
    setTrigger("wave");
    return "peak_phase";
  }
  if (wave < 0.25) {
    setTrigger("wave");
    return "calm_phase";
  }
  return null;
}

// Mood-based triggers
export function moodTriggers(mood) {
  if (mood === "Chaotic") {
    setTrigger("mood");
    return "chaotic_phase";
  }
  if (mood === "Creative") {
    setTrigger("mood");
    return "cinematic_highlight";
  }
  if (mood === "Calm") {
    setTrigger("mood");
    return "silent_moment";
  }
  return null;
}

// Audience-based triggers
export function audienceTriggers(audience) {
  if (!audience) return null;

  if (audience.energy > 70) {
    setTrigger("audience");
    return "crowd_peak";
  }
  if (audience.energy > 40) {
    setTrigger("audience");
    return "crowd_rising";
  }
  if (audience.energy < 20) {
    setTrigger("audience");
    return "crowd_calm";
  }
  return null;
}

// Narrative phase triggers
export function narrativePhaseTriggers(phase) {
  switch (phase) {
    case "opening":
      return "opening_sequence";
    case "peak":
      return "peak_sequence";
    case "awards":
      return "awards_sequence";
    case "closing":
      return "closing_sequence";
    default:
      return null;
  }
}

// Manual triggers
export function manualTrigger(sceneName) {
  setTrigger("manual");
  return sceneName;
}

// Combine all triggers
export function computeScenarioTriggers({
  pulse,
  wave,
  mood,
  audience,
  narrativePhase,
  manual
}) {
  const results = [];

  const p = pulseTriggers(pulse);
  if (p) results.push(p);

  const w = waveTriggers(wave);
  if (w) results.push(w);

  const m = moodTriggers(mood);
  if (m) results.push(m);

  const a = audienceTriggers(audience);
  if (a) results.push(a);

  const n = narrativePhaseTriggers(narrativePhase);
  if (n) results.push(n);

  if (manual) {
    const man = manualTrigger(manual);
    if (man) results.push(man);
  }

  return results;
}
`;

  appendIfMissing(file, marker, block);
}

//
// Integracja z Scenario Engine
//
function integrateWithScenarioEngine() {
  const file = path.join(CORE, "festivalScenarioEngine.js");
  const marker = "// FE_FESTIVAL_SCENARIO_TRIGGERS_INTEGRATION";

  const block = `
// FE_FESTIVAL_SCENARIO_TRIGGERS_INTEGRATION
import { computeScenarioTriggers } from "./scenario/festivalScenarioTriggers";

// Przykład użycia:
// const triggers = computeScenarioTriggers({
//   pulse,
//   wave,
//   mood: director.mood,
//   audience,
//   narrativePhase,
//   manual: uiState.manualScene
// });
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalScenarioTriggers Generator ===");
  ensureDir(CORE);
  ensureDir(SCENARIO);
  scenarioTriggers();
  integrateWithScenarioEngine();
  console.log("=== DONE ===");
}

main();
