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
// Vision Overlay Engine
//
function overlayEngine() {
  const file = path.join(VISUAL, "festivalVisionOverlayEngine.js");
  const marker = "// FE_FESTIVAL_VISION_OVERLAY_ENGINE";

  const block = `
// FE_FESTIVAL_VISION_OVERLAY_ENGINE

// Tryby overlayów
export const OverlayModes = {
  OFF: "OFF",
  CALM: "CALM",
  RISING: "RISING",
  PEAK: "PEAK",
  CHAOS: "CHAOS",
  FOCUS: "FOCUS",
  CINEMATIC: "CINEMATIC",
  RECOVERY: "RECOVERY"
};

// Główna funkcja wyboru overlayu
export function computeOverlayMode({
  pulse,
  wave,
  phase,
  scene,
  directorMood
}) {
  // 1. Sceny mają najwyższy priorytet
  if (scene === "music_drop") return OverlayModes.PEAK;
  if (scene === "dramatic_climax") return OverlayModes.CINEMATIC;
  if (scene === "match_point") return OverlayModes.FOCUS;
  if (scene === "chaotic_phase") return OverlayModes.CHAOS;

  // 2. Fazy emocjonalne
  if (phase === "CALM") return OverlayModes.CALM;
  if (phase === "RISING") return OverlayModes.RISING;
  if (phase === "PEAK") return OverlayModes.PEAK;
  if (phase === "CHAOTIC") return OverlayModes.CHAOS;
  if (phase === "RECOVERY") return OverlayModes.RECOVERY;

  // 3. Pulse/Wave fallback
  if (pulse > 130 || wave > 0.8) return OverlayModes.CHAOS;
  if (pulse > 100 || wave > 0.5) return OverlayModes.PEAK;
  if (pulse < 60 && wave < 0.25) return OverlayModes.CALM;

  // 4. Nastrój reżysera
  if (directorMood === "Creative") return OverlayModes.CINEMATIC;
  if (directorMood === "Focused") return OverlayModes.FOCUS;

  return OverlayModes.RISING;
}

// Efekty overlayów
export const OverlayEffects = {
  CALM: () => ({ glow: 0.1, blur: 0.2, color: "blue" }),
  RISING: () => ({ glow: 0.3, sweep: 0.2, color: "teal" }),
  PEAK: () => ({ glow: 0.8, burst: 1.0, color: "neon" }),
  CHAOS: () => ({ distortion: 0.9, glitch: 0.7, color: "red" }),
  FOCUS: () => ({ vignette: 0.6, sharpen: 0.4, color: "white" }),
  CINEMATIC: () => ({ flare: 0.7, grain: 0.3, color: "gold" }),
  RECOVERY: () => ({ fade: 0.4, soften: 0.3, color: "purple" }),
  OFF: () => ({})
};

// Główna funkcja overlay engine
export function computeOverlayVisuals(params) {
  const mode = computeOverlayMode(params);
  const effectFn = OverlayEffects[mode] || (() => ({}));
  const effects = effectFn();

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
  const marker = "// FE_FESTIVAL_VISION_OVERLAY_ENGINE_INTEGRATION";

  const block = `
// FE_FESTIVAL_VISION_OVERLAY_ENGINE_INTEGRATION
import { computeOverlayVisuals } from "./visual/festivalVisionOverlayEngine";

// Przykład użycia:
// const overlay = computeOverlayVisuals({ pulse, wave, phase, scene, directorMood });
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalVisionOverlayEngine Generator ===");
  ensureDir(CORE);
  ensureDir(VISUAL);
  overlayEngine();
  integrateWithVisualEngine();
  console.log("=== DONE ===");
}

main();
