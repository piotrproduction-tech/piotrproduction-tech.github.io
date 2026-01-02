


// FE_FESTIVAL_AI_DIRECTOR_HUD_COMPONENT
import React from "react";
import "./FestivalOverlayAIDirectorHUD.css";

export function FestivalOverlayAIDirectorHUD({ director }) {
  if (!director) return null;

  const { profile, mode, mood, decision } = director;

  return (
    <div className="director-hud">
      <div className="director-hud-row">
        <span className="director-hud-label">Profile</span>
        <span className="director-hud-value">{profile}</span>
      </div>

      <div className="director-hud-row">
        <span className="director-hud-label">Mode</span>
        <span className="director-hud-value">{mode}</span>
      </div>

      <div className="director-hud-row">
        <span className="director-hud-label">Mood</span>
        <span className="director-hud-value">{mood}</span>
      </div>

      <div className="director-hud-row decision">
        <span className="director-hud-label">Decision</span>
        <span className="director-hud-value decision-text">
          {decision ? JSON.stringify(decision) : "—"}
        </span>
      </div>
    </div>
  );
}
