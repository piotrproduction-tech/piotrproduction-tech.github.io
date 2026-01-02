import { useEffect, useState } from "react";
import { cityNarrative } from "../narrative/cityNarrativeEngine";

export default function CityNarrativeOverlay() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    cityNarrative.subscribe(s => setStories([...s].slice(-3)));
  }, []);

  return (
    <div
      className="city-narrative-overlay"
      style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        padding: "12px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        borderRadius: "10px",
        fontSize: "12px",
        width: "260px"
      }}
    >
      <strong>Ostatnie historie miasta:</strong>
      <ul style={{ margin: 0, paddingLeft: "16px" }}>
        {stories.map((s, i) => (
          <li key={i}>{s.text}</li>
        ))}
      </ul>
    </div>
  );
}