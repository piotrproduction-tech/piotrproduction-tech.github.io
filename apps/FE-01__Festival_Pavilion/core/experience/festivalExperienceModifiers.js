


// FE_FESTIVAL_EXPERIENCE_MODIFIERS

// Director profile → Pulse/Wave modifiers
export const directorModifiers = {
  CalmDirector:      { pulse: -2,  wave: -0.01 },
  AnalyticalDirector:{ pulse: 0,   wave: 0.00 },
  FestivalDirector:  { pulse: 3,   wave: 0.02 },
  CinematicDirector: { pulse: 6,   wave: 0.04 },
  ExperimentalDirector:{ pulse: 8, wave: 0.05 },
  AggressiveDirector:{ pulse: 12,  wave: 0.06 },
  AwardsDirector:    { pulse: 10,  wave: 0.03 },
  JuryDirector:      { pulse: 0,   wave: 0.00 }
};

// Scenario → Pulse/Wave modifiers
export function scenarioModifiers(scenario) {
  if (!scenario) return { pulse: 0, wave: 0 };

  return {
    pulse: scenario.intensity * 2,
    wave: scenario.intensity * 0.01
  };
}

// VisionMode → Pulse/Wave modifiers
export const visionModifiers = {
  OFF:       { pulse: 0,  wave: 0 },
  HUD:       { pulse: 1,  wave: 0.01 },
  HUD_ULTRA: { pulse: 4,  wave: 0.03 },
  VISION:    { pulse: 8,  wave: 0.05 }
};

// Audience → Pulse/Wave modifiers
export function audienceModifiers(audience) {
  if (!audience) return { pulse: 0, wave: 0 };

  return {
    pulse: audience.energy * 2,
    wave: audience.energy * 0.01
  };
}

// Experience Phase → Pulse/Wave modifiers
export const phaseModifiers = {
  CALM:     { pulse: -5, wave: -0.02 },
  RISING:   { pulse: 2,  wave: 0.01 },
  PEAK:     { pulse: 6,  wave: 0.03 },
  CHAOTIC:  { pulse: 12, wave: 0.05 },
  RECOVERY: { pulse: -2, wave: -0.01 }
};

// Time of day → Pulse/Wave modifiers
export function timeModifiers(hour) {
  if (hour < 10) return { pulse: -3, wave: -0.01 }; // poranek
  if (hour < 18) return { pulse: 0,  wave: 0.00 };  // dzień
  if (hour < 23) return { pulse: 4,  wave: 0.02 };  // wieczór
  return { pulse: 2, wave: 0.01 };                  // noc
}

// Festival type → Pulse/Wave modifiers
export const festivalTypeModifiers = {
  film:     { pulse: 2,  wave: 0.01 },
  music:    { pulse: 8,  wave: 0.05 },
  theatre:  { pulse: 4,  wave: 0.02 },
  gaming:   { pulse: 10, wave: 0.06 },
  expo:     { pulse: 3,  wave: 0.01 }
};

// Combine all modifiers
export function computeExperienceModifiers({
  director,
  scenario,
  visionMode,
  audience,
  phase,
  hour,
  festivalType
}) {
  const d = directorModifiers[director?.profile] || { pulse: 0, wave: 0 };
  const s = scenarioModifiers(scenario);
  const v = visionModifiers[visionMode] || { pulse: 0, wave: 0 };
  const a = audienceModifiers(audience);
  const p = phaseModifiers[phase] || { pulse: 0, wave: 0 };
  const t = timeModifiers(hour);
  const f = festivalTypeModifiers[festivalType] || { pulse: 0, wave: 0 };

  return {
    pulse:
      d.pulse + s.pulse + v.pulse + a.pulse + p.pulse + t.pulse + f.pulse,
    wave:
      d.wave + s.wave + v.wave + a.wave + p.wave + t.wave + f.wave
  };
}
