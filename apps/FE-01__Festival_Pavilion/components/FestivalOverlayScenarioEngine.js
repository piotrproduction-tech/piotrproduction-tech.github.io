


// FE_FESTIVAL_OVERLAY_SCENARIOENGINE_COMPONENT
import React from "react";
import "./FestivalOverlayScenarioEngine.css";
import { FestivalOverlayScenarios } from "../core/festivalOverlayScenarios";

export function FestivalOverlayScenarioEngine({ scenario }) {
  return (
    <div className="overlay-scenarioengine">
      <h3>Overlay Scenario Engine</h3>

      <div className="scenario-section">
        {Object.keys(FestivalOverlayScenarios).map((name) => (
          <button key={name} onClick={() => scenario.runScenario(name)}>
            ▶ {name}
          </button>
        ))}
      </div>

      {scenario.running && (
        <div className="scenario-running">
          Running: {scenario.currentScenario}
        </div>
      )}
    </div>
  );
}
