import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";
/**
 * CITY AI DIRECTOR BRIDGE
 * Globalny AI Director → Marketplace
 */

export const CityAIDirectorBridge = {
  applyGlobalDirective(state, directive) {
    state.globalDirective = directive;
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  }
};