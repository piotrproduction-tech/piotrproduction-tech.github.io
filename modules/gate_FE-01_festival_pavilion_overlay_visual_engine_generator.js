const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");
const VISUAL = path.join(CORE, "visual");

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

function visualEngine() {
  const file = path.join(CORE, "festivalVisualEngine.js");
  const marker = "// FE_FESTIVAL_VISUAL_ENGINE";

  const block = `
// FE_FESTIVAL_VISUAL_ENGINE

import { computeVisualOrchestration } from "./visual/festivalVisualOrchestrator";

// Główne API Warstwy 4
export function computeFestivalVisuals({
  experience,
  scenario,
  director,
  uiState
}) {
  return computeVisualOrchestration({
    experience,
    scenario,
    director,
    uiState
  });
}

// Debug snapshot
export function getVisualSnapshot({
  experience,
  scenario,
  director,
  uiState
}) {
  const visual = computeFestivalVisuals({
    experience,
    scenario,
    director,
    uiState
  });

  return {
    pulse: visual.pulse,
    wave: visual.wave,
    phase: visual.phase,
    scene: visual.scene,
    directorMood: visual.directorMood,
    overlayMode: visual.overlay.mode,
    hudMode: visual.hud.mode
  };
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalVisualEngine Generator ===");
  ensureDir(CORE);
  ensureDir(VISUAL);
  visualEngine();
  console.log("=== DONE ===");
}

main();
