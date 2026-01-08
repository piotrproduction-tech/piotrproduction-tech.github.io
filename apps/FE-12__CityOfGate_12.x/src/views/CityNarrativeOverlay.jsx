
import React from "react";

export function CityNarrativeOverlay({ data }) {
  return (
    <div className="CityNarrativeOverlay-overlay">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
