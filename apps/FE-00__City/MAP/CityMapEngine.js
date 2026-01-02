import map from "./cityMap.json";

export function getCityTiles() {
  return map.tiles || [];
}

export function getModuleTile(moduleName) {
  return map.tiles.find((t) => t.module === moduleName);
}
