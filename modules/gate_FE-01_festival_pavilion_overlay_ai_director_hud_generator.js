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
// 1. HUD Component
//
function hudComponent() {
  const file = path.join(COMPONENTS, "FestivalOverlayAIDirectorHUD.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_HUD_COMPONENT";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_HUD_COMPONENT
import React from "react";
import "./FestivalOverlayAIDirectorHUD.css";

export function FestivalOverlayAIDirectorHUD({ director }) {
  if (!director) return null;

  const { profile, mode, mood, decision } = director;

  return (
    <div className="director-hud">
      <div className="director-hud-row">
        <span className="director-hud-label">Profile</span>
        <span className="director-hud-value">{profile}</span>
      </div>

      <div className="director-hud-row">
        <span className="director-hud-label">Mode</span>
        <span className="director-hud-value">{mode}</span>
      </div>

      <div className="director-hud-row">
        <span className="director-hud-label">Mood</span>
        <span className="director-hud-value">{mood}</span>
      </div>

      <div className="director-hud-row decision">
        <span className="director-hud-label">Decision</span>
        <span className="director-hud-value decision-text">
          {decision ? JSON.stringify(decision) : "—"}
        </span>
      </div>
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. HUD CSS
//
function hudCSS() {
  const file = path.join(COMPONENTS, "FestivalOverlayAIDirectorHUD.css");
  const marker = "/* FE_FESTIVAL_AI_DIRECTOR_HUD_CSS */";

  const block = `
/* FE_FESTIVAL_AI_DIRECTOR_HUD_CSS */

.director-hud {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 220px;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(6px);
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 11px;
  z-index: 999999;
  border: 1px solid rgba(255,255,255,0.15);
  box-shadow: 0 0 12px rgba(0,255,255,0.2);
}

.director-hud-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.director-hud-label {
  opacity: 0.7;
}

.director-hud-value {
  font-weight: 600;
}

.director-hud-row.decision {
  margin-top: 10px;
}

.decision-text {
  font-size: 10px;
  opacity: 0.9;
  max-width: 120px;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. Integracja z HyperSuite
//
function integrateWithHyperSuite() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIHyperSuite.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_HUD_INTEGRATION";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_HUD_INTEGRATION
import { FestivalOverlayAIDirectorHUD } from "./FestivalOverlayAIDirectorHUD";

// Przykład użycia:
// <FestivalOverlayAIDirectorHUD director={director} />
`;

  appendIfMissing(file, marker, block);
}

//
// 4. Integracja z Dockiem
//
function integrateWithDock() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIHyperSuiteDock.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_HUD_DOCK";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_HUD_DOCK
import { FestivalOverlayAIDirectorHUD } from "./FestivalOverlayAIDirectorHUD";
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayAIDirectorHUD Generator ===");
  ensureDir(COMPONENTS);
  hudComponent();
  hudCSS();
  integrateWithHyperSuite();
  integrateWithDock();
  console.log("=== DONE ===");
}

main();
