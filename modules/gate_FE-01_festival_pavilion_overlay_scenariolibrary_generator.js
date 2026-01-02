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
// 1. core/festivalOverlayScenarioLibrary.js — biblioteka scenariuszy
//
function scenarioLibrary() {
  const file = path.join(CORE, "festivalOverlayScenarioLibrary.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIOLIBRARY";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIOLIBRARY
// Professional library of festival overlay scenarios

export const FestivalOverlayScenarioLibrary = {
  // --- CEREMONIAL ---

  OpeningCeremony: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 1200, cmd: "setMode", payload: "semi" },
    { delay: 2400, cmd: "toggle", payload: "notifications" },
    { delay: 3600, cmd: "toggle", payload: "debug" },
    { delay: 5000, cmd: "setMode", payload: "full" }
  ],

  ClosingCeremony: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 2000, cmd: "setMode", payload: "transparent" },
    { delay: 4000, cmd: "toggle", payload: "notifications" },
    { delay: 6000, cmd: "toggle", payload: "debug" }
  ],

  // --- ACTIVITY PEAKS ---

  PeakActivity: [
    { delay: 0, cmd: "setPreset", payload: "Debug" },
    { delay: 1500, cmd: "setMode", payload: "full" },
    { delay: 3000, cmd: "toggle", payload: "notifications" },
    { delay: 4500, cmd: "toggle", payload: "notifications" }
  ],

  CalmBeforeStorm: [
    { delay: 0, cmd: "setPreset", payload: "Minimal" },
    { delay: 2000, cmd: "setMode", payload: "transparent" },
    { delay: 4000, cmd: "toggle", payload: "debug" }
  ],

  // --- JURY / CREATOR MODES ---

  JuryMode: [
    { delay: 0, cmd: "setPreset", payload: "Minimal" },
    { delay: 2000, cmd: "toggle", payload: "debug" },
    { delay: 3500, cmd: "setMode", payload: "semi" }
  ],

  CreatorSpotlight: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 1500, cmd: "setMode", payload: "full" },
    { delay: 3000, cmd: "toggle", payload: "notifications" }
  ],

  // --- FESTIVAL MOMENTS ---

  AwardReveal: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 1000, cmd: "setMode", payload: "full" },
    { delay: 2500, cmd: "toggle", payload: "notifications" },
    { delay: 4000, cmd: "toggle", payload: "notifications" }
  ],

  NomineeSpotlight: [
    { delay: 0, cmd: "setPreset", payload: "Minimal" },
    { delay: 1500, cmd: "setMode", payload: "semi" },
    { delay: 3000, cmd: "toggle", payload: "notifications" }
  ],

  JuryDeliberation: [
    { delay: 0, cmd: "setPreset", payload: "Minimal" },
    { delay: 2000, cmd: "toggle", payload: "debug" },
    { delay: 3500, cmd: "setMode", payload: "transparent" }
  ]
};
`;

  appendIfMissing(file, marker, block);
}

//
// 2. Integracja z ScenarioEngine (opcjonalne rozszerzenie)
//
function extendScenarioEngine() {
  const file = path.join(CORE, "useFestivalOverlayScenarioEngine.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIOLIBRARY_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIOLIBRARY_INTEGRATION
import { FestivalOverlayScenarioLibrary } from "./festivalOverlayScenarioLibrary";

// Allow ScenarioEngine to run library scenarios
function runLibraryScenario(name) {
  const scenario = FestivalOverlayScenarioLibrary[name];
  if (!scenario) return;
  runScenarioSteps(scenario);
}

async function runScenarioSteps(steps) {
  setRunning(true);
  setCurrentScenario("Library:" + currentScenario);

  for (const step of steps) {
    await new Promise((res) => setTimeout(res, step.delay));
    execute(step.cmd, step.payload);
  }

  setRunning(false);
  setCurrentScenario(null);
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayScenarioLibrary Generator ===");
  ensureDir(CORE);
  scenarioLibrary();
  extendScenarioEngine();
  console.log("=== DONE ===");
}

main();
