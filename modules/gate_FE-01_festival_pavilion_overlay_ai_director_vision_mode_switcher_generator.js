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
// 1. Component
//
function switcherComponent() {
  const file = path.join(COMPONENTS, "FestivalOverlayAIDirectorVisionModeSwitcher.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_VISION_MODE_SWITCHER_COMPONENT";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_VISION_MODE_SWITCHER_COMPONENT
import React from "react";
import "./FestivalOverlayAIDirectorVisionModeSwitcher.css";

export function FestivalOverlayAIDirectorVisionModeSwitcher({ mode, onChange }) {
  return (
    <div className="vision-switcher">
      <button
        className={mode === "OFF" ? "active" : ""}
        onClick={() => onChange("OFF")}
      >
        OFF
      </button>

      <button
        className={mode === "HUD" ? "active" : ""}
        onClick={() => onChange("HUD")}
      >
        HUD
      </button>

      <button
        className={mode === "HUD_ULTRA" ? "active" : ""}
        onClick={() => onChange("HUD_ULTRA")}
      >
        HUD Ultra
      </button>

      <button
        className={mode === "VISION" ? "active" : ""}
        onClick={() => onChange("VISION")}
      >
        Vision
      </button>
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. CSS
//
function switcherCSS() {
  const file = path.join(COMPONENTS, "FestivalOverlayAIDirectorVisionModeSwitcher.css");
  const marker = "/* FE_FESTIVAL_AI_DIRECTOR_VISION_MODE_SWITCHER_CSS */";

  const block = `
/* FE_FESTIVAL_AI_DIRECTOR_VISION_MODE_SWITCHER_CSS */

.vision-switcher {
  display: flex;
  gap: 6px;
  background: rgba(0,0,0,0.6);
  padding: 6px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1);
}

.vision-switcher button {
  background: rgba(255,255,255,0.1);
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  font-size: 11px;
}

.vision-switcher button.active {
  background: rgba(0,255,255,0.3);
  font-weight: bold;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. Integracja z HyperSuite
//
function integrateWithHyperSuite() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIHyperSuite.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_VISION_MODE_SWITCHER_INTEGRATION";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_VISION_MODE_SWITCHER_INTEGRATION
import { FestivalOverlayAIDirectorVisionModeSwitcher } from "./FestivalOverlayAIDirectorVisionModeSwitcher";

// Przykład:
// <FestivalOverlayAIDirectorVisionModeSwitcher mode={visionMode} onChange={setVisionMode} />
`;

  appendIfMissing(file, marker, block);
}

//
// 4. Integracja z Dockiem
//
function integrateWithDock() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIHyperSuiteDock.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_VISION_MODE_SWITCHER_DOCK";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_VISION_MODE_SWITCHER_DOCK
import { FestivalOverlayAIDirectorVisionModeSwitcher } from "./FestivalOverlayAIDirectorVisionModeSwitcher";
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayAIDirectorVisionModeSwitcher Generator ===");
  ensureDir(COMPONENTS);
  switcherComponent();
  switcherCSS();
  integrateWithHyperSuite();
  integrateWithDock();
  console.log("=== DONE ===");
}

main();
