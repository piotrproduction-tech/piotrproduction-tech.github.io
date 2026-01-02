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
// 1. components/FestivalOverlayScenarioAIHyperOrchestratorController.js
//
function controllerComponent() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIHyperOrchestratorController.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERORCHESTRATOR_CONTROLLER_COMPONENT";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERORCHESTRATOR_CONTROLLER_COMPONENT
import React from "react";
import "./FestivalOverlayScenarioAIHyperOrchestratorController.css";

export function FestivalOverlayScenarioAIHyperOrchestratorController({ hyper, getCurrentState }) {
  const state = getCurrentState();
  const history = hyper.history.current || [];

  const avgPulse = history.length
    ? (history.reduce((a, s) => a + s.pulse, 0) / history.length).toFixed(1)
    : "-";

  const avgWave = history.length
    ? (history.reduce((a, s) => a + s.wave.intensity, 0) / history.length).toFixed(2)
    : "-";

  const dominantMood = history.length
    ? Object.entries(
        history.reduce((acc, s) => {
          acc[s.mood] = (acc[s.mood] || 0) + 1;
          return acc;
        }, {})
      ).sort((a, b) => b[1] - a[1])[0][0]
    : "-";

  return (
    <div className="overlay-ai-hyperorchestrator-controller">
      <h3>AI HyperOrchestrator</h3>

      <div className="hyper-section">
        <label>Hyper Mode</label>
        <button
          className={hyper.enabled ? "hyper-btn active" : "hyper-btn"}
          onClick={() => hyper.setEnabled(!hyper.enabled)}
        >
          {hyper.enabled ? "ON" : "OFF"}
        </button>
      </div>

      <div className="hyper-section">
        <label>Active Profile</label>
        <div className="hyper-value">{hyper.activeProfile}</div>
      </div>

      <div className="hyper-section">
        <label>Metrics</label>
        <div className="hyper-metrics">
          <div><strong>Avg Pulse:</strong> {avgPulse}</div>
          <div><strong>Avg Wave:</strong> {avgWave}</div>
          <div><strong>Dominant Mood:</strong> {dominantMood}</div>
        </div>
      </div>

      <div className="hyper-section">
        <label>History ({history.length})</label>
        <div className="hyper-history">
          {history.slice(-10).map((s, i) => (
            <div key={i} className="hyper-history-row">
              <span>P:{s.pulse}</span>
              <span>W:{s.wave.intensity}</span>
              <span>M:{s.mood}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="hyper-run-btn" onClick={hyper.runOnce}>
        ▶ Run Hyper Scenario
      </button>
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. components/FestivalOverlayScenarioAIHyperOrchestratorController.css
//
function controllerCSS() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIHyperOrchestratorController.css");
  const marker = "/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERORCHESTRATOR_CONTROLLER_CSS */";

  const block = `
/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERORCHESTRATOR_CONTROLLER_CSS */

.overlay-ai-hyperorchestrator-controller {
  position: fixed;
  bottom: 12px;
  left: 2320px;
  padding: 12px;
  background: rgba(0,0,0,0.75);
  color: #fff;
  border-radius: 8px;
  z-index: 9999;
  width: 260px;
  font-size: 13px;
}

.hyper-section {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hyper-btn {
  padding: 6px;
  border-radius: 6px;
  background: rgba(255,255,255,0.1);
  border: none;
  color: #fff;
  cursor: pointer;
}

.hyper-btn.active {
  background: rgba(80,255,80,0.3);
}

.hyper-value {
  padding: 6px;
  background: rgba(255,255,255,0.05);
  border-radius: 6px;
}

.hyper-metrics,
.hyper-history {
  padding: 8px;
  background: rgba(255,255,255,0.05);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hyper-history-row {
  display: flex;
  justify-content: space-between;
  opacity: 0.8;
}

.hyper-run-btn {
  margin-top: 12px;
  padding: 8px;
  border-radius: 6px;
  background: rgba(120,80,255,0.3);
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
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERORCHESTRATOR_CONTROLLER_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERORCHESTRATOR_CONTROLLER_INTEGRATION
import { FestivalOverlayScenarioAIHyperOrchestratorController } from "./FestivalOverlayScenarioAIHyperOrchestratorController";

// Example usage inside render:
// <FestivalOverlayScenarioAIHyperOrchestratorController
//    hyper={hyper}
//    getCurrentState={() => ({ pulse, mood, wave, reputation, identity, security, narrative })}
// />
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayScenarioAIHyperOrchestratorController Generator ===");
  ensureDir(CORE);
  ensureDir(COMPONENTS);
  controllerComponent();
  controllerCSS();
  integrateController();
  console.log("=== DONE ===");
}

main();
