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

//
// Visual Sync Engine
//
function visualSyncEngine() {
  const file = path.join(VISUAL, "festivalVisualSyncEngine.js");
  const marker = "// FE_FESTIVAL_VISUAL_SYNC_ENGINE";

  const block = `
// FE_FESTIVAL_VISUAL_SYNC_ENGINE

import { computeOverlayVisuals } from "./festivalVisionOverlayEngine";
import { computeHUDVisuals } from "./festivalHUDSystem";
import { computeVisualEffects } from "./festivalVisualEffectsEngine";

// Główna funkcja synchronizacji wizualnej
export function computeVisualSync({
  pulse,
  wave,
  phase,
  scene,
  directorMood,
  overlayModeOverride = null
}) {
  // 1. Overlay
  const overlay = computeOverlayVisuals({
    pulse,
    wave,
    phase,
    scene,
    directorMood
  });

  // Możliwość wymuszenia overlayu (np. przez UI)
  const overlayMode = overlayModeOverride || overlay.mode;

  // 2. HUD
  const hud = computeHUDVisuals({
    pulse,
    wave,
    overlayMode,
    scene
  });

  // 3. Efekty wizualne
  const effects = computeVisualEffects({
    pulse,
    wave,
    phase,
    overlayMode,
    scene,
    directorMood
  });

  return {
    overlay: {
      mode: overlayMode,
      effects: overlay.effects
    },
    hud,
    effects
  };
}
`;

  appendIfMissing(file, marker, block);
}

//
// Integracja z Visual Engine
//
function integrateWithVisualEngine() {
  const file = path.join(CORE, "festivalVisualEngine.js");
  const marker = "// FE_FESTIVAL_VISUAL_SYNC_ENGINE_INTEGRATION";

  const block = `
// FE_FESTIVAL_VISUAL_SYNC_ENGINE_INTEGRATION
import { computeVisualSync } from "./visual/festivalVisualSyncEngine";

// Przykład użycia:
// const visual = computeVisualSync({
//   pulse,
//   wave,
//   phase,
//   scene,
//   directorMood
// });
//
// visual.overlay.mode
// visual.hud.mode
// visual.effects
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalVisualSyncEngine Generator ===");
  ensureDir(CORE);
  ensureDir(VISUAL);
  visualSyncEngine();
  integrateWithVisualEngine();
  console.log("=== DONE ===");
}

main();
