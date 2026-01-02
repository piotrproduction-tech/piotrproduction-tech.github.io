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

function festivalEngine() {
  const file = path.join(CORE, "festivalEngine.js");
  const marker = "// FE_FESTIVAL_ENGINE";

  const block = `
// FE_FESTIVAL_ENGINE

import { FestivalHyperOrchestrator } from "./hyper/festivalHyperOrchestrator";

// Globalny silnik FESTIVAL ENGINE 2.0
export class FestivalEngine {
  constructor() {
    this.hyper = new FestivalHyperOrchestrator();
  }

  // Główna funkcja — jedna klatka festiwalu
  computeFestivalFrame({ experience, scenario, director, uiState, audience }) {
    return this.hyper.computeFrame({
      experience,
      scenario,
      director,
      uiState,
      audience
    });
  }

  // Debug snapshot
  getFestivalSnapshot() {
    return this.hyper.getSnapshot();
  }
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalEngine Generator ===");
  ensureDir(CORE);
  ensureDir(HYPER);
  festivalEngine();
  console.log("=== DONE ===");
}

main();
