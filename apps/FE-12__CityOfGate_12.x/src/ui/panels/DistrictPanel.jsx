import React from "react";

export function DistrictPanel({ district }) {
  if (!district) return null;

  return (
    <div className="city-panel">
      <h2>{district.name}</h2>
      <p>Typ: {district.type}</p>
      <pre>{JSON.stringify(district, null, 2)}</pre>
    </div>
  );
}
