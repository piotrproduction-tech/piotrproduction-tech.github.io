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