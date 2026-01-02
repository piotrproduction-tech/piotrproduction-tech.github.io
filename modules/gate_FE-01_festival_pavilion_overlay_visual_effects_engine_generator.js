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
// Visual Effects Engine
//
function visualEffectsEngine() {
  const file = path.join(VISUAL, "festivalVisualEffectsEngine.js");
  const marker = "// FE_FESTIVAL_VISUAL_EFFECTS_ENGINE";

  const block = `
// FE_FESTIVAL_VISUAL_EFFECTS_ENGINE

// Efekty bazowe zależne od Pulse
export function computePulseEffects(pulse) {
  return {
    glow: Math.min(1, pulse / 150),
    pulseStrength: pulse > 120 ? "strong" : pulse > 80 ? "medium" : "soft",
    flicker: pulse > 130 ? 0.4 : pulse > 100 ? 0.2 : 0.05
  };
}

// Efekty bazowe zależne od Wave
export function computeWaveEffects(wave) {
  return {
    sweep: wave * 0.8,
    distortion: wave > 0.7 ? 0.6 : wave > 0.5 ? 0.3 : 0.1,
    flow: wave
  };
}

// Efekty zależne od fazy emocjonalnej
export function computePhaseEffects(phase) {
  switch (phase) {
    case "CALM":
      return { fade: 0.4, blur: 0.2, softness: 0.6 };
    case "RISING":
      return { ramp: 0.5, glowBoost: 0.2 };
    case "PEAK":
      return { surge: 1.0, burst: 0.8 };
    case "CHAOTIC":
      return { glitch: 0.7, shake: 0.5 };
    case "RECOVERY":
      return { fade: 0.6, soften: 0.4 };
    default:
      return {};
  }
}

// Efekty zależne od overlay mode
export function computeOverlayEffects(overlayMode) {
  switch (overlayMode) {
    case "PEAK":
      return { neonBoost: 0.8, flare: 0.4 };
    case "CHAOS":
      return { glitch: 0.9, chromatic: 0.6 };
    case "FOCUS":
      return { vignette: 0.5, sharpen: 0.3 };
    case "CINEMATIC":
      return { grain: 0.3, flare: 0.5 };
    default:
      return {};
  }
}

// Efekty zależne od sceny
export function computeSceneEffects(scene) {
  switch (scene) {
    case "music_drop":
      return { surge: 1.0, flash: 0.8 };
    case "dramatic_climax":
      return { flare: 0.7, glowBoost: 0.4 };
    case "match_point":
      return { focusPulse: 0.6, sharpen: 0.4 };
    case "chaotic_phase":
      return { glitch: 0.9, shake: 0.6 };
    default:
      return {};
  }
}

// Efekty zależne od nastroju reżysera
export function computeDirectorEffects(mood) {
  switch (mood) {
    case "Creative":
      return { flare: 0.4, glowBoost: 0.3 };
    case "Focused":
      return { vignette: 0.4, sharpen: 0.3 };
    case "Chaotic":
      return { glitch: 0.6, distortion: 0.4 };
    default:
      return {};
  }
}

// Główna funkcja łączenia efektów
export function computeVisualEffects({
  pulse,
  wave,
  phase,
  overlayMode,
  scene,
  directorMood
}) {
  return {
    ...computePulseEffects(pulse),
    ...computeWaveEffects(wave),
    ...computePhaseEffects(phase),
    ...computeOverlayEffects(overlayMode),
    ...computeSceneEffects(scene),
    ...computeDirectorEffects(directorMood)
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
  const marker = "// FE_FESTIVAL_VISUAL_EFFECTS_ENGINE_INTEGRATION";

  const block = `
// FE_FESTIVAL_VISUAL_EFFECTS_ENGINE_INTEGRATION
import { computeVisualEffects } from "./visual/festivalVisualEffectsEngine";

// Przykład użycia:
// const effects = computeVisualEffects({ pulse, wave, phase, overlayMode, scene, directorMood });
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalVisualEffectsEngine Generator ===");
  ensureDir(CORE);
  ensureDir(VISUAL);
  visualEffectsEngine();
  integrateWithVisualEngine();
  console.log("=== DONE ===");
}

main();
