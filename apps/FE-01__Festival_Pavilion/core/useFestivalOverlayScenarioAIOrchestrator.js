


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
      runScenarioSteps(steps);
    }
  };
}



// FE_FESTIVAL_OVERLAY_SCENARIO_AI_AUTOTUNER_INTEGRATION
import { useFestivalOverlayScenarioAIAutoTuner } from "./useFestivalOverlayScenarioAIAutoTuner";

// Example usage inside orchestrator:
// const autoTuner = useFestivalOverlayScenarioAIAutoTuner(orchestrator, getCurrentState);
