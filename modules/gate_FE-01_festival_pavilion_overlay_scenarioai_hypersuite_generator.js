const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const COMPONENTS = path.join(FE01, "components");

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
// 1. HyperSuite Component
//
function hyperSuiteComponent() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIHyperSuite.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_COMPONENT";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_COMPONENT
import React from "react";
import "./FestivalOverlayScenarioAIHyperSuite.css";

import { FestivalOverlayScenarioAIController } from "./FestivalOverlayScenarioAIController";
import { FestivalOverlayScenarioAIProfileController } from "./FestivalOverlayScenarioAIProfileController";
import { FestivalOverlayScenarioAIOrchestratorController } from "./FestivalOverlayScenarioAIOrchestratorController";
import { FestivalOverlayScenarioAIAutoTunerController } from "./FestivalOverlayScenarioAIAutoTunerController";
import { FestivalOverlayScenarioAIHyperOrchestratorController } from "./FestivalOverlayScenarioAIHyperOrchestratorController";

export function FestivalOverlayScenarioAIHyperSuite({
  runAIScenario,
  runScenarioSteps,
  orchestrator,
  autoTuner,
  hyper,
  getCurrentState
}) {
  return (
    <div className="overlay-ai-hypersuite">
      <FestivalOverlayScenarioAIController
        runAIScenario={runAIScenario}
        getCurrentState={getCurrentState}
      />

      <FestivalOverlayScenarioAIProfileController
        runScenarioSteps={runScenarioSteps}
        getCurrentState={getCurrentState}
      />

      <FestivalOverlayScenarioAIOrchestratorController
        orchestrator={orchestrator}
        getCurrentState={getCurrentState}
      />

      <FestivalOverlayScenarioAIAutoTunerController
        autoTuner={autoTuner}
        getCurrentState={getCurrentState}
      />

      <FestivalOverlayScenarioAIHyperOrchestratorController
        hyper={hyper}
        getCurrentState={getCurrentState}
      />
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. HyperSuite CSS
//
function hyperSuiteCSS() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIHyperSuite.css");
  const marker = "/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_CSS */";

  const block = `
/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_CSS */

.overlay-ai-hypersuite {
  position: fixed;
  bottom: 12px;
  left: 12px;
  display: flex;
  flex-direction: row;
  gap: 12px;
  z-index: 99999;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. Integration hint for FestivalOverlayController.js
//
function integrateSuite() {
  const file = path.join(COMPONENTS, "FestivalOverlayController.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_INTEGRATION
import { FestivalOverlayScenarioAIHyperSuite } from "./FestivalOverlayScenarioAIHyperSuite";

// Example usage inside render:
// <FestivalOverlayScenarioAIHyperSuite
//    runAIScenario={runAIScenario}
//    runScenarioSteps={runScenarioSteps}
//    orchestrator={orchestrator}
//    autoTuner={autoTuner}
//    hyper={hyper}
//    getCurrentState={() => ({ pulse, mood, wave, reputation, identity, security, narrative })}
// />
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayScenarioAIHyperSuite Generator ===");
  ensureDir(COMPONENTS);
  hyperSuiteComponent();
  hyperSuiteCSS();
  integrateSuite();
  console.log("=== DONE ===");
}

main();
