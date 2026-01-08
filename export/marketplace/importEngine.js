/**
 * Marketplace Import Engine 5.0
 * Importuje:
 *  - stan świata
 *  - snapshoty
 *  - instancje sandbox
 */

export const MarketplaceImportEngine = {
  importState(json) {
    return JSON.parse(json);
  },

  importSnapshot(json) {
    return JSON.parse(json);
  },

  importInstance(json) {
    return JSON.parse(json);
  }
};