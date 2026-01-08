
import React from "react";

export function CityRhythmOverlay({ data }) {
  return (
    <div className="CityRhythmOverlay-overlay">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
