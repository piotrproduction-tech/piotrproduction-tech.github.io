// apps/FE-12__CityOfGate_12.x/src/engine/CityDistrictLoader.js

import { CityDistrictRegistry } from "./CityDistrictRegistry.js";

export async function loadDistrict(id) {
  const entry = CityDistrictRegistry[id];
  if (!entry) {
    throw new Error("District not found: " + id);
  }

  try {
    const module = await import(/* @vite-ignore */ entry.path);
    const engine = await import(/* @vite-ignore */ entry.enginePath);
    const state = await import(/* @vite-ignore */ entry.statePath);

    return {
      id,
      name: entry.name,
      module: module.default || module,
      engine: engine.default || engine,
      state: state.default || state
    };
  } catch (err) {
    console.error("❌ Failed to load district:", id, err);
    throw err;
  }
}
