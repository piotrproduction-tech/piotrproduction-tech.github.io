
import React from "react";

export function CityPersonalityOverlay({ data }) {
  return (
    <div className="CityPersonalityOverlay-overlay">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
