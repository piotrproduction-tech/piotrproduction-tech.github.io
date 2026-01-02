


// FE_FESTIVAL_ADMIN_ACCESS_PANEL
// Visualizes Access Matrix + allows admin override

import React, { useState } from "react";
import { FestivalAccessMatrix } from "../access/accessMatrix";
import { evaluateFestivalAccess } from "../access/accessEvaluator";

export function AdminAccessPanel({ identity, governance, security, onOverride }) {
  const [override, setOverride] = useState(null);

  const current = evaluateFestivalAccess(identity, governance, security);

  function applyOverride(key, value) {
    const updated = { ...current, [key]: value };
    setOverride(updated);
    if (typeof onOverride === "function") onOverride(updated);
  }

  const finalAccess = override || current;

  return (
    <div className="admin-access-panel">
      <h2>Access Matrix — Festival Pavilion</h2>

      <div className="access-section">
        <h3>Current Access</h3>
        <pre>{JSON.stringify(current, null, 2)}</pre>
      </div>

      <div className="access-section">
        <h3>Override (Admin Only)</h3>
        <div className="override-grid">
          {Object.keys(current).map((key) => (
            <div key={key} className="override-row">
              <span className="override-key">{key}</span>
              <button onClick={() => applyOverride(key, true)}>Allow</button>
              <button onClick={() => applyOverride(key, false)}>Deny</button>
            </div>
          ))}
        </div>
      </div>

      <div className="access-section">
        <h3>Final Access</h3>
        <pre>{JSON.stringify(finalAccess, null, 2)}</pre>
      </div>
    </div>
  );
}
