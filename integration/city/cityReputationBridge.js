import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";
/**
 * CITY REPUTATION BRIDGE
 * Globalna reputacja użytkowników → Marketplace
 */

export const CityReputationBridge = {
  applyUserReputation(state, userId, reputationEngine) {
    const rep = reputationEngine.getReputation(userId);
    state.userReputation = { userId, value: rep };
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  }
};