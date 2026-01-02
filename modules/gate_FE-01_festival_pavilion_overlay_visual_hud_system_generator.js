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
// HUD SYSTEM
//
function hudSystem() {
  const file = path.join(VISUAL, "festivalHUDSystem.js");
  const marker = "// FE_FESTIVAL_HUD_SYSTEM";

  const block = `
// FE_FESTIVAL_HUD_SYSTEM

export const HUDModes = {
  OFF: "OFF",
  HUD: "HUD",
  HUD_ULTRA: "HUD_ULTRA"
};

// Wybór trybu HUD
export function computeHUDMode({ pulse, wave, overlayMode, scene }) {
  // Sceny mają najwyższy priorytet
  if (scene === "music_drop") return HUDModes.HUD_ULTRA;
  if (scene === "dramatic_climax") return HUDModes.HUD_ULTRA;
  if (scene === "match_point") return HUDModes.HUD_ULTRA;

  // Overlay CHAOS → HUD Ultra
  if (overlayMode === "CHAOS") return HUDModes.HUD_ULTRA;

  // Overlay PEAK → HUD Ultra
  if (overlayMode === "PEAK") return HUDModes.HUD_ULTRA;

  // Overlay CINEMATIC → zwykły HUD
  if (overlayMode === "CINEMATIC") return HUDModes.HUD;

  // Pulse/Wave fallback
  if (pulse > 120 || wave > 0.7) return HUDModes.HUD_ULTRA;
  if (pulse < 60 && wave < 0.25) return HUDModes.HUD;

  return HUDModes.HUD;
}

// Efekty HUD
export const HUDEffects = {
  HUD: ({ pulse, wave }) => ({
    opacity: 0.7,
    glow: pulse / 200,
    sweep: wave * 0.3,
    scale: 1.0
  }),

  HUD_ULTRA: ({ pulse, wave }) => ({
    opacity: 1.0,
    glow: 0.5 + pulse / 150,
    sweep: 0.5 + wave * 0.5,
    scale: 1.1 + wave * 0.1,
    pulseEffect: pulse > 100 ? "strong" : "medium"
  }),

  OFF: () => ({
    opacity: 0,
    glow: 0,
    sweep: 0,
    scale: 1.0
  })
};

// Główna funkcja HUD System
export function computeHUDVisuals(params) {
  const mode = computeHUDMode(params);
  const effectFn = HUDEffects[mode] || (() => ({}));
  const effects = effectFn(params);

  return {
    mode,
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
  const marker = "// FE_FESTIVAL_HUD_SYSTEM_INTEGRATION";

  const block = `
// FE_FESTIVAL_HUD_SYSTEM_INTEGRATION
import { computeHUDVisuals } from "./visual/festivalHUDSystem";

// Przykład użycia:
// const hud = computeHUDVisuals({ pulse, wave, overlayMode, scene });
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalHUDSystem Generator ===");
  ensureDir(CORE);
  ensureDir(VISUAL);
  hudSystem();
  integrateWithVisualEngine();
  console.log("=== DONE ===");
}

main();
