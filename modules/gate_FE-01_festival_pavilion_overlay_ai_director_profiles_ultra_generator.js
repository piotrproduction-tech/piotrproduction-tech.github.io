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
// 1. FestivalAIDirectorProfilesUltra.js
//
function directorProfiles() {
  const file = path.join(DIRECTOR, "festivalAIDirectorProfilesUltra.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_PROFILES_ULTRA";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_PROFILES_ULTRA

export const FestivalAIDirectorProfilesUltra = {
  CalmDirector: {
    name: "CalmDirector",
    tempo: 0.8,
    intensity: 0.4,
    narrativeStyle: "smooth",
    emotionalBias: "calm",
    scenarioPreferences: ["ambient", "softTransitions", "slowPacing"],
    conflictPriority: 2
  },

  AggressiveDirector: {
    name: "AggressiveDirector",
    tempo: 1.4,
    intensity: 1.2,
    narrativeStyle: "dynamic",
    emotionalBias: "energetic",
    scenarioPreferences: ["fastCuts", "highEnergy", "peakMoments"],
    conflictPriority: 5
  },

  ExperimentalDirector: {
    name: "ExperimentalDirector",
    tempo: 1.1,
    intensity: 1.0,
    narrativeStyle: "creative",
    emotionalBias: "creative",
    scenarioPreferences: ["glitch", "unexpected", "abstract"],
    conflictPriority: 4
  },

  FestivalDirector: {
    name: "FestivalDirector",
    tempo: 1.0,
    intensity: 0.9,
    narrativeStyle: "ceremonial",
    emotionalBias: "focused",
    scenarioPreferences: ["opening", "ceremony", "spotlight"],
    conflictPriority: 5
  },

  CinematicDirector: {
    name: "CinematicDirector",
    tempo: 1.0,
    intensity: 1.1,
    narrativeStyle: "filmic",
    emotionalBias: "dramatic",
    scenarioPreferences: ["wideShots", "slowMotion", "dramaticBeats"],
    conflictPriority: 4
  },

  AnalyticalDirector: {
    name: "AnalyticalDirector",
    tempo: 0.9,
    intensity: 0.7,
    narrativeStyle: "precise",
    emotionalBias: "focused",
    scenarioPreferences: ["structured", "clean", "minimal"],
    conflictPriority: 3
  },

  JuryDirector: {
    name: "JuryDirector",
    tempo: 0.95,
    intensity: 0.8,
    narrativeStyle: "evaluative",
    emotionalBias: "tense",
    scenarioPreferences: ["spotlight", "focus", "analysis"],
    conflictPriority: 4
  },

  AwardsDirector: {
    name: "AwardsDirector",
    tempo: 1.2,
    intensity: 1.0,
    narrativeStyle: "celebratory",
    emotionalBias: "energetic",
    scenarioPreferences: ["spotlight", "goldenGlow", "celebration"],
    conflictPriority: 5
  }
};
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalAIDirectorProfilesUltra Generator ===");
  ensureDir(CORE);
  ensureDir(DIRECTOR);
  directorProfiles();
  console.log("=== DONE ===");
}

main();
