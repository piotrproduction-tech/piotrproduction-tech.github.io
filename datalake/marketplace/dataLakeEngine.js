/**
 * Marketplace Data Lake Engine 5.0
 * Archiwizacja danych Marketplace
 */

export const MarketplaceDataLakeEngine = {
  archiveEvent(event) {
    return { archived: true, type: event.type };
  },

  archiveTransaction(tx) {
    return { archived: true, tx };
  },

  archiveProgression(data) {
    return { archived: true, progression: true };
  },

  archiveGlow(data) {
    return { archived: true, glow: true };
  },

  archiveStreetSync(data) {
    return { archived: true, streetSync: true };
  },

  archiveTelemetry(data) {
    return { archived: true, telemetry: true };
  }
};