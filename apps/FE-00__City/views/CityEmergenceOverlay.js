import { useEffect, useState } from "react";
import { cityEmergence } from "../emergence/cityEmergenceEngine";

export default function CityEmergenceOverlay() {
  const [snapshot, setSnapshot] = useState({ tick: 0, patterns: [] });

  useEffect(() => {
    cityEmergence.subscribe(e => {
      setSnapshot({
        tick: e.tick,
        patterns: [...e.patterns].slice(-3)
      });
    });
  }, []);

  return (
    <div
      className="city-emergence-overlay"
      style={{
        position: "absolute",
        top: "360px",
        right: "20px",
        padding: "12px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        borderRadius: "10px",
        fontSize: "12px",
        width: "260px"
      }}
    >
      <strong>Emergentne wzorce miasta:</strong>
      <div>Tick: {snapshot.tick}</div>
      {snapshot.patterns.length === 0 ? (
        <div>Brak wykrytych wzorców.</div>
      ) : (
        <ul style={{ margin: "8px 0 0", paddingLeft: "16px" }}>
          {snapshot.patterns.map((p, i) => (
            <li key={i}>
              Cykl: {p.cycle}, hot: {p.predictedHotDistrict || "—"}, głosowań: {p.activeProposals}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}