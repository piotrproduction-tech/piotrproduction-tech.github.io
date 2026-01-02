const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");

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

function extendScenarioEngine() {
  const file = path.join(CORE, "useFestivalOverlayScenarioEngine.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIOENGINE_AI_EXTENSION";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIOENGINE_AI_EXTENSION
// Minimal AI scenario runner injected automatically

import { buildAIScenarioFromState } from "./festivalOverlayScenarioAI";

async function runAIScenario(currentState) {
  const steps = buildAIScenarioFromState(currentState);
  if (!steps || !steps.length) return;

  setRunning(true);
  setCurrentScenario("AI");

  for (const step of steps) {
    await new Promise((res) => setTimeout(res, step.delay));
    execute(step.cmd, step.payload);
  }

  setRunning(false);
  setCurrentScenario(null);
}

// Example usage inside component:
// runAIScenario({
//   pulse,
//   mood,
//   wave,
//   reputation,
//   identity,
//   security,
//   narrative
// });
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayScenarioEngine AI Extension Generator ===");
  ensureDir(CORE);
  extendScenarioEngine();
  console.log("=== DONE ===");
}

main();
