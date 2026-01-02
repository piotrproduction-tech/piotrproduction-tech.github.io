import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODEL
  "models/recommendationItem.js": `
export class RecommendationItem {
  constructor({
    type,
    id,
    title,
    reason,
    festivalId,
    startTime
  }) {
    this.type = type; // "film" | "event" | "festival"
    this.id = id;
    this.title = title;
    this.reason = reason; // "based_on_history" | "similar_language" | "upcoming" | etc.
    this.festivalId = festivalId || null;
    this.startTime = startTime || null;
  }
}
`,

  // ENGINE
  "engine/recommendationEngine.js": `
import { RecommendationItem } from "../models/recommendationItem.js";

export class RecommendationEngine {
  constructor({
    historyRepository,
    catalogRepository,
    programRepository,
    languageEngine
  }) {
    this.historyRepository = historyRepository;
    this.catalogRepository = catalogRepository;
    this.programRepository = programRepository;
    this.languageEngine = languageEngine;
  }

  recommendFestivals(userId) {
    const history = this.historyRepository.getFestivalHistory(userId);
    const allFestivals = this.catalogRepository.getAllFestivals();

    const watchedIds = new Set(history.map(h => h.festivalId));

    const recommendations = [];

    for (const fest of allFestivals) {
      if (!watchedIds.has(fest.id)) {
        recommendations.push(
          new RecommendationItem({
            type: "festival",
            id: fest.id,
            title: fest.name,
            reason: "similar_to_previous",
            festivalId: fest.id
          })
        );
      }
    }

    return recommendations;
  }

  recommendFilms(userId, festivalId) {
    const history = this.historyRepository.getFilmHistory(userId);
    const program = this.programRepository.getProgramForFestival(festivalId);

    const watchedFilmIds = new Set(history.map(h => h.filmId));

    const recommendations = [];

    for (const item of program) {
      if (item.type === "film" && !watchedFilmIds.has(item.id)) {
        recommendations.push(
          new RecommendationItem({
            type: "film",
            id: item.id,
            title: item.title,
            reason: "unwatched_in_festival",
            festivalId
          })
        );
      }
    }

    return recommendations;
  }

  recommendUpcomingEvents(userId, festivalId) {
    const program = this.programRepository.getProgramForFestival(festivalId);

    const now = new Date();
    const recommendations = [];

    for (const item of program) {
      if (item.type === "event") {
        const start = new Date(item.startTime);
        if (start > now) {
          recommendations.push(
            new RecommendationItem({
              type: "event",
              id: item.id,
              title: item.title,
              reason: "upcoming_event",
              festivalId,
              startTime: item.startTime
            })
          );
        }
      }
    }

    return recommendations;
  }

  buildUserRecommendations(userId, festivalId) {
    return {
      festivals: this.recommendFestivals(userId),
      films: this.recommendFilms(userId, festivalId),
      events: this.recommendUpcomingEvents(userId, festivalId)
    };
  }
}
`,

  // TESTY
  "__tests__/recommendation-engine.test.js": `
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
`
};

function generateGFAL10() {
  const baseDir = path.join(ROOT, "apps", "GFAL-10__User_Recommendations");

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

  console.log("\n🎉 GFAL‑10 User Recommendations is ready.");
}

generateGFAL10();
