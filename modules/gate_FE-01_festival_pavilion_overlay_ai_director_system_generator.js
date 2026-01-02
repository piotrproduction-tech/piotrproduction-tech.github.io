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

function directorSystemCore() {
  const file = path.join(DIRECTOR, "festivalAIDirectorSystem.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_SYSTEM";

  const block = `
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
`;

  appendIfMissing(file, marker, block);
}

function integrateWithHyperOrchestrator() {
  const file = path.join(CORE, "festivalHyperOrchestrator.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_SYSTEM_INTEGRATION";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_SYSTEM_INTEGRATION
import { computeDirectorDecision } from "./director/festivalAIDirectorSystem";

// Przykład użycia w HyperOrchestratorze:
// const directorResult = computeDirectorDecision({
//   orchestratorDecision,
//   autoTunerDecision,
//   scenarioDecision,
//   visualDecision,
//   context: { pulse, wave, narrativePhase, trustLevel, reputation }
// });
// state.director = directorResult;
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalAIDirectorSystem Generator ===");
  ensureDir(CORE);
  ensureDir(DIRECTOR);
  directorSystemCore();
  integrateWithHyperOrchestrator();
  console.log("=== DONE ===");
}

main();
