const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BE01 = path.join(ROOT, "backend", "BE-01__Festival_Pavilion");
const CORE = path.join(BE01, "core");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function ensureFile(filePath, baseContent = "") {
  if (!fs.existsSync(filePath)) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, baseContent, "utf8");
    console.log("[CREATE]", filePath);
  }
}

function appendIfMissing(filePath, marker, block) {
  ensureFile(filePath);
  const content = fs.readFileSync(filePath, "utf8");
  if (!content.includes(marker)) {
    fs.writeFileSync(filePath, content + "\n\n" + block, "utf8");
    console.log("[UPDATED]", filePath, "→ added:", marker);
  } else {
    console.log("[SKIP]", filePath, "already has:", marker);
  }
}

function coreIndex() {
  const file = path.join(CORE, "index.js");
  const marker = "// FESTIVAL_ENGINE_BOOTSTRAP";

  const block = `
// FESTIVAL_ENGINE_BOOTSTRAP
// Full bootstrap of Festival Pavilion Engine (BE-01)

import { festivalRuntimeEngine } from "../life/runtime";
import { festivalNarration } from "../life/narration";
import { submissionsSync } from "../life/submissionsSync";
import { jurySync } from "../life/jurySync";
import { awardsSync } from "../life/awardsSync";
import { eventsSync } from "../life/eventsSync";
import { scheduleSync } from "../life/scheduleSync";

import { getFestivalStatus } from "../diagnostics/status";
import { getFestivalHeartbeat } from "../diagnostics/heartbeat";
import { recordFestivalTimeline, getFestivalTimeline } from "../diagnostics/timeline";

import { festivalEventRouter } from "../events/router";

export function createFestivalEngine() {
  const globalState = {
    festival: {
      submissions: [],
      jury: [],
      assignments: [],
      votes: [],
      awardCategories: [],
      awards: [],
      events: [],
      schedule: [],
      narrative: [],
      timeline: []
    }
  };

  const engine = {
    state: globalState,

    // Runtime dispatch
    dispatch(action) {
      const result = festivalRuntimeEngine.dispatch(globalState, action);
      festivalRuntimeEngine.applySideEffects(globalState, result);
      recordFestivalTimeline(globalState);
      return result;
    },

    // Direct sync access (if needed)
    submissions: submissionsSync,
    jury: jurySync,
    awards: awardsSync,
    events: eventsSync,
    schedule: scheduleSync,

    // Diagnostics
    status() {
      return getFestivalStatus(globalState);
    },
    heartbeat() {
      return getFestivalHeartbeat(globalState);
    },
    timeline() {
      return getFestivalTimeline(globalState);
    },

    // Events
    router: festivalEventRouter,

    // Narrative
    narrative: festivalNarration
  };

  return engine;
}

// Optional: singleton engine for the process
let singletonEngine = null;

export function getFestivalEngine() {
  if (!singletonEngine) {
    singletonEngine = createFestivalEngine();
  }
  return singletonEngine;
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== Festival Pavilion Core Generator ===");

  ensureDir(CORE);
  coreIndex();

  console.log("=== DONE ===");
}

main();
