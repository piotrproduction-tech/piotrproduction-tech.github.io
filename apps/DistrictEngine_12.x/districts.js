import { eventBus } from "./eventBus.js";

export function initDistricts(mapData) {
  console.log("🏙️ DistrictEngine: districts module ready.");

  const tiles = mapData.getCityTiles();

  const districtMap = {
    stream: "Stream Square",
    marketplace: "Marketplace Street",
    gallery: "Culture Gallery",
    festival: "Festival Pavilion",
    education: "Education Library",
    community: "Community House",
    dao: "DAO Town Hall",
    innovation: "Innovation Hub",
    wellness: "Wellness Garden",
    sports: "Sports Arena",
    business: "Business District",
    grants: "Grants Office",
    volunteer: "Volunteer Center",
    budget: "Budget Bank",
    admin: "Admin Tower"
  };

  const districts = tiles.map((tile) => ({
    id: tile.id,
    name: districtMap[tile.type] || "Unknown District",
    type: tile.type,
    x: tile.x,
    y: tile.y
  }));

  eventBus.emit("city:districts:init", districts);
}
