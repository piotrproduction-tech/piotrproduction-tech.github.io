const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const COMPONENTS = path.join(FE01, "components");
const CORE = path.join(FE01, "core");
const DIRECTOR = path.join(CORE, "director");

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
// 1. Component
//
function controlPanelComponent() {
  const file = path.join(COMPONENTS, "FestivalOverlayAIDirectorControlPanel.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_CONTROL_PANEL_COMPONENT";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_CONTROL_PANEL_COMPONENT
import React, { useState } from "react";
import "./FestivalOverlayAIDirectorControlPanel.css";

import { FestivalAIDirectorProfilesUltra } from "../core/director/festivalAIDirectorProfilesUltra";
import { setDirectorMode } from "../core/director/festivalAIDirectorSystem";
import { setDirectorMood } from "../core/director/festivalAIDirectorMoodEngine";
import { rememberDirectorEvent } from "../core/director/festivalAIDirectorMemory";

export function FestivalOverlayAIDirectorControlPanel({ director, onForceDecision }) {
  const [forcedDecision, setForcedDecision] = useState("");

  const profiles = Object.keys(FestivalAIDirectorProfilesUltra);

  return (
    <div className="director-control">
      <div className="director-control-header">
        <span className="director-control-title">AI Director Control</span>
      </div>

      <div className="director-control-section">
        <div className="director-control-label">Active Profile</div>
        <select
          className="director-control-select"
          value={director?.profile}
          onChange={(e) => {
            rememberDirectorEvent({ type: "MANUAL_PROFILE_SET", profile: e.target.value });
            onForceDecision({ manualProfile: e.target.value });
          }}
        >
          {profiles.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="director-control-section">
        <div className="director-control-label">Mode</div>
        <select
          className="director-control-select"
          value={director?.mode}
          onChange={(e) => {
            setDirectorMode(e.target.value);
            rememberDirectorEvent({ type: "MANUAL_MODE_SET", mode: e.target.value });
          }}
        >
          <option value="FILMIC">FILMIC</option>
          <option value="SYSTEMIC">SYSTEMIC</option>
          <option value="HYBRID">HYBRID</option>
        </select>
      </div>

      <div className="director-control-section">
        <div className="director-control-label">Mood</div>
        <select
          className="director-control-select"
          value={director?.mood}
          onChange={(e) => {
            setDirectorMood(e.target.value);
            rememberDirectorEvent({ type: "MANUAL_MOOD_SET", mood: e.target.value });
          }}
        >
          <option value="Calm">Calm</option>
          <option value="Energetic">Energetic</option>
          <option value="Creative">Creative</option>
          <option value="Tense">Tense</option>
          <option value="Focused">Focused</option>
          <option value="Chaotic">Chaotic</option>
        </select>
      </div>

      <div className="director-control-section">
        <div className="director-control-label">Force Decision</div>
        <textarea
          className="director-control-textarea"
          value={forcedDecision}
          onChange={(e) => setForcedDecision(e.target.value)}
          placeholder="{ action: 'trigger_scene', scene: 'spotlight' }"
        />

        <button
          className="director-control-btn"
          onClick={() => {
            try {
              const parsed = JSON.parse(forcedDecision);
              onForceDecision({ manualDecision: parsed });
              rememberDirectorEvent({ type: "MANUAL_DECISION", decision: parsed });
            } catch (err) {
              alert("Invalid JSON");
            }
          }}
        >
          Apply
        </button>
      </div>

      <div className="director-control-section">
        <button
          className="director-control-btn danger"
          onClick={() => {
            rememberDirectorEvent({ type: "RESET_MEMORY" });
            onForceDecision({ resetMemory: true });
          }}
        >
          Reset Memory
        </button>
      </div>
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. CSS
//
function controlPanelCSS() {
  const file = path.join(COMPONENTS, "FestivalOverlayAIDirectorControlPanel.css");
  const marker = "/* FE_FESTIVAL_AI_DIRECTOR_CONTROL_PANEL_CSS */";

  const block = `
/* FE_FESTIVAL_AI_DIRECTOR_CONTROL_PANEL_CSS */

.director-control {
  width: 260px;
  background: rgba(0,0,0,0.75);
  padding: 12px;
  border-radius: 10px;
  color: #fff;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid rgba(255,255,255,0.1);
}

.director-control-header {
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

.director-control-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.director-control-label {
  opacity: 0.7;
  font-size: 11px;
}

.director-control-select,
.director-control-textarea {
  background: rgba(255,255,255,0.1);
  border: none;
  padding: 6px;
  border-radius: 6px;
  color: #fff;
}

.director-control-textarea {
  height: 60px;
  resize: none;
}

.director-control-btn {
  padding: 6px;
  background: rgba(0,255,150,0.2);
  border: none;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
}

.director-control-btn.danger {
  background: rgba(255,0,0,0.3);
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. Integracja z HyperSuite
//
function integrateWithHyperSuite() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIHyperSuite.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_CONTROL_PANEL_INTEGRATION";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_CONTROL_PANEL_INTEGRATION
import { FestivalOverlayAIDirectorControlPanel } from "./FestivalOverlayAIDirectorControlPanel";

// Przykład użycia:
// <FestivalOverlayAIDirectorControlPanel director={director} onForceDecision={handleForceDecision} />
`;

  appendIfMissing(file, marker, block);
}

//
// 4. Integracja z Dockiem
//
function integrateWithDock() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIHyperSuiteDock.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_CONTROL_PANEL_DOCK";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_CONTROL_PANEL_DOCK
import { FestivalOverlayAIDirectorControlPanel } from "./FestivalOverlayAIDirectorControlPanel";
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayAIDirectorControlPanel Generator ===");
  ensureDir(COMPONENTS);
  controlPanelComponent();
  controlPanelCSS();
  integrateWithHyperSuite();
  integrateWithDock();
  console.log("=== DONE ===");
}

main();
