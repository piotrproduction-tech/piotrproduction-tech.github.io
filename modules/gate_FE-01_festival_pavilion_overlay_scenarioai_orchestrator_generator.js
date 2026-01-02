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
// 1. Orchestrator module
//
function orchestratorModule() {
  const file = path.join(CORE, "useFestivalOverlayScenarioAIOrchestrator.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_ORCHESTRATOR";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_ORCHESTRATOR
// Autonomous AI director that selects profiles and triggers AI scenarios dynamically

import { useEffect, useState } from "react";
import { FestivalOverlayScenarioAIProfiles } from "./festivalOverlayScenarioAIProfiles";
import { generateOverlayScenarioAIWithProfile } from "./festivalOverlayScenarioAI";

export function useFestivalOverlayScenarioAIOrchestrator(runScenarioSteps, getCurrentState) {
  const [activeProfile, setActiveProfile] = useState("CalmDirector");
  const [autoMode, setAutoMode] = useState(true);
  const [lastRun, setLastRun] = useState(0);

  // Profile selection logic
  function chooseProfile(state) {
    const { pulse, mood, wave, reputation, security, narrative } = state;

    if (narrative?.phase === "opening") return "FestivalDirector";
    if (narrative?.phase === "awards") return "CinematicDirector";
    if (narrative?.phase === "jury") return "AnalyticalDirector";
    if (pulse > 120 || wave?.intensity > 0.7) return "AggressiveDirector";
    if (mood === "Creative") return "ExperimentalDirector";
    if (security?.trustLevel === "low") return "AnalyticalDirector";

    return "CalmDirector";
  }

  // Main orchestrator loop
  useEffect(() => {
    if (!autoMode) return;

    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastRun < 5000) return; // throttle

      const state = getCurrentState();
      const profile = chooseProfile(state);

      setActiveProfile(profile);

      const steps = generateOverlayScenarioAIWithProfile(state, profile);
      runScenarioSteps(steps);

      setLastRun(now);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoMode, lastRun]);

  return {
    activeProfile,
    autoMode,
    setAutoMode,
    setActiveProfile,
    runOnce: () => {
      const state = getCurrentState();
      const profile = chooseProfile(state);
      const steps = generateOverlayScenarioAIWithProfile(state, profile);
      runScenarioSteps(steps);
    }
  };
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. Integration hint for FestivalOverlayController.js
//
function integrateController() {
  const file = path.join(CORE, "useFestivalOverlayScenarioEngine.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_ORCHESTRATOR_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_ORCHESTRATOR_INTEGRATION
import { useFestivalOverlayScenarioAIOrchestrator } from "./useFestivalOverlayScenarioAIOrchestrator";

// Example usage inside ScenarioEngine:
// const orchestrator = useFestivalOverlayScenarioAIOrchestrator(runScenarioSteps, () => ({
//   pulse,
//   mood,
//   wave,
//   reputation,
//   identity,
//   security,
//   narrative
// }));
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayScenarioAIOrchestrator Generator ===");
  ensureDir(CORE);
  orchestratorModule();
  integrateController();
  console.log("=== DONE ===");
}

main();
