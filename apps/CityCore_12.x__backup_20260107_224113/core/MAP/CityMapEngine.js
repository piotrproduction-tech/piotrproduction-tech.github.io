import map from "./cityMap.json";

export function init(engine) {
  console.log("đź—şď¸Ź CityMapEngine: initializingâ€¦");

  engine.map = {
    tiles: map.tiles || [],
    getCityTiles,
    getModuleTile
  };

  console.log("đź—şď¸Ź CityMapEngine: ready.");
}

export function getCityTiles() {
  return map.tiles || [];
}

export function getModuleTile(moduleName) {
  return map.tiles.find(t => t.module === moduleName);
}

