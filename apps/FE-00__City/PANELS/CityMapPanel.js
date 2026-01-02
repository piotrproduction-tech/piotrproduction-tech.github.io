import React from "react";
import { getCityTiles } from "../MAP/CityMapEngine";

export function CityMapPanel({ onNavigate }) {
  const tiles = getCityTiles();

  return (
    <div>
      <h2>Mapa Miasta</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {tiles.map((tile) => (
          <div
            key={tile.id}
            onClick={() => onNavigate(tile.module)}
            style={{
              width: "140px",
              height: "140px",
              border: "2px solid #444",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              background: "#fafafa"
            }}
          >
            {tile.label}
          </div>
        ))}
      </div>
    </div>
  );
}
