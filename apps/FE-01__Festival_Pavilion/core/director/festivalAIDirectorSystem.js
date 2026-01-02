


// FE_FESTIVAL_AI_DIRECTOR_SYSTEM

import { FestivalAIDirectorProfilesUltra } from "./festivalAIDirectorProfilesUltra";
import { getDirectorHistory, rememberDirectorEvent } from "./festivalAIDirectorMemory";
import { getDirectorMood, updateDirectorMood } from "./festivalAIDirectorMoodEngine";
import { resolveDirectorConflict } from "./festivalAIDirectorConflictResolver";

const DirectorMode = {
  FILMIC: "FILMIC",
  SYSTEMIC: "SYSTEMIC",
  HYBRID: "HYBRID"
};

let _currentDirectorProfile = "FestivalDirector";
let _currentDirectorMode = DirectorMode.HYBRID;

export function getCurrentDirectorProfile() {
  return _currentDirectorProfile;
}

export function getCurrentDirectorMode() {
  return _currentDirectorMode;
}

export function setDirectorMode(mode) {
  if (Object.values(DirectorMode).includes(mode)) {
    _currentDirectorMode = mode;
  }
}

export function pickDirectorProfile({ pulse, wave, narrativePhase, trustLevel, reputation }) {
  const mood = updateDirectorMood({ pulse, wave, narrativePhase, trustLevel });

  if (_currentDirectorMode === DirectorMode.FILMIC) {
    if (narrativePhase === "opening") return "FestivalDirector";
    if (narrativePhase === "awards") return "AwardsDirector";
    if (mood === "Creative") return "CinematicDirector";
    return "FestivalDirector";
  }

  if (_currentDirectorMode === DirectorMode.SYSTEMIC) {
    if (trustLevel === "low") return "AnalyticalDirector";
    if (reputation && reputation.level >= 5) return "JuryDirector";
    return "AnalyticalDirector";
  }

  if (trustLevel === "low") {
    _currentDirectorMode = DirectorMode.SYSTEMIC;
    return "AnalyticalDirector";
  }

  if (narrativePhase === "opening" || narrativePhase === "awards") {
    _currentDirectorMode = DirectorMode.FILMIC;
    return "FestivalDirector";
  }

  if (mood === "Creative") {
    return "ExperimentalDirector";
  }

  if (mood === "Energetic") {
    return "AggressiveDirector";
  }

  return "FestivalDirector";
}

export function computeDirectorDecision({
  orchestratorDecision,
  autoTunerDecision,
  scenarioDecision,
  visualDecision,
  context
}) {
  const { pulse, wave, narrativePhase, trustLevel, reputation } = context || {};

  const profileName = pickDirectorProfile({
    pulse,
    wave,
    narrativePhase,
    trustLevel,
    reputation
  });

  _currentDirectorProfile = profileName;

  const finalDecision = resolveDirectorConflict({
    orchestratorDecision,
    autoTunerDecision,
    scenarioDecision,
    visualDecision,
    context: { pulse, trustLevel, narrativePhase }
  });

  rememberDirectorEvent({
    type: "DIRECTOR_DECISION",
    profile: profileName,
    mode: _currentDirectorMode,
    mood: getDirectorMood(),
    pulse,
    wave,
    narrativePhase,
    trustLevel,
    reputation,
    decision: finalDecision
  });

  return {
    profile: profileName,
    mode: _currentDirectorMode,
    mood: getDirectorMood(),
    decision: finalDecision,
    history: getDirectorHistory(20)
  };
}
