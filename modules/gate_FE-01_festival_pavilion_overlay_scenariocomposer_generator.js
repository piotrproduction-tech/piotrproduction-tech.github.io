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
// 1. core/useFestivalOverlayScenarioComposer.js
//
function composerHook() {
  const file = path.join(CORE, "useFestivalOverlayScenarioComposer.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIOCOMPOSER_HOOK";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIOCOMPOSER_HOOK
// GUI editor for building overlay scenarios

import { useState } from "react";

export function useFestivalOverlayScenarioComposer() {
  const [scenarios, setScenarios] = useState({});
  const [currentName, setCurrentName] = useState("");
  const [steps, setSteps] = useState([]);

  function addStep(cmd, payload, delay) {
    setSteps((prev) => [...prev, { cmd, payload, delay }]);
  }

  function removeStep(index) {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  }

  function saveScenario(name) {
    setScenarios((prev) => ({
      ...prev,
      [name]: steps
    }));
  }

  function loadScenario(name) {
    setCurrentName(name);
    setSteps(scenarios[name] || []);
  }

  function clear() {
    setSteps([]);
    setCurrentName("");
  }

  return {
    scenarios,
    currentName,
    steps,
    addStep,
    removeStep,
    saveScenario,
    loadScenario,
    clear
  };
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. components/FestivalOverlayScenarioComposer.js — UI panel
//
function composerComponent() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioComposer.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIOCOMPOSER_COMPONENT";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIOCOMPOSER_COMPONENT
import React, { useState } from "react";
import "./FestivalOverlayScenarioComposer.css";

export function FestivalOverlayScenarioComposer({ composer, scenarioEngine }) {
  const [cmd, setCmd] = useState("setPreset");
  const [payload, setPayload] = useState("");
  const [delay, setDelay] = useState(0);
  const [scenarioName, setScenarioName] = useState("");

  return (
    <div className="overlay-scenariocomposer">
      <h3>Overlay Scenario Composer</h3>

      <div className="composer-section">
        <h4>Add Step</h4>

        <select value={cmd} onChange={(e) => setCmd(e.target.value)}>
          <option value="setPreset">setPreset</option>
          <option value="setMode">setMode</option>
          <option value="toggle">toggle</option>
          <option value="setToggles">setToggles</option>
        </select>

        <input
          type="text"
          placeholder="Payload"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
        />

        <input
          type="number"
          placeholder="Delay (ms)"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
        />

        <button onClick={() => composer.addStep(cmd, payload, delay)}>
          Add Step
        </button>
      </div>

      <div className="composer-section">
        <h4>Steps</h4>
        {composer.steps.map((s, i) => (
          <div key={i} className="step-row">
            <span>{s.cmd} — {s.payload} — {s.delay}ms</span>
            <button onClick={() => composer.removeStep(i)}>✖</button>
          </div>
        ))}
      </div>

      <div className="composer-section">
        <h4>Save Scenario</h4>
        <input
          type="text"
          placeholder="Scenario name"
          value={scenarioName}
          onChange={(e) => setScenarioName(e.target.value)}
        />
        <button onClick={() => composer.saveScenario(scenarioName)}>
          Save
        </button>
      </div>

      <div className="composer-section">
        <h4>Saved Scenarios</h4>
        {Object.keys(composer.scenarios).map((name) => (
          <div key={name} className="scenario-row">
            <span>{name}</span>
            <button onClick={() => composer.loadScenario(name)}>Load</button>
            <button onClick={() => scenarioEngine.runScenario(name)}>▶ Play</button>
          </div>
        ))}
      </div>

      <button className="clear-btn" onClick={composer.clear}>
        Clear Editor
      </button>
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. components/FestivalOverlayScenarioComposer.css
//
function composerCSS() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioComposer.css");
  const marker = "/* FE_FESTIVAL_OVERLAY_SCENARIOCOMPOSER_CSS */";

  const block = `
/* FE_FESTIVAL_OVERLAY_SCENARIOCOMPOSER_CSS */

.overlay-scenariocomposer {
  position: fixed;
  bottom: 12px;
  left: 720px;
  padding: 12px;
  background: rgba(0,0,0,0.75);
  color: #fff;
  border-radius: 8px;
  z-index: 9999;
  width: 300px;
  font-size: 13px;
}

.composer-section {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.step-row,
.scenario-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-btn {
  margin-top: 12px;
  padding: 6px;
  border-radius: 6px;
  background: rgba(255,80,80,0.3);
  color: #fff;
  border: none;
  cursor: pointer;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 4. Integracja z FestivalOverlayController.js
//
function integrateController() {
  const file = path.join(COMPONENTS, "FestivalOverlayController.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIOCOMPOSER_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIOCOMPOSER_INTEGRATION
import { FestivalOverlayScenarioComposer } from "./FestivalOverlayScenarioComposer";
import { useFestivalOverlayScenarioComposer } from "../core/useFestivalOverlayScenarioComposer";

const composer = useFestivalOverlayScenarioComposer();

// Example usage inside render:
// <FestivalOverlayScenarioComposer composer={composer} scenarioEngine={scenario} />
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayScenarioComposer Generator ===");
  ensureDir(CORE);
  ensureDir(COMPONENTS);
  composerHook();
  composerComponent();
  composerCSS();
  integrateController();
  console.log("=== DONE ===");
}

main();
