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
// 1. MiniMapUltra Component
//
function miniMapUltraComponent() {
  const file = path.join(
    COMPONENTS,
    "FestivalOverlayScenarioAIHyperSuiteDockMiniMapUltra.js"
  );
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_ULTRA_COMPONENT";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_ULTRA_COMPONENT
import React, { useMemo } from "react";
import "./FestivalOverlayScenarioAIHyperSuiteDockMiniMapUltra.css";

export function FestivalOverlayScenarioAIHyperSuiteDockMiniMapUltra({ getCurrentState, historyRef }) {
  const state = getCurrentState();
  const history = historyRef?.current || [];

  const pulse = state.pulse;
  const wave = state.wave.intensity;
  const mood = state.mood;
  const reputation = state.reputation;
  const trust = state.security.trustLevel;
  const narrative = state.narrative;

  const trustColor = {
    low: "#ff4f4f",
    medium: "#ffb84f",
    high: "#4fff8a"
  }[trust] || "#ffffff";

  const repPercent = Math.min(100, (reputation.points % 100));

  const radarAngle = {
    default: 0,
    opening: 45,
    awards: 135,
    jury: 225,
    closing: 315
  }[narrative.phase] || 0;

  const radarX = 50 + 40 * Math.cos((radarAngle * Math.PI) / 180);
  const radarY = 50 + 40 * Math.sin((radarAngle * Math.PI) / 180);

  const waveEnergy = useMemo(() => {
    return history.slice(-20).map((s, i) => ({
      x: i * 5,
      y: 30 + Math.sin(i * 0.6 + s.pulse / 20) * 10 + s.wave.intensity * 20
    }));
  }, [history]);

  return (
    <div className="mini-map-ultra">
      <div className="ultra-header">
        <span className="ultra-title">CITY ULTRA HUD</span>
        <span className="ultra-tag">DIRECTOR VISION</span>
      </div>

      <div className="ultra-grid">
        <div className="ultra-card">
          <div className="ultra-label">Narrative Radar</div>
          <svg viewBox="0 0 100 100" className="ultra-radar">
            <circle cx="50" cy="50" r="40" className="ultra-radar-ring" />
            <line x1="50" y1="50" x2={radarX} y2={radarY} className="ultra-radar-line" />
            <circle cx={radarX} cy={radarY} r="3" className="ultra-radar-dot" />
          </svg>
          <div className="ultra-radar-phase">{narrative.phase}</div>
        </div>

        <div className="ultra-card">
          <div className="ultra-label">Reputation</div>
          <div className="ultra-rep-ring">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" className="ultra-rep-bg" />
              <circle
                cx="50"
                cy="50"
                r="40"
                className="ultra-rep-fill"
                strokeDasharray={\`\${repPercent * 2.5} 1000\`}
              />
            </svg>
            <div className="ultra-rep-text">
              L{reputation.level}<br />{reputation.points} pts
            </div>
          </div>
        </div>

        <div className="ultra-card">
          <div className="ultra-label">Trust</div>
          <div className="ultra-trust" style={{ backgroundColor: trustColor }}>
            {trust}
          </div>
        </div>

        <div className="ultra-card">
          <div className="ultra-label">Energy Waves</div>
          <svg viewBox="0 0 100 60" className="ultra-waves">
            <polyline
              fill="none"
              stroke="#4ffff0"
              strokeWidth="2"
              points={waveEnergy.map((p) => \`\${p.x},\${p.y}\`).join(" ")}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. MiniMapUltra CSS
//
function miniMapUltraCSS() {
  const file = path.join(
    COMPONENTS,
    "FestivalOverlayScenarioAIHyperSuiteDockMiniMapUltra.css"
  );
  const marker = "/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_ULTRA_CSS */";

  const block = `
/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_ULTRA_CSS */

.mini-map-ultra {
  position: fixed;
  bottom: 12px;
  left: 2750px;
  width: 260px;
  padding: 12px;
  background: rgba(0,0,20,0.85);
  border-radius: 12px;
  color: #fff;
  font-size: 11px;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 0 20px rgba(0,255,255,0.2);
}

.ultra-header {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  opacity: 0.9;
}

.ultra-title {
  font-weight: 600;
}

.ultra-tag {
  padding: 2px 6px;
  background: rgba(0,255,255,0.15);
  border-radius: 999px;
}

.ultra-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.ultra-card {
  background: rgba(255,255,255,0.05);
  padding: 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ultra-label {
  font-size: 10px;
  opacity: 0.7;
}

.ultra-radar {
  width: 100%;
  height: 80px;
}

.ultra-radar-ring {
  fill: none;
  stroke: rgba(0,255,255,0.2);
  stroke-width: 2;
}

.ultra-radar-line {
  stroke: #4ffff0;
  stroke-width: 2;
}

.ultra-radar-dot {
  fill: #4ffff0;
}

.ultra-radar-phase {
  text-align: center;
  font-size: 10px;
  opacity: 0.8;
}

.ultra-rep-ring {
  position: relative;
  width: 100%;
  height: 80px;
}

.ultra-rep-bg {
  fill: none;
  stroke: rgba(255,255,255,0.1);
  stroke-width: 6;
}

.ultra-rep-fill {
  fill: none;
  stroke: #4fff8a;
  stroke-width: 6;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dasharray 0.3s ease;
}

.ultra-rep-text {
  position: absolute;
  top: 22px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 10px;
  font-weight: 600;
}

.ultra-trust {
  padding: 6px;
  border-radius: 6px;
  text-align: center;
  font-weight: 600;
  font-size: 11px;
}

.ultra-waves {
  width: 100%;
  height: 60px;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. Integration with Dock
//
function integrateMiniMapUltra() {
  const file = path.join(
    COMPONENTS,
    "FestivalOverlayScenarioAIHyperSuiteDockMiniMapSwitcher.js"
  );
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_ULTRA_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_ULTRA_INTEGRATION
import { FestivalOverlayScenarioAIHyperSuiteDockMiniMapUltra } from "./FestivalOverlayScenarioAIHyperSuiteDockMiniMapUltra";

// Example usage:
// Add a third button "Ultra" and render MiniMapUltra when selected.
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayScenarioAIHyperSuiteDockMiniMapUltra Generator ===");
  ensureDir(COMPONENTS);
  miniMapUltraComponent();
  miniMapUltraCSS();
  integrateMiniMapUltra();
  console.log("=== DONE ===");
}

main();
