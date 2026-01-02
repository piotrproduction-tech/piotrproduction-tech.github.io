


// FE_FESTIVAL_VISION_OVERLAY_ENGINE_INTEGRATION
import { computeOverlayVisuals } from "./visual/festivalVisionOverlayEngine";

// Przykład użycia:
// const overlay = computeOverlayVisuals({ pulse, wave, phase, scene, directorMood });



// FE_FESTIVAL_HUD_SYSTEM_INTEGRATION
import { computeHUDVisuals } from "./visual/festivalHUDSystem";

// Przykład użycia:
// const hud = computeHUDVisuals({ pulse, wave, overlayMode, scene });



// FE_FESTIVAL_VISUAL_EFFECTS_ENGINE_INTEGRATION
import { computeVisualEffects } from "./visual/festivalVisualEffectsEngine";

// Przykład użycia:
// const effects = computeVisualEffects({ pulse, wave, phase, overlayMode, scene, directorMood });



// FE_FESTIVAL_VISUAL_SYNC_ENGINE_INTEGRATION
import { computeVisualSync } from "./visual/festivalVisualSyncEngine";

// Przykład użycia:
// const visual = computeVisualSync({
//   pulse,
//   wave,
//   phase,
//   scene,
//   directorMood
// });
//
// visual.overlay.mode
// visual.hud.mode
// visual.effects



// FE_FESTIVAL_VISUAL_ORCHESTRATOR_INTEGRATION
import { computeVisualOrchestration } from "./visual/festivalVisualOrchestrator";

// Przykład użycia:
// const visualOrchestration = computeVisualOrchestration({
//   experience: experienceState.full,
//   scenario: scenarioState,
//   director,
//   uiState
// });
//
// visualOrchestration.overlay
// visualOrchestration.hud
// visualOrchestration.effects



// FE_FESTIVAL_VISUAL_ENGINE


// Główne API Warstwy 4
export function computeFestivalVisuals({
  experience,
  scenario,
  director,
  uiState
}) {
  return computeVisualOrchestration({
    experience,
    scenario,
    director,
    uiState
  });
}

// Debug snapshot
export function getVisualSnapshot({
  experience,
  scenario,
  director,
  uiState
}) {
  const visual = computeFestivalVisuals({
    experience,
    scenario,
    director,
    uiState
  });

  return {
    pulse: visual.pulse,
    wave: visual.wave,
    phase: visual.phase,
    scene: visual.scene,
    directorMood: visual.directorMood,
    overlayMode: visual.overlay.mode,
    hudMode: visual.hud.mode
  };
}
