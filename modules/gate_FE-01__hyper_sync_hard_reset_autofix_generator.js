const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGET = path.join(
  ROOT,
  "apps",
  "FE-01__Festival_Pavilion",
  "core",
  "hyper",
  "festivalHyperSyncEngine.js"
);

const CLEAN_VERSION = `
// FE_FESTIVAL_HYPER_SYNC_ENGINE — HARD RESET (AUTOFIX)

import { computeFestivalScenario } from "../festivalScenarioEngine";
import { computeFestivalVisuals } from "../festivalVisualEngine";
import { computeHyperDecision } from "./festivalHyperDecisionEngine";
import { resolveHyperPriority } from "./festivalHyperPriorityResolver";
import { collectHyperInputs } from "./festivalHyperInputCollector";

export function computeHyperSync(frameInput) {
  // 1. Zbieramy wszystkie sygnały z Warstwy 1–5
  const inputs = collectHyperInputs(frameInput);

  // 2. Warstwa 3 — dramaturgia
  const scenario = computeFestivalScenario(inputs);

  // 3. Warstwa 4 — wizual
  const visual = computeFestivalVisuals({
    ...inputs,
    scenario
  });

  // 4. Warstwa 5 — priorytety
  const priority = resolveHyperPriority({
    uiState: inputs.uiState,
    director: inputs.director,
    scenario,
    experience: inputs.experience,
    audience: inputs.audience
  });

  // 5. Warstwa 5 — finalna decyzja
  const decision = computeHyperDecision({
    priority,
    scenario,
    visual,
    inputs
  });

  return {
    scenario,
    visual,
    priority,
    decision
  };
}
`;

function main() {
  console.log("=== HyperSyncEngine HARD RESET AutoFix ===");

  if (!fs.existsSync(TARGET)) {
    console.log("[ERROR] File not found:", TARGET);
    return;
  }

  // Nadpisujemy CAŁY plik — to jedyna bezpieczna opcja
  fs.writeFileSync(TARGET, CLEAN_VERSION.trim() + "\n", "utf8");

  console.log("[UPDATED] festivalHyperSyncEngine.js — fully replaced");
  console.log("=== DONE — HyperSyncEngine HARD RESET Completed ===");
}

main();
