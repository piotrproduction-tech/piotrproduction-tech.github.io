import React, { useEffect, useState } from "react";
import { getJuryDashboardData } from "../festivalApi.js";

export default function JuryDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getJuryDashboardData();
      setData(res);
    })();
  }, []);

  if (!data) return <div>Ładowanie panelu jury...</div>;

  return (
    <div>
      <h2>Panel Jury – {data.juryName}</h2>
      <ul>
        {data.assignedSubmissions.map((s) => (
          <li key={s.id}>
            {s.title} — <a href={"/festival/submission/" + s.id}>Szczegóły</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
