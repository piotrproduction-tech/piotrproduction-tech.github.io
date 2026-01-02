const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");
const HYPER = path.join(CORE, "hyper");

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

function hyperOrchestrator() {
  const file = path.join(HYPER, "festivalHyperOrchestrator.js");
  const marker = "// FE_FESTIVAL_HYPER_ORCHESTRATOR";

  const block = `
// FE_FESTIVAL_HYPER_ORCHESTRATOR

import { computeHyperSync } from "./festivalHyperSyncEngine";

// Główny orchestrator Warstwy 5
export class FestivalHyperOrchestrator {
  constructor() {
    this.state = {
      lastFrame: null,
      frameIndex: 0,
      lastPriority: null,
      lastDecision: null
    };
  }

  computeFrame({ experience, scenario, director, uiState, audience }) {
    const frame = computeHyperSync({
      experience,
      scenario,
      director,
      uiState,
      audience
    });

    this.state.lastFrame = frame;
    this.state.lastPriority = frame.priority;
    this.state.lastDecision = frame.decision;
    this.state.frameIndex++;

    return frame;
  }

  getSnapshot() {
    return {
      frameIndex: this.state.frameIndex,
      lastPriority: this.state.lastPriority,
      lastDecision: this.state.lastDecision,
      lastFrame: this.state.lastFrame
    };
  }
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalHyperOrchestrator Generator ===");
  ensureDir(CORE);
  ensureDir(HYPER);
  hyperOrchestrator();
  console.log("=== DONE ===");
}

main();
