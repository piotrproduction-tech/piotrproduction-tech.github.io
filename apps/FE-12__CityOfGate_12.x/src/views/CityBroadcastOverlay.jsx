
import React from "react";

export function CityBroadcastOverlay({ data }) {
  return (
    <div className="CityBroadcastOverlay-overlay">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
