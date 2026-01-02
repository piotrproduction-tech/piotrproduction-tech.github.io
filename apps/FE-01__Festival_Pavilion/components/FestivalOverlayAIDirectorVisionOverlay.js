


// FE_FESTIVAL_AI_DIRECTOR_VISION_OVERLAY_COMPONENT
import React from "react";
import "./FestivalOverlayAIDirectorVisionOverlay.css";

export function FestivalOverlayAIDirectorVisionOverlay({ director }) {
  if (!director) return null;

  const { mood } = director;

  const moodColor = {
    Calm: "#4ffff0",
    Energetic: "#ff4f9a",
    Creative: "#ffdd4f",
    Tense: "#ff4f4f",
    Focused: "#4fff8a",
    Chaotic: "#ff7bff"
  }[mood] || "#00ffff";

  return (
    <div className="director-vision-overlay">
      <div className="vision-grid" style={{ borderColor: moodColor }} />

      <div className="vision-scan" />

      <div className="vision-corners">
        <div className="corner tl" style={{ borderColor: moodColor }} />
        <div className="corner tr" style={{ borderColor: moodColor }} />
        <div className="corner bl" style={{ borderColor: moodColor }} />
        <div className="corner br" style={{ borderColor: moodColor }} />
      </div>

      <div className="vision-center-pulse" style={{ borderColor: moodColor }} />
    </div>
  );
}
