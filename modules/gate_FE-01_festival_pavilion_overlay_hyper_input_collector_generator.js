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

function inputCollector() {
  const file = path.join(HYPER, "festivalHyperInputCollector.js");
  const marker = "// FE_FESTIVAL_HYPER_INPUT_COLLECTOR";

  const block = `
// FE_FESTIVAL_HYPER_INPUT_COLLECTOR

// Normalizacja danych wejściowych z warstw 1–4
export function collectHyperInputs({
  experience,
  scenario,
  director,
  visual,
  uiState,
  audience
}) {
  return {
    pulse: experience?.pulse ?? 80,
    wave: experience?.wave ?? 0.4,
    phase: experience?.experienceState?.phase ?? "RISING",

    scene: scenario?.activeScene ?? null,
    narrativePhase: scenario?.narrativePhase ?? "opening",

    directorMood: director?.mood ?? "Neutral",
    directorIntent: director?.intent ?? null,

    overlayMode: visual?.overlay?.mode ?? "RISING",
    hudMode: visual?.hud?.mode ?? "HUD",

    uiForcedOverlay: uiState?.forcedOverlayMode ?? null,
    uiForcedScene: uiState?.forcedScene ?? null,

    audienceEnergy: audience?.energy ?? 50
  };
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalHyperInputCollector Generator ===");
  ensureDir(CORE);
  ensureDir(HYPER);
  inputCollector();
  console.log("=== DONE ===");
}

main();
