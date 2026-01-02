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

function priorityResolver() {
  const file = path.join(HYPER, "festivalHyperPriorityResolver.js");
  const marker = "// FE_FESTIVAL_HYPER_PRIORITY_RESOLVER";

  const block = `
// FE_FESTIVAL_HYPER_PRIORITY_RESOLVER

// Dynamiczny model priorytetów (Hybrydowy)
export function resolveHyperPriority(inputs) {
  const {
    pulse,
    wave,
    scene,
    directorIntent,
    directorMood,
    uiForcedOverlay,
    uiForcedScene,
    audienceEnergy
  } = inputs;

  const scores = {
    scene: 0,
    director: 0,
    energy: 0,
    operator: 0,
    overlay: 0
  };

  // 1. Operator ma najwyższy priorytet, jeśli wymusza
  if (uiForcedOverlay) scores.operator += 100;
  if (uiForcedScene) scores.operator += 100;

  // 2. Scena ma wysoki priorytet, jeśli jest dramatyczna
  if (scene === "dramatic_climax") scores.scene += 90;
  if (scene === "music_drop") scores.scene += 80;
  if (scene === "match_point") scores.scene += 70;
  if (scene === "chaotic_phase") scores.scene += 60;
  if (scene) scores.scene += 40;

  // 3. Reżyser ma priorytet zależny od intensywności intencji
  if (directorIntent === "highlight") scores.director += 80;
  if (directorIntent === "focus") scores.director += 70;
  if (directorIntent === "chaos") scores.director += 90;
  if (directorMood === "Creative") scores.director += 40;
  if (directorMood === "Focused") scores.director += 30;

  // 4. Energia (pulse/wave) może przejąć kontrolę
  if (pulse > 140 || wave > 0.85) scores.energy += 100; // ekstremum
  if (pulse > 120 || wave > 0.7) scores.energy += 70;
  if (pulse > 100 || wave > 0.5) scores.energy += 40;

  // 5. Publiczność (crowd-flow)
  if (audienceEnergy > 80) scores.energy += 40;
  if (audienceEnergy > 60) scores.energy += 20;

  // 6. Overlay (jeśli już jest w trybie krytycznym)
  if (inputs.overlayMode === "CHAOS") scores.overlay += 60;
  if (inputs.overlayMode === "PEAK") scores.overlay += 40;

  // Wyznacz najwyższy priorytet
  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

  return {
    scores,
    winner
  };
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalHyperPriorityResolver Generator ===");
  ensureDir(CORE);
  ensureDir(HYPER);
  priorityResolver();
  console.log("=== DONE ===");
}

main();
