/**
 * Marketplace Telemetry Bridge 5.0
 * Metryki: performance, load, tick time, event time, shard load.
 */

export const MarketplaceTelemetryBridge = {
  measureTick(telemetry, tickStart, tickEnd) {
    telemetry?.record?.("marketplace.tick.duration", tickEnd - tickStart);
  },

  measureShardLoad(telemetry, shardingEngine) {
    if (!shardingEngine || !shardingEngine.shards) return;
    Object.entries(shardingEngine.shards).forEach(([id, shard]) => {
      const load = shard.entities ? shard.entities.length : 0;
      telemetry?.record?.("marketplace.shard.load", load, { shardId: id });
    });
  },

  measureInstanceCount(telemetry, instances = {}) {
    const count = Object.keys(instances).length;
    telemetry?.record?.("marketplace.instances.count", count);
  }
};