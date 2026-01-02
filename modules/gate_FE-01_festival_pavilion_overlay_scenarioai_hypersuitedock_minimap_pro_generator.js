const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
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

function miniMapProComponent() {
  const file = path.join(
    COMPONENTS,
    "FestivalOverlayScenarioAIHyperSuiteDockMiniMapPro.js"
  );
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_PRO_COMPONENT";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_PRO_COMPONENT
import React, { useMemo } from "react";
import "./FestivalOverlayScenarioAIHyperSuiteDockMiniMapPro.css";

export function FestivalOverlayScenarioAIHyperSuiteDockMiniMapPro({ getCurrentState, historyRef }) {
  const state = getCurrentState();
  const history = historyRef?.current || [];

  const pulse = state.pulse;
  const wave = state.wave.intensity;
  const mood = state.mood;

  const moodColor = {
    Calm: "linear-gradient(135deg, #4fa3ff, #4ffff0)",
    Energetic: "linear-gradient(135deg, #ff4f4f, #ffb84f)",
    Creative: "linear-gradient(135deg, #ffb84f, #ffe94f)",
    Tense: "linear-gradient(135deg, #9b4fff, #ff4fb8)"
  }[mood] || "linear-gradient(135deg, #ffffff, #aaaaaa)";

  const pulseHistory = useMemo(
    () => history.slice(-20).map((s) => s.pulse),
    [history]
  );

  const waveHistory = useMemo(
    () => history.slice(-20).map((s) => s.wave.intensity),
    [history]
  );

  const maxPulse = Math.max(1, ...pulseHistory, pulse);
  const pulsePoints = pulseHistory.map((p, i) => {
    const x = (i / Math.max(1, pulseHistory.length - 1)) * 100;
    const y = 100 - (p / maxPulse) * 100;
    return \`\${x},\${y}\`;
  });

  const wavePoints = waveHistory.map((w, i) => {
    const x = (i / Math.max(1, waveHistory.length - 1)) * 100;
    const y = 100 - w * 100;
    return \`\${x},\${y}\`;
  });

  return (
    <div className="mini-map-pro">
      <div className="mini-map-pro-header">
        <span className="mini-map-pro-title">CITY HUD</span>
        <span className="mini-map-pro-tag">CINEMATIC</span>
      </div>

      <div className="mini-map-pro-row">
        <div className="mini-map-pro-block">
          <div className="mini-map-pro-label">Pulse</div>
          <div className="mini-map-pro-pulse">
            <span className="mini-map-pro-pulse-value">{pulse}</span>
            <span className="mini-map-pro-pulse-unit">BPM</span>
          </div>
          <div className="mini-map-pro-chart">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points={pulsePoints.join(" ")}
                fill="none"
                stroke="#ff4f4f"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        <div className="mini-map-pro-block">
          <div className="mini-map-pro-label">Wave</div>
          <div className="mini-map-pro-wave">
            <div className="mini-map-pro-wave-bar">
              <div
                className="mini-map-pro-wave-fill"
                style={{ height: \`\${wave * 100}%\` }}
              />
            </div>
            <span className="mini-map-pro-wave-value">
              {(wave * 100).toFixed(0)}%
            </span>
          </div>
          <div className="mini-map-pro-chart">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points={wavePoints.join(" ")}
                fill="none"
                stroke="#4fff8a"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="mini-map-pro-row">
        <div className="mini-map-pro-block mood-block">
          <div className="mini-map-pro-label">Mood</div>
          <div
            className="mini-map-pro-mood"
            style={{ backgroundImage: moodColor }}
          >
            <span className="mini-map-pro-mood-text">{mood}</span>
          </div>
        </div>

        <div className="mini-map-pro-block meta-block">
          <div className="mini-map-pro-label">Meta</div>
          <div className="mini-map-pro-meta-grid">
            <div>
              <span className="mini-map-pro-meta-label">Role</span>
              <span className="mini-map-pro-meta-value">{state.identity.role}</span>
            </div>
            <div>
              <span className="mini-map-pro-meta-label">Trust</span>
              <span className="mini-map-pro-meta-value">
                {state.security.trustLevel}
              </span>
            </div>
            <div>
              <span className="mini-map-pro-meta-label">Phase</span>
              <span className="mini-map-pro-meta-value">
                {state.narrative.phase}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

function miniMapProCSS() {
  const file = path.join(
    COMPONENTS,
    "FestivalOverlayScenarioAIHyperSuiteDockMiniMapPro.css"
  );
  const marker = "/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_PRO_CSS */";

  const block = `
/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_PRO_CSS */

.mini-map-pro {
  position: fixed;
  bottom: 12px;
  left: 2600px;
  width: 220px;
  padding: 10px;
  background: radial-gradient(circle at top left, rgba(80,80,120,0.9), rgba(0,0,0,0.9));
  border-radius: 10px;
  color: #fff;
  font-size: 11px;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 0 18px rgba(0,0,0,0.8);
  border: 1px solid rgba(255,255,255,0.08);
}

.mini-map-pro-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.9;
}

.mini-map-pro-title {
  font-weight: 600;
}

.mini-map-pro-tag {
  padding: 2px 6px;
  border-radius: 999px;
  background: rgba(255,255,255,0.08);
  font-size: 9px;
}

.mini-map-pro-row {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.mini-map-pro-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mini-map-pro-label {
  opacity: 0.7;
  font-size: 10px;
}

.mini-map-pro-pulse {
  display: flex;
  align-items: baseline;
  gap: 4px;
  justify-content: center;
  animation: miniMapProPulse 1.2s infinite ease-in-out;
}

.mini-map-pro-pulse-value {
  font-size: 18px;
  font-weight: 700;
}

.mini-map-pro-pulse-unit {
  font-size: 9px;
  opacity: 0.8;
}

@keyframes miniMapProPulse {
  0% { transform: scale(1); color: #fff; }
  50% { transform: scale(1.08); color: #ff8080; }
  100% { transform: scale(1); color: #fff; }
}

.mini-map-pro-chart {
  width: 100%;
  height: 40px;
  background: rgba(0,0,0,0.4);
  border-radius: 6px;
  overflow: hidden;
}

.mini-map-pro-chart svg {
  width: 100%;
  height: 100%;
}

.mini-map-pro-wave {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.mini-map-pro-wave-bar {
  width: 14px;
  height: 40px;
  background: rgba(255,255,255,0.08);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.mini-map-pro-wave-fill {
  width: 100%;
  background: linear-gradient(to top, #4fff8a, #4ffff0);
  position: absolute;
  bottom: 0;
  transition: height 0.25s ease-out;
}

.mini-map-pro-wave-value {
  font-size: 11px;
  opacity: 0.9;
}

.mood-block .mini-map-pro-mood {
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 11px;
  text-shadow: 0 0 6px rgba(0,0,0,0.8);
}

.meta-block .mini-map-pro-meta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  font-size: 10px;
}

.mini-map-pro-meta-label {
  opacity: 0.6;
  display: block;
}

.mini-map-pro-meta-value {
  font-weight: 600;
}
`;

  appendIfMissing(file, marker, block);
}

function integrateMiniMapPro() {
  const file = path.join(
    COMPONENTS,
    "FestivalOverlayScenarioAIHyperSuiteDock.js"
  );
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_PRO_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_PRO_INTEGRATION
import { FestivalOverlayScenarioAIHyperSuiteDockMiniMapPro } from "./FestivalOverlayScenarioAIHyperSuiteDockMiniMapPro";

// Example usage next to dock:
// <FestivalOverlayScenarioAIHyperSuiteDockMiniMapPro
//    getCurrentState={getCurrentState}
//    historyRef={hyper.history}
// />
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayScenarioAIHyperSuiteDockMiniMapPro Generator ===");
  ensureDir(COMPONENTS);
  miniMapProComponent();
  miniMapProCSS();
  integrateMiniMapPro();
  console.log("=== DONE ===");
}

main();
