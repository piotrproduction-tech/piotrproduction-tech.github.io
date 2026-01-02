import { useEffect, useState } from "react";
import { cityPulse } from "../pulse/cityPulseEngine";

export default function CityPulseOverlay() {
  const [bpm, setBpm] = useState(cityPulse.bpm);

  useEffect(() => {
    cityPulse.subscribe(newBpm => setBpm(newBpm));
  }, []);

  return (
    <div className="city-pulse-overlay">
      <div
        className="pulse-circle"
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "rgba(255, 80, 0, 0.3)",
          animation: `pulse ${60 / bpm}s infinite ease-in-out`
        }}
      />
    </div>
  );
}