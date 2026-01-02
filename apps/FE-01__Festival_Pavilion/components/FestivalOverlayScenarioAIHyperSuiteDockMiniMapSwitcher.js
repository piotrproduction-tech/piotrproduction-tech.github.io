


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



// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_ULTRA_INTEGRATION
import { FestivalOverlayScenarioAIHyperSuiteDockMiniMapUltra } from "./FestivalOverlayScenarioAIHyperSuiteDockMiniMapUltra";

// Example usage:
// Add a third button "Ultra" and render MiniMapUltra when selected.
