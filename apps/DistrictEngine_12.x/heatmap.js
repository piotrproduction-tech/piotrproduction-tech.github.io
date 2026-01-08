import { eventBus } from "./eventBus.js";

export function initHeatmap() {
  console.log("🔥 DistrictEngine: heatmap module ready.");

  const heatmapData = {
    districts: {
      OldTown: Math.random(),
      Riverside: Math.random(),
      Industrial: Math.random(),
      University: Math.random()
    },
    timestamp: Date.now()
  };

  eventBus.emit("city:heatmap:init", heatmapData);
}
