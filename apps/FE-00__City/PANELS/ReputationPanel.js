import React, { useEffect, useState } from "react";

export function ReputationPanel({ userId = "user-1" }) {
  const [rep, setRep] = useState(null);

  useEffect(() => {
    fetch(`/api/reputation/score/${userId}`)
      .then((res) => res.json())
      .then((data) => setRep(data));
  }, [userId]);

  if (!rep) return <div>Ładowanie reputacji...</div>;

  return (
    <div>
      <h2>Reputacja użytkownika</h2>
      <p>Score: <strong>{rep.score}</strong></p>
      <h3>Historia</h3>
      <ul>
        {rep.history.map((h, i) => (
          <li key={i}>
            {h.type} — {h.amount} — {h.reason}
          </li>
        ))}
      </ul>
    </div>
  );
}
