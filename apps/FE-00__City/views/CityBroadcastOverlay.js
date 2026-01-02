import { useEffect, useState } from "react";
import { cityBroadcast } from "../broadcast/cityBroadcastEngine";

export default function CityBroadcastOverlay() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    cityBroadcast.subscribe(msg => setMessage(msg));
  }, []);

  if (!message) return null;

  return (
    <div
      className="city-broadcast-overlay"
      style={{
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "12px 20px",
        background: "rgba(0,0,0,0.7)",
        color: "white",
        borderRadius: "10px",
        fontSize: "14px",
        animation: "fadeInOut 4s ease"
      }}
    >
      {message}
    </div>
  );
}