import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";
/**
 * Marketplace AI Season Engine 5.0
 * Sterowanie sezonami: cykle, scenariusze.
 */

export const MarketplaceAISeasonEngine = {
  setSeason(state, season) {
    state.season = season;
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  },

  cycleSeason(state, sequence = ["Spring", "Summer", "Autumn", "Winter"]) {
    const current = state.season;
    const idx = sequence.indexOf(current);
    const next = idx === -1 ? sequence[0] : sequence[(idx + 1) % sequence.length];
    state.season = next;
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  }
};