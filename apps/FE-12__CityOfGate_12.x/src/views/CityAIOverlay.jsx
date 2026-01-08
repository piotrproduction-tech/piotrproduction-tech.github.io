
import React from "react";

export function CityAIOverlay({ data }) {
  return (
    <div className="CityAIOverlay-overlay">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
