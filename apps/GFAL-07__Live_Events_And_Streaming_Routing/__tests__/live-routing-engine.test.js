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