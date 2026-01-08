
import React from "react";

export function CityMoodOverlay({ data }) {
  return (
    <div className="CityMoodOverlay-overlay">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
