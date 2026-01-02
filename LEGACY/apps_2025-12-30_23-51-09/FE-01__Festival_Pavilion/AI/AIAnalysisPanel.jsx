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

  if (!overview) return <div>Ładowanie...</div>;

  return (
    <div>
      <h2>Analiza AI</h2>
      <p>Przeanalizowano filmów: {overview.totalAnalyzed}</p>
      <ul>
        {overview.insights.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
