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