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
// 1. Vision Overlay Component
//
function visionOverlayComponent() {
  const file = path.join(COMPONENTS, "FestivalOverlayAIDirectorVisionOverlay.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_VISION_OVERLAY_COMPONENT";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_VISION_OVERLAY_COMPONENT
import React from "react";
import "./FestivalOverlayAIDirectorVisionOverlay.css";

export function FestivalOverlayAIDirectorVisionOverlay({ director }) {
  if (!director) return null;

  const { mood } = director;

  const moodColor = {
    Calm: "#4ffff0",
    Energetic: "#ff4f9a",
    Creative: "#ffdd4f",
    Tense: "#ff4f4f",
    Focused: "#4fff8a",
    Chaotic: "#ff7bff"
  }[mood] || "#00ffff";

  return (
    <div className="director-vision-overlay">
      <div className="vision-grid" style={{ borderColor: moodColor }} />

      <div className="vision-scan" />

      <div className="vision-corners">
        <div className="corner tl" style={{ borderColor: moodColor }} />
        <div className="corner tr" style={{ borderColor: moodColor }} />
        <div className="corner bl" style={{ borderColor: moodColor }} />
        <div className="corner br" style={{ borderColor: moodColor }} />
      </div>

      <div className="vision-center-pulse" style={{ borderColor: moodColor }} />
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. Vision Overlay CSS
//
function visionOverlayCSS() {
  const file = path.join(COMPONENTS, "FestivalOverlayAIDirectorVisionOverlay.css");
  const marker = "/* FE_FESTIVAL_AI_DIRECTOR_VISION_OVERLAY_CSS */";

  const block = `
/* FE_FESTIVAL_AI_DIRECTOR_VISION_OVERLAY_CSS */

.director-vision-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999998;
}

.vision-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,255,255,0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,255,0.15) 1px, transparent 1px);
  background-size: 40px 40px;
  border: 2px solid rgba(0,255,255,0.3);
  opacity: 0.4;
}

.vision-scan {
  position: absolute;
  top: -100%;
  left: 0;
  right: 0;
  height: 200%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0,255,255,0.15) 50%,
    transparent 100%
  );
  animation: scanMove 6s linear infinite;
}

@keyframes scanMove {
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
}

.vision-corners .corner {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 3px solid;
  opacity: 0.8;
}

.corner.tl { top: 10px; left: 10px; border-right: none; border-bottom: none; }
.corner.tr { top: 10px; right: 10px; border-left: none; border-bottom: none; }
.corner.bl { bottom: 10px; left: 10px; border-right: none; border-top: none; }
.corner.br { bottom: 10px; right: 10px; border-left: none; border-top: none; }

.vision-center-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  transform: translate(-50%, -50%);
  border: 2px solid;
  border-radius: 50%;
  opacity: 0.6;
  animation: pulse 2.5s ease-in-out infinite;
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.4; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.4; }
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. Integracja z HyperSuite
//
function integrateWithHyperSuite() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIHyperSuite.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_VISION_OVERLAY_INTEGRATION";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_VISION_OVERLAY_INTEGRATION
import { FestivalOverlayAIDirectorVisionOverlay } from "./FestivalOverlayAIDirectorVisionOverlay";

// Przykład:
// <FestivalOverlayAIDirectorVisionOverlay director={director} />
`;

  appendIfMissing(file, marker, block);
}

//
// 4. Integracja z Dockiem
//
function integrateWithDock() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIHyperSuiteDock.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_VISION_OVERLAY_DOCK";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_VISION_OVERLAY_DOCK
import { FestivalOverlayAIDirectorVisionOverlay } from "./FestivalOverlayAIDirectorVisionOverlay";
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayAIDirectorVisionOverlay Generator ===");
  ensureDir(COMPONENTS);
  visionOverlayComponent();
  visionOverlayCSS();
  integrateWithHyperSuite();
  integrateWithDock();
  console.log("=== DONE ===");
}

main();
