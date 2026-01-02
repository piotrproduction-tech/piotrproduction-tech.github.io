const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");
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
// 1. components/FestivalOverlayScenarioAIOrchestratorController.js
//
function orchestratorControllerComponent() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIOrchestratorController.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_ORCHESTRATOR_CONTROLLER_COMPONENT";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_ORCHESTRATOR_CONTROLLER_COMPONENT
import React from "react";
import "./FestivalOverlayScenarioAIOrchestratorController.css";

export function FestivalOverlayScenarioAIOrchestratorController({ orchestrator, getCurrentState }) {
  const state = getCurrentState();

  return (
    <div className="overlay-ai-orchestrator-controller">
      <h3>AI Orchestrator</h3>

      <div className="orch-section">
        <label>Auto Mode</label>
        <button
          className={orchestrator.autoMode ? "orch-btn active" : "orch-btn"}
          onClick={() => orchestrator.setAutoMode(!orchestrator.autoMode)}
        >
          {orchestrator.autoMode ? "ON" : "OFF"}
        </button>
      </div>

      <div className="orch-section">
        <label>Active Profile</label>
        <div className="orch-value">{orchestrator.activeProfile}</div>
      </div>

      <div className="orch-section">
        <label>Current State</label>
        <div className="orch-state">
          <div><strong>Pulse:</strong> {state.pulse}</div>
          <div><strong>Mood:</strong> {state.mood}</div>
          <div><strong>Wave:</strong> {state.wave.intensity} ({state.wave.trend})</div>
          <div><strong>Reputation:</strong> L{state.reputation.level} / {state.reputation.points}pts</div>
          <div><strong>Role:</strong> {state.identity.role}</div>
          <div><strong>Trust:</strong> {state.security.trustLevel}</div>
          <div><strong>Narrative:</strong> {state.narrative.phase}</div>
        </div>
      </div>

      <button className="orch-run-btn" onClick={orchestrator.runOnce}>
        ▶ Run Once
      </button>
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. components/FestivalOverlayScenarioAIOrchestratorController.css
//
function orchestratorControllerCSS() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIOrchestratorController.css");
  const marker = "/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_ORCHESTRATOR_CONTROLLER_CSS */";

  const block = `
/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_ORCHESTRATOR_CONTROLLER_CSS */

.overlay-ai-orchestrator-controller {
  position: fixed;
  bottom: 12px;
  left: 1680px;
  padding: 12px;
  background: rgba(0,0,0,0.75);
  color: #fff;
  border-radius: 8px;
  z-index: 9999;
  width: 260px;
  font-size: 13px;
}

.orch-section {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.orch-btn {
  padding: 6px;
  border-radius: 6px;
  background: rgba(255,255,255,0.1);
  border: none;
  color: #fff;
  cursor: pointer;
}

.orch-btn.active {
  background: rgba(80,255,80,0.3);
}

.orch-value {
  padding: 6px;
  background: rgba(255,255,255,0.05);
  border-radius: 6px;
}

.orch-state {
  padding: 8px;
  background: rgba(255,255,255,0.05);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.orch-run-btn {
  margin-top: 12px;
  padding: 8px;
  border-radius: 6px;
  background: rgba(255,200,80,0.3);
  color: #fff;
  border: none;
  cursor: pointer;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. Integracja z FestivalOverlayController.js
//
function integrateController() {
  const file = path.join(COMPONENTS, "FestivalOverlayController.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_ORCHESTRATOR_CONTROLLER_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_ORCHESTRATOR_CONTROLLER_INTEGRATION
import { FestivalOverlayScenarioAIOrchestratorController } from "./FestivalOverlayScenarioAIOrchestratorController";

// Example usage inside render:
// <FestivalOverlayScenarioAIOrchestratorController
//    orchestrator={orchestrator}
//    getCurrentState={() => ({ pulse, mood, wave, reputation, identity, security, narrative })}
// />
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayScenarioAIOrchestratorController Generator ===");
  ensureDir(CORE);
  ensureDir(COMPONENTS);
  orchestratorControllerComponent();
  orchestratorControllerCSS();
  integrateController();
  console.log("=== DONE ===");
}

main();
