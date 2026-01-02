


// FE_FESTIVAL_OVERLAY_SCENARIOENGINE_HOOK
// Executes high-level overlay scenarios

import { useState } from "react";
import { FestivalOverlayScenarios } from "./festivalOverlayScenarios";

export function useFestivalOverlayScenarioEngine(presetManager, controller) {
  const [running, setRunning] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(null);

  async function runScenario(name) {
    const scenario = FestivalOverlayScenarios[name];
    if (!scenario) return;

    setRunning(true);
    setCurrentScenario(name);

    for (const step of scenario) {
      await new Promise((res) => setTimeout(res, step.delay));
      execute(step.cmd, step.payload);
    }

    setRunning(false);
    setCurrentScenario(null);
  }

  function execute(cmd, payload) {
    switch (cmd) {
      case "setPreset":
        presetManager.applyPreset(payload);
        break;

      case "setMode":
        controller.setMode(payload);
        break;

      case "toggle":
        controller.setToggles({
          ...controller.toggles,
          [payload]: !controller.toggles[payload]
        });
        break;

      case "setToggles":
        controller.setToggles(payload);
        break;

      default:
        console.warn("ScenarioEngine: unknown command", cmd);
    }
  }

  return {
    running,
    currentScenario,
    runScenario
  };
}



// FE_FESTIVAL_OVERLAY_SCENARIOLIBRARY_INTEGRATION
import { FestivalOverlayScenarioLibrary } from "./festivalOverlayScenarioLibrary";

// Allow ScenarioEngine to run library scenarios
function runLibraryScenario(name) {
  if (!scenario) return;
  runScenarioSteps(scenario);
}

async function runScenarioSteps(steps) {
  setRunning(true);
  setCurrentScenario("Library:" + currentScenario);

  for (const step of steps) {
    await new Promise((res) => setTimeout(res, step.delay));
    execute(step.cmd, step.payload);
  }

  setRunning(false);
  setCurrentScenario(null);
}



// FE_FESTIVAL_OVERLAY_SCENARIOENGINE_AI_EXTENSION
// Minimal AI scenario runner injected automatically

import { buildAIScenarioFromState } from "./festivalOverlayScenarioAI";

async function runAIScenario(currentState) {
  const steps = buildAIScenarioFromState(currentState);
  if (!steps || !steps.length) return;

  setRunning(true);
  setCurrentScenario("AI");

  for (const step of steps) {
    await new Promise((res) => setTimeout(res, step.delay));
    execute(step.cmd, step.payload);
  }

  setRunning(false);
  setCurrentScenario(null);
}

// Example usage inside component:
// runAIScenario({
//   pulse,
//   mood,
//   wave,
//   reputation,
//   identity,
//   security,
//   narrative
// });



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



// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERORCHESTRATOR_INTEGRATION
import { useFestivalOverlayScenarioAIHyperOrchestrator } from "./useFestivalOverlayScenarioAIHyperOrchestrator";

// Example usage inside ScenarioEngine:
// const hyper = useFestivalOverlayScenarioAIHyperOrchestrator(runScenarioSteps, () => ({
//   pulse,
//   mood,
//   wave,
//   reputation,
//   identity,
//   security,
//   narrative
// }));
