import { PlayerAccessEngine } from "../engine/playerAccessEngine.js";
import { PlaybackRequest } from "../models/playbackRequest.js";

describe("GFAL Player Access Engine", () => {
  const mockAccessEngine = {
    canAccessFilm: jest.fn(),
    canAccessEvent: jest.fn()
  };

  const mockFilmRepository = {
    getFilmById: jest.fn()
  };

  const mockEventRepository = {
    getEventById: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns allowed film playback with stream and AI features", () => {
    mockAccessEngine.canAccessFilm.mockReturnValue({ allowed: true, reason: "OK" });
    mockFilmRepository.getFilmById.mockReturnValue({
      id: 5,
      festivalId: 10,
      streamUrl: "https://stream.example.com/film/5"
    });

    const engine = new PlayerAccessEngine({
      accessEngine: mockAccessEngine,
      filmRepository: mockFilmRepository,
      eventRepository: mockEventRepository
    });

    const request = new PlaybackRequest({
      userId: 1,
      festivalId: 10,
      type: "film",
      filmId: 5,
      preferredLanguage: "pl"
    });

    const response = engine.getFilmStream(request);

    expect(response.allowed).toBe(true);
    expect(response.streamUrl).toBe("https://stream.example.com/film/5");
    expect(response.subtitles.enabled).toBe(true);
    expect(response.subtitles.aiEnabled).toBe(true);
  });

  it("denies film playback without access", () => {
    mockAccessEngine.canAccessFilm.mockReturnValue({ allowed: false, reason: "NO_TICKET" });

    const engine = new PlayerAccessEngine({
      accessEngine: mockAccessEngine,
      filmRepository: mockFilmRepository,
      eventRepository: mockEventRepository
    });

    const request = new PlaybackRequest({
      userId: 1,
      festivalId: 10,
      type: "film",
      filmId: 5
    });

    const response = engine.getFilmStream(request);

    expect(response.allowed).toBe(false);
    expect(response.reason).toBe("NO_TICKET");
  });

  it("returns allowed event playback", () => {
    mockAccessEngine.canAccessEvent.mockReturnValue({ allowed: true, reason: "OK" });
    mockEventRepository.getEventById.mockReturnValue({
      id: 7,
      festivalId: 10,
      streamUrl: "https://stream.example.com/event/7"
    });

    const engine = new PlayerAccessEngine({
      accessEngine: mockAccessEngine,
      filmRepository: mockFilmRepository,
      eventRepository: mockEventRepository
    });

    const request = new PlaybackRequest({
      userId: 2,
      festivalId: 10,
      type: "event",
      eventId: 7
    });

    const response = engine.getEventStream(request);

    expect(response.allowed).toBe(true);
    expect(response.streamUrl).toBe("https://stream.example.com/event/7");
  });
});