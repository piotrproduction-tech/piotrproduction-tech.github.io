


// FE_FESTIVAL_OVERLAY_CONTROLLER_COMPONENT
import React from "react";
import "./FestivalOverlayController.css";

export function FestivalOverlayController({ mode, setMode, toggles, setToggles }) {
  return (
    <div className="overlay-controller">
      <h3>Overlay Controller</h3>

      <div className="controller-section">
        <label>Overlay Mode:</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="off">Off</option>
          <option value="transparent">Transparent</option>
          <option value="semi">Semi</option>
          <option value="full">Full</option>
        </select>
      </div>

      <div className="controller-section">
        <label>
          <input
            type="checkbox"
            checked={toggles.hud}
            onChange={() => setToggles({ ...toggles, hud: !toggles.hud })}
          />
          Show HUD
        </label>

        <label>
          <input
            type="checkbox"
            checked={toggles.notifications}
            onChange={() =>
              setToggles({ ...toggles, notifications: !toggles.notifications })
            }
          />
          Show Notifications
        </label>

        <label>
          <input
            type="checkbox"
            checked={toggles.debug}
            onChange={() => setToggles({ ...toggles, debug: !toggles.debug })}
          />
          Show Debug Console
        </label>
      </div>
    </div>
  );
}



// FE_FESTIVAL_OVERLAY_PRESET_MANAGER_INTEGRATION
import { FestivalOverlayPresetManager } from "./FestivalOverlayPresetManager";
import { useFestivalOverlayPresetManager } from "../core/useFestivalOverlayPresetManager";

const presetManager = useFestivalOverlayPresetManager({ mode, setMode, toggles, setToggles });

// Example usage inside render:
// <FestivalOverlayPresetManager presetManager={presetManager} />



// FE_FESTIVAL_OVERLAY_PRESET_SYNC_INTEGRATION
import { useFestivalOverlayPresetSync } from "../core/useFestivalOverlayPresetSync";

useFestivalOverlayPresetSync(presetManager, { mode, setMode, toggles, setToggles }, identity);



// FE_FESTIVAL_OVERLAY_QUICKSWITCH_INTEGRATION
import { useFestivalOverlayQuickSwitch } from "../core/useFestivalOverlayQuickSwitch";

useFestivalOverlayQuickSwitch(presetManager);



// FE_FESTIVAL_OVERLAY_REMOTECONTROL_INTEGRATION
import { useFestivalOverlayRemoteControl } from "../core/useFestivalOverlayRemoteControl";

useFestivalOverlayRemoteControl(presetManager, { mode, setMode, toggles, setToggles });



// FE_FESTIVAL_OVERLAY_MACRORECORDER_INTEGRATION
import { FestivalOverlayMacroRecorder } from "./FestivalOverlayMacroRecorder";
import { useFestivalOverlayMacroRecorder } from "../core/useFestivalOverlayMacroRecorder";

const macro = useFestivalOverlayMacroRecorder(presetManager, { mode, setMode, toggles, setToggles });

// Example usage inside render:
// <FestivalOverlayMacroRecorder macro={macro} />



// FE_FESTIVAL_OVERLAY_SCENARIOENGINE_INTEGRATION
import { FestivalOverlayScenarioEngine } from "./FestivalOverlayScenarioEngine";
import { useFestivalOverlayScenarioEngine } from "../core/useFestivalOverlayScenarioEngine";

const scenario = useFestivalOverlayScenarioEngine(presetManager, { mode, setMode, toggles, setToggles });

// Example usage inside render:
// <FestivalOverlayScenarioEngine scenario={scenario} />



// FE_FESTIVAL_OVERLAY_SCENARIOCOMPOSER_INTEGRATION
import { FestivalOverlayScenarioComposer } from "./FestivalOverlayScenarioComposer";
import { useFestivalOverlayScenarioComposer } from "../core/useFestivalOverlayScenarioComposer";

const composer = useFestivalOverlayScenarioComposer();

// Example usage inside render:
// <FestivalOverlayScenarioComposer composer={composer} scenarioEngine={scenario} />



// FE_FESTIVAL_OVERLAY_SCENARIO_AI_CONTROLLER_INTEGRATION
import { FestivalOverlayScenarioAIController } from "./FestivalOverlayScenarioAIController";

// Example usage inside render:
// <FestivalOverlayScenarioAIController runAIScenario={runAIScenario} />



// FE_FESTIVAL_OVERLAY_SCENARIO_AI_PROFILE_CONTROLLER_INTEGRATION
import { FestivalOverlayScenarioAIProfileController } from "./FestivalOverlayScenarioAIProfileController";

// Example usage inside render:
// <FestivalOverlayScenarioAIProfileController
//    runScenarioSteps={runScenarioSteps}
//    getCurrentState={() => ({ pulse, mood, wave, reputation, identity, security, narrative })}
// />



// FE_FESTIVAL_OVERLAY_SCENARIO_AI_ORCHESTRATOR_CONTROLLER_INTEGRATION
import { FestivalOverlayScenarioAIOrchestratorController } from "./FestivalOverlayScenarioAIOrchestratorController";

// Example usage inside render:
// <FestivalOverlayScenarioAIOrchestratorController
//    orchestrator={orchestrator}
//    getCurrentState={() => ({ pulse, mood, wave, reputation, identity, security, narrative })}
// />



// FE_FESTIVAL_OVERLAY_SCENARIO_AI_AUTOTUNER_CONTROLLER_INTEGRATION
import { FestivalOverlayScenarioAIAutoTunerController } from "./FestivalOverlayScenarioAIAutoTunerController";

// Example usage inside render:
// <FestivalOverlayScenarioAIAutoTunerController
//    autoTuner={autoTuner}
//    getCurrentState={() => ({ pulse, mood, wave, reputation, identity, security, narrative })}
// />



// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERORCHESTRATOR_CONTROLLER_INTEGRATION
import { FestivalOverlayScenarioAIHyperOrchestratorController } from "./FestivalOverlayScenarioAIHyperOrchestratorController";

// Example usage inside render:
// <FestivalOverlayScenarioAIHyperOrchestratorController
//    hyper={hyper}
//    getCurrentState={() => ({ pulse, mood, wave, reputation, identity, security, narrative })}
// />



// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_INTEGRATION
import { FestivalOverlayScenarioAIHyperSuite } from "./FestivalOverlayScenarioAIHyperSuite";

// Example usage inside render:
// <FestivalOverlayScenarioAIHyperSuite
//    runAIScenario={runAIScenario}
//    runScenarioSteps={runScenarioSteps}
//    orchestrator={orchestrator}
//    autoTuner={autoTuner}
//    hyper={hyper}
//    getCurrentState={() => ({ pulse, mood, wave, reputation, identity, security, narrative })}
// />



// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_INTEGRATION
import { FestivalOverlayScenarioAIHyperSuiteDock } from "./FestivalOverlayScenarioAIHyperSuiteDock";

// Example usage inside render:
// <FestivalOverlayScenarioAIHyperSuiteDock
//    runAIScenario={runAIScenario}
//    runScenarioSteps={runScenarioSteps}
//    orchestrator={orchestrator}
//    autoTuner={autoTuner}
//    hyper={hyper}
//    getCurrentState={() => ({ pulse, mood, wave, reputation, identity, security, narrative })}
// />
