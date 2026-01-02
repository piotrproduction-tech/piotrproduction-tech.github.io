


// FE_FESTIVAL_OVERLAY_SCENARIO_AI_CONTROLLER_COMPONENT
import React, { useState } from "react";
import "./FestivalOverlayScenarioAIController.css";

export function FestivalOverlayScenarioAIController({ runAIScenario }) {
  const [state, setState] = useState({
    pulse: 90,
    mood: "Calm",
    wave: { intensity: 0.3, trend: "stable" },
    reputation: { level: 1, points: 0 },
    identity: { role: "guest", badges: [] },
    security: { trustLevel: "medium" },
    narrative: { phase: "default", tag: "" }
  });

  function update(path, value) {
    const parts = path.split(".");
    setState((prev) => {
      const next = { ...prev };
      let ref = next;
      for (let i = 0; i < parts.length - 1; i++) {
        ref[parts[i]] = { ...ref[parts[i]] };
        ref = ref[parts[i]];
      }
      ref[parts[parts.length - 1]] = value;
      return next;
    });
  }

  return (
    <div className="overlay-ai-controller">
      <h3>AI Scenario Controller</h3>

      <div className="ai-section">
        <label>Pulse</label>
        <input
          type="number"
          value={state.pulse}
          onChange={(e) => update("pulse", Number(e.target.value))}
        />

        <label>Mood</label>
        <select
          value={state.mood}
          onChange={(e) => update("mood", e.target.value)}
        >
          <option>Calm</option>
          <option>Energetic</option>
          <option>Creative</option>
          <option>Tense</option>
        </select>

        <label>Wave Intensity</label>
        <input
          type="number"
          step="0.1"
          value={state.wave.intensity}
          onChange={(e) => update("wave.intensity", Number(e.target.value))}
        />

        <label>Wave Trend</label>
        <select
          value={state.wave.trend}
          onChange={(e) => update("wave.trend", e.target.value)}
        >
          <option>rising</option>
          <option>falling</option>
          <option>stable</option>
        </select>

        <label>Reputation Level</label>
        <input
          type="number"
          value={state.reputation.level}
          onChange={(e) => update("reputation.level", Number(e.target.value))}
        />

        <label>Reputation Points</label>
        <input
          type="number"
          value={state.reputation.points}
          onChange={(e) => update("reputation.points", Number(e.target.value))}
        />

        <label>Role</label>
        <select
          value={state.identity.role}
          onChange={(e) => update("identity.role", e.target.value)}
        >
          <option>guest</option>
          <option>creator</option>
          <option>jury</option>
          <option>admin</option>
        </select>

        <label>Security Trust</label>
        <select
          value={state.security.trustLevel}
          onChange={(e) => update("security.trustLevel", e.target.value)}
        >
          <option>low</option>
          <option>medium</option>
          <option>high</option>
        </select>

        <label>Narrative Phase</label>
        <select
          value={state.narrative.phase}
          onChange={(e) => update("narrative.phase", e.target.value)}
        >
          <option>default</option>
          <option>opening</option>
          <option>awards</option>
          <option>jury</option>
          <option>closing</option>
        </select>

        <label>Narrative Tag</label>
        <input
          type="text"
          value={state.narrative.tag}
          onChange={(e) => update("narrative.tag", e.target.value)}
        />
      </div>

      <button className="ai-run-btn" onClick={() => runAIScenario(state)}>
        ▶ Run AI Scenario
      </button>
    </div>
  );
}
