import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODEL
  "models/analyticsSnapshot.js": `
export class AnalyticsSnapshot {
  constructor({
    festivalId,
    timestamp,
    totalViewers,
    uniqueUsers,
    filmViews,
    eventAttendance,
    averageWatchTime,
    dropOffPoints,
    topFilms,
    topEvents
  }) {
    this.festivalId = festivalId;
    this.timestamp = timestamp || new Date().toISOString();

    this.totalViewers = totalViewers || 0;
    this.uniqueUsers = uniqueUsers || 0;

    this.filmViews = filmViews || {}; // { filmId: count }
    this.eventAttendance = eventAttendance || {}; // { eventId: count }

    this.averageWatchTime = averageWatchTime || 0; // seconds
    this.dropOffPoints = dropOffPoints || {}; // { filmId: [timestamps] }

    this.topFilms = topFilms || []; // [{ filmId, views }]
    this.topEvents = topEvents || []; // [{ eventId, attendees }]
  }
}
`,

  // ENGINE
  "engine/analyticsEngine.js": `
import { AnalyticsSnapshot } from "../models/analyticsSnapshot.js";

export class AnalyticsEngine {
  constructor({
    historyRepository,
    activityRepository,
    reviewRepository,
    programRepository
  }) {
    this.historyRepository = historyRepository;
    this.activityRepository = activityRepository;
    this.reviewRepository = reviewRepository;
    this.programRepository = programRepository;
  }

  generateSnapshot(festivalId) {
    const history = this.historyRepository.getEntriesForFestival(festivalId);
    const activities = this.activityRepository.getActivitiesForFestival(festivalId);
    const program = this.programRepository.getProgramForFestival(festivalId);

    const filmViews = {};
    const eventAttendance = {};
    const dropOffPoints = {};

    let totalWatchTime = 0;
    let watchCount = 0;

    for (const entry of history) {
      if (entry.type === "film") {
        filmViews[entry.filmId] = (filmViews[entry.filmId] || 0) + 1;

        if (entry.duration) {
          totalWatchTime += entry.progress;
          watchCount++;
        }

        if (entry.progress && entry.duration) {
          const drop = Math.floor((entry.progress / entry.duration) * 100);
          dropOffPoints[entry.filmId] = dropOffPoints[entry.filmId] || [];
          dropOffPoints[entry.filmId].push(drop);
        }
      }

      if (entry.type === "event") {
        eventAttendance[entry.eventId] = (eventAttendance[entry.eventId] || 0) + 1;
      }
    }

    const averageWatchTime = watchCount > 0 ? totalWatchTime / watchCount : 0;

    const uniqueUsers = new Set(history.map(h => h.userId)).size;

    const topFilms = Object.entries(filmViews)
      .map(([filmId, views]) => ({ filmId: Number(filmId), views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    const topEvents = Object.entries(eventAttendance)
      .map(([eventId, attendees]) => ({ eventId: Number(eventId), attendees }))
      .sort((a, b) => b.attendees - a.attendees)
      .slice(0, 5);

    return new AnalyticsSnapshot({
      festivalId,
      totalViewers: history.length,
      uniqueUsers,
      filmViews,
      eventAttendance,
      averageWatchTime,
      dropOffPoints,
      topFilms,
      topEvents
    });
  }
}
`,

  // TESTY
  "__tests__/analytics-engine.test.js": `
import { AnalyticsEngine } from "../engine/analyticsEngine.js";

describe("GFAL Festival Analytics Engine", () => {
  const mockHistoryRepo = {
    getEntriesForFestival: jest.fn()
  };

  const mockActivityRepo = {
    getActivitiesForFestival: jest.fn()
  };

  const mockReviewRepo = {};
  const mockProgramRepo = {
    getProgramForFestival: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("generates analytics snapshot", () => {
    mockHistoryRepo.getEntriesForFestival.mockReturnValue([
      { type: "film", filmId: 1, userId: 1, progress: 50, duration: 100 },
      { type: "film", filmId: 1, userId: 2, progress: 100, duration: 100 },
      { type: "event", eventId: 5, userId: 1 }
    ]);

    mockActivityRepo.getActivitiesForFestival.mockReturnValue([]);
    mockProgramRepo.getProgramForFestival.mockReturnValue([]);

    const engine = new AnalyticsEngine({
      historyRepository: mockHistoryRepo,
      activityRepository: mockActivityRepo,
      reviewRepository: mockReviewRepo,
      programRepository: mockProgramRepo
    });

    const snapshot = engine.generateSnapshot(10);

    expect(snapshot.totalViewers).toBe(3);
    expect(snapshot.uniqueUsers).toBe(2);
    expect(snapshot.filmViews[1]).toBe(2);
    expect(snapshot.eventAttendance[5]).toBe(1);
    expect(snapshot.topFilms.length).toBe(1);
  });
});
`
};

function generateGFAL17() {
  const baseDir = path.join(ROOT, "apps", "GFAL-17__Festival_Analytics_And_Insights");

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

  console.log("\n🎉 GFAL‑17 Festival Analytics & Insights is ready.");
}

generateGFAL17();
