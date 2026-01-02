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
// 1. Dock Component
//
function dockComponent() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIHyperSuiteDock.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_COMPONENT";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_COMPONENT
import React, { useState } from "react";
import "./FestivalOverlayScenarioAIHyperSuiteDock.css";

import { FestivalOverlayScenarioAIHyperSuite } from "./FestivalOverlayScenarioAIHyperSuite";

export function FestivalOverlayScenarioAIHyperSuiteDock(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overlay-ai-hypersuite-dock">
      <button
        className={open ? "dock-toggle open" : "dock-toggle"}
        onClick={() => setOpen(!open)}
      >
        {open ? "▼ AI Suite" : "▲ AI Suite"}
      </button>

      {open && (
        <div className="dock-panel">
          <FestivalOverlayScenarioAIHyperSuite {...props} />
        </div>
      )}
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. Dock CSS
//
function dockCSS() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIHyperSuiteDock.css");
  const marker = "/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_CSS */";

  const block = `
/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_CSS */

.overlay-ai-hypersuite-dock {
  position: fixed;
  bottom: 12px;
  left: 12px;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dock-toggle {
  padding: 8px 12px;
  background: rgba(0,0,0,0.75);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.dock-toggle.open {
  background: rgba(80,255,80,0.3);
}

.dock-panel {
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding: 8px;
  background: rgba(0,0,0,0.65);
  border-radius: 8px;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. Integration hint
//
function integrateDock() {
  const file = path.join(COMPONENTS, "FestivalOverlayController.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_INTEGRATION
import { FestivalOverlayScenarioAIHyperSuiteDock } from "./FestivalOverlayScenarioAIHyperSuiteDock";

// Example usage inside render:
// <FestivalOverlayScenarioAIHyperSuiteDock
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
  console.log("=== FestivalOverlayScenarioAIHyperSuiteDock Generator ===");
  ensureDir(COMPONENTS);
  dockComponent();
  dockCSS();
  integrateDock();
  console.log("=== DONE ===");
}

main();
