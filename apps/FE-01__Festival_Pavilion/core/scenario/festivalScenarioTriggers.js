


// FE_FESTIVAL_SCENARIO_TRIGGERS

import { ScenarioLibrary, ScenarioSequences, NarrativeArcs } from "./festivalScenarioLibrary";
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
