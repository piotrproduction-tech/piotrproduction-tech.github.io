/**
 * Marketplace Knowledge Graph Bridge 5.0
 * Relacje: instancje, shard'y, miasta, użytkownicy.
 */

export const MarketplaceKnowledgeGraphBridge = {
  linkInstanceToShard(graph, instanceId, shardId) {
    graph?.addEdge?.({
      from: `instance:${instanceId}`,
      to: `shard:${shardId}`,
      type: "HOSTED_IN"
    });
  },

  linkInstanceToCity(graph, instanceId, cityName) {
    graph?.addEdge?.({
      from: `instance:${instanceId}`,
      to: `city:${cityName}`,
      type: "BELONGS_TO"
    });
  },

  linkUserToInstance(graph, userId, instanceId) {
    graph?.addEdge?.({
      from: `user:${userId}`,
      to: `instance:${instanceId}`,
      type: "PARTICIPATES_IN"
    });
  }
};