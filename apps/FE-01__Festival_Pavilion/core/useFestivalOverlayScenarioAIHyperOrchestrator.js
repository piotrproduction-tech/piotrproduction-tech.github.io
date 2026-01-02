


// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERORCHESTRATOR
// The unified super-orchestrator combining Orchestrator + AutoTuner + Profiles + Ultra AI

import { useEffect, useState, useRef } from "react";
import { FestivalOverlayScenarioAIProfiles } from "./festivalOverlayScenarioAIProfiles";
import { generateOverlayScenarioAIWithProfile } from "./festivalOverlayScenarioAI";
import { FestivalOverlayScenarioLibraryUltra } from "./festivalOverlayScenarioLibraryUltra";

export function useFestivalOverlayScenarioAIHyperOrchestrator(runScenarioSteps, getCurrentState) {
  const [enabled, setEnabled] = useState(true);
  const [activeProfile, setActiveProfile] = useState("CalmDirector");
  const [lastRun, setLastRun] = useState(0);

  const history = useRef([]);

  // Push state history (max 100)
  function pushHistory(state) {
    history.current.push(state);
    if (history.current.length > 100) history.current.shift();
  }

  // Compute metrics
  function computeMetrics() {
    const h = history.current;
    if (h.length < 10) return null;

    const avgPulse = h.reduce((a, s) => a + s.pulse, 0) / h.length;
    const avgWave = h.reduce((a, s) => a + s.wave.intensity, 0) / h.length;

    const moodCounts = h.reduce((acc, s) => {
      acc[s.mood] = (acc[s.mood] || 0) + 1;
      return acc;
    }, {});
    const dominantMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0][0];

    return { avgPulse, avgWave, dominantMood };
  }

  // AutoTuner logic
  function autoTuneProfiles(metrics) {
    const { avgPulse, avgWave, dominantMood } = metrics;

    Object.values(FestivalOverlayScenarioAIProfiles).forEach((profile) => {
      if (avgPulse > 120) profile.speed = Math.max(0.5, profile.speed * 0.9);
      else if (avgPulse < 80) profile.speed = Math.min(1.5, profile.speed * 1.1);

      if (avgWave > 0.7) profile.intensity = Math.min(1.2, profile.intensity + 0.05);
      else if (avgWave < 0.3) profile.intensity = Math.max(0.2, profile.intensity - 0.05);

      if (dominantMood === "Calm" && profile.name === "CalmDirector") profile.intensity *= 0.95;
      if (dominantMood === "Energetic" && profile.name === "AggressiveDirector") profile.intensity *= 1.05;
      if (dominantMood === "Creative" && profile.name === "ExperimentalDirector") profile.intensity *= 1.1;
    });
  }

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

  // Ultra scenario fallback
  function maybeRunUltra(state) {
    if (state.wave.intensity > 0.85 || state.pulse > 140) {
      const ultra = FestivalOverlayScenarioLibraryUltra.DynamicPeak(state);
      runScenarioSteps(ultra);
      return true;
    }
    return false;
  }

  // Main loop
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastRun < 4000) return;

      const state = getCurrentState();
      pushHistory(state);

      const metrics = computeMetrics();
      if (metrics) autoTuneProfiles(metrics);

      if (maybeRunUltra(state)) {
        setLastRun(now);
        return;
      }

      const profile = chooseProfile(state);
      setActiveProfile(profile);

      const steps = generateOverlayScenarioAIWithProfile(state, profile);
      runScenarioSteps(steps);

      setLastRun(now);
    }, 1000);

    return () => clearInterval(interval);
  }, [enabled, lastRun]);

  return {
    enabled,
    setEnabled,
    activeProfile,
    history
  };
}
