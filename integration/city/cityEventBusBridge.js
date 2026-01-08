import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";
/**
 * CITY EVENT BUS BRIDGE
 * Globalne eventy miasta → Marketplace
 */

export const CityEventBusBridge = {
  forwardEventToMarketplace(state, event) {
    // CITY_EVENTBUS_STABILITY_PATCH
    if (!Array.isArray(state.events)) state.events = [];
    if (!Array.isArray(state.events)) state.events = [];
    state.events.push({
      ...event,
      forwardedFromCity: true
    });
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  }
};