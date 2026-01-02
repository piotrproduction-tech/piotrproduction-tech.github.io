


// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_COMPONENT
import React, { useState } from "react";
import "./FestivalOverlayScenarioAIHyperSuiteDock.css";

import { FestivalOverlayScenarioAIHyperSuite } from "./FestivalOverlayScenarioAIHyperSuite";

export function FestivalOverlayScenarioAIHyperSuiteDock(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overlay-ai-hypersuite-dock">
      <button
        className={open ? "dock-toggle open" : "dock-toggle"}
        onClick={() => setOpen(!open)}
      >
        {open ? "▼ AI Suite" : "▲ AI Suite"}
      </button>

      {open && (
        <div className="dock-panel">
          <FestivalOverlayScenarioAIHyperSuite {...props} />
        </div>
      )}
    </div>
  );
}



// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_PRO_INTEGRATION
import { FestivalOverlayScenarioAIHyperSuiteDockMiniMapPro } from "./FestivalOverlayScenarioAIHyperSuiteDockMiniMapPro";

// Example usage next to dock:
// <FestivalOverlayScenarioAIHyperSuiteDockMiniMapPro
//    getCurrentState={getCurrentState}
//    historyRef={hyper.history}
// />



// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_INTEGRATION
import { FestivalOverlayScenarioAIHyperSuiteDockMiniMap } from "./FestivalOverlayScenarioAIHyperSuiteDockMiniMap";

// Example usage next to dock:
// <FestivalOverlayScenarioAIHyperSuiteDockMiniMap getCurrentState={getCurrentState} />



// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_SWITCHER_INTEGRATION
import { FestivalOverlayScenarioAIHyperSuiteDockMiniMapSwitcher } from "./FestivalOverlayScenarioAIHyperSuiteDockMiniMapSwitcher";

// Example usage next to dock:
// <FestivalOverlayScenarioAIHyperSuiteDockMiniMapSwitcher
//    getCurrentState={getCurrentState}
//    historyRef={hyper.history}
// />



// FE_FESTIVAL_AI_DIRECTOR_MONITOR_DOCK_INTEGRATION
import { FestivalOverlayAIDirectorMonitor } from "./FestivalOverlayAIDirectorMonitor";

// Przykład użycia obok docka:
// <FestivalOverlayAIDirectorMonitor director={director} />



// FE_FESTIVAL_AI_DIRECTOR_CONTROL_PANEL_DOCK
import { FestivalOverlayAIDirectorControlPanel } from "./FestivalOverlayAIDirectorControlPanel";



// FE_FESTIVAL_AI_DIRECTOR_HUD_DOCK
import { FestivalOverlayAIDirectorHUD } from "./FestivalOverlayAIDirectorHUD";



// FE_FESTIVAL_AI_DIRECTOR_HUD_ULTRA_DOCK
import { FestivalOverlayAIDirectorHUDUltra } from "./FestivalOverlayAIDirectorHUDUltra";



// FE_FESTIVAL_AI_DIRECTOR_VISION_OVERLAY_DOCK
import { FestivalOverlayAIDirectorVisionOverlay } from "./FestivalOverlayAIDirectorVisionOverlay";



// FE_FESTIVAL_AI_DIRECTOR_VISION_MODE_SWITCHER_DOCK
import { FestivalOverlayAIDirectorVisionModeSwitcher } from "./FestivalOverlayAIDirectorVisionModeSwitcher";
