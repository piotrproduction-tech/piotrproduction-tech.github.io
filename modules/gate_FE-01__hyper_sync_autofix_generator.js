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

const FIXED_SYNC = `
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
  console.log("=== HyperSyncEngine AutoFix Generator ===");

  if (!fs.existsSync(TARGET)) {
    console.log("[ERROR] File not found:", TARGET);
    return;
  }

  let content = fs.readFileSync(TARGET, "utf8");

  // Nadpisujemy CAŁĄ funkcję computeHyperSync
  const regex = /export function computeHyperSync[\s\S]*?}\s*$/m;

  if (regex.test(content)) {
    content = content.replace(regex, FIXED_SYNC.trim() + "\n");
    console.log("[FIX] Replaced computeHyperSync()");
  } else {
    content += "\n\n" + FIXED_SYNC.trim() + "\n";
    console.log("[FIX] Appended computeHyperSync()");
  }

  fs.writeFileSync(TARGET, content, "utf8");
  console.log("[UPDATED]", TARGET);
  console.log("=== DONE — HyperSyncEngine AutoFix Completed ===");
}

main();
