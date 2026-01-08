// apps/FE-12__CityOfGate_12.x/src/district-hud/DistrictHUDHost.jsx

import React from "react";

export default function DistrictHUDHost({ hud }) {
  // Jeśli HUD jeszcze się inicjalizuje
  if (!hud) {
    return null;
  }

  if (!hud.visible) {
    return null;
  }

  return (
    <div className="district-hud">
      <div className="hud-header">
        <span>District: {hud.districtName || "unknown"}</span>
        <span>Pulse: {hud.pulse}</span>
      </div>

      <div className="hud-notifications">
        {(hud.notifications || []).map((n) => (
          <div key={n.id} className="hud-notification">
            {n.message}
          </div>
        ))}
      </div>
    </div>
  );
}
