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
// 1. ULTRA HUD Component
//
function hudUltraComponent() {
  const file = path.join(COMPONENTS, "FestivalOverlayAIDirectorHUDUltra.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_HUD_ULTRA_COMPONENT";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_HUD_ULTRA_COMPONENT
import React from "react";
import "./FestivalOverlayAIDirectorHUDUltra.css";

export function FestivalOverlayAIDirectorHUDUltra({ director }) {
  if (!director) return null;

  const { profile, mode, mood, decision } = director;

  const moodColor = {
    Calm: "#4ffff0",
    Energetic: "#ff4f9a",
    Creative: "#ffdd4f",
    Tense: "#ff4f4f",
    Focused: "#4fff8a",
    Chaotic: "#ff7bff"
  }[mood] || "#ffffff";

  return (
    <div className="director-hud-ultra" style={{ borderColor: moodColor }}>
      <div className="hud-ultra-header">
        <span className="hud-ultra-title">DIRECTOR VISION HUD</span>
      </div>

      <div className="hud-ultra-radar">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" className="hud-ultra-radar-ring" />
          <circle cx="50" cy="50" r="30" className="hud-ultra-radar-ring" />
          <circle cx="50" cy="50" r="15" className="hud-ultra-radar-ring" />
          <line x1="50" y1="50" x2="95" y2="50" className="hud-ultra-radar-line" />
        </svg>
      </div>

      <div className="hud-ultra-section">
        <span className="hud-ultra-label">Profile</span>
        <span className="hud-ultra-value" style={{ color: moodColor }}>{profile}</span>
      </div>

      <div className="hud-ultra-section">
        <span className="hud-ultra-label">Mode</span>
        <span className="hud-ultra-value">{mode}</span>
      </div>

      <div className="hud-ultra-section">
        <span className="hud-ultra-label">Mood</span>
        <span className="hud-ultra-value" style={{ color: moodColor }}>{mood}</span>
      </div>

      <div className="hud-ultra-waveform">
        <div className="hud-ultra-wave" />
      </div>

      <div className="hud-ultra-section decision">
        <span className="hud-ultra-label">Decision</span>
        <span className="hud-ultra-value decision-text">
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
// 2. ULTRA HUD CSS
//
function hudUltraCSS() {
  const file = path.join(COMPONENTS, "FestivalOverlayAIDirectorHUDUltra.css");
  const marker = "/* FE_FESTIVAL_AI_DIRECTOR_HUD_ULTRA_CSS */";

  const block = `
/* FE_FESTIVAL_AI_DIRECTOR_HUD_ULTRA_CSS */

.director-hud-ultra {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 260px;
  background: rgba(0,0,20,0.75);
  backdrop-filter: blur(8px);
  padding: 14px;
  border-radius: 14px;
  color: #fff;
  font-size: 12px;
  z-index: 999999;
  border: 2px solid rgba(0,255,255,0.4);
  box-shadow: 0 0 25px rgba(0,255,255,0.25);
  animation: hudGlow 3s infinite alternate;
}

@keyframes hudGlow {
  from { box-shadow: 0 0 10px rgba(0,255,255,0.2); }
  to { box-shadow: 0 0 25px rgba(0,255,255,0.5); }
}

.hud-ultra-header {
  text-align: center;
  margin-bottom: 10px;
}

.hud-ultra-title {
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 1px;
  opacity: 0.9;
}

.hud-ultra-radar {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

.hud-ultra-radar-ring {
  fill: none;
  stroke: rgba(0,255,255,0.2);
  stroke-width: 2;
}

.hud-ultra-radar-line {
  stroke: rgba(0,255,255,0.5);
  stroke-width: 2;
  animation: radarSweep 4s linear infinite;
  transform-origin: 50% 50%;
}

@keyframes radarSweep {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.hud-ultra-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.hud-ultra-label {
  opacity: 0.7;
}

.hud-ultra-value {
  font-weight: 600;
}

.hud-ultra-waveform {
  height: 30px;
  margin: 10px 0;
  overflow: hidden;
}

.hud-ultra-wave {
  width: 200%;
  height: 100%;
  background: repeating-linear-gradient(
    to right,
    rgba(0,255,255,0.4) 0px,
    rgba(0,255,255,0.4) 2px,
    transparent 2px,
    transparent 4px
  );
  animation: waveMove 2s linear infinite;
}

@keyframes waveMove {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.decision-text {
  font-size: 10px;
  opacity: 0.9;
  max-width: 140px;
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
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_HUD_ULTRA_INTEGRATION";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_HUD_ULTRA_INTEGRATION
import { FestivalOverlayAIDirectorHUDUltra } from "./FestivalOverlayAIDirectorHUDUltra";

// Przykład:
// <FestivalOverlayAIDirectorHUDUltra director={director} />
`;

  appendIfMissing(file, marker, block);
}

//
// 4. Integracja z Dockiem
//
function integrateWithDock() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIHyperSuiteDock.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_HUD_ULTRA_DOCK";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_HUD_ULTRA_DOCK
import { FestivalOverlayAIDirectorHUDUltra } from "./FestivalOverlayAIDirectorHUDUltra";
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayAIDirectorHUDUltra Generator ===");
  ensureDir(COMPONENTS);
  hudUltraComponent();
  hudUltraCSS();
  integrateWithHyperSuite();
  integrateWithDock();
  console.log("=== DONE ===");
}

main();
