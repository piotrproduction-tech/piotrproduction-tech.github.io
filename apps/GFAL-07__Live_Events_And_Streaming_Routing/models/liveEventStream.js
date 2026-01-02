export class LiveEventStream {
  constructor({
    eventId,
    festivalId,
    mode,
    onlineStreamUrl,
    onsiteLocation,
    isHybrid
  }) {
    this.eventId = eventId;
    this.festivalId = festivalId;
    this.mode = mode; // "online" | "onsite" | "hybrid"
    this.onlineStreamUrl = onlineStreamUrl || null;
    this.onsiteLocation = onsiteLocation || null;
    this.isHybrid = isHybrid || false;
  }
}