// apps/FE-12__CityOfGate_12.x/src/engine/CityOverlayHost.jsx

import React from "react";

export default function CityOverlayHost({ overlay }) {
  // Jeśli overlay jeszcze się inicjalizuje
  if (!overlay) {
    return null;
  }

  if (!overlay.visible) {
    return null;
  }

  return (
    <div className={`city-overlay city-overlay-${overlay.type}`}>
      <div className="city-overlay-content">
        {overlay.message || "Loading..."}
      </div>
    </div>
  );
}
