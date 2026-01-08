// MarketplaceStreetDistrict — DistrictEmergentState_9_2
// Długoterminowy stan dzielnicy: tendencje, nastroje, archetyp w czasie.

export class MarketplaceStreetDistrict_EmergentState_9_2 {
  constructor() {
    this.state = {
      archetype: "BASE",
      stability: 1.0,
      tension: 0.0,
      hypeLevel: 0.0,
      creatorAffinity: 0.5,
      marketplaceAffinity: 0.5,
      streetAffinity: 0.5,
      lastUpdated: Date.now()
    };
  }

  applySignal(signal) {
    // signal: { type, weight, source }
    const { type, weight, source } = signal;

    if (type === "TABOO_TRIGGERED") {
      this.state.tension = Math.min(1.0, this.state.tension + 0.1 * weight);
      this.state.stability = Math.max(0.0, this.state.stability - 0.05 * weight);
    }

    if (type === "HYPE_EVENT") {
      this.state.hypeLevel = Math.min(1.0, this.state.hypeLevel + 0.1 * weight);
    }

    if (type === "CREATOR_EVENT") {
      this.state.creatorAffinity = Math.min(1.0, this.state.creatorAffinity + 0.05 * weight);
    }

    if (type === "MARKETPLACE_EVENT") {
      this.state.marketplaceAffinity = Math.min(1.0, this.state.marketplaceAffinity + 0.05 * weight);
    }

    if (type === "STREET_EVENT") {
      this.state.streetAffinity = Math.min(1.0, this.state.streetAffinity + 0.05 * weight);
    }

    this.state.lastUpdated = Date.now();
  }

  snapshot() {
    return { ...this.state };
  }
}
