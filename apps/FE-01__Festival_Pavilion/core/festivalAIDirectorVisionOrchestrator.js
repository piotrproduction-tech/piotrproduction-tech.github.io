


// FE_FESTIVAL_AI_DIRECTOR_VISION_ORCHESTRATOR

import { computeDirectorDecision } from "./director/festivalAIDirectorSystem";
import { computeVisionMode, VisionModes } from "./festivalAIDirectorAutoVisionEngine";

// Główna funkcja: spina DirectorSystem + AutoVision + UI
export function computeDirectorVisionState({
  orchestratorDecision,
  autoTunerDecision,
  scenarioDecision,
  visualDecision,
  context,
  uiState
}) {
  const director = computeDirectorDecision({
    orchestratorDecision,
    autoTunerDecision,
    scenarioDecision,
    visualDecision,
    context
  });

  const { pulse, wave, narrativePhase, trustLevel } = context || {};
  const mood = director.mood;

  const autoVision = computeVisionMode({
    pulse,
    wave,
    mood,
    narrativePhase,
    trustLevel
  });

  const visionMode = uiState?.visionModeOverride || autoVision;

  return {
    director,
    visionMode,
    autoVision,
    override: uiState?.visionModeOverride || null
  };
}

// Helper: czy dany tryb jest aktywny
export function isVisionModeActive(visionState, mode) {
  if (!visionState) return false;
  return visionState.visionMode === mode;
}
