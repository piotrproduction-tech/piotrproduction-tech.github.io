import { eventBus } from "./eventBus.js";

export function initRhythm() {
  console.log("🎵 DistrictEngine: rhythm module ready.");

  const rhythmData = {
    pattern: ["beat", "rest", "beat", "beat", "rest"],
    intensity: 0.75,
    syncLevel: 0.9,
    timestamp: Date.now()
  };

  eventBus.emit("city:rhythm:init", rhythmData);
}
