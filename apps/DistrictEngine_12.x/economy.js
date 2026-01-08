import { eventBus } from "./eventBus.js";

export function initEconomy() {
  console.log("💰 DistrictEngine: economy module ready.");

  const economyData = {
    gdp: 128.4,
    growth: 0.03,
    unemployment: 0.06,
    inflation: 0.02,
    timestamp: Date.now()
  };

  eventBus.emit("city:economy:init", economyData);
}
