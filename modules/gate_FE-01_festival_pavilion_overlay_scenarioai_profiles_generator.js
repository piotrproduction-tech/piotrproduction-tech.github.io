const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");

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
// 1. AI Profiles definition
//
function aiProfiles() {
  const file = path.join(CORE, "festivalOverlayScenarioAIProfiles.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_PROFILES";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_PROFILES
// Director-style AI profiles that modify AI scenario generation

export const FestivalOverlayScenarioAIProfiles = {

  CalmDirector: {
    name: "CalmDirector",
    speed: 1.2,
    intensity: 0.4,
    presetStrategy: (state) =>
      state.mood === "Calm" ? "Minimal" : "Showcase",
    modeStrategy: (pulse) =>
      pulse < 80 ? "transparent" : "semi",
    notificationStrategy: (trust) =>
      trust === "high" ? false : true
  },

  AggressiveDirector: {
    name: "AggressiveDirector",
    speed: 0.7,
    intensity: 1.0,
    presetStrategy: () => "Debug",
    modeStrategy: (pulse) =>
      pulse > 100 ? "full" : "semi",
    notificationStrategy: () => true
  },

  ExperimentalDirector: {
    name: "ExperimentalDirector",
    speed: 1.0,
    intensity: 0.9,
    presetStrategy: (state) =>
      state.mood === "Creative" ? "Showcase" : "Minimal",
    modeStrategy: (pulse) =>
      pulse % 2 === 0 ? "full" : "transparent",
    notificationStrategy: () =>
      Math.random() > 0.5
  },

  CinematicDirector: {
    name: "CinematicDirector",
    speed: 1.0,
    intensity: 0.7,
    presetStrategy: (state) =>
      state.narrative?.phase === "awards" ? "Showcase" : "Minimal",
    modeStrategy: (pulse) =>
      pulse > 110 ? "full" : "semi",
    notificationStrategy: () => true
  },

  AnalyticalDirector: {
    name: "AnalyticalDirector",
    speed: 1.0,
    intensity: 0.3,
    presetStrategy: () => "Minimal",
    modeStrategy: (pulse) =>
      pulse > 120 ? "full" : pulse > 90 ? "semi" : "transparent",
    notificationStrategy: (trust) =>
      trust !== "low"
  },

  FestivalDirector: {
    name: "FestivalDirector",
    speed: 0.9,
    intensity: 0.8,
    presetStrategy: () => "Showcase",
    modeStrategy: () => "full",
    notificationStrategy: () => true
  }
};
`;

  appendIfMissing(file, marker, block);
}

//
// 2. AI Profile-aware scenario builder
//
function aiProfileIntegration() {
  const file = path.join(CORE, "festivalOverlayScenarioAI.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_PROFILES_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_PROFILES_INTEGRATION
import { FestivalOverlayScenarioAIProfiles } from "./festivalOverlayScenarioAIProfiles";

/**
 * AI scenario generator with profile support.
 * profileName: one of the keys from FestivalOverlayScenarioAIProfiles
 */
export function generateOverlayScenarioAIWithProfile(state, profileName) {
  const profile = FestivalOverlayScenarioAIProfiles[profileName];
  if (!profile) return generateOverlayScenarioAI(state);

  const steps = [];

  // 1. Preset
  steps.push({
    delay: 0,
    cmd: "setPreset",
    payload: profile.presetStrategy(state)
  });

  // 2. Mode
  steps.push({
    delay: 1200 * profile.speed,
    cmd: "setMode",
    payload: profile.modeStrategy(state.pulse)
  });

  // 3. Notifications
  steps.push({
    delay: 2400 * profile.speed,
    cmd: "toggle",
    payload: "notifications"
  });

  // 4. Optional debug toggle based on intensity
  if (profile.intensity > 0.7) {
    steps.push({
      delay: 3600 * profile.speed,
      cmd: "toggle",
      payload: "debug"
    });
  }

  return steps;
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayScenarioAIProfiles Generator ===");
  ensureDir(CORE);
  aiProfiles();
  aiProfileIntegration();
  console.log("=== DONE ===");
}

main();
