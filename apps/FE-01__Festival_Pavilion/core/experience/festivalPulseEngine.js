


// FE_FESTIVAL_PULSE_ENGINE

// Pulse: 0–200
let _pulse = 80;

export function getPulse() {
  return _pulse;
}

// Natural decay
function pulseDecay(pulse) {
  return Math.max(40, pulse - 0.5);
}

// Apply modifiers from director, scenario, vision, audience
function applyPulseModifiers(pulse, modifiers = {}) {
  const {
    directorIntensity = 1.0,
    scenarioImpact = 0.0,
    visionBoost = 0.0,
    audienceEnergy = 0.0
  } = modifiers;

  let result = pulse;

  result += scenarioImpact;
  result += audienceEnergy;
  result *= directorIntensity;
  result += visionBoost;

  return Math.min(200, Math.max(0, result));
}

// Main compute function
export function computePulse({ director, scenario, visionMode, audience }) {
  let pulse = _pulse;

  // 1. Decay
  pulse = pulseDecay(pulse);

  // 2. Director intensity
  const directorIntensity = {
    CalmDirector: 0.95,
    AnalyticalDirector: 1.0,
    FestivalDirector: 1.05,
    CinematicDirector: 1.1,
    ExperimentalDirector: 1.15,
    AggressiveDirector: 1.25,
    AwardsDirector: 1.2,
    JuryDirector: 1.0
  }[director?.profile] || 1.0;

  // 3. Scenario impact
  const scenarioImpact = scenario?.intensity || 0;

  // 4. Vision mode boost
  const visionBoost = {
    OFF: 0,
    HUD: 1,
    HUD_ULTRA: 3,
    VISION: 6
  }[visionMode] || 0;

  // 5. Audience energy
  const audienceEnergy = audience?.energy || 0;

  // 6. Apply modifiers
  pulse = applyPulseModifiers(pulse, {
    directorIntensity,
    scenarioImpact,
    visionBoost,
    audienceEnergy
  });

  _pulse = pulse;
  return _pulse;
}
