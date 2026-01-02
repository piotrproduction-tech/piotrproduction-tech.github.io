import { useEffect, useState } from "react";
import { cityAI } from "../ai/cityAIEngine";

export default function CityAIOverlay() {
  const [pred, setPred] = useState(cityAI.predictions);

  useEffect(() => {
    cityAI.subscribe(p => setPred({ ...p }));
  }, []);

  return (
    <div
      className="city-ai-overlay"
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        padding: "12px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        borderRadius: "10px",
        fontSize: "12px",
        width: "220px"
      }}
    >
      <strong>AI Przewidywania:</strong>
      <div>Następna aktywna dzielnica: {pred.nextHotDistrict}</div>
      <div>Nastrój miasta: {pred.nextMood}</div>
      <div>Pogoda: {pred.nextWeather}</div>
    </div>
  );
}