


// FE_FESTIVAL_VISUAL_SYNC_ENGINE

import { computeOverlayVisuals } from "./festivalVisionOverlayEngine";
import { computeHUDVisuals } from "./festivalHUDSystem";
import { computeVisualEffects } from "./festivalVisualEffectsEngine";

// Główna funkcja synchronizacji wizualnej
export function computeVisualSync({
  pulse,
  wave,
  phase,
  scene,
  directorMood,
  overlayModeOverride = null
}) {
  // 1. Overlay
  const overlay = computeOverlayVisuals({
    pulse,
    wave,
    phase,
    scene,
    directorMood
  });

  // Możliwość wymuszenia overlayu (np. przez UI)
  const overlayMode = overlayModeOverride || overlay.mode;

  // 2. HUD
  const hud = computeHUDVisuals({
    pulse,
    wave,
    overlayMode,
    scene
  });

  // 3. Efekty wizualne
  const effects = computeVisualEffects({
    pulse,
    wave,
    phase,
    overlayMode,
    scene,
    directorMood
  });

  return {
    overlay: {
      mode: overlayMode,
      effects: overlay.effects
    },
    hud,
    effects
  };
}
