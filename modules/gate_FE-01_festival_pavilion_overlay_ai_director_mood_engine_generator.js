const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");
const DIRECTOR = path.join(CORE, "director");

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
// 1. Mood Engine
//
function moodEngine() {
  const file = path.join(DIRECTOR, "festivalAIDirectorMoodEngine.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_MOOD_ENGINE";

  const block = `
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
`;

  appendIfMissing(file, marker, block);
}

//
// 2. Integracja z HyperOrchestrator
//
function integrateWithHyperOrchestrator() {
  const file = path.join(CORE, "festivalHyperOrchestrator.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_MOOD_ENGINE_INTEGRATION";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_MOOD_ENGINE_INTEGRATION
import { updateDirectorMood } from "./director/festivalAIDirectorMoodEngine";

// Przykład użycia:
// const mood = updateDirectorMood({ pulse, wave, narrativePhase, trustLevel });
// state.directorMood = mood;
`;

  appendIfMissing(file, marker, block);
}

//
// 3. Integracja z Experience Engine (Pulse/Wave)
//
function integrateWithExperienceEngine() {
  const file = path.join(CORE, "festivalExperienceEngine.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_MOOD_EXPERIENCE_INTEGRATION";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_MOOD_EXPERIENCE_INTEGRATION
import { updateDirectorMood } from "./director/festivalAIDirectorMoodEngine";

// Przykład użycia:
// const newMood = updateDirectorMood({ pulse, wave, narrativePhase, trustLevel });
// experienceState.directorMood = newMood;
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalAIDirectorMoodEngine Generator ===");
  ensureDir(CORE);
  ensureDir(DIRECTOR);
  moodEngine();
  integrateWithHyperOrchestrator();
  integrateWithExperienceEngine();
  console.log("=== DONE ===");
}

main();
