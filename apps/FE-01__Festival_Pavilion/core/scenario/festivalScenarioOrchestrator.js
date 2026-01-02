


// FE_FESTIVAL_SCENARIO_ORCHESTRATOR

import { ScenarioLibrary, ScenarioSequences, NarrativeArcs } from "./festivalScenarioLibrary";
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
