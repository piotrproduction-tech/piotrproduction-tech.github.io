// MarketplaceStreetDistrict — DistrictCoalitionEngine_10_0
// Tworzenie koalicji i napięć między dzielnicami.

export class MarketplaceStreetDistrict_CoalitionEngine_10_0 {
  constructor(relations) {
    this.relations = relations;
  }

  evaluateCoalition(targetDistrict) {
    const score = this.relations.getRelation(targetDistrict);

    if (score > 0.6) return "ALLY";
    if (score < -0.6) return "RIVAL";
    return "NEUTRAL";
  }
}
