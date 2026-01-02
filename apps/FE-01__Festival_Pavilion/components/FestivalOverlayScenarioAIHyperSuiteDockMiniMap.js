


// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_COMPONENT
import React from "react";
import "./FestivalOverlayScenarioAIHyperSuiteDockMiniMap.css";

export function FestivalOverlayScenarioAIHyperSuiteDockMiniMap({ getCurrentState }) {
  const state = getCurrentState();

  const pulse = state.pulse;
  const wave = state.wave.intensity;
  const mood = state.mood;

  const moodColor = {
    Calm: "#4fa3ff",
    Energetic: "#ff4f4f",
    Creative: "#ffb84f",
    Tense: "#9b4fff"
  }[mood] || "#ffffff";

  return (
    <div className="mini-map-basic">
      <div className="mini-map-basic-section">
        <div className="mini-map-basic-label">Pulse</div>
        <div
          className="mini-map-basic-pulse"
          style={{ animationDuration: `${2000 / pulse}ms` }}
        >
          {pulse}
        </div>
      </div>

      <div className="mini-map-basic-section">
        <div className="mini-map-basic-label">Wave</div>
        <div className="mini-map-basic-wave-bar">
          <div
            className="mini-map-basic-wave-fill"
            style={{ height: `${wave * 100}%` }}
          />
        </div>
      </div>

      <div className="mini-map-basic-section">
        <div className="mini-map-basic-label">Mood</div>
        <div
          className="mini-map-basic-mood"
          style={{ backgroundColor: moodColor }}
        >
          {mood}
        </div>
      </div>
    </div>
  );
}
