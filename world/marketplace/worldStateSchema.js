/**
 * Marketplace World State Schema 5.0
 */

export const MarketplaceWorldStateSchema = {
  season: "string|null",
  economy: {
    health: "number",
    volatility: "number"
  },
  community: {
    mood: "string",
    activityLevel: "number"
  },
  events: {
    active: "array",
    history: "array"
  },
  modifiers: "object"
};