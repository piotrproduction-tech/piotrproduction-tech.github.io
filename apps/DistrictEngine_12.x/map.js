import { eventBus } from "./eventBus.js";

export function initMap() {
  console.log("🗺️ DistrictEngine: map module ready.");

  const size = 10;

  const types = [
    "stream",
    "marketplace",
    "gallery",
    "festival",
    "education",
    "community",
    "dao",
    "innovation",
    "wellness",
    "sports",
    "business",
    "grants",
    "volunteer",
    "budget",
    "admin"
  ];

  const tiles = [];

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      tiles.push({
        id: `${x}-${y}`,
        x,
        y,
        type: types[Math.floor(Math.random() * types.length)]
      });
    }
  }

  const mapData = {
    getCityTiles: () => tiles
  };

  eventBus.emit("city:map:init", mapData);
}
