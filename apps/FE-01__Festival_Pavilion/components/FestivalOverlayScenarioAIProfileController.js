


// FE_FESTIVAL_OVERLAY_SCENARIO_AI_PROFILE_CONTROLLER_COMPONENT
import React, { useState } from "react";
import "./FestivalOverlayScenarioAIProfileController.css";
import { FestivalOverlayScenarioAIProfiles } from "../core/festivalOverlayScenarioAIProfiles";
import { generateOverlayScenarioAIWithProfile } from "../core/festivalOverlayScenarioAI";

export function FestivalOverlayScenarioAIProfileController({ runScenarioSteps, getCurrentState }) {
  const [profile, setProfile] = useState("CalmDirector");

  const selected = FestivalOverlayScenarioAIProfiles[profile];

  function runProfileScenario() {
    const state = getCurrentState();
    const steps = generateOverlayScenarioAIWithProfile(state, profile);
    runScenarioSteps(steps);
  }

  return (
    <div className="overlay-ai-profile-controller">
      <h3>AI Profile Controller</h3>

      <label>Profile</label>
      <select value={profile} onChange={(e) => setProfile(e.target.value)}>
        {Object.keys(FestivalOverlayScenarioAIProfiles).map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>

      <div className="profile-details">
        <div><strong>Speed:</strong> {selected.speed}</div>
        <div><strong>Intensity:</strong> {selected.intensity}</div>
        <div><strong>Preset Strategy:</strong> {selected.presetStrategy.name || "custom"}</div>
        <div><strong>Mode Strategy:</strong> {selected.modeStrategy.name || "custom"}</div>
        <div><strong>Notification Strategy:</strong> {selected.notificationStrategy.name || "custom"}</div>
      </div>

      <button className="profile-run-btn" onClick={runProfileScenario}>
        ▶ Run Profile Scenario
      </button>
    </div>
  );
}
