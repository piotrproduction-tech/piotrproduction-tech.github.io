/**
 * Heatmap Matrix — Marketplace 5.0
 * Definicje map popularności i aktywności
 */

export const MarketplaceHeatmapMatrix = {
  streetZones: ["north", "south", "east", "west", "center"],

  heatWeights: {
    sales: 0.5,
    visits: 0.3,
    interactions: 0.2
  },

  decayRate: 0.85 // wygaszanie w czasie
};