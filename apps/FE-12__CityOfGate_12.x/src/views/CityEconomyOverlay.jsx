
import React from "react";

export function CityEconomyOverlay({ data }) {
  return (
    <div className="CityEconomyOverlay-overlay">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
