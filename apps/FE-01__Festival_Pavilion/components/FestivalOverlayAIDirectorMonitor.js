


// FE_FESTIVAL_AI_DIRECTOR_MONITOR_COMPONENT
import React from "react";
import "./FestivalOverlayAIDirectorMonitor.css";

export function FestivalOverlayAIDirectorMonitor({ director }) {
  if (!director) return null;

  const { profile, mode, mood, decision, history } = director;

  return (
    <div className="director-monitor">
      <div className="director-monitor-header">
        <span className="director-monitor-title">AI Director Monitor</span>
      </div>

      <div className="director-monitor-section">
        <div className="director-monitor-label">Profile</div>
        <div className="director-monitor-value">{profile}</div>
      </div>

      <div className="director-monitor-section">
        <div className="director-monitor-label">Mode</div>
        <div className="director-monitor-value">{mode}</div>
      </div>

      <div className="director-monitor-section">
        <div className="director-monitor-label">Mood</div>
        <div className="director-monitor-value">{mood}</div>
      </div>

      <div className="director-monitor-section">
        <div className="director-monitor-label">Last Decision</div>
        <div className="director-monitor-value decision-box">
          {JSON.stringify(decision, null, 2)}
        </div>
      </div>

      <div className="director-monitor-section">
        <div className="director-monitor-label">History (20)</div>
        <div className="director-monitor-history">
          {history.map((h, i) => (
            <div key={i} className="director-monitor-history-item">
              <span>{new Date(h.timestamp).toLocaleTimeString()}</span>
              <span>{h.profile}</span>
              <span>{h.mood}</span>
              <span>{h.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
