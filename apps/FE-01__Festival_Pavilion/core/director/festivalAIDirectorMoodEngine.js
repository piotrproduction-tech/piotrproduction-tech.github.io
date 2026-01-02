


// FE_FESTIVAL_AI_DIRECTOR_MOOD_ENGINE

let _currentMood = "Calm";

export const DirectorMoods = {
  Calm: { name: "Calm", tempoMod: 0.9, intensityMod: 0.8 },
  Energetic: { name: "Energetic", tempoMod: 1.3, intensityMod: 1.2 },
  Creative: { name: "Creative", tempoMod: 1.1, intensityMod: 1.0 },
  Tense: { name: "Tense", tempoMod: 1.0, intensityMod: 1.3 },
  Focused: { name: "Focused", tempoMod: 1.0, intensityMod: 0.9 },
  Chaotic: { name: "Chaotic", tempoMod: 1.4, intensityMod: 1.5 }
};

export function getDirectorMood() {
  return _currentMood;
}

export function setDirectorMood(mood) {
  if (DirectorMoods[mood]) {
    _currentMood = mood;
  }
}

export function updateDirectorMood({ pulse, wave, narrativePhase, trustLevel }) {
  if (pulse > 120 || wave > 0.8) {
    _currentMood = "Energetic";
  } else if (trustLevel === "low") {
    _currentMood = "Tense";
  } else if (narrativePhase === "opening" || narrativePhase === "awards") {
    _currentMood = "Creative";
  } else if (pulse < 70 && wave < 0.3) {
    _currentMood = "Calm";
  } else {
    _currentMood = "Focused";
  }

  return _currentMood;
}
