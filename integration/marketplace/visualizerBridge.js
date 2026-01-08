/**
 * Marketplace Visualizer Bridge 5.0
 * Dane do wizualizacji: heatmapy, cykle, shard'y, instancje.
 */

import { MarketplaceWorldStateEngine } from "../../world/marketplace/worldStateEngine.js";

export const MarketplaceVisualizerBridge = {
  extractOverview(state) {
    return {
      season: state.season || null,
      weather: state.weather || null,
      economy: state.economy || null,
      eventsCount: Array.isArray(state.events) ? state.events.length : 0
    };
  },

  extractInstances(instances = {}) {
    return Object.entries(instances).map(([id, inst]) => ({
      id,
      createdAt: inst.createdAt || null,
      snapshots: inst.snapshots ? inst.snapshots.length : 0
    }));
  },

  extractShards(shardingEngine) {
    if (!shardingEngine || !shardingEngine.shards) return [];
    return Object.entries(shardingEngine.shards).map(([id, shard]) => ({
      id,
      entities: shard.entities ? shard.entities.length : 0
    }));
  }
};