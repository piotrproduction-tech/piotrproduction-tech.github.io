/**
 * Marketplace Time Engine 5.0
 * Zarządza czasem świata Marketplace:
 *  - pory dnia
 *  - cykle dobowo-tygodniowe
 *  - ticki świata
 *  - integracja z sezonami i pogodą
 */

export const MarketplaceTimeEngine = {
  getCurrentTime() {
    return Date.now();
  },

  getDayPhase(timestamp = Date.now()) {
    const hour = new Date(timestamp).getHours();
    if (hour < 6) return "night";
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  },

  getWeekCycle(timestamp = Date.now()) {
    const day = new Date(timestamp).getDay();
    return ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][day];
  },

  tick(state) {
    return {
      ...state,
      time: {
        timestamp: Date.now(),
        phase: this.getDayPhase(),
        cycle: this.getWeekCycle()
      }
    };
  }
};