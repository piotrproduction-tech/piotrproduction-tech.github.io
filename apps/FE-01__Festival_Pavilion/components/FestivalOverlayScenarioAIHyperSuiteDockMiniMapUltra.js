


// FE_FESTIVAL_OVERLAY_SCENARIO_AI_HYPERSUITE_DOCK_MINIMAP_ULTRA_COMPONENT
import React, { useMemo } from "react";
import "./FestivalOverlayScenarioAIHyperSuiteDockMiniMapUltra.css";

export function FestivalOverlayScenarioAIHyperSuiteDockMiniMapUltra({ getCurrentState, historyRef }) {
  const state = getCurrentState();
  const history = historyRef?.current || [];

  const pulse = state.pulse;
  const wave = state.wave.intensity;
  const mood = state.mood;
  const reputation = state.reputation;
  const trust = state.security.trustLevel;
  const narrative = state.narrative;

  const trustColor = {
    low: "#ff4f4f",
    medium: "#ffb84f",
    high: "#4fff8a"
  }[trust] || "#ffffff";

  const repPercent = Math.min(100, (reputation.points % 100));

  const radarAngle = {
    default: 0,
    opening: 45,
    awards: 135,
    jury: 225,
    closing: 315
  }[narrative.phase] || 0;

  const radarX = 50 + 40 * Math.cos((radarAngle * Math.PI) / 180);
  const radarY = 50 + 40 * Math.sin((radarAngle * Math.PI) / 180);

  const waveEnergy = useMemo(() => {
    return history.slice(-20).map((s, i) => ({
      x: i * 5,
      y: 30 + Math.sin(i * 0.6 + s.pulse / 20) * 10 + s.wave.intensity * 20
    }));
  }, [history]);

  return (
    <div className="mini-map-ultra">
      <div className="ultra-header">
        <span className="ultra-title">CITY ULTRA HUD</span>
        <span className="ultra-tag">DIRECTOR VISION</span>
      </div>

      <div className="ultra-grid">
        <div className="ultra-card">
          <div className="ultra-label">Narrative Radar</div>
          <svg viewBox="0 0 100 100" className="ultra-radar">
            <circle cx="50" cy="50" r="40" className="ultra-radar-ring" />
            <line x1="50" y1="50" x2={radarX} y2={radarY} className="ultra-radar-line" />
            <circle cx={radarX} cy={radarY} r="3" className="ultra-radar-dot" />
          </svg>
          <div className="ultra-radar-phase">{narrative.phase}</div>
        </div>

        <div className="ultra-card">
          <div className="ultra-label">Reputation</div>
          <div className="ultra-rep-ring">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" className="ultra-rep-bg" />
              <circle
                cx="50"
                cy="50"
                r="40"
                className="ultra-rep-fill"
                strokeDasharray={`${repPercent * 2.5} 1000`}
              />
            </svg>
            <div className="ultra-rep-text">
              L{reputation.level}<br />{reputation.points} pts
            </div>
          </div>
        </div>

        <div className="ultra-card">
          <div className="ultra-label">Trust</div>
          <div className="ultra-trust" style={{ backgroundColor: trustColor }}>
            {trust}
          </div>
        </div>

        <div className="ultra-card">
          <div className="ultra-label">Energy Waves</div>
          <svg viewBox="0 0 100 60" className="ultra-waves">
            <polyline
              fill="none"
              stroke="#4ffff0"
              strokeWidth="2"
              points={waveEnergy.map((p) => `${p.x},${p.y}`).join(" ")}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
