import React, { useEffect, useState } from "react";

export function CityLifePanel() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/life/heartbeat")
      .then((res) => res.json())
      .then((data) => setEvents(data || []));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 12 }}>Życie Miasta</h2>
      <div
        style={{
          borderRadius: 16,
          border: "1px solid rgba(0,0,0,0.06)",
          background: "rgba(255,255,255,0.96)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.04)",
          padding: 16,
          maxHeight: 320,
          overflow: "auto"
        }}
      >
        {events.length === 0 && (
          <div style={{ fontSize: 13, color: "#666" }}>
            Miasto jest spokojne. Brak zarejestrowanych zdarzeń.
          </div>
        )}
        {events
          .slice()
          .reverse()
          .map((e, i) => (
            <div
              key={i}
              style={{
                padding: "6px 0",
                borderBottom:
                  i === events.length - 1
                    ? "none"
                    : "1px solid rgba(0,0,0,0.04)",
                fontSize: 13,
                display: "flex",
                justifyContent: "space-between",
                gap: 12
              }}
            >
              <span style={{ color: "#111" }}>{e.type}</span>
              <span style={{ color: "#999" }}>
                {new Date(e.ts).toLocaleTimeString()}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
