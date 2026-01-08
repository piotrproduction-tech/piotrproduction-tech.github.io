// apps/FE-12__CityOfGate_12.x/src/district-panels/DistrictPanelHost.jsx

import React from "react";

export default function DistrictPanelHost({ panels }) {
  // Jeśli panele jeszcze się inicjalizują
  if (!panels || panels.length === 0) {
    return (
      <div className="district-panel-host">
        <div className="district-panel-placeholder">
          No panels available…
        </div>
      </div>
    );
  }

  return (
    <div className="district-panel-host">
      {panels.map((p) => {
        const Panel = p.Component;
        return (
          <div key={p.id} className="district-panel">
            <Panel />
          </div>
        );
      })}
    </div>
  );
}
