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
// 1. MiniMap Switcher Component
//
function switcherComponent() {
  const file = path.join(
    COMPONENTS,
    "FestivalOverlayScenarioAIHyperSuiteDockMiniMapSwitcher.js"
  );
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_SWITCHER_COMPONENT";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_SWITCHER_COMPONENT
import React, { useState } from "react";
import "./FestivalOverlayScenarioAIHyperSuiteDockMiniMapSwitcher.css";

import { FestivalOverlayScenarioAIHyperSuiteDockMiniMap } from "./FestivalOverlayScenarioAIHyperSuiteDockMiniMap";
import { FestivalOverlayScenarioAIHyperSuiteDockMiniMapPro } from "./FestivalOverlayScenarioAIHyperSuiteDockMiniMapPro";

export function FestivalOverlayScenarioAIHyperSuiteDockMiniMapSwitcher({
  getCurrentState,
  historyRef
}) {
  const [mode, setMode] = useState("basic");

  return (
    <div className="mini-map-switcher">
      <button
        className={mode === "basic" ? "switcher-btn active" : "switcher-btn"}
        onClick={() => setMode("basic")}
      >
        Basic
      </button>

      <button
        className={mode === "pro" ? "switcher-btn active" : "switcher-btn"}
        onClick={() => setMode("pro")}
      >
        Pro
      </button>

      {mode === "basic" && (
        <FestivalOverlayScenarioAIHyperSuiteDockMiniMap
          getCurrentState={getCurrentState}
        />
      )}

      {mode === "pro" && (
        <FestivalOverlayScenarioAIHyperSuiteDockMiniMapPro
          getCurrentState={getCurrentState}
          historyRef={historyRef}
        />
      )}
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. Switcher CSS
//
function switcherCSS() {
  const file = path.join(
    COMPONENTS,
    "FestivalOverlayScenarioAIHyperSuiteDockMiniMapSwitcher.css"
  );
  const marker = "/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_SWITCHER_CSS */";

  const block = `
/* FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_SWITCHER_CSS */

.mini-map-switcher {
  position: fixed;
  bottom: 12px;
  left: 2450px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 100000;
}

.switcher-btn {
  padding: 6px 10px;
  background: rgba(0,0,0,0.7);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 11px;
}

.switcher-btn.active {
  background: rgba(80,255,80,0.3);
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. Integration with HyperSuiteDock
//
function integrateSwitcher() {
  const file = path.join(
    COMPONENTS,
    "FestivalOverlayScenarioAIHyperSuiteDock.js"
  );
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_SWITCHER_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_SWITCHER_INTEGRATION
import { FestivalOverlayScenarioAIHyperSuiteDockMiniMapSwitcher } from "./FestivalOverlayScenarioAIHyperSuiteDockMiniMapSwitcher";

// Example usage next to dock:
// <FestivalOverlayScenarioAIHyperSuiteDockMiniMapSwitcher
//    getCurrentState={getCurrentState}
//    historyRef={hyper.history}
// />
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayScenarioAIHyperSuiteDockMiniMapSwitcher Generator ===");
  ensureDir(COMPONENTS);
  switcherComponent();
  switcherCSS();
  integrateSwitcher();
  console.log("=== DONE ===");
}

main();
