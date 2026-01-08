// MarketplaceDistrict — DistrictMemory_9_1
// Pamięć krótkoterminowa dzielnicy (ostatnie eventy, glow, transakcje).

export class MarketplaceDistrict_Memory_9_1 {
  constructor(limit = 10) {
    this.limit = limit;
    this.events = [];
  }

  record(event, result) {
    this.events.push({
      event,
      result,
      at: Date.now()
    });
    if (this.events.length > this.limit) {
      this.events.shift();
    }
  }

  getLastEvent() {
    return this.events[this.events.length - 1] || null;
  }

  getRecentEvents(filterFn = null) {
    if (!filterFn) return [...this.events];
    return this.events.filter(filterFn);
  }

  hasRecentTaboo(reason) {
    return this.events.some(e => e.result?.type === "TABOO_TRIGGERED" && e.result?.reason === reason);
  }
}
