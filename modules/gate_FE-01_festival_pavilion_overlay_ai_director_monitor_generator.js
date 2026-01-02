const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const COMPONENTS = path.join(FE01, "components");
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

//
// 1. Component
//
function directorMonitorComponent() {
  const file = path.join(COMPONENTS, "FestivalOverlayAIDirectorMonitor.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_MONITOR_COMPONENT";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_MONITOR_COMPONENT
import React from "react";
import "./FestivalOverlayAIDirectorMonitor.css";

export function FestivalOverlayAIDirectorMonitor({ director }) {
  if (!director) return null;

  const { profile, mode, mood, decision, history } = director;

  return (
    <div className="director-monitor">
      <div className="director-monitor-header">
        <span className="director-monitor-title">AI Director Monitor</span>
      </div>

      <div className="director-monitor-section">
        <div className="director-monitor-label">Profile</div>
        <div className="director-monitor-value">{profile}</div>
      </div>

      <div className="director-monitor-section">
        <div className="director-monitor-label">Mode</div>
        <div className="director-monitor-value">{mode}</div>
      </div>

      <div className="director-monitor-section">
        <div className="director-monitor-label">Mood</div>
        <div className="director-monitor-value">{mood}</div>
      </div>

      <div className="director-monitor-section">
        <div className="director-monitor-label">Last Decision</div>
        <div className="director-monitor-value decision-box">
          {JSON.stringify(decision, null, 2)}
        </div>
      </div>

      <div className="director-monitor-section">
        <div className="director-monitor-label">History (20)</div>
        <div className="director-monitor-history">
          {history.map((h, i) => (
            <div key={i} className="director-monitor-history-item">
              <span>{new Date(h.timestamp).toLocaleTimeString()}</span>
              <span>{h.profile}</span>
              <span>{h.mood}</span>
              <span>{h.type}</span>
            </div>
          ))}
        </div>
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
function directorMonitorCSS() {
  const file = path.join(COMPONENTS, "FestivalOverlayAIDirectorMonitor.css");
  const marker = "/* FE_FESTIVAL_AI_DIRECTOR_MONITOR_CSS */";

  const block = `
/* FE_FESTIVAL_AI_DIRECTOR_MONITOR_CSS */

.director-monitor {
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

.director-monitor-header {
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

.director-monitor-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.director-monitor-label {
  opacity: 0.7;
  font-size: 11px;
}

.director-monitor-value {
  background: rgba(255,255,255,0.1);
  padding: 6px;
  border-radius: 6px;
  font-size: 12px;
}

.director-monitor-history {
  max-height: 140px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.director-monitor-history-item {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  opacity: 0.8;
}

.decision-box {
  font-size: 10px;
  white-space: pre-wrap;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. Integracja z HyperSuite
//
function integrateWithHyperSuite() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIHyperSuite.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_MONITOR_INTEGRATION";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_MONITOR_INTEGRATION
import { FestivalOverlayAIDirectorMonitor } from "./FestivalOverlayAIDirectorMonitor";

// Przykład użycia w HyperSuite:
// <FestivalOverlayAIDirectorMonitor director={director} />
`;

  appendIfMissing(file, marker, block);
}

//
// 4. Integracja z Dockiem
//
function integrateWithDock() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIHyperSuiteDock.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_MONITOR_DOCK_INTEGRATION";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_MONITOR_DOCK_INTEGRATION
import { FestivalOverlayAIDirectorMonitor } from "./FestivalOverlayAIDirectorMonitor";

// Przykład użycia obok docka:
// <FestivalOverlayAIDirectorMonitor director={director} />
`;

  appendIfMissing(file, marker, block);
}

//
// 5. Integracja z DirectorSystem
//
function integrateWithDirectorSystem() {
  const file = path.join(CORE, "festivalHyperOrchestrator.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_MONITOR_DIRECTOR_SYSTEM";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_MONITOR_DIRECTOR_SYSTEM
// Przykład:
// const director = computeDirectorDecision(...);
// uiState.director = director;
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayAIDirectorMonitor Generator ===");
  ensureDir(COMPONENTS);
  directorMonitorComponent();
  directorMonitorCSS();
  integrateWithHyperSuite();
  integrateWithDock();
  integrateWithDirectorSystem();
  console.log("=== DONE ===");
}

main();
