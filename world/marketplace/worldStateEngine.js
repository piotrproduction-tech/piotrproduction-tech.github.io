/**
 * Marketplace World State Engine 5.0
 * Stabilny, samonaprawiający się stan świata.
 */

export const MarketplaceWorldStateEngine = {

  /**
   * Tworzy pusty stan świata z pełną stabilizacją.
   */
  createEmptyState(initial = {}) {
    return {
      economy: initial.economy || { value: 0 },
      social: initial.social || { mood: 0, trust: 0, tension: 0 },
      weather: initial.weather || "Clear",
      season: initial.season || "Spring",
      events: Array.isArray(initial.events) ? initial.events : [],
      ...initial
    };
  },

  /**
   * Stabilizuje stan świata — samoleczenie.
   */
  stabilize(state) {
    if (!state) state = {};

    // ECONOMY
    if (!state.economy || typeof state.economy.value !== "number") {
      state.economy = { value: state.economy?.value ?? 0 };
    }

    // SOCIAL
    if (!state.social) state.social = {};
    if (typeof state.social.mood !== "number") state.social.mood = 0;
    if (typeof state.social.trust !== "number") state.social.trust = 0;
    if (typeof state.social.tension !== "number") state.social.tension = 0;

    // WEATHER
    if (typeof state.weather !== "string") state.weather = "Clear";

    // SEASON
    if (typeof state.season !== "string") state.season = "Spring";

    // EVENTS
    if (!Array.isArray(state.events)) state.events = [];

    return state;
  }
};
