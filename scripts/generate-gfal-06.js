import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODEL
  "models/programItem.js": `
export class ProgramItem {
  constructor({
    id,
    festivalId,
    type,
    title,
    startTime,
    endTime,
    room,
    isOnline,
    canAccess
  }) {
    this.id = id;
    this.festivalId = festivalId;
    this.type = type; // "film" | "event"
    this.title = title;
    this.startTime = startTime;
    this.endTime = endTime;
    this.room = room || null;
    this.isOnline = isOnline;
    this.canAccess = canAccess; // boolean
  }
}
`,

  // ENGINE
  "engine/programViewerEngine.js": `
import { ProgramItem } from "../models/programItem.js";

export class ProgramViewerEngine {
  constructor({ filmRepository, eventRepository, accessEngine }) {
    this.filmRepository = filmRepository;
    this.eventRepository = eventRepository;
    this.accessEngine = accessEngine;
  }

  buildProgramForFestival(userId, festivalId) {
    const films = this.filmRepository.getFilmsForFestival(festivalId) || [];
    const events = this.eventRepository.getEventsForFestival(festivalId) || [];

    const items = [];

    for (const film of films) {
      const access = this.accessEngine.canAccessFilm(userId, festivalId, film.id);

      items.push(
        new ProgramItem({
          id: film.id,
          festivalId,
          type: "film",
          title: film.title,
          startTime: film.startTime || null,
          endTime: film.endTime || null,
          room: film.room || null,
          isOnline: true,
          canAccess: access.allowed
        })
      );
    }

    for (const event of events) {
      const access = this.accessEngine.canAccessEvent(userId, festivalId, event.id);

      items.push(
        new ProgramItem({
          id: event.id,
          festivalId,
          type: "event",
          title: event.title,
          startTime: event.startTime,
          endTime: event.endTime,
          room: event.location || null,
          isOnline: !!event.streamUrl,
          canAccess: access.allowed
        })
      );
    }

    return items.sort((a, b) => {
      const ta = a.startTime ? new Date(a.startTime).getTime() : 0;
      const tb = b.startTime ? new Date(b.startTime).getTime() : 0;
      return ta - tb;
    });
  }
}
`,

  // TESTY
  "__tests__/program-viewer-engine.test.js": `
import { ProgramViewerEngine } from "../engine/programViewerEngine.js";

describe("GFAL Festival Program Viewer Engine", () => {
  const mockFilmRepository = {
    getFilmsForFestival: jest.fn()
  };

  const mockEventRepository = {
    getEventsForFestival: jest.fn()
  };

  const mockAccessEngine = {
    canAccessFilm: jest.fn(),
    canAccessEvent: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("builds program with access flags for films and events", () => {
    mockFilmRepository.getFilmsForFestival.mockReturnValue([
      {
        id: 1,
        festivalId: 10,
        title: "Film A",
        startTime: "2026-01-02T18:00:00Z",
        endTime: "2026-01-02T20:00:00Z",
        room: "Online Room 1"
      }
    ]);

    mockEventRepository.getEventsForFestival.mockReturnValue([
      {
        id: 2,
        festivalId: 10,
        title: "Opening Gala",
        startTime: "2026-01-01T18:00:00Z",
        endTime: "2026-01-01T20:00:00Z",
        location: "Main Hall",
        streamUrl: "https://stream.example.com/event/2"
      }
    ]);

    mockAccessEngine.canAccessFilm.mockReturnValue({ allowed: true });
    mockAccessEngine.canAccessEvent.mockReturnValue({ allowed: false });

    const engine = new ProgramViewerEngine({
      filmRepository: mockFilmRepository,
      eventRepository: mockEventRepository,
      accessEngine: mockAccessEngine
    });

    const program = engine.buildProgramForFestival(1, 10);

    expect(program.length).toBe(2);

    const eventItem = program[0];
    const filmItem = program[1];

    expect(eventItem.type).toBe("event");
    expect(eventItem.canAccess).toBe(false);
    expect(filmItem.type).toBe("film");
    expect(filmItem.canAccess).toBe(true);
  });
});
`
};

function generateGFAL06() {
  const baseDir = path.join(ROOT, "apps", "GFAL-06__Festival_Program_Viewer");

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

  console.log("\n🎉 GFAL‑06 Festival Program Viewer is ready.");
}

generateGFAL06();
