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
// 1. components/FestivalOverlayScenarioAIController.js
//
function controllerComponent() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIController.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_CONTROLLER_COMPONENT";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_CONTROLLER_COMPONENT
import React, { useState } from "react";
import "./FestivalOverlayScenarioAIController.css";

export function FestivalOverlayScenarioAIController({ runAIScenario }) {
  const [state, setState] = useState({
    pulse: 90,
    mood: "Calm",
    wave: { intensity: 0.3, trend: "stable" },
    reputation: { level: 1, points: 0 },
    identity: { role: "guest", badges: [] },
    security: { trustLevel: "medium" },
    narrative: { phase: "default", tag: "" }
  });

  function update(path, value) {
    const parts = path.split(".");
    setState((prev) => {
      const next = { ...prev };
      let ref = next;
      for (let i = 0; i < parts.length - 1; i++) {
        ref[parts[i]] = { ...ref[parts[i]] };
        ref = ref[parts[i]];
      }
      ref[parts[parts.length - 1]] = value;
      return next;
    });
  }

  return (
    <div className="overlay-ai-controller">
      <h3>AI Scenario Controller</h3>

      <div className="ai-section">
        <label>Pulse</label>
        <input
          type="number"
          value={state.pulse}
          onChange={(e) => update("pulse", Number(e.target.value))}
        />

        <label>Mood</label>
        <select
          value={state.mood}
          onChange={(e) => update("mood", e.target.value)}
        >
          <option>Calm</option>
          <option>Energetic</option>
          <option>Creative</option>
          <option>Tense</option>
        </select>

        <label>Wave Intensity</label>
        <input
          type="number"
          step="0.1"
          value={state.wave.intensity}
          onChange={(e) => update("wave.intensity", Number(e.target.value))}
        />

        <label>Wave Trend</label>
        <select
          value={state.wave.trend}
          onChange={(e) => update("wave.trend", e.target.value)}
        >
          <option>rising</option>
          <option>falling</option>
          <option>stable</option>
        </select>

        <label>Reputation Level</label>
        <input
          type="number"
          value={state.reputation.level}
          onChange={(e) => update("reputation.level", Number(e.target.value))}
        />

        <label>Reputation Points</label>
        <input
          type="number"
          value={state.reputation.points}
          onChange={(e) => update("reputation.points", Number(e.target.value))}
        />

        <label>Role</label>
        <select
          value={state.identity.role}
          onChange={(e) => update("identity.role", e.target.value)}
        >
          <option>guest</option>
          <option>creator</option>
          <option>jury</option>
          <option>admin</option>
        </select>

        <label>Security Trust</label>
        <select
          value={state.security.trustLevel}
          onChange={(e) => update("security.trustLevel", e.target.value)}
        >
          <option>low</option>
          <option>medium</option>
          <option>high</option>
        </select>

        <label>Narrative Phase</label>
        <select
          value={state.narrative.phase}
          onChange={(e) => update("narrative.phase", e.target.value)}
        >
          <option>default</option>
          <option>opening</option>
          <option>awards</option>
          <option>jury</option>
          <option>closing</option>
        </select>

        <label>Narrative Tag</label>
        <input
          type="text"
          value={state.narrative.tag}
          onChange={(e) => update("narrative.tag", e.target.value)}
        />
      </div>

      <button className="ai-run-btn" onClick={() => runAIScenario(state)}>
        ▶ Run AI Scenario
      </button>
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. components/FestivalOverlayScenarioAIController.css
//
function controllerCSS() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIController.css");
  const marker = "/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_CONTROLLER_CSS */";

  const block = `
/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_CONTROLLER_CSS */

.overlay-ai-controller {
  position: fixed;
  bottom: 12px;
  left: 1040px;
  padding: 12px;
  background: rgba(0,0,0,0.75);
  color: #fff;
  border-radius: 8px;
  z-index: 9999;
  width: 300px;
  font-size: 13px;
}

.ai-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ai-run-btn {
  margin-top: 12px;
  padding: 8px;
  border-radius: 6px;
  background: rgba(80,255,80,0.3);
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
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_CONTROLLER_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_CONTROLLER_INTEGRATION
import { FestivalOverlayScenarioAIController } from "./FestivalOverlayScenarioAIController";

// Example usage inside render:
// <FestivalOverlayScenarioAIController runAIScenario={runAIScenario} />
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayScenarioAIController Generator ===");
  ensureDir(CORE);
  ensureDir(COMPONENTS);
  controllerComponent();
  controllerCSS();
  integrateController();
  console.log("=== DONE ===");
}

main();
