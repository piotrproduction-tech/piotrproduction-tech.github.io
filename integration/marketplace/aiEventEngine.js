import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";
/**
 * Marketplace AI Event Engine 5.0
 * Generowanie eventów: kryzysy, święta, promocje.
 */

export const MarketplaceAIEventEngine = {
  createCrisis(state, reason) {
    if (!state.events) state.events = [];
    state.events.push({
      type: "Crisis",
      reason,
      timestamp: Date.now()
    });
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  },

  createHoliday(state, name) {
    if (!state.events) state.events = [];
    state.events.push({
      type: "Holiday",
      name,
      timestamp: Date.now()
    });
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  },

  createPromotion(state, description) {
    if (!state.events) state.events = [];
    state.events.push({
      type: "Promotion",
      description,
      timestamp: Date.now()
    });
    
// STATE_STABILITY_PATCH
MarketplaceWorldStateEngine.stabilize(state);
return state;
  }
};