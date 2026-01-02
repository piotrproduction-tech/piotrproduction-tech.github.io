import React, { useEffect, useState } from "react";
import { getSubmissions } from "../festivalApi.js";

export default function SubmissionsList() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getSubmissions();
      setSubmissions(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div>Ładowanie zgłoszeń...</div>;

  return (
    <div>
      <h2>Zgłoszenia festiwalowe</h2>
      <ul>
        {submissions.map((s) => (
          <li key={s.id}>
            <strong>{s.title}</strong> — {s.director} ({s.status}){" "}
            <a href={"/festival/submission/" + s.id}>Szczegóły</a>
          </li>
        ))}
      </ul>
      <a href="/festival/submit">Dodaj nowe zgłoszenie</a>
    </div>
  );
}
