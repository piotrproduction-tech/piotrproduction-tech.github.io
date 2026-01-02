


// FE_FESTIVAL_AI_DIRECTOR_MOOD_EXPERIENCE_INTEGRATION
import { updateDirectorMood } from "./director/festivalAIDirectorMoodEngine";

// Przykład użycia:
// const newMood = updateDirectorMood({ pulse, wave, narrativePhase, trustLevel });
// experienceState.directorMood = newMood;



// FE_FESTIVAL_PULSE_ENGINE_INTEGRATION
import { computePulse, getPulse } from "./experience/festivalPulseEngine";

// Przykład użycia:
// const pulse = computePulse({ director, scenario, visionMode, audience });
// experienceState.pulse = pulse;



// FE_FESTIVAL_WAVE_ENGINE_INTEGRATION
import { computeWave, getWave } from "./experience/festivalWaveEngine";

// Przykład użycia:
// const wave = computeWave({ pulse, director, scenario, visionMode, audience });
// experienceState.wave = wave;



// FE_FESTIVAL_EXPERIENCE_STATE_ENGINE_INTEGRATION
import { computeExperienceState } from "./experience/festivalExperienceStateEngine";

// Przykład użycia:
// const experienceState = computeExperienceState({ pulse, wave, mood, narrativePhase });
// experienceState.phase → CALM / RISING / PEAK / CHAOTIC / RECOVERY
// experienceState.intensity → 0–1
// experienceState.signature → unikalny odcisk emocjonalny



// FE_FESTIVAL_EXPERIENCE_MODIFIERS_INTEGRATION
import { computeExperienceModifiers } from "./experience/festivalExperienceModifiers";

// Przykład użycia:
// const modifiers = computeExperienceModifiers({
//   director,
//   scenario,
//   visionMode,
//   audience,
//   phase: experienceState.phase,
//   hour: systemTime.hour,
//   festivalType: config.festivalType
// });
//
// experienceState.modifiers = modifiers;



// FE_FESTIVAL_EXPERIENCE_SYNC_ENGINE_INTEGRATION
import { computeExperienceSync } from "./experience/festivalExperienceSyncEngine";

// Przykład użycia:
// const sync = computeExperienceSync({
//   director,
//   scenario,
//   audience,
//   narrativePhase,
//   visionMode,
//   uiState,
//   systemTime,
//   festivalType
// });
//
// experienceState.full = sync;



// FE_FESTIVAL_EXPERIENCE_ENGINE


// Główny interfejs Experience Engine
export function computeFestivalExperience({
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

  // 5. Full Sync (łączy Warstwę 1 + Warstwę 2)
  const sync = computeExperienceSync({
    director,
    scenario,
    audience,
    narrativePhase,
    visionMode,
    uiState,
    systemTime,
    festivalType
  });

  return {
    pulse,
    wave,
    experienceState,
    modifiers,
    sync
  };
}

// Debug helper
export function getExperienceSnapshot() {
  return {
    pulse: getPulse(),
    wave: getWave()
  };
}
