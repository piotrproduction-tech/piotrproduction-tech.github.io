// apps/FE-12__CityOfGate_12.x/src/ui/CityStatusBar.jsx

import React from "react";

export default function CityStatusBar({ heartbeat }) {
  return (
    <div className="city-statusbar">
      <span>Heartbeat: {heartbeat ?? "…"}</span>
    </div>
  );
}
