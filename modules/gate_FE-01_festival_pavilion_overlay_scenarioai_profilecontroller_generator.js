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
// 1. components/FestivalOverlayScenarioAIProfileController.js
//
function controllerComponent() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIProfileController.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_PROFILE_CONTROLLER_COMPONENT";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_PROFILE_CONTROLLER_COMPONENT
import React, { useState } from "react";
import "./FestivalOverlayScenarioAIProfileController.css";
import { FestivalOverlayScenarioAIProfiles } from "../core/festivalOverlayScenarioAIProfiles";
import { generateOverlayScenarioAIWithProfile } from "../core/festivalOverlayScenarioAI";

export function FestivalOverlayScenarioAIProfileController({ runScenarioSteps, getCurrentState }) {
  const [profile, setProfile] = useState("CalmDirector");

  const selected = FestivalOverlayScenarioAIProfiles[profile];

  function runProfileScenario() {
    const state = getCurrentState();
    const steps = generateOverlayScenarioAIWithProfile(state, profile);
    runScenarioSteps(steps);
  }

  return (
    <div className="overlay-ai-profile-controller">
      <h3>AI Profile Controller</h3>

      <label>Profile</label>
      <select value={profile} onChange={(e) => setProfile(e.target.value)}>
        {Object.keys(FestivalOverlayScenarioAIProfiles).map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>

      <div className="profile-details">
        <div><strong>Speed:</strong> {selected.speed}</div>
        <div><strong>Intensity:</strong> {selected.intensity}</div>
        <div><strong>Preset Strategy:</strong> {selected.presetStrategy.name || "custom"}</div>
        <div><strong>Mode Strategy:</strong> {selected.modeStrategy.name || "custom"}</div>
        <div><strong>Notification Strategy:</strong> {selected.notificationStrategy.name || "custom"}</div>
      </div>

      <button className="profile-run-btn" onClick={runProfileScenario}>
        ▶ Run Profile Scenario
      </button>
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. components/FestivalOverlayScenarioAIProfileController.css
//
function controllerCSS() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIProfileController.css");
  const marker = "/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_PROFILE_CONTROLLER_CSS */";

  const block = `
/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_PROFILE_CONTROLLER_CSS */

.overlay-ai-profile-controller {
  position: fixed;
  bottom: 12px;
  left: 1360px;
  padding: 12px;
  background: rgba(0,0,0,0.75);
  color: #fff;
  border-radius: 8px;
  z-index: 9999;
  width: 260px;
  font-size: 13px;
}

.profile-details {
  margin-top: 10px;
  padding: 8px;
  background: rgba(255,255,255,0.05);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.profile-run-btn {
  margin-top: 12px;
  padding: 8px;
  border-radius: 6px;
  background: rgba(80,160,255,0.3);
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
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_PROFILE_CONTROLLER_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_PROFILE_CONTROLLER_INTEGRATION
import { FestivalOverlayScenarioAIProfileController } from "./FestivalOverlayScenarioAIProfileController";

// Example usage inside render:
// <FestivalOverlayScenarioAIProfileController
//    runScenarioSteps={runScenarioSteps}
//    getCurrentState={() => ({ pulse, mood, wave, reputation, identity, security, narrative })}
// />
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayScenarioAIProfileController Generator ===");
  ensureDir(CORE);
  ensureDir(COMPONENTS);
  controllerComponent();
  controllerCSS();
  integrateController();
  console.log("=== DONE ===");
}

main();
