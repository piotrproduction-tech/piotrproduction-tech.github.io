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