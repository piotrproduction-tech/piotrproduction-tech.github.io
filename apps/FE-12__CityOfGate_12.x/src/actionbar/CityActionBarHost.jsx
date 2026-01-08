// apps/FE-12__CityOfGate_12.x/src/actionbar/CityActionBarHost.jsx

import React from "react";

export default function CityActionBarHost({ bar }) {
  // Jeśli action bar jeszcze się inicjalizuje
  if (!bar || !bar.actions) {
    return (
      <div className="city-actionbar">
        <div className="city-actionbar-placeholder">Loading actions…</div>
      </div>
    );
  }

  return (
    <div className="city-actionbar">
      {bar.actions.map((a) => (
        <button key={a.id} className="city-action-button">
          {a.label}
        </button>
      ))}
    </div>
  );
}
