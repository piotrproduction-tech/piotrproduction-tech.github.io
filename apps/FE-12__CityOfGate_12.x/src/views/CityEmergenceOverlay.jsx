
import React from "react";

export function CityEmergenceOverlay({ data }) {
  return (
    <div className="CityEmergenceOverlay-overlay">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
