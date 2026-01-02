const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGET = path.join(
  ROOT,
  "apps",
  "FE-01__Festival_Pavilion",
  "core",
  "hyper",
  "festivalHyperDecisionEngine.js"
);

const FIXED_DECISION = `
// FE_FESTIVAL_HYPER_DECISION_ENGINE — FIXED SIGNATURE

export function computeHyperDecision({ priority, scenario, visual, inputs }) {
  const { winner } = priority;

  // Final overlay selection
  let finalOverlay = visual.overlay.mode;

  if (winner === "operator") {
    finalOverlay = inputs.uiState.forcedOverlayMode || finalOverlay;
  }

  if (winner === "director" && inputs.director.intent === "highlight") {
    finalOverlay = "CINEMATIC";
  }

  if (winner === "energy") {
    if (inputs.audience.energy > 80) finalOverlay = "CHAOS";
    if (inputs.audience.energy > 90) finalOverlay = "PEAK";
  }

  return {
    finalScene: scenario.activeScene,
    finalOverlay,
    finalDirectorIntent: inputs.director.intent || null,
    source: winner
  };
}
`;

function main() {
  console.log("=== HyperDecision AutoFix Generator ===");

  if (!fs.existsSync(TARGET)) {
    console.log("[ERROR] File not found:", TARGET);
    return;
  }

  fs.writeFileSync(TARGET, FIXED_DECISION.trim() + "\n", "utf8");

  console.log("[UPDATED] festivalHyperDecisionEngine.js — fixed signature");
  console.log("=== DONE ===");
}

main();
