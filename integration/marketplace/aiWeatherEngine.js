import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";
/**
 * Marketplace AI Weather Engine 5.0
 * Sterowanie pogodą: dynamiczne zmiany, scenariusze.
 */

export const MarketplaceAIWeatherEngine = {
  setWeather(state, weather) {
    state.weather = weather;
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  },

  cycleWeather(state, sequence = ["Clear", "Cloudy", "Rain", "Storm"]) {
    const current = state.weather;
    const idx = sequence.indexOf(current);
    const next = idx === -1 ? sequence[0] : sequence[(idx + 1) % sequence.length];
    state.weather = next;
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  }
};