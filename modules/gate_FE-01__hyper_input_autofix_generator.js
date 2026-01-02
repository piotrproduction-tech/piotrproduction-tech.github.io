const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGET = path.join(
  ROOT,
  "apps",
  "FE-01__Festival_Pavilion",
  "core",
  "hyper",
  "festivalHyperInputCollector.js"
);

const FIXED_INPUT_COLLECTOR = `
// FE_FESTIVAL_HYPER_INPUT_COLLECTOR — FIXED & SAFE

export function collectHyperInputs(frameInput = {}) {
  return {
    experience: frameInput.experience || { pulse: 0, wave: 0, experienceState: {} },
    scenario: frameInput.scenario || {},
    uiState: frameInput.uiState || {},
    audience: frameInput.audience || { energy: 0 },

    // Najważniejsze — director musi ZAWSZE istnieć
    director: frameInput.director || {
      mood: "Neutral",
      intent: null
    }
  };
}
`;

function main() {
  console.log("=== HyperInput AutoFix Generator ===");

  if (!fs.existsSync(TARGET)) {
    console.log("[ERROR] File not found:", TARGET);
    return;
  }

  fs.writeFileSync(TARGET, FIXED_INPUT_COLLECTOR.trim() + "\n", "utf8");

  console.log("[UPDATED] festivalHyperInputCollector.js — fixed & safe");
  console.log("=== DONE ===");
}

main();
