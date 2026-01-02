


// FE_FESTIVAL_EXPERIENCE_STATE_ENGINE

export const ExperiencePhases = {
  CALM: "CALM",
  RISING: "RISING",
  PEAK: "PEAK",
  CHAOTIC: "CHAOTIC",
  RECOVERY: "RECOVERY"
};

// Compute Experience Phase
export function computeExperiencePhase({ pulse, wave, mood, narrativePhase }) {
  if (pulse < 60 && wave < 0.25) return ExperiencePhases.CALM;

  if (pulse < 100 && wave < 0.5) return ExperiencePhases.RISING;

  if (pulse >= 100 && wave >= 0.5 && wave < 0.8) return ExperiencePhases.PEAK;

  if (pulse > 130 || wave >= 0.8 || mood === "Chaotic") {
    return ExperiencePhases.CHAOTIC;
  }

  if (narrativePhase === "closing" || narrativePhase === "awards") {
    return ExperiencePhases.RECOVERY;
  }

  return ExperiencePhases.RISING;
}

// Compute Experience Intensity (0–1)
export function computeExperienceIntensity({ pulse, wave }) {
  const p = Math.min(1, pulse / 150);
  const w = Math.min(1, wave);
  return (p * 0.6) + (w * 0.4);
}

// Compute Experience Signature (unique emotional fingerprint)
export function computeExperienceSignature({ pulse, wave, mood, phase }) {
  return {
    pulse,
    wave,
    mood,
    phase,
    signature: `${phase}::${mood}::${Math.round(pulse)}::${wave.toFixed(2)}`
  };
}

// Main compute function
export function computeExperienceState({ pulse, wave, mood, narrativePhase }) {
  const phase = computeExperiencePhase({ pulse, wave, mood, narrativePhase });
  const intensity = computeExperienceIntensity({ pulse, wave });
  const signature = computeExperienceSignature({ pulse, wave, mood, phase });

  return {
    phase,
    intensity,
    signature
  };
}
