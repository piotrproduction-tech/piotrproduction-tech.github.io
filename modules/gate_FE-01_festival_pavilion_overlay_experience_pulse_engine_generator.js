const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");
const EXPERIENCE = path.join(CORE, "experience");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function ensureFile(file, base = "") {
  if (!fs.existsSync(file)) {
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, base, "utf8");
    console.log("[CREATE]", file);
  }
}

function appendIfMissing(file, marker, block) {
  ensureFile(file);
  const content = fs.readFileSync(file, "utf8");
  if (!content.includes(marker)) {
    fs.writeFileSync(file, content + "\n\n" + block, "utf8");
    console.log("[UPDATED]", file, "→", marker);
  }
}

//
// 1. Pulse Engine
//
function pulseEngine() {
  const file = path.join(EXPERIENCE, "festivalPulseEngine.js");
  const marker = "// FE_FESTIVAL_PULSE_ENGINE";

  const block = `
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
`;

  appendIfMissing(file, marker, block);
}

//
// 2. Integracja z Experience Engine
//
function integrateWithExperienceEngine() {
  const file = path.join(CORE, "festivalExperienceEngine.js");
  const marker = "// FE_FESTIVAL_PULSE_ENGINE_INTEGRATION";

  const block = `
// FE_FESTIVAL_PULSE_ENGINE_INTEGRATION
import { computePulse, getPulse } from "./experience/festivalPulseEngine";

// Przykład użycia:
// const pulse = computePulse({ director, scenario, visionMode, audience });
// experienceState.pulse = pulse;
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalExperienceEngine — PulseEngine Generator ===");
  ensureDir(CORE);
  ensureDir(EXPERIENCE);
  pulseEngine();
  integrateWithExperienceEngine();
  console.log("=== DONE ===");
}

main();
