/**
 * Marketplace Debug Commands 5.0
 */

export const MarketplaceDebugCommands = {
  ping() {
    return { ok: true, timestamp: Date.now() };
  },

  showState(state) {
    return { state };
  },

  showEconomy(state) {
    return { economy: state.economy };
  },

  showWeather(state) {
    return { weather: state.weather };
  },

  showCommunity(state) {
    return { community: state.community };
  },

  showEvents(state) {
    return { events: state.events };
  }
};