
import React from "react";

export function CityMemoryOverlay({ data }) {
  return (
    <div className="CityMemoryOverlay-overlay">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
