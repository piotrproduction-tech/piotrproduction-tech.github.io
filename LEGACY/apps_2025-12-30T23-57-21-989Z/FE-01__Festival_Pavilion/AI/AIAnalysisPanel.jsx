import React, { useEffect, useState } from "react";
import { getAIAnalysisOverview } from "../festivalApi.js";

export default function AIAnalysisPanel() {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getAIAnalysisOverview();
      setOverview(res);
    })();
  }, []);

  if (!overview) return <div>Ładowanie analizy AI...</div>;

  return (
    <div>
      <h2>Analiza AI – przegląd</h2>
      <p>Łącznie przeanalizowanych filmów: {overview.totalAnalyzed}</p>
      <ul>
        {overview.insights.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
