


// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_PRO_COMPONENT
import React, { useMemo } from "react";
import "./FestivalOverlayScenarioAIHyperSuiteDockMiniMapPro.css";

export function FestivalOverlayScenarioAIHyperSuiteDockMiniMapPro({ getCurrentState, historyRef }) {
  const state = getCurrentState();
  const history = historyRef?.current || [];

  const pulse = state.pulse;
  const wave = state.wave.intensity;
  const mood = state.mood;

  const moodColor = {
    Calm: "linear-gradient(135deg, #4fa3ff, #4ffff0)",
    Energetic: "linear-gradient(135deg, #ff4f4f, #ffb84f)",
    Creative: "linear-gradient(135deg, #ffb84f, #ffe94f)",
    Tense: "linear-gradient(135deg, #9b4fff, #ff4fb8)"
  }[mood] || "linear-gradient(135deg, #ffffff, #aaaaaa)";

  const pulseHistory = useMemo(
    () => history.slice(-20).map((s) => s.pulse),
    [history]
  );

  const waveHistory = useMemo(
    () => history.slice(-20).map((s) => s.wave.intensity),
    [history]
  );

  const maxPulse = Math.max(1, ...pulseHistory, pulse);
  const pulsePoints = pulseHistory.map((p, i) => {
    const x = (i / Math.max(1, pulseHistory.length - 1)) * 100;
    const y = 100 - (p / maxPulse) * 100;
    return `${x},${y}`;
  });

  const wavePoints = waveHistory.map((w, i) => {
    const x = (i / Math.max(1, waveHistory.length - 1)) * 100;
    const y = 100 - w * 100;
    return `${x},${y}`;
  });

  return (
    <div className="mini-map-pro">
      <div className="mini-map-pro-header">
        <span className="mini-map-pro-title">CITY HUD</span>
        <span className="mini-map-pro-tag">CINEMATIC</span>
      </div>

      <div className="mini-map-pro-row">
        <div className="mini-map-pro-block">
          <div className="mini-map-pro-label">Pulse</div>
          <div className="mini-map-pro-pulse">
            <span className="mini-map-pro-pulse-value">{pulse}</span>
            <span className="mini-map-pro-pulse-unit">BPM</span>
          </div>
          <div className="mini-map-pro-chart">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points={pulsePoints.join(" ")}
                fill="none"
                stroke="#ff4f4f"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        <div className="mini-map-pro-block">
          <div className="mini-map-pro-label">Wave</div>
          <div className="mini-map-pro-wave">
            <div className="mini-map-pro-wave-bar">
              <div
                className="mini-map-pro-wave-fill"
                style={{ height: `${wave * 100}%` }}
              />
            </div>
            <span className="mini-map-pro-wave-value">
              {(wave * 100).toFixed(0)}%
            </span>
          </div>
          <div className="mini-map-pro-chart">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points={wavePoints.join(" ")}
                fill="none"
                stroke="#4fff8a"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="mini-map-pro-row">
        <div className="mini-map-pro-block mood-block">
          <div className="mini-map-pro-label">Mood</div>
          <div
            className="mini-map-pro-mood"
            style={{ backgroundImage: moodColor }}
          >
            <span className="mini-map-pro-mood-text">{mood}</span>
          </div>
        </div>

        <div className="mini-map-pro-block meta-block">
          <div className="mini-map-pro-label">Meta</div>
          <div className="mini-map-pro-meta-grid">
            <div>
              <span className="mini-map-pro-meta-label">Role</span>
              <span className="mini-map-pro-meta-value">{state.identity.role}</span>
            </div>
            <div>
              <span className="mini-map-pro-meta-label">Trust</span>
              <span className="mini-map-pro-meta-value">
                {state.security.trustLevel}
              </span>
            </div>
            <div>
              <span className="mini-map-pro-meta-label">Phase</span>
              <span className="mini-map-pro-meta-value">
                {state.narrative.phase}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
