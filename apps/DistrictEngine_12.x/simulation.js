import { eventBus } from "./eventBus.js";

export function initSimulation() {
  console.log("🧪 DistrictEngine: simulation module ready.");

  const simulationData = {
    tick: 1,
    speed: 1.0,
    running: true,
    timestamp: Date.now()
  };

  eventBus.emit("city:simulation:init", simulationData);
}
