import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODEL
  "models/liveEventStream.js": `
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
`,

  // ENGINE
  "engine/liveRoutingEngine.js": `
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
`,

  // TESTY
  "__tests__/live-routing-engine.test.js": `
import { LiveRoutingEngine } from "../engine/liveRoutingEngine.js";

describe("GFAL Live Events & Streaming Routing Engine", () => {
  const mockEventRepository = {
    getEventById: jest.fn()
  };

  const mockAccessEngine = {
    canAccessEvent: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns hybrid routing when both stream and location exist", () => {
    mockAccessEngine.canAccessEvent.mockReturnValue({ allowed: true, reason: "OK" });

    mockEventRepository.getEventById.mockReturnValue({
      id: 7,
      festivalId: 10,
      title: "Opening Gala",
      streamUrl: "https://stream.example.com/event/7",
      location: "Main Hall"
    });

    const engine = new LiveRoutingEngine({
      eventRepository: mockEventRepository,
      accessEngine: mockAccessEngine
    });

    const result = engine.getLiveRoutingForEvent(1, 10, 7);

    expect(result.allowed).toBe(true);
    expect(result.stream.isHybrid).toBe(true);
    expect(result.stream.mode).toBe("hybrid");
    expect(result.stream.onlineStreamUrl).toBe("https://stream.example.com/event/7");
    expect(result.stream.onsiteLocation).toBe("Main Hall");
  });

  it("denies routing without access", () => {
    mockAccessEngine.canAccessEvent.mockReturnValue({ allowed: false, reason: "NO_TICKET" });

    const engine = new LiveRoutingEngine({
      eventRepository: mockEventRepository,
      accessEngine: mockAccessEngine
    });

    const result = engine.getLiveRoutingForEvent(1, 10, 7);

    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("NO_TICKET");
  });

  it("returns online-only routing when only stream exists", () => {
    mockAccessEngine.canAccessEvent.mockReturnValue({ allowed: true, reason: "OK" });

    mockEventRepository.getEventById.mockReturnValue({
      id: 8,
      festivalId: 10,
      title: "Q&A Session",
      streamUrl: "https://stream.example.com/event/8",
      location: null
    });

    const engine = new LiveRoutingEngine({
      eventRepository: mockEventRepository,
      accessEngine: mockAccessEngine
    });

    const result = engine.getLiveRoutingForEvent(1, 10, 8);

    expect(result.allowed).toBe(true);
    expect(result.stream.mode).toBe("online");
    expect(result.stream.isHybrid).toBe(false);
  });
});
`
};

function generateGFAL07() {
  const baseDir = path.join(ROOT, "apps", "GFAL-07__Live_Events_And_Streaming_Routing");

  Object.entries(FILES).forEach(([relativePath, content]) => {
    const filePath = path.join(baseDir, relativePath);
    const dir = path.dirname(filePath);

    ensureDir(dir);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content.trim(), "utf8");
      console.log("✔ Created:", filePath);
    } else {
      console.log("⏭ Skipped (exists):", filePath);
    }
  });

  console.log("\n🎉 GFAL‑07 Live Events & Streaming Routing is ready.");
}

generateGFAL07();
