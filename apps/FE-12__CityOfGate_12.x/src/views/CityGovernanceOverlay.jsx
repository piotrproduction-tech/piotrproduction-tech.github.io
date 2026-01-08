
import React from "react";

export function CityGovernanceOverlay({ data }) {
  return (
    <div className="CityGovernanceOverlay-overlay">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
