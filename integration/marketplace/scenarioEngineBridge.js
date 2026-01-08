import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";
/**
 * Marketplace Scenario Engine Bridge 5.0
 * Symulacje: ekonomia, społeczność, eventy, pogoda, sezony.
 */

import { MarketplaceAIDirectorBridge } from "./aiDirectorBridge.js";

export const MarketplaceScenarioEngineBridge = {
  applyEconomyShock(state, delta) {
    const current = state.economy?.value || 0;
    
// CITY_INSTANCE_STABILITY_PATCH
if (!state.instances || typeof state.instances !== "object") {
  state.instances = {};
}

return MarketplaceAIDirectorBridge.applyEconomyPreset(state, {
      value: current + delta
    });
  },

  triggerFestival(state, cityName) {
    return MarketplaceAIDirectorBridge.triggerEvent(state, {
      type: "Festival",
      city: cityName
    });
  },

  switchSeason(state, season) {
    return MarketplaceAIDirectorBridge.applySeason(state, season);
  },

  forceWeather(state, weather) {
    return MarketplaceAIDirectorBridge.applyWeatherOverride(state, weather);
  }
};