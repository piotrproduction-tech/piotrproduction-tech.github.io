// apps/FE-12__CityOfGate_12.x/src/district-panels/DistrictPanelLoader.js

import { DistrictPanelRegistry } from "./DistrictPanelRegistry.js";

export async function loadPanelsForDistrict(districtId) {
  const entry = DistrictPanelRegistry[districtId];
  if (!entry || !entry.panels) {
    return [];
  }

  const loaded = [];

  for (const panel of entry.panels) {
    try {
      const module = await import(/* @vite-ignore */ panel.path);
      loaded.push({
        id: panel.id,
        name: panel.name,
        Component: module.default || module
      });
    } catch (err) {
      console.error("❌ Failed to load panel:", panel.id, err);
    }
  }

  return loaded;
}
