import { eventBus } from "./eventBus.js";

export function initBroadcast() {
  console.log("📡 DistrictEngine: broadcast module ready.");

  const broadcastData = {
    messages: [
      { type: "info", text: "City systems online." },
      { type: "alert", text: "Traffic congestion in Riverside." }
    ],
    timestamp: Date.now()
  };

  eventBus.emit("city:broadcast:init", broadcastData);
}
