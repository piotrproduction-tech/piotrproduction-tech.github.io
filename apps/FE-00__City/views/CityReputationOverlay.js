import { useEffect, useState } from "react";
import { cityReputation } from "../reputation/cityReputationEngine";

export default function CityReputationOverlay() {
  const [snapshot, setSnapshot] = useState({ users: {}, levels: [] });

  useEffect(() => {
    cityReputation.subscribe(rep => {
      setSnapshot({
        users: { ...rep.users },
        levels: [...rep.levels]
      });
    });
  }, []);

  const users = Object.entries(snapshot.users)
    .sort(([, a], [, b]) => b.score - a.score)
    .slice(0, 5);

  return (
    <div
      className="city-reputation-overlay"
      style={{
        position: "absolute",
        top: "150px",
        right: "20px",
        padding: "12px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        borderRadius: "10px",
        fontSize: "12px",
        width: "260px"
      }}
    >
      <strong>Top reputacja miasta:</strong>
      {users.length === 0 ? (
        <div>Brak danych reputacji.</div>
      ) : (
        <ul style={{ margin: "8px 0 0", paddingLeft: "16px" }}>
          {users.map(([id, data]) => (
            <li key={id}>
              {id}: {data.score} pkt, poziom {data.level}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}