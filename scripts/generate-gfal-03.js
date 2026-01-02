import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODELE
  "models/playbackRequest.js": `
export class PlaybackRequest {
  constructor({ userId, festivalId, type, filmId, eventId, preferredLanguage }) {
    this.userId = userId;
    this.festivalId = festivalId;
    this.type = type; // "film" | "event"
    this.filmId = filmId || null;
    this.eventId = eventId || null;
    this.preferredLanguage = preferredLanguage || "en";
  }
}
`,

  "models/playbackResponse.js": `
export class PlaybackResponse {
  constructor({ allowed, reason, streamUrl, subtitles, dubbing }) {
    this.allowed = allowed;
    this.reason = reason; // "OK" | "NO_ACCESS" | "NO_TICKET" | "NOT_FOUND"
    this.streamUrl = streamUrl || null;

    // subtitles: { enabled, languages: [], aiEnabled }
    this.subtitles = subtitles || {
      enabled: false,
      languages: [],
      aiEnabled: false
    };

    // dubbing: { enabled, languages: [], aiEnabled }
    this.dubbing = dubbing || {
      enabled: false,
      languages: [],
      aiEnabled: false
    };
  }
}
`,

  // ENGINE
  "engine/playerAccessEngine.js": `
import { PlaybackResponse } from "../models/playbackResponse.js";

export class PlayerAccessEngine {
  constructor({ accessEngine, filmRepository, eventRepository }) {
    this.accessEngine = accessEngine;
    this.filmRepository = filmRepository;
    this.eventRepository = eventRepository;
  }

  getFilmStream(request) {
    const access = this.accessEngine.canAccessFilm(
      request.userId,
      request.festivalId,
      request.filmId
    );

    if (!access.allowed) {
      return new PlaybackResponse({
        allowed: false,
        reason: access.reason
      });
    }

    const film = this.filmRepository.getFilmById(request.festivalId, request.filmId);

    if (!film) {
      return new PlaybackResponse({
        allowed: false,
        reason: "NOT_FOUND"
      });
    }

    return new PlaybackResponse({
      allowed: true,
      reason: "OK",
      streamUrl: film.streamUrl,
      subtitles: {
        enabled: true,
        languages: ["en", "pl"],
        aiEnabled: true
      },
      dubbing: {
        enabled: true,
        languages: ["en", "pl"],
        aiEnabled: true
      }
    });
  }

  getEventStream(request) {
    const access = this.accessEngine.canAccessEvent(
      request.userId,
      request.festivalId,
      request.eventId
    );

    if (!access.allowed) {
      return new PlaybackResponse({
        allowed: false,
        reason: access.reason
      });
    }

    const event = this.eventRepository.getEventById(request.festivalId, request.eventId);

    if (!event) {
      return new PlaybackResponse({
        allowed: false,
        reason: "NOT_FOUND"
      });
    }

    return new PlaybackResponse({
      allowed: true,
      reason: "OK",
      streamUrl: event.streamUrl,
      subtitles: {
        enabled: true,
        languages: ["en", "pl"],
        aiEnabled: true
      },
      dubbing: {
        enabled: false,
        languages: [],
        aiEnabled: false
      }
    });
  }
}
`,

  // TESTY
  "__tests__/player-access-engine.test.js": `
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
`
};

function generateGFAL03() {
  const baseDir = path.join(ROOT, "apps", "GFAL-03__Player_Access");

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

  console.log("\n🎉 GFAL‑03 Player Access is ready.");
}

generateGFAL03();
