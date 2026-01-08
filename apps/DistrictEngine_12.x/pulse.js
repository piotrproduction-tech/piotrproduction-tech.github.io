import { eventBus } from "./eventBus.js";

export function initPulse() {
  console.log("🫀 DistrictEngine: pulse module ready.");

  const pulseData = {
    bpm: 72 + Math.floor(Math.random() * 6 - 3),
    variability: 0.12,
    energy: 0.8,
    timestamp: Date.now()
  };

  eventBus.emit("city:pulse:init", pulseData);
}
