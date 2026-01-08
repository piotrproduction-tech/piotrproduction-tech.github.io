/**
 * Marketplace Sync Bridge 5.0
 * Łączy Marketplace z innymi modułami miasta
 */

import { MarketplaceSyncMap } from "./syncMap.js";

export const MarketplaceSyncBridge = {
  syncWith(moduleName, payload) {
    return {
      synced: true,
      module: moduleName,
      payload
    };
  },

  getSyncTargets() {
    return MarketplaceSyncMap;
  }
};