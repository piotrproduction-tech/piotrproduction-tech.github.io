


// FE_FESTIVAL_EXPERIENCE_SYNC_ENGINE

import { computePulse } from "./festivalPulseEngine";
import { computeWave } from "./festivalWaveEngine";
import { computeExperienceState } from "./festivalExperienceStateEngine";
import { computeExperienceModifiers } from "./festivalExperienceModifiers";
import { computeDirectorVisionState } from "../festivalAIDirectorVisionOrchestrator";

// Main sync function
export function computeExperienceSync({
  director,
  scenario,
  audience,
  narrativePhase,
  visionMode,
  uiState,
  systemTime,
  festivalType
}) {
  // 1. Pulse
  const pulse = computePulse({
    director,
    scenario,
    visionMode,
    audience
  });

  // 2. Wave
  const wave = computeWave({
    pulse,
    director,
    scenario,
    visionMode,
    audience
  });

  // 3. Experience State
  const experienceState = computeExperienceState({
    pulse,
    wave,
    mood: director?.mood,
    narrativePhase
  });

  // 4. Modifiers
  const modifiers = computeExperienceModifiers({
    director,
    scenario,
    visionMode,
    audience,
    phase: experienceState.phase,
    hour: systemTime?.hour ?? 12,
    festivalType
  });

  // 5. Director Vision State (Warstwa 1)
  const visionState = computeDirectorVisionState({
    orchestratorDecision: null,
    autoTunerDecision: null,
    scenarioDecision: null,
    visualDecision: null,
    context: { pulse, wave, narrativePhase, trustLevel: director?.trustLevel },
    uiState
  });

  return {
    pulse,
    wave,
    experienceState,
    modifiers,
    visionState
  };
}
