/**
 * Marketplace Progression Engine 5.0
 * Rola:
 *  - poziomy twórców
 *  - poziomy sklepów
 *  - poziomy kolekcji
 *  - nagrody reputacyjne
 */

export const MarketplaceProgressionEngine = {
  getCreatorLevel(creator) {
    return 1;
  },

  getShopLevel(shop) {
    return 1;
  },

  getItemTier(item) {
    return "common";
  },

  calculateReputationGain(event) {
    return 0;
  }
};