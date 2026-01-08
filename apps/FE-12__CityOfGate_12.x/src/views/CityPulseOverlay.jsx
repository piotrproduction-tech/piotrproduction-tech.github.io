
import React from "react";

export function CityPulseOverlay({ data }) {
  return (
    <div className="CityPulseOverlay-overlay">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
