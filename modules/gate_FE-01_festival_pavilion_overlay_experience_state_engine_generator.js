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
// 1. Experience State Engine
//
function experienceStateEngine() {
  const file = path.join(EXPERIENCE, "festivalExperienceStateEngine.js");
  const marker = "// FE_FESTIVAL_EXPERIENCE_STATE_ENGINE";

  const block = `
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
    signature: \`\${phase}::\${mood}::\${Math.round(pulse)}::\${wave.toFixed(2)}\`
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
`;

  appendIfMissing(file, marker, block);
}

//
// 2. Integracja z Experience Engine
//
function integrateWithExperienceEngine() {
  const file = path.join(CORE, "festivalExperienceEngine.js");
  const marker = "// FE_FESTIVAL_EXPERIENCE_STATE_ENGINE_INTEGRATION";

  const block = `
// FE_FESTIVAL_EXPERIENCE_STATE_ENGINE_INTEGRATION
import { computeExperienceState } from "./experience/festivalExperienceStateEngine";

// Przykład użycia:
// const experienceState = computeExperienceState({ pulse, wave, mood, narrativePhase });
// experienceState.phase → CALM / RISING / PEAK / CHAOTIC / RECOVERY
// experienceState.intensity → 0–1
// experienceState.signature → unikalny odcisk emocjonalny
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalExperienceEngine — ExperienceStateEngine Generator ===");
  ensureDir(CORE);
  ensureDir(EXPERIENCE);
  experienceStateEngine();
  integrateWithExperienceEngine();
  console.log("=== DONE ===");
}

main();
