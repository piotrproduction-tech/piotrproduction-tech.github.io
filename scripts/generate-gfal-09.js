import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODELE
  "models/organizerFestivalInput.js": `
export class OrganizerFestivalInput {
  constructor({
    id,
    name,
    description,
    startDate,
    endDate,
    mode,
    visibility
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.mode = mode; // "online" | "onsite" | "hybrid"
    this.visibility = visibility; // "public" | "private" | "unlisted"
  }
}
`,

  "models/organizerFilmInput.js": `
export class OrganizerFilmInput {
  constructor({
    id,
    festivalId,
    title,
    synopsis,
    duration,
    language,
    ageRating,
    streamUrl,
    startTime,
    endTime,
    room
  }) {
    this.id = id;
    this.festivalId = festivalId;
    this.title = title;
    this.synopsis = synopsis;
    this.duration = duration;
    this.language = language;
    this.ageRating = ageRating;
    this.streamUrl = streamUrl;
    this.startTime = startTime || null;
    this.endTime = endTime || null;
    this.room = room || null;
  }
}
`,

  "models/organizerEventInput.js": `
export class OrganizerEventInput {
  constructor({
    id,
    festivalId,
    title,
    type,
    startTime,
    endTime,
    streamUrl,
    location
  }) {
    this.id = id;
    this.festivalId = festivalId;
    this.title = title;
    this.type = type; // "opening" | "closing" | "qna" | "workshop" | "live_show"
    this.startTime = startTime;
    this.endTime = endTime;
    this.streamUrl = streamUrl || null;
    this.location = location || null;
  }
}
`,

  // ENGINE
  "engine/organizerApiEngine.js": `
export class OrganizerApiEngine {
  constructor({ festivalRepository, filmRepository, eventRepository }) {
    this.festivalRepository = festivalRepository;
    this.filmRepository = filmRepository;
    this.eventRepository = eventRepository;
  }

  publishFestival(festivalInput) {
    this.festivalRepository.saveFestival(festivalInput);
    return { success: true, festivalId: festivalInput.id };
  }

  publishFilm(filmInput) {
    this.filmRepository.saveFilm(filmInput);
    return { success: true, filmId: filmInput.id };
  }

  publishEvent(eventInput) {
    this.eventRepository.saveEvent(eventInput);
    return { success: true, eventId: eventInput.id };
  }

  publishFullProgram({ festival, films, events }) {
    this.publishFestival(festival);

    for (const film of films) {
      this.publishFilm(film);
    }

    for (const event of events) {
      this.publishEvent(event);
    }

    return {
      success: true,
      festivalId: festival.id,
      films: films.length,
      events: events.length
    };
  }
}
`,

  // TESTY
  "__tests__/organizer-api-engine.test.js": `
import { OrganizerApiEngine } from "../engine/organizerApiEngine.js";

describe("GFAL Festival Organizer API Engine", () => {
  const mockFestRepo = { saveFestival: jest.fn() };
  const mockFilmRepo = { saveFilm: jest.fn() };
  const mockEventRepo = { saveEvent: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("publishes a festival", () => {
    const engine = new OrganizerApiEngine({
      festivalRepository: mockFestRepo,
      filmRepository: mockFilmRepo,
      eventRepository: mockEventRepo
    });

    const result = engine.publishFestival({ id: 10, name: "Test Fest" });

    expect(result.success).toBe(true);
    expect(result.festivalId).toBe(10);
    expect(mockFestRepo.saveFestival).toHaveBeenCalled();
  });

  it("publishes full program", () => {
    const engine = new OrganizerApiEngine({
      festivalRepository: mockFestRepo,
      filmRepository: mockFilmRepo,
      eventRepository: mockEventRepo
    });

    const result = engine.publishFullProgram({
      festival: { id: 10, name: "Test Fest" },
      films: [{ id: 1 }, { id: 2 }],
      events: [{ id: 3 }]
    });

    expect(result.success).toBe(true);
    expect(result.films).toBe(2);
    expect(result.events).toBe(1);
    expect(mockFestRepo.saveFestival).toHaveBeenCalled();
    expect(mockFilmRepo.saveFilm).toHaveBeenCalledTimes(2);
    expect(mockEventRepo.saveEvent).toHaveBeenCalledTimes(1);
  });
});
`
};

function generateGFAL09() {
  const baseDir = path.join(ROOT, "apps", "GFAL-09__Festival_Organizer_API");

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

  console.log("\n🎉 GFAL‑09 Festival Organizer API is ready.");
}

generateGFAL09();
