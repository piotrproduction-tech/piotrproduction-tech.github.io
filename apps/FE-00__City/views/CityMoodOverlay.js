import { useEffect, useState } from "react";
import { cityMood } from "../mood/cityMoodEngine";

export default function CityMoodOverlay() {
  const [mood, setMood] = useState(cityMood.mood);

  useEffect(() => {
    cityMood.subscribe(newMood => setMood(newMood));
  }, []);

  const colors = {
    Calm: "rgba(100, 150, 255, 0.2)",
    Creative: "rgba(255, 100, 200, 0.3)",
    Energetic: "rgba(255, 150, 0, 0.3)",
    Chaotic: "rgba(255, 0, 0, 0.3)",
    Focused: "rgba(0, 200, 255, 0.3)",
    Celebratory: "rgba(255, 215, 0, 0.3)"
  };

  return (
    <div
      className="city-mood-overlay"
      style={{
        position: "absolute",
        inset: 0,
        background: colors[mood] || colors.Calm,
        pointerEvents: "none",
        transition: "background 0.8s ease"
      }}
    />
  );
}