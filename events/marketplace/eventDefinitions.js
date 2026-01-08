/**
 * Marketplace Event Definitions 5.0
 */

export const MarketplaceEventDefinitions = {
  drop: {
    requiredFields: ["items", "creatorId", "dropTime"]
  },

  flashSale: {
    requiredFields: ["items", "discount", "duration"]
  },

  creatorEvent: {
    requiredFields: ["creatorId", "items", "startTime"]
  },

  streetEvent: {
    requiredFields: ["zone", "items", "startTime"]
  }
};