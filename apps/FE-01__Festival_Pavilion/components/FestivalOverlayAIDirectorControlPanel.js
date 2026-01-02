


// FE_FESTIVAL_AI_DIRECTOR_CONTROL_PANEL_COMPONENT
import React, { useState } from "react";
import "./FestivalOverlayAIDirectorControlPanel.css";

import { FestivalAIDirectorProfilesUltra } from "../core/director/festivalAIDirectorProfilesUltra";
import { setDirectorMode } from "../core/director/festivalAIDirectorSystem";
import { setDirectorMood } from "../core/director/festivalAIDirectorMoodEngine";
import { rememberDirectorEvent } from "../core/director/festivalAIDirectorMemory";

export function FestivalOverlayAIDirectorControlPanel({ director, onForceDecision }) {
  const [forcedDecision, setForcedDecision] = useState("");

  const profiles = Object.keys(FestivalAIDirectorProfilesUltra);

  return (
    <div className="director-control">
      <div className="director-control-header">
        <span className="director-control-title">AI Director Control</span>
      </div>

      <div className="director-control-section">
        <div className="director-control-label">Active Profile</div>
        <select
          className="director-control-select"
          value={director?.profile}
          onChange={(e) => {
            rememberDirectorEvent({ type: "MANUAL_PROFILE_SET", profile: e.target.value });
            onForceDecision({ manualProfile: e.target.value });
          }}
        >
          {profiles.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="director-control-section">
        <div className="director-control-label">Mode</div>
        <select
          className="director-control-select"
          value={director?.mode}
          onChange={(e) => {
            setDirectorMode(e.target.value);
            rememberDirectorEvent({ type: "MANUAL_MODE_SET", mode: e.target.value });
          }}
        >
          <option value="FILMIC">FILMIC</option>
          <option value="SYSTEMIC">SYSTEMIC</option>
          <option value="HYBRID">HYBRID</option>
        </select>
      </div>

      <div className="director-control-section">
        <div className="director-control-label">Mood</div>
        <select
          className="director-control-select"
          value={director?.mood}
          onChange={(e) => {
            setDirectorMood(e.target.value);
            rememberDirectorEvent({ type: "MANUAL_MOOD_SET", mood: e.target.value });
          }}
        >
          <option value="Calm">Calm</option>
          <option value="Energetic">Energetic</option>
          <option value="Creative">Creative</option>
          <option value="Tense">Tense</option>
          <option value="Focused">Focused</option>
          <option value="Chaotic">Chaotic</option>
        </select>
      </div>

      <div className="director-control-section">
        <div className="director-control-label">Force Decision</div>
        <textarea
          className="director-control-textarea"
          value={forcedDecision}
          onChange={(e) => setForcedDecision(e.target.value)}
          placeholder="{ action: 'trigger_scene', scene: 'spotlight' }"
        />

        <button
          className="director-control-btn"
          onClick={() => {
            try {
              const parsed = JSON.parse(forcedDecision);
              onForceDecision({ manualDecision: parsed });
              rememberDirectorEvent({ type: "MANUAL_DECISION", decision: parsed });
            } catch (err) {
              alert("Invalid JSON");
            }
          }}
        >
          Apply
        </button>
      </div>

      <div className="director-control-section">
        <button
          className="director-control-btn danger"
          onClick={() => {
            rememberDirectorEvent({ type: "RESET_MEMORY" });
            onForceDecision({ resetMemory: true });
          }}
        >
          Reset Memory
        </button>
      </div>
    </div>
  );
}
