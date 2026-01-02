import { LiveEventStream } from "../models/liveEventStream.js";

export class LiveRoutingEngine {
  constructor({ eventRepository, accessEngine }) {
    this.eventRepository = eventRepository;
    this.accessEngine = accessEngine;
  }

  getLiveRoutingForEvent(userId, festivalId, eventId) {
    const access = this.accessEngine.canAccessEvent(userId, festivalId, eventId);

    if (!access.allowed) {
      return {
        allowed: false,
        reason: access.reason,
        stream: null
      };
    }

    const event = this.eventRepository.getEventById(festivalId, eventId);

    if (!event) {
      return {
        allowed: false,
        reason: "NOT_FOUND",
        stream: null
      };
    }

    const mode = event.mode || (event.streamUrl && event.location ? "hybrid"
      : event.streamUrl ? "online"
      : event.location ? "onsite"
      : "online");

    const stream = new LiveEventStream({
      eventId: event.id,
      festivalId,
      mode,
      onlineStreamUrl: event.streamUrl || null,
      onsiteLocation: event.location || null,
      isHybrid: mode === "hybrid"
    });

    return {
      allowed: true,
      reason: "OK",
      stream
    };
  }
}