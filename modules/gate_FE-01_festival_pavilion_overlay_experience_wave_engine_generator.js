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
// 1. Wave Engine
//
function waveEngine() {
  const file = path.join(EXPERIENCE, "festivalWaveEngine.js");
  const marker = "// FE_FESTIVAL_WAVE_ENGINE";

  const block = `
// FE_FESTIVAL_WAVE_ENGINE

// Wave: 0.0–1.0
let _wave = 0.25;

export function getWave() {
  return _wave;
}

// Natural stabilizer
function waveStabilizer(wave) {
  const target = 0.25;
  const diff = target - wave;
  return wave + diff * 0.02;
}

// Apply modifiers from director, scenario, vision, audience
function applyWaveModifiers(wave, modifiers = {}) {
  const {
    directorFlow = 0.0,
    scenarioFlow = 0.0,
    visionFlow = 0.0,
    audienceFlow = 0.0,
    pulseInfluence = 0.0
  } = modifiers;

  let result = wave;

  result += directorFlow;
  result += scenarioFlow;
  result += visionFlow;
  result += audienceFlow;
  result += pulseInfluence;

  return Math.min(1.0, Math.max(0.0, result));
}

// Main compute function
export function computeWave({ pulse, director, scenario, visionMode, audience }) {
  let wave = _wave;

  // 1. Stabilizer
  wave = waveStabilizer(wave);

  // 2. Director flow
  const directorFlow = {
    CalmDirector: -0.01,
    AnalyticalDirector: 0.0,
    FestivalDirector: 0.02,
    CinematicDirector: 0.04,
    ExperimentalDirector: 0.05,
    AggressiveDirector: 0.06,
    AwardsDirector: 0.03,
    JuryDirector: 0.0
  }[director?.profile] || 0.0;

  // 3. Scenario flow
  const scenarioFlow = (scenario?.intensity || 0) * 0.01;

  // 4. Vision mode flow
  const visionFlow = {
    OFF: 0,
    HUD: 0.01,
    HUD_ULTRA: 0.03,
    VISION: 0.05
  }[visionMode] || 0;

  // 5. Audience flow
  const audienceFlow = (audience?.energy || 0) * 0.01;

  // 6. Pulse influence
  const pulseInfluence = Math.max(0, (pulse - 100) / 300);

  // 7. Apply modifiers
  wave = applyWaveModifiers(wave, {
    directorFlow,
    scenarioFlow,
    visionFlow,
    audienceFlow,
    pulseInfluence
  });

  _wave = wave;
  return _wave;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. Integracja z Experience Engine
//
function integrateWithExperienceEngine() {
  const file = path.join(CORE, "festivalExperienceEngine.js");
  const marker = "// FE_FESTIVAL_WAVE_ENGINE_INTEGRATION";

  const block = `
// FE_FESTIVAL_WAVE_ENGINE_INTEGRATION
import { computeWave, getWave } from "./experience/festivalWaveEngine";

// Przykład użycia:
// const wave = computeWave({ pulse, director, scenario, visionMode, audience });
// experienceState.wave = wave;
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalExperienceEngine — WaveEngine Generator ===");
  ensureDir(CORE);
  ensureDir(EXPERIENCE);
  waveEngine();
  integrateWithExperienceEngine();
  console.log("=== DONE ===");
}

main();
