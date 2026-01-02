


// FE_FESTIVAL_AI_DIRECTOR_AUTO_VISION_ENGINE

// Tryby wizji:
export const VisionModes = {
  OFF: "OFF",
  HUD: "HUD",
  HUD_ULTRA: "HUD_ULTRA",
  VISION: "VISION"
};

// Auto‑vision logika:
export function computeVisionMode({ pulse, wave, mood, narrativePhase, trustLevel }) {
  // 1. Tryb OFF — jeśli festiwal jest w stanie spoczynku
  if (pulse < 60 && wave < 0.2) {
    return VisionModes.OFF;
  }

  // 2. Tryb HUD — normalny stan
  if (pulse < 100 && wave < 0.5 && trustLevel !== "low") {
    return VisionModes.HUD;
  }

  // 3. Tryb HUD Ultra — wysoka energia lub kreatywność
  if (pulse >= 100 || mood === "Creative" || narrativePhase === "opening") {
    return VisionModes.HUD_ULTRA;
  }

  // 4. Tryb Vision Overlay — momenty kulminacyjne
  if (
    pulse > 130 ||
    wave > 0.8 ||
    mood === "Chaotic" ||
    narrativePhase === "awards" ||
    trustLevel === "low"
  ) {
    return VisionModes.VISION;
  }

  return VisionModes.HUD;
}
