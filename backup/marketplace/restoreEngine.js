/**
 * Marketplace Restore Engine 5.0
 */

export const MarketplaceRestoreEngine = {
  restoreSnapshot(snapshot) {
    return { restored: true, snapshot };
  },

  restoreModels(models) {
    return { restored: true, models };
  },

  restoreEvents(events) {
    return { restored: true, events };
  },

  restoreProgression(data) {
    return { restored: true, progression: true };
  },

  restoreGlow(data) {
    return { restored: true, glow: true };
  },

  restoreStreetSync(data) {
    return { restored: true, streetSync: true };
  },

  restoreKnowledgeGraph(graph) {
    return { restored: true, graph };
  }
};