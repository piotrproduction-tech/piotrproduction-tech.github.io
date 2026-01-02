import { useEffect, useState } from "react";
import { cityMemory } from "../memory/cityMemoryEngine";

export default function CityMemoryOverlay() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    cityMemory.subscribe(mem => {
      setHistory(mem.events.slice(-5)); // last 5 events
    });
  }, []);

  return (
    <div
      className="city-memory-overlay"
      style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        padding: "10px",
        background: "rgba(0,0,0,0.5)",
        color: "white",
        borderRadius: "8px",
        fontSize: "12px",
        maxWidth: "260px"
      }}
    >
      <strong>Ostatnie zdarzenia:</strong>
      <ul style={{ margin: 0, paddingLeft: "16px" }}>
        {history.map((e, i) => (
          <li key={i}>{e.type}</li>
        ))}
      </ul>
    </div>
  );
}