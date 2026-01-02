


// FE_FESTIVAL_OVERLAY_SCENARIOCOMPOSER_COMPONENT
import React, { useState } from "react";
import "./FestivalOverlayScenarioComposer.css";

export function FestivalOverlayScenarioComposer({ composer, scenarioEngine }) {
  const [cmd, setCmd] = useState("setPreset");
  const [payload, setPayload] = useState("");
  const [delay, setDelay] = useState(0);
  const [scenarioName, setScenarioName] = useState("");

  return (
    <div className="overlay-scenariocomposer">
      <h3>Overlay Scenario Composer</h3>

      <div className="composer-section">
        <h4>Add Step</h4>

        <select value={cmd} onChange={(e) => setCmd(e.target.value)}>
          <option value="setPreset">setPreset</option>
          <option value="setMode">setMode</option>
          <option value="toggle">toggle</option>
          <option value="setToggles">setToggles</option>
        </select>

        <input
          type="text"
          placeholder="Payload"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
        />

        <input
          type="number"
          placeholder="Delay (ms)"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
        />

        <button onClick={() => composer.addStep(cmd, payload, delay)}>
          Add Step
        </button>
      </div>

      <div className="composer-section">
        <h4>Steps</h4>
        {composer.steps.map((s, i) => (
          <div key={i} className="step-row">
            <span>{s.cmd} — {s.payload} — {s.delay}ms</span>
            <button onClick={() => composer.removeStep(i)}>✖</button>
          </div>
        ))}
      </div>

      <div className="composer-section">
        <h4>Save Scenario</h4>
        <input
          type="text"
          placeholder="Scenario name"
          value={scenarioName}
          onChange={(e) => setScenarioName(e.target.value)}
        />
        <button onClick={() => composer.saveScenario(scenarioName)}>
          Save
        </button>
      </div>

      <div className="composer-section">
        <h4>Saved Scenarios</h4>
        {Object.keys(composer.scenarios).map((name) => (
          <div key={name} className="scenario-row">
            <span>{name}</span>
            <button onClick={() => composer.loadScenario(name)}>Load</button>
            <button onClick={() => scenarioEngine.runScenario(name)}>▶ Play</button>
          </div>
        ))}
      </div>

      <button className="clear-btn" onClick={composer.clear}>
        Clear Editor
      </button>
    </div>
  );
}
