
import React from "react";

export function CityHeatmapOverlay({ data }) {
  return (
    <div className="CityHeatmapOverlay-overlay">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
