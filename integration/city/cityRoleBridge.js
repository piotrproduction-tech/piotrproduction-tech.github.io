import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";
/**
 * CITY ROLE BRIDGE
 * Globalne role i progresja → Marketplace
 */

export const CityRoleBridge = {
  applyUserRole(state, userId, roleEngine) {
    const role = roleEngine.getRole(userId);
    state.userRole = { userId, role };
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  }
};