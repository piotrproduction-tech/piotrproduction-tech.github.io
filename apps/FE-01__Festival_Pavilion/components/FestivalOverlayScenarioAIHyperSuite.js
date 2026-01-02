


// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_COMPONENT
import React from "react";
import "./FestivalOverlayScenarioAIHyperSuite.css";

import { FestivalOverlayScenarioAIController } from "./FestivalOverlayScenarioAIController";
import { FestivalOverlayScenarioAIProfileController } from "./FestivalOverlayScenarioAIProfileController";
import { FestivalOverlayScenarioAIOrchestratorController } from "./FestivalOverlayScenarioAIOrchestratorController";
import { FestivalOverlayScenarioAIAutoTunerController } from "./FestivalOverlayScenarioAIAutoTunerController";
import { FestivalOverlayScenarioAIHyperOrchestratorController } from "./FestivalOverlayScenarioAIHyperOrchestratorController";

export function FestivalOverlayScenarioAIHyperSuite({
  runAIScenario,
  runScenarioSteps,
  orchestrator,
  autoTuner,
  hyper,
  getCurrentState
}) {
  return (
    <div className="overlay-ai-hypersuite">
      <FestivalOverlayScenarioAIController
        runAIScenario={runAIScenario}
        getCurrentState={getCurrentState}
      />

      <FestivalOverlayScenarioAIProfileController
        runScenarioSteps={runScenarioSteps}
        getCurrentState={getCurrentState}
      />

      <FestivalOverlayScenarioAIOrchestratorController
        orchestrator={orchestrator}
        getCurrentState={getCurrentState}
      />

      <FestivalOverlayScenarioAIAutoTunerController
        autoTuner={autoTuner}
        getCurrentState={getCurrentState}
      />

      <FestivalOverlayScenarioAIHyperOrchestratorController
        hyper={hyper}
        getCurrentState={getCurrentState}
      />
    </div>
  );
}



// FE_FESTIVAL_AI_DIRECTOR_MONITOR_INTEGRATION
import { FestivalOverlayAIDirectorMonitor } from "./FestivalOverlayAIDirectorMonitor";

// Przykład użycia w HyperSuite:
// <FestivalOverlayAIDirectorMonitor director={director} />



// FE_FESTIVAL_AI_DIRECTOR_CONTROL_PANEL_INTEGRATION
import { FestivalOverlayAIDirectorControlPanel } from "./FestivalOverlayAIDirectorControlPanel";

// Przykład użycia:
// <FestivalOverlayAIDirectorControlPanel director={director} onForceDecision={handleForceDecision} />



// FE_FESTIVAL_AI_DIRECTOR_HUD_INTEGRATION
import { FestivalOverlayAIDirectorHUD } from "./FestivalOverlayAIDirectorHUD";

// Przykład użycia:
// <FestivalOverlayAIDirectorHUD director={director} />



// FE_FESTIVAL_AI_DIRECTOR_HUD_ULTRA_INTEGRATION
import { FestivalOverlayAIDirectorHUDUltra } from "./FestivalOverlayAIDirectorHUDUltra";

// Przykład:
// <FestivalOverlayAIDirectorHUDUltra director={director} />



// FE_FESTIVAL_AI_DIRECTOR_VISION_OVERLAY_INTEGRATION
import { FestivalOverlayAIDirectorVisionOverlay } from "./FestivalOverlayAIDirectorVisionOverlay";

// Przykład:
// <FestivalOverlayAIDirectorVisionOverlay director={director} />



// FE_FESTIVAL_AI_DIRECTOR_VISION_MODE_SWITCHER_INTEGRATION
import { FestivalOverlayAIDirectorVisionModeSwitcher } from "./FestivalOverlayAIDirectorVisionModeSwitcher";

// Przykład:
// <FestivalOverlayAIDirectorVisionModeSwitcher mode={visionMode} onChange={setVisionMode} />



// FE_FESTIVAL_AI_DIRECTOR_VISION_ORCHESTRATOR_UI
import { FestivalOverlayAIDirectorHUD } from "./FestivalOverlayAIDirectorHUD";
import { FestivalOverlayAIDirectorHUDUltra } from "./FestivalOverlayAIDirectorHUDUltra";
import { FestivalOverlayAIDirectorVisionOverlay } from "./FestivalOverlayAIDirectorVisionOverlay";
import { FestivalOverlayAIDirectorVisionModeSwitcher } from "./FestivalOverlayAIDirectorVisionModeSwitcher";
import { VisionModes } from "../core/festivalAIDirectorAutoVisionEngine";

// Przykładowy szkic integracji w komponencie HyperSuite:
//
// const [visionMode, setVisionMode] = useState("OFF");
// const [visionOverride, setVisionOverride] = useState(null);
//
// const handleVisionModeChange = (mode) => {
//   setVisionMode(mode);
//   setVisionOverride(mode === "AUTO" ? null : mode);
// };
//
// <FestivalOverlayAIDirectorVisionModeSwitcher
//   mode={visionMode}
//   onChange={handleVisionModeChange}
// />
//
// {visionMode === VisionModes.HUD && (
//   <FestivalOverlayAIDirectorHUD director={director} />
// )}
//
// {visionMode === VisionModes.HUD_ULTRA && (
//   <FestivalOverlayAIDirectorHUDUltra director={director} />
// )}
//
// {visionMode === VisionModes.VISION && (
//   <FestivalOverlayAIDirectorVisionOverlay director={director} />
// )}
