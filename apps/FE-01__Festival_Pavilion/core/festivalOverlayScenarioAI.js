


// FE_FESTIVAL_OVERLAY_SCENARIO_AI
// AI-like generator of overlay scenarios based on city state & narrative

/**
 * state:
 *  - pulse: number (BPM / intensity)
 *  - mood: "Calm" | "Energetic" | "Creative" | "Tense" | ...
 *  - wave: { intensity: number, trend: "rising" | "falling" | "stable" }
 *  - reputation: { level: number, points: number }
 *  - identity: { role: string, badges: string[] }
 *  - security: { trustLevel: "low" | "medium" | "high" }
 *  - narrative: { phase: string, tag?: string }
 */

export function generateOverlayScenarioAI(state) {
  const { pulse, mood, wave, reputation, identity, security, narrative } = state || {};

  const steps = [];

  // 1. Start preset based on narrative phase
  const phase = narrative?.phase || "default";

  if (phase === "opening") {
    steps.push({
      delay: 0,
      cmd: "setPreset",
      payload: mood === "Energetic" ? "Showcase" : "Minimal"
    });
  } else if (phase === "awards") {
    steps.push({
      delay: 0,
      cmd: "setPreset",
      payload: "Showcase"
    });
  } else if (phase === "jury") {
    steps.push({
      delay: 0,
      cmd: "setPreset",
      payload: "Minimal"
    });
  } else if (phase === "closing") {
    steps.push({
      delay: 0,
      cmd: "setPreset",
      payload: reputation?.level > 5 ? "Showcase" : "Minimal"
    });
  } else {
    steps.push({
      delay: 0,
      cmd: "setPreset",
      payload: "Minimal"
    });
  }

  // 2. Mode based on pulse / wave
  const baseDelay = 1200;

  if (pulse > 120 || wave?.intensity > 0.7) {
    steps.push({
      delay: baseDelay,
      cmd: "setMode",
      payload: "full"
    });
  } else if (pulse > 90 || wave?.intensity > 0.4) {
    steps.push({
      delay: baseDelay,
      cmd: "setMode",
      payload: "semi"
    });
  } else {
    steps.push({
      delay: baseDelay,
      cmd: "setMode",
      payload: "transparent"
    });
  }

  // 3. Notifications / debug based on security & role
  const role = identity?.role || "guest";
  const trust = security?.trustLevel || "medium";

  if (role === "admin" || role === "jury") {
    steps.push({
      delay: baseDelay + 1000,
      cmd: "toggle",
      payload: "debug"
    });
  }

  if (trust === "low") {
    steps.push({
      delay: baseDelay + 2000,
      cmd: "toggle",
      payload: "notifications"
    });
  } else if (trust === "high" && (phase === "opening" || phase === "awards")) {
    steps.push({
      delay: baseDelay + 2000,
      cmd: "toggle",
      payload: "notifications"
    });
  }

  // 4. Extra flair for high reputation creators
  if (reputation?.points > 1000 && role === "creator") {
    steps.push({
      delay: baseDelay + 3000,
      cmd: "setMode",
      payload: "full"
    });
  }

  // 5. Optional narrative tag tweaks
  if (narrative?.tag === "spotlight") {
    steps.push({
      delay: baseDelay + 4000,
      cmd: "toggle",
      payload: "notifications"
    });
  }

  return steps;
}

/**
 * Helper: wraps AI generator into ScenarioEngine-compatible runner.
 * You can call this from ScenarioEngine:
 *
 *   const steps = generateOverlayScenarioAI(currentState);
 *   runScenarioSteps(steps);
 */
export function buildAIScenarioFromState(state) {
  return generateOverlayScenarioAI(state);
}



// FE_FESTIVAL_OVERLAY_SCENARIO_AI_PROFILES_INTEGRATION
import { FestivalOverlayScenarioAIProfiles } from "./festivalOverlayScenarioAIProfiles";

/**
 * AI scenario generator with profile support.
 * profileName: one of the keys from FestivalOverlayScenarioAIProfiles
 */
export function generateOverlayScenarioAIWithProfile(state, profileName) {
  const profile = FestivalOverlayScenarioAIProfiles[profileName];
  if (!profile) return generateOverlayScenarioAI(state);


  // 1. Preset
  steps.push({
    delay: 0,
    cmd: "setPreset",
    payload: profile.presetStrategy(state)
  });

  // 2. Mode
  steps.push({
    delay: 1200 * profile.speed,
    cmd: "setMode",
    payload: profile.modeStrategy(state.pulse)
  });

  // 3. Notifications
  steps.push({
    delay: 2400 * profile.speed,
    cmd: "toggle",
    payload: "notifications"
  });

  // 4. Optional debug toggle based on intensity
  if (profile.intensity > 0.7) {
    steps.push({
      delay: 3600 * profile.speed,
      cmd: "toggle",
      payload: "debug"
    });
  }

  return steps;
}
