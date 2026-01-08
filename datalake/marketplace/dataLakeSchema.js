/**
 * Marketplace Data Lake Schema 5.0
 */

export const MarketplaceDataLakeSchema = {
  event: ["id", "type", "timestamp", "payload"],
  transaction: ["id", "buyerId", "sellerId", "itemId", "price", "timestamp"],
  progression: ["userId", "level", "reputation", "timestamp"],
  glow: ["itemId", "pattern", "timestamp"],
  streetSync: ["zone", "changes", "timestamp"],
  telemetry: ["channel", "payload", "timestamp"]
};