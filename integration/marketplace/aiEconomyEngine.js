import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";
/**
 * Marketplace AI Economy Engine 5.0
 * Sterowanie ekonomią: wzrost, spadki, stabilizacja.
 */

export const MarketplaceAIEconomyEngine = {
  applyGrowth(state, rate = 0.05) {
    const current = state.economy?.value || 0;
    const updated = Math.round(current * (1 + rate));
    state.economy = { ...(state.economy || {}), value: updated };
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  },

  applyRecession(state, rate = 0.05) {
    const current = state.economy?.value || 0;
    const updated = Math.round(current * (1 - rate));
    state.economy = { ...(state.economy || {}), value: updated };
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  },

  stabilize(state, target) {
    state.economy = { ...(state.economy || {}), value: target };
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  }
};