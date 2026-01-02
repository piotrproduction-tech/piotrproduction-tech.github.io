import { useEffect, useState } from "react";
import { cityPersonality } from "../personality/cityPersonalityEngine";

export default function CityPersonalityOverlay() {
  const [p, setP] = useState(cityPersonality.personality);

  useEffect(() => {
    cityPersonality.subscribe(newP => setP(newP));
  }, []);

  return (
    <div
      className="city-personality-overlay"
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        padding: "10px 14px",
        background: "rgba(0,0,0,0.5)",
        color: "white",
        borderRadius: "8px",
        fontSize: "12px"
      }}
    >
      Charakter miasta: {p}
    </div>
  );
}