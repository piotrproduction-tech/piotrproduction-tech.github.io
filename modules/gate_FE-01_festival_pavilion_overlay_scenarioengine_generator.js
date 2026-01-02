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
// 1. core/festivalOverlayScenarios.js — definicje scenariuszy
//
function scenarioDefinitions() {
  const file = path.join(CORE, "festivalOverlayScenarios.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIOS";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIOS
// High-level overlay scenarios with timed steps

export const FestivalOverlayScenarios = {
  OpeningCeremony: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 1000, cmd: "toggle", payload: "notifications" },
    { delay: 2000, cmd: "toggle", payload: "debug" },
    { delay: 3000, cmd: "setMode", payload: "full" }
  ],

  PeakActivity: [
    { delay: 0, cmd: "setPreset", payload: "Debug" },
    { delay: 1500, cmd: "setMode", payload: "full" },
    { delay: 3000, cmd: "toggle", payload: "notifications" }
  ],

  JuryMode: [
    { delay: 0, cmd: "setPreset", payload: "Minimal" },
    { delay: 2000, cmd: "toggle", payload: "debug" }
  ],

  ClosingCeremony: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 2000, cmd: "setMode", payload: "transparent" },
    { delay: 4000, cmd: "toggle", payload: "notifications" }
  ],

  CreatorSpotlight: [
    { delay: 0, cmd: "setPreset", payload: "Showcase" },
    { delay: 1500, cmd: "setMode", payload: "full" }
  ]
};
`;

  appendIfMissing(file, marker, block);
}

//
// 2. core/useFestivalOverlayScenarioEngine.js — główny silnik scenariuszy
//
function scenarioEngineHook() {
  const file = path.join(CORE, "useFestivalOverlayScenarioEngine.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIOENGINE_HOOK";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIOENGINE_HOOK
// Executes high-level overlay scenarios

import { useState } from "react";
import { FestivalOverlayScenarios } from "./festivalOverlayScenarios";

export function useFestivalOverlayScenarioEngine(presetManager, controller) {
  const [running, setRunning] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(null);

  async function runScenario(name) {
    const scenario = FestivalOverlayScenarios[name];
    if (!scenario) return;

    setRunning(true);
    setCurrentScenario(name);

    for (const step of scenario) {
      await new Promise((res) => setTimeout(res, step.delay));
      execute(step.cmd, step.payload);
    }

    setRunning(false);
    setCurrentScenario(null);
  }

  function execute(cmd, payload) {
    switch (cmd) {
      case "setPreset":
        presetManager.applyPreset(payload);
        break;

      case "setMode":
        controller.setMode(payload);
        break;

      case "toggle":
        controller.setToggles({
          ...controller.toggles,
          [payload]: !controller.toggles[payload]
        });
        break;

      case "setToggles":
        controller.setToggles(payload);
        break;

      default:
        console.warn("ScenarioEngine: unknown command", cmd);
    }
  }

  return {
    running,
    currentScenario,
    runScenario
  };
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. components/FestivalOverlayScenarioEngine.js — UI panel
//
function scenarioEngineComponent() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioEngine.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIOENGINE_COMPONENT";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIOENGINE_COMPONENT
import React from "react";
import "./FestivalOverlayScenarioEngine.css";
import { FestivalOverlayScenarios } from "../core/festivalOverlayScenarios";

export function FestivalOverlayScenarioEngine({ scenario }) {
  return (
    <div className="overlay-scenarioengine">
      <h3>Overlay Scenario Engine</h3>

      <div className="scenario-section">
        {Object.keys(FestivalOverlayScenarios).map((name) => (
          <button key={name} onClick={() => scenario.runScenario(name)}>
            ▶ {name}
          </button>
        ))}
      </div>

      {scenario.running && (
        <div className="scenario-running">
          Running: {scenario.currentScenario}
        </div>
      )}
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 4. components/FestivalOverlayScenarioEngine.css
//
function scenarioEngineCSS() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioEngine.css");
  const marker = "/* FE_FESTIVAL_OVERLAY_SCENARIOENGINE_CSS */";

  const block = `
/* FE_FESTIVAL_OVERLAY_SCENARIOENGINE_CSS */

.overlay-scenarioengine {
  position: fixed;
  bottom: 12px;
  left: 480px;
  padding: 12px;
  background: rgba(0,0,0,0.75);
  color: #fff;
  border-radius: 8px;
  z-index: 9999;
  width: 240px;
  font-size: 13px;
}

.scenario-section {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.overlay-scenarioengine button {
  padding: 6px;
  border-radius: 6px;
  background: rgba(255,255,255,0.1);
  color: #fff;
  border: none;
  cursor: pointer;
}

.scenario-running {
  margin-top: 12px;
  opacity: 0.8;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 5. Integracja z FestivalOverlayController.js
//
function integrateController() {
  const file = path.join(COMPONENTS, "FestivalOverlayController.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIOENGINE_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIOENGINE_INTEGRATION
import { FestivalOverlayScenarioEngine } from "./FestivalOverlayScenarioEngine";
import { useFestivalOverlayScenarioEngine } from "../core/useFestivalOverlayScenarioEngine";

const scenario = useFestivalOverlayScenarioEngine(presetManager, { mode, setMode, toggles, setToggles });

// Example usage inside render:
// <FestivalOverlayScenarioEngine scenario={scenario} />
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayScenarioEngine Generator ===");
  ensureDir(CORE);
  ensureDir(COMPONENTS);
  scenarioDefinitions();
  scenarioEngineHook();
  scenarioEngineComponent();
  scenarioEngineCSS();
  integrateController();
  console.log("=== DONE ===");
}

main();
