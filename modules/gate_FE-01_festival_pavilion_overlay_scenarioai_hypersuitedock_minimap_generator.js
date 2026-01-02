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

//
// 1. MiniMap Component
//
function miniMapComponent() {
  const file = path.join(
    COMPONENTS,
    "FestivalOverlayScenarioAIHyperSuiteDockMiniMap.js"
  );
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_COMPONENT";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_COMPONENT
import React from "react";
import "./FestivalOverlayScenarioAIHyperSuiteDockMiniMap.css";

export function FestivalOverlayScenarioAIHyperSuiteDockMiniMap({ getCurrentState }) {
  const state = getCurrentState();

  const pulse = state.pulse;
  const wave = state.wave.intensity;
  const mood = state.mood;

  const moodColor = {
    Calm: "#4fa3ff",
    Energetic: "#ff4f4f",
    Creative: "#ffb84f",
    Tense: "#9b4fff"
  }[mood] || "#ffffff";

  return (
    <div className="mini-map-basic">
      <div className="mini-map-basic-section">
        <div className="mini-map-basic-label">Pulse</div>
        <div
          className="mini-map-basic-pulse"
          style={{ animationDuration: \`\${2000 / pulse}ms\` }}
        >
          {pulse}
        </div>
      </div>

      <div className="mini-map-basic-section">
        <div className="mini-map-basic-label">Wave</div>
        <div className="mini-map-basic-wave-bar">
          <div
            className="mini-map-basic-wave-fill"
            style={{ height: \`\${wave * 100}%\` }}
          />
        </div>
      </div>

      <div className="mini-map-basic-section">
        <div className="mini-map-basic-label">Mood</div>
        <div
          className="mini-map-basic-mood"
          style={{ backgroundColor: moodColor }}
        >
          {mood}
        </div>
      </div>
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. MiniMap CSS
//
function miniMapCSS() {
  const file = path.join(
    COMPONENTS,
    "FestivalOverlayScenarioAIHyperSuiteDockMiniMap.css"
  );
  const marker = "/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_CSS */";

  const block = `
/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_CSS */

.mini-map-basic {
  position: fixed;
  bottom: 12px;
  left: 2500px;
  width: 140px;
  padding: 10px;
  background: rgba(0,0,0,0.75);
  border-radius: 8px;
  color: #fff;
  font-size: 12px;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mini-map-basic-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mini-map-basic-label {
  opacity: 0.7;
  font-size: 11px;
}

.mini-map-basic-pulse {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  animation: miniMapBasicPulse infinite ease-in-out;
}

@keyframes miniMapBasicPulse {
  0% { transform: scale(1); color: #fff; }
  50% { transform: scale(1.2); color: #ff4f4f; }
  100% { transform: scale(1); color: #fff; }
}

.mini-map-basic-wave-bar {
  width: 20px;
  height: 60px;
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
  overflow: hidden;
  margin: 0 auto;
}

.mini-map-basic-wave-fill {
  width: 100%;
  background: #4fff8a;
  transition: height 0.3s ease;
}

.mini-map-basic-mood {
  padding: 4px 6px;
  border-radius: 4px;
  text-align: center;
  font-size: 11px;
  font-weight: bold;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. Integration with HyperSuiteDock
//
function integrateMiniMap() {
  const file = path.join(
    COMPONENTS,
    "FestivalOverlayScenarioAIHyperSuiteDock.js"
  );
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_INTEGRATION
import { FestivalOverlayScenarioAIHyperSuiteDockMiniMap } from "./FestivalOverlayScenarioAIHyperSuiteDockMiniMap";

// Example usage next to dock:
// <FestivalOverlayScenarioAIHyperSuiteDockMiniMap getCurrentState={getCurrentState} />
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayScenarioAIHyperSuiteDockMiniMap Generator ===");
  ensureDir(COMPONENTS);
  miniMapComponent();
  miniMapCSS();
  integrateMiniMap();
  console.log("=== DONE ===");
}

main();
