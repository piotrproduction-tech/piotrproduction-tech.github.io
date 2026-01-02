import { DirectorInsightsEngine } from "../engine/directorInsightsEngine.js";

describe("GFAL AI Director Insights Engine", () => {
  const mockAnalyticsEngine = {
    generateSnapshot: jest.fn()
  };

  const mockHistoryRepo = {};
  const mockActivityRepo = {
    getActivitiesForFestival: jest.fn()
  };

  const mockReviewRepo = {
    getReviewsForFestival: jest.fn()
  };

  const mockLanguageEngine = {
    getFestivalLanguageStats: jest.fn()
  };

  const mockAchievementRepo = {
    getAchievementsForFestival: jest.fn()
  };

  const mockBadgeRepo = {
    getBadgesForFestival: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("builds director insight packet", () => {
    mockAnalyticsEngine.generateSnapshot.mockReturnValue({
      uniqueUsers: 10,
      topFilms: [{ filmId: 1, views: 20 }],
      topEvents: [{ eventId: 5, attendees: 15 }],
      dropOffPoints: { 1: [60, 80] }
    });

    mockActivityRepo.getActivitiesForFestival.mockReturnValue([
      { timestamp: "2026-01-01T10:00:00Z" }
    ]);

    mockReviewRepo.getReviewsForFestival.mockReturnValue([
      { type: "film", filmId: 1, rating: 4 }
    ]);

    mockLanguageEngine.getFestivalLanguageStats.mockReturnValue({
      en: 50,
      pl: 30
    });

    mockAchievementRepo.getAchievementsForFestival.mockReturnValue([
      { id: 1 }
    ]);

    mockBadgeRepo.getBadgesForFestival.mockReturnValue([{ id: 1 }]);

    const engine = new DirectorInsightsEngine({
      analyticsEngine: mockAnalyticsEngine,
      historyRepository: mockHistoryRepo,
      activityRepository: mockActivityRepo,
      reviewRepository: mockReviewRepo,
      languageEngine: mockLanguageEngine,
      achievementRepository: mockAchievementRepo,
      badgeRepository: mockBadgeRepo
    });

    const packet = engine.buildInsightsForFestival(10);

    expect(packet.festivalId).toBe(10);
    expect(packet.trendingFilms.length).toBe(1);
    expect(packet.trendingEvents.length).toBe(1);
    expect(packet.languagePreferences.en).toBe(50);
    expect(packet.achievementMomentum.newAchievements).toBe(1);
  });
});