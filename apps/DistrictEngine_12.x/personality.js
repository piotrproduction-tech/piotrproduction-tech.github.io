import { eventBus } from "./eventBus.js";

export function initPersonality() {
  console.log("🧬 DistrictEngine: personality module ready.");

  const personalityData = {
    personality: "Calm",
    mood: "Stable",
    confidence: 0.72,
    openness: 0.65,
    creativity: 0.58,
    timestamp: Date.now()
  };

  eventBus.emit("city:personality:init", personalityData);
}
