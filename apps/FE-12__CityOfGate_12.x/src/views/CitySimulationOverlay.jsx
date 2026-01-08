
import React from "react";

export function CitySimulationOverlay({ data }) {
  return (
    <div className="CitySimulationOverlay-overlay">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
