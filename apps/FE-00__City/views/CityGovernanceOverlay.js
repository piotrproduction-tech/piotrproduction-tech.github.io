import { useEffect, useState } from "react";
import { cityGovernance } from "../governance/cityGovernanceEngine";

export default function CityGovernanceOverlay() {
  const [snapshot, setSnapshot] = useState({ proposals: [], activeVotes: [] });

  useEffect(() => {
    cityGovernance.subscribe(g => {
      setSnapshot({
        proposals: [...g.proposals],
        activeVotes: [...g.activeVotes]
      });
    });
  }, []);

  return (
    <div
      className="city-governance-overlay"
      style={{
        position: "absolute",
        top: "220px",
        right: "20px",
        padding: "12px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        borderRadius: "10px",
        fontSize: "12px",
        width: "260px"
      }}
    >
      <strong>Głosowania społeczności:</strong>
      {snapshot.activeVotes.length === 0 ? (
        <div>Brak aktywnych głosowań.</div>
      ) : (
        <ul style={{ margin: "8px 0 0", paddingLeft: "16px" }}>
          {snapshot.activeVotes.map(p => (
            <li key={p.id}>
              {p.type} — {Object.keys(p.votes).length} głosów
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}