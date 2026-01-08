
import React from "react";

export function CityReputationOverlay({ data }) {
  return (
    <div className="CityReputationOverlay-overlay">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
