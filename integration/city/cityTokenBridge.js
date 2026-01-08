import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";
/**
 * CITY TOKEN BRIDGE
 * Globalna ekonomia tokenów → Marketplace
 */

export const CityTokenBridge = {
  applyTokenBalance(state, userId, tokenEngine) {
    const balance = tokenEngine.getBalance(userId);
    state.tokenBalance = { userId, balance };
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  }
};