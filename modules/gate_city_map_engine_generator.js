/**
 * DUŻY KROK 5 — CITY MAP ENGINE
 *
 * Tworzy:
 * - FE-00__City/MAP/cityMap.json
 * - FE-00__City/PANELS/CityMapPanel.js
 * - FE-00__City/MAP/CityMapEngine.js
 * - automatyczne kafle dla FE-01 i FE-02
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APPS = path.join(ROOT, "apps");
const FE00 = path.join(APPS, "FE-00__City");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeIfMissing(file, content) {
  if (!fs.existsSync(file)) {
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, content);
    console.log("📄 Utworzono:", path.relative(ROOT, file));
  } else {
    console.log("⏭  Istnieje:", path.relative(ROOT, file));
  }
}

console.log("🏙️  DUŻY KROK 5 — CITY MAP ENGINE START...");

// 1. cityMap.json
writeIfMissing(
  path.join(FE00, "MAP", "cityMap.json"),
  `{
  "tiles": [
    {
      "id": "city_hall",
      "label": "City Hall",
      "module": "FE-00__City",
      "x": 0,
      "y": 0
    },
    {
      "id": "festival_pavilion",
      "label": "Festival Pavilion",
      "module": "FE-01__Festival_Pavilion",
      "x": 1,
      "y": 0
    },
    {
      "id": "marketplace",
      "label": "Marketplace Street",
      "module": "FE-02__Marketplace",
      "x": 2,
      "y": 0
    }
  ]
}
`
);

// 2. CityMapEngine.js
writeIfMissing(
  path.join(FE00, "MAP", "CityMapEngine.js"),
  `import map from "./cityMap.json";

export function getCityTiles() {
  return map.tiles || [];
}

export function getModuleTile(moduleName) {
  return map.tiles.find((t) => t.module === moduleName);
}
`
);

// 3. CityMapPanel.js
writeIfMissing(
  path.join(FE00, "PANELS", "CityMapPanel.js"),
  `import React from "react";
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
`
);

console.log("🎉 DUŻY KROK 5 — CITY MAP ENGINE ZAKOŃCZONY.");
