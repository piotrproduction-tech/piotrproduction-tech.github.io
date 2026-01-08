/**
 * Marketplace Knowledge Graph Schema 5.0
 */

export const MarketplaceKnowledgeGraphSchema = {
  nodeTypes: [
    "creator",
    "item",
    "shop",
    "event",
    "zone",
    "tag",
    "category"
  ],

  edgeTypes: [
    "creatorCreator",
    "itemItem",
    "creatorItem",
    "shopZone",
    "eventZone",
    "tagItem"
  ]
};