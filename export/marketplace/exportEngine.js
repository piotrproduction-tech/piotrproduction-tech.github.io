/**
 * Marketplace Export Engine 5.0
 * Eksportuje:
 *  - stan świata
 *  - snapshoty
 *  - instancje sandbox
 *  - konfiguracje
 */

export const MarketplaceExportEngine = {
  exportState(state) {
    return JSON.stringify(state, null, 2);
  },

  exportSnapshot(snapshot) {
    return JSON.stringify(snapshot, null, 2);
  },

  exportInstance(instance) {
    return JSON.stringify(instance, null, 2);
  }
};