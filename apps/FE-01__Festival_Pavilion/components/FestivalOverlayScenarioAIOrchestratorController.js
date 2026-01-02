


// FE_FESTIVAL_OVERLAY_SCENARIO_AI_ORCHESTRATOR_CONTROLLER_COMPONENT
import React from "react";
import "./FestivalOverlayScenarioAIOrchestratorController.css";

export function FestivalOverlayScenarioAIOrchestratorController({ orchestrator, getCurrentState }) {
  const state = getCurrentState();

  return (
    <div className="overlay-ai-orchestrator-controller">
      <h3>AI Orchestrator</h3>

      <div className="orch-section">
        <label>Auto Mode</label>
        <button
          className={orchestrator.autoMode ? "orch-btn active" : "orch-btn"}
          onClick={() => orchestrator.setAutoMode(!orchestrator.autoMode)}
        >
          {orchestrator.autoMode ? "ON" : "OFF"}
        </button>
      </div>

      <div className="orch-section">
        <label>Active Profile</label>
        <div className="orch-value">{orchestrator.activeProfile}</div>
      </div>

      <div className="orch-section">
        <label>Current State</label>
        <div className="orch-state">
          <div><strong>Pulse:</strong> {state.pulse}</div>
          <div><strong>Mood:</strong> {state.mood}</div>
          <div><strong>Wave:</strong> {state.wave.intensity} ({state.wave.trend})</div>
          <div><strong>Reputation:</strong> L{state.reputation.level} / {state.reputation.points}pts</div>
          <div><strong>Role:</strong> {state.identity.role}</div>
          <div><strong>Trust:</strong> {state.security.trustLevel}</div>
          <div><strong>Narrative:</strong> {state.narrative.phase}</div>
        </div>
      </div>

      <button className="orch-run-btn" onClick={orchestrator.runOnce}>
        ▶ Run Once
      </button>
    </div>
  );
}
