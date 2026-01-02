// FE_FESTIVAL_SCENARIO_LIBRARY_INTEGRATION
import { ScenarioLibrary, ScenarioSequences, NarrativeArcs } from "./scenario/festivalScenarioLibrary";

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

// FE_FESTIVAL_SCENARIO_TRIGGERS_INTEGRATION
import { computeScenarioTriggers } from "./scenario/festivalScenarioTriggers";

// FE_FESTIVAL_SCENARIO_RESOLVER_INTEGRATION
import { resolveScenario } from "./scenario/festivalScenarioResolver";

// FE_FESTIVAL_SCENARIO_ORCHESTRATOR_INTEGRATION
import { computeScenarioOrchestration } from "./scenario/festivalScenarioOrchestrator";


// FE_FESTIVAL_SCENARIO_ENGINE

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
