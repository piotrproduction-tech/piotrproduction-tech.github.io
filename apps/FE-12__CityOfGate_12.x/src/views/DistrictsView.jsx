import React from "react";

export function DistrictsView({ districts, onOpenPanel }) {
  return (
    <div className="city-view-card">
      <h2>Dzielnice miasta</h2>

      <ul>
        {districts?.map((d) => (
          <li key={d.id}>
            <button onClick={() => onOpenPanel(d.id)}>
              {d.name} ({d.type})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
