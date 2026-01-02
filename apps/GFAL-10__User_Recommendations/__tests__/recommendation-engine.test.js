import { RecommendationEngine } from "../engine/recommendationEngine.js";

describe("GFAL User Recommendations Engine", () => {
  const mockHistoryRepo = {
    getFestivalHistory: jest.fn(),
    getFilmHistory: jest.fn()
  };

  const mockCatalogRepo = {
    getAllFestivals: jest.fn()
  };

  const mockProgramRepo = {
    getProgramForFestival: jest.fn()
  };

  const mockLanguageEngine = {};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("recommends unwatched festivals", () => {
    mockHistoryRepo.getFestivalHistory.mockReturnValue([{ festivalId: 10 }]);
    mockCatalogRepo.getAllFestivals.mockReturnValue([
      { id: 10, name: "Watched Fest" },
      { id: 20, name: "New Fest" }
    ]);

    const engine = new RecommendationEngine({
      historyRepository: mockHistoryRepo,
      catalogRepository: mockCatalogRepo,
      programRepository: mockProgramRepo,
      languageEngine: mockLanguageEngine
    });

    const rec = engine.recommendFestivals(1);

    expect(rec.length).toBe(1);
    expect(rec[0].id).toBe(20);
  });

  it("recommends unwatched films in a festival", () => {
    mockHistoryRepo.getFilmHistory.mockReturnValue([{ filmId: 1 }]);
    mockProgramRepo.getProgramForFestival.mockReturnValue([
      { id: 1, type: "film", title: "Film A" },
      { id: 2, type: "film", title: "Film B" }
    ]);

    const engine = new RecommendationEngine({
      historyRepository: mockHistoryRepo,
      catalogRepository: mockCatalogRepo,
      programRepository: mockProgramRepo,
      languageEngine: mockLanguageEngine
    });

    const rec = engine.recommendFilms(1, 10);

    expect(rec.length).toBe(1);
    expect(rec[0].id).toBe(2);
  });

  it("recommends upcoming events", () => {
    mockProgramRepo.getProgramForFestival.mockReturnValue([
      {
        id: 5,
        type: "event",
        title: "Future Event",
        startTime: "2099-01-01T10:00:00Z"
      }
    ]);

    const engine = new RecommendationEngine({
      historyRepository: mockHistoryRepo,
      catalogRepository: mockCatalogRepo,
      programRepository: mockProgramRepo,
      languageEngine: mockLanguageEngine
    });

    const rec = engine.recommendUpcomingEvents(1, 10);

    expect(rec.length).toBe(1);
    expect(rec[0].id).toBe(5);
  });
});