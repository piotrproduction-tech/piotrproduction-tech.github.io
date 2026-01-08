
import React from "react";

export function CityWeatherOverlay({ data }) {
  return (
    <div className="CityWeatherOverlay-overlay">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
