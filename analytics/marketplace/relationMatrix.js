/**
 * Relation Matrix — Marketplace 5.0
 * Definicje wag relacji i powiązań
 */

export const MarketplaceRelationMatrix = {
  creatorAffinityWeights: {
    sharedTags: 0.3,
    sharedBuyers: 0.4,
    sharedEvents: 0.3
  },

  itemSynergyWeights: {
    sameCategory: 0.4,
    complementaryTags: 0.4,
    sharedPopularity: 0.2
  },

  shopInfluenceWeights: {
    sales: 0.5,
    footTraffic: 0.3,
    eventParticipation: 0.2
  }
};