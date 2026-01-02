


// FE_FESTIVAL_VISUAL_ORCHESTRATOR

import { computeVisualSync } from "./festivalVisualSyncEngine";

// Główna funkcja orkiestratora wizualnego
export function computeVisualOrchestration({
  experience,
  scenario,
  director,
  uiState
}) {
  const pulse = experience?.pulse ?? 80;
  const wave = experience?.wave ?? 0.4;
  const phase = experience?.experienceState?.phase ?? "RISING";

  const scene = scenario?.activeScene ?? null;
  const directorMood = director?.mood ?? "Neutral";

  const overlayModeOverride = uiState?.forcedOverlayMode ?? null;

  const visual = computeVisualSync({
    pulse,
    wave,
    phase,
    scene,
    directorMood,
    overlayModeOverride
  });

  return {
    pulse,
    wave,
    phase,
    scene,
    directorMood,
    overlay: visual.overlay,
    hud: visual.hud,
    effects: visual.effects
  };
}
