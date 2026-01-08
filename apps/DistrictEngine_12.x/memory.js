import { eventBus } from "./eventBus.js";

export function initMemory() {
  console.log("🧠 DistrictEngine: memory module ready.");

  const memoryData = {
    lastEvents: [
      "Market opened",
      "New district connected",
      "AI updated"
    ],
    retention: 0.82,
    timestamp: Date.now()
  };

  eventBus.emit("city:memory:init", memoryData);
}
