/**
 * Progression Matrix — Marketplace 5.0
 * Definicje poziomów twórców, sklepów i kolekcji
 */

export const MarketplaceProgressionMatrix = {
  creatorLevels: [
    { level: 1, minReputation: 0 },
    { level: 2, minReputation: 100 },
    { level: 3, minReputation: 300 },
    { level: 4, minReputation: 700 },
    { level: 5, minReputation: 1500 }
  ],

  shopLevels: [
    { level: 1, minSales: 0 },
    { level: 2, minSales: 10 },
    { level: 3, minSales: 30 },
    { level: 4, minSales: 80 },
    { level: 5, minSales: 200 }
  ]
};