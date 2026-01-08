/**
 * Marketplace Seasonal Events Engine 5.0
 * Zarządza cyklami świata, sezonami i rotacjami.
 */

export const MarketplaceSeasonEngine = {
  startSeason(seasonId) {
    return { started: true, seasonId };
  },

  endSeason(seasonId) {
    return { ended: true, seasonId };
  },

  rotateItems(pool) {
    return pool.slice(0, Math.floor(pool.length / 2));
  },

  applySeasonModifiers(data, modifiers) {
    return { modified: true, data, modifiers };
  },

  getActiveSeason() {
    return { season: "default" };
  }
};