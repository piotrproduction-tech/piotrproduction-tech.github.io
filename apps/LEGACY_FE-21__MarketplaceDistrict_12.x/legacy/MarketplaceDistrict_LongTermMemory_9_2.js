// MarketplaceDistrict — DistrictLongTermMemory_9_2
// Pamięć długoterminowa: agregaty, trendy, liczniki.

export class MarketplaceDistrict_LongTermMemory_9_2 {
  constructor() {
    this.counters = {
      tabooTriggered: 0,
      tabooSoftened: 0,
      hypeEvents: 0,
      creatorEvents: 0,
      marketplaceEvents: 0,
      streetEvents: 0
    };
  }

  record(event, result) {
    if (result.type === "TABOO_TRIGGERED") this.counters.tabooTriggered++;
    if (result.type === "TABOO_SOFTENED") this.counters.tabooSoftened++;

    if (event.type.startsWith("street.")) this.counters.streetEvents++;
    if (event.type.startsWith("creator.")) this.counters.creatorEvents++;
    if (event.type.startsWith("marketplace.")) this.counters.marketplaceEvents++;

    if (event.type.includes("boost") || event.type.includes("highlight")) {
      this.counters.hypeEvents++;
    }
  }

  getSnapshot() {
    return { ...this.counters };
  }
}
