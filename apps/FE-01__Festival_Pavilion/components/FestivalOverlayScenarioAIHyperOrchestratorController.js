


// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERORCHESTRATOR_CONTROLLER_COMPONENT
import React from "react";
import "./FestivalOverlayScenarioAIHyperOrchestratorController.css";

export function FestivalOverlayScenarioAIHyperOrchestratorController({ hyper, getCurrentState }) {
  const state = getCurrentState();
  const history = hyper.history.current || [];

  const avgPulse = history.length
    ? (history.reduce((a, s) => a + s.pulse, 0) / history.length).toFixed(1)
    : "-";

  const avgWave = history.length
    ? (history.reduce((a, s) => a + s.wave.intensity, 0) / history.length).toFixed(2)
    : "-";

  const dominantMood = history.length
    ? Object.entries(
        history.reduce((acc, s) => {
          acc[s.mood] = (acc[s.mood] || 0) + 1;
          return acc;
        }, {})
      ).sort((a, b) => b[1] - a[1])[0][0]
    : "-";

  return (
    <div className="overlay-ai-hyperorchestrator-controller">
      <h3>AI HyperOrchestrator</h3>

      <div className="hyper-section">
        <label>Hyper Mode</label>
        <button
          className={hyper.enabled ? "hyper-btn active" : "hyper-btn"}
          onClick={() => hyper.setEnabled(!hyper.enabled)}
        >
          {hyper.enabled ? "ON" : "OFF"}
        </button>
      </div>

      <div className="hyper-section">
        <label>Active Profile</label>
        <div className="hyper-value">{hyper.activeProfile}</div>
      </div>

      <div className="hyper-section">
        <label>Metrics</label>
        <div className="hyper-metrics">
          <div><strong>Avg Pulse:</strong> {avgPulse}</div>
          <div><strong>Avg Wave:</strong> {avgWave}</div>
          <div><strong>Dominant Mood:</strong> {dominantMood}</div>
        </div>
      </div>

      <div className="hyper-section">
        <label>History ({history.length})</label>
        <div className="hyper-history">
          {history.slice(-10).map((s, i) => (
            <div key={i} className="hyper-history-row">
              <span>P:{s.pulse}</span>
              <span>W:{s.wave.intensity}</span>
              <span>M:{s.mood}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="hyper-run-btn" onClick={hyper.runOnce}>
        ▶ Run Hyper Scenario
      </button>
    </div>
  );
}
