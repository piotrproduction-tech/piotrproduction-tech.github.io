import React from "react";

export function Menu({ onMenuClick }) {
  return (
    <div className="menu">
      <button onClick={() => onMenuClick("map")}>City Map</button>
      <button onClick={() => onMenuClick("districts")}>Districts</button>
      <button onClick={() => onMenuClick("heartbeat")}>Heartbeat</button>
    </div>
  );
}
