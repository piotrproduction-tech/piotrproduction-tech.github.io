


// FE_FESTIVAL_AI_DIRECTOR_HUD_ULTRA_COMPONENT
import React from "react";
import "./FestivalOverlayAIDirectorHUDUltra.css";

export function FestivalOverlayAIDirectorHUDUltra({ director }) {
  if (!director) return null;

  const { profile, mode, mood, decision } = director;

  const moodColor = {
    Calm: "#4ffff0",
    Energetic: "#ff4f9a",
    Creative: "#ffdd4f",
    Tense: "#ff4f4f",
    Focused: "#4fff8a",
    Chaotic: "#ff7bff"
  }[mood] || "#ffffff";

  return (
    <div className="director-hud-ultra" style={{ borderColor: moodColor }}>
      <div className="hud-ultra-header">
        <span className="hud-ultra-title">DIRECTOR VISION HUD</span>
      </div>

      <div className="hud-ultra-radar">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" className="hud-ultra-radar-ring" />
          <circle cx="50" cy="50" r="30" className="hud-ultra-radar-ring" />
          <circle cx="50" cy="50" r="15" className="hud-ultra-radar-ring" />
          <line x1="50" y1="50" x2="95" y2="50" className="hud-ultra-radar-line" />
        </svg>
      </div>

      <div className="hud-ultra-section">
        <span className="hud-ultra-label">Profile</span>
        <span className="hud-ultra-value" style={{ color: moodColor }}>{profile}</span>
      </div>

      <div className="hud-ultra-section">
        <span className="hud-ultra-label">Mode</span>
        <span className="hud-ultra-value">{mode}</span>
      </div>

      <div className="hud-ultra-section">
        <span className="hud-ultra-label">Mood</span>
        <span className="hud-ultra-value" style={{ color: moodColor }}>{mood}</span>
      </div>

      <div className="hud-ultra-waveform">
        <div className="hud-ultra-wave" />
      </div>

      <div className="hud-ultra-section decision">
        <span className="hud-ultra-label">Decision</span>
        <span className="hud-ultra-value decision-text">
          {decision ? JSON.stringify(decision) : "—"}
        </span>
      </div>
    </div>
  );
}
