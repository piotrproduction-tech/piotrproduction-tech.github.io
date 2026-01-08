// apps/FE-12__CityOfGate_12.x/src/ui/CityMapPanel.jsx

import React from "react";

export default function CityMapPanel({ mapState }) {
  // Jeśli mapState jeszcze się inicjalizuje
  if (!mapState) {
    return (
      <div className="city-map-panel">
        <h3>City Map</h3>
        <div className="map-placeholder">Loading map…</div>
      </div>
    );
  }

  return (
    <div className="city-map-panel">
      <h3>City Map</h3>

      <div className="map-info">
        <div>Active district: {mapState.activeDistrict || "none"}</div>
        <div>Pulse: {mapState.pulse}</div>
        <div>Highlight: {mapState.highlight}</div>
      </div>

      <div className="map-placeholder">
        [MAPA 12.x — dynamiczna warstwa]
      </div>
    </div>
  );
}
