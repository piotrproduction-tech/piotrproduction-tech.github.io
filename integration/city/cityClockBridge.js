import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";
/**
 * CITY CLOCK BRIDGE
 * Globalny zegar miasta → Marketplace
 */

export const CityClockBridge = {
  syncTimeToMarketplace(state, cityClock) {
    state.globalTime = cityClock.now();
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  }
};