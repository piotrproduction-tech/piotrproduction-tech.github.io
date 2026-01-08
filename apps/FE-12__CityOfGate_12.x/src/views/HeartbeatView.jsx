import React from "react";
import "./HeartbeatView.css";

export function HeartbeatView({
  pulse,
  rhythm,
  personality,
  heatmap,
  economy,
  governance,
  memory,
  broadcast,
  simulation
}) {
  const sections = [
    { title: "Puls miasta", data: pulse, color: "#ff4d4f" },
    { title: "Rytm miasta", data: rhythm, color: "#ffa940" },
    { title: "Osobowość miasta", data: personality, color: "#9254de" },
    { title: "Heatmapa aktywności", data: heatmap, color: "#36cfc9" },
    { title: "Ekonomia miasta", data: economy, color: "#73d13d" },
    { title: "Governance", data: governance, color: "#597ef7" },
    { title: "Pamięć miasta", data: memory, color: "#ffc53d" },
    { title: "Broadcast", data: broadcast, color: "#ff85c0" },
    { title: "Symulacja", data: simulation, color: "#40a9ff" }
  ];

  return (
    <div className="heartbeat-container">
      <h2 className="heartbeat-title">Heartbeat miasta</h2>

      <div className="heartbeat-grid">
        {sections.map((s) => (
          <div
            key={s.title}
            className="heartbeat-section"
            style={{ borderLeft: `6px solid ${s.color}` }}
          >
            <h3>{s.title}</h3>
            <pre>{JSON.stringify(s.data, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
