


// FE_FESTIVAL_OVERLAY_SCENARIO_AI_AUTOTUNER_CONTROLLER_COMPONENT
import React from "react";
import "./FestivalOverlayScenarioAIAutoTunerController.css";

export function FestivalOverlayScenarioAIAutoTunerController({ autoTuner, getCurrentState }) {
  const state = getCurrentState();
  const history = autoTuner.history.current || [];

  // Compute metrics for display
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
    <div className="overlay-ai-autotuner-controller">
      <h3>AI AutoTuner</h3>

      <div className="autotuner-section">
        <label>AutoTuner</label>
        <button
          className={autoTuner.enabled ? "autotuner-btn active" : "autotuner-btn"}
          onClick={() => autoTuner.setEnabled(!autoTuner.enabled)}
        >
          {autoTuner.enabled ? "ON" : "OFF"}
        </button>
      </div>

      <div className="autotuner-section">
        <label>Metrics</label>
        <div className="autotuner-metrics">
          <div><strong>Avg Pulse:</strong> {avgPulse}</div>
          <div><strong>Avg Wave:</strong> {avgWave}</div>
          <div><strong>Dominant Mood:</strong> {dominantMood}</div>
        </div>
      </div>

      <div className="autotuner-section">
        <label>History ({history.length})</label>
        <div className="autotuner-history">
          {history.slice(-10).map((s, i) => (
            <div key={i} className="autotuner-history-row">
              <span>P:{s.pulse}</span>
              <span>W:{s.wave.intensity}</span>
              <span>M:{s.mood}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="autotuner-run-btn" onClick={() => autoTuner.setEnabled(true)}>
        ▶ Force Tune
      </button>
    </div>
  );
}
