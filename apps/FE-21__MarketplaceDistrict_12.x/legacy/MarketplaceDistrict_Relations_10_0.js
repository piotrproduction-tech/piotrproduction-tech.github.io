// MarketplaceDistrict — DistrictRelations_10_0
// Relacje między dzielnicami: napięcia, sojusze, wpływy.

export class MarketplaceDistrict_Relations_10_0 {
  constructor() {
    this.relations = {};
  }

  updateRelation(targetDistrict, delta) {
    if (!this.relations[targetDistrict]) {
      this.relations[targetDistrict] = 0;
    }
    this.relations[targetDistrict] = Math.max(-1, Math.min(1, this.relations[targetDistrict] + delta));
  }

  getRelation(targetDistrict) {
    return this.relations[targetDistrict] || 0;
  }

  snapshot() {
    return { ...this.relations };
  }
}
