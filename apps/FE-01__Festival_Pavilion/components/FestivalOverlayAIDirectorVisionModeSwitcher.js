


// FE_FESTIVAL_AI_DIRECTOR_VISION_MODE_SWITCHER_COMPONENT
import React from "react";
import "./FestivalOverlayAIDirectorVisionModeSwitcher.css";

export function FestivalOverlayAIDirectorVisionModeSwitcher({ mode, onChange }) {
  return (
    <div className="vision-switcher">
      <button
        className={mode === "OFF" ? "active" : ""}
        onClick={() => onChange("OFF")}
      >
        OFF
      </button>

      <button
        className={mode === "HUD" ? "active" : ""}
        onClick={() => onChange("HUD")}
      >
        HUD
      </button>

      <button
        className={mode === "HUD_ULTRA" ? "active" : ""}
        onClick={() => onChange("HUD_ULTRA")}
      >
        HUD Ultra
      </button>

      <button
        className={mode === "VISION" ? "active" : ""}
        onClick={() => onChange("VISION")}
      >
        Vision
      </button>
    </div>
  );
}
