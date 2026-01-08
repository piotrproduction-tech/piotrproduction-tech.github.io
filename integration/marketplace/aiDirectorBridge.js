/**
 * Marketplace AI Director Bridge 5.0
 *
 * Łączy:
 *  - AI Director → sterowanie sezonami, pogodą, ekonomią, eventami
 */

import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";
import { MarketplaceWeatherEngine } from "../../world/marketplace/weatherEngine.js";
import { MarketplaceRandomnessEngine } from "../../world/marketplace/randomnessEngine.js";

export const MarketplaceAIDirectorBridge = {
  applySeason(state, seasonPreset) {
    state.season = seasonPreset;
    return state;
  },

  applyWeatherOverride(state, weatherPreset) {
    state.weather = weatherPreset || MarketplaceWeatherEngine.generateWeather({
      seed: MarketplaceRandomnessEngine.random()
    });
    return state;
  },

  applyEconomyPreset(state, economyPreset) {
    state.economy = {
      ...state.economy,
      ...economyPreset
    };
    return state;
  },

  triggerEvent(state, event) {
    if (!Array.isArray(state.events)) state.events = [];
    state.events.push({
      ...event,
      timestamp: Date.now()
    });
    return state;
  }
};
