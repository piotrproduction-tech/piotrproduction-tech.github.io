import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";
/**
 * Marketplace AI Social Engine 5.0
 * Sterowanie nastrojem społecznym, zaufaniem, napięciem.
 */

export const MarketplaceAISocialEngine = {
  adjustMood(state, delta) {
    const current = state.social?.mood || 0;
    state.social = {
      ...(state.social || {}),
      mood: current + delta
    };
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  },

  adjustTrust(state, delta) {
    const current = state.social?.trust || 0;
    state.social = {
      ...(state.social || {}),
      trust: current + delta
    };
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  },

  adjustTension(state, delta) {
    const current = state.social?.tension || 0;
    state.social = {
      ...(state.social || {}),
      tension: current + delta
    };
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  }
};