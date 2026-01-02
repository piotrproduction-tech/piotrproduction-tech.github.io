import { AchievementEngine } from "../engine/achievementEngine.js";

describe("GFAL Badges & Achievements Engine", () => {
  const mockAchRepo = {
    generateId: jest.fn(),
    saveAchievement: jest.fn(),
    getAchievement: jest.fn(),
    getAchievementsByUser: jest.fn()
  };

  const mockBadgeRepo = {
    generateId: jest.fn(),
    saveBadge: jest.fn(),
    getBadge: jest.fn(),
    getBadgesByUser: jest.fn()
  };

  const mockHistoryRepo = {
    getEntriesForUser: jest.fn()
  };

  const mockReviewRepo = {
    getReviewsByUser: jest.fn()
  };

  const mockCollectionRepo = {
    getCollectionsByUser: jest.fn()
  };

  const mockFollowRepo = {
    getFollowers: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("awards achievement for watching 5 films", () => {
    mockAchRepo.generateId.mockReturnValue(100);
    mockAchRepo.getAchievement.mockReturnValue(null);

    mockHistoryRepo.getEntriesForUser.mockReturnValue([
      { type: "film" },
      { type: "film" },
      { type: "film" },
      { type: "film" },
      { type: "film" }
    ]);

    mockReviewRepo.getReviewsByUser.mockReturnValue([]);
    mockCollectionRepo.getCollectionsByUser.mockReturnValue([]);
    mockFollowRepo.getFollowers.mockReturnValue([]);

    const engine = new AchievementEngine({
      achievementRepository: mockAchRepo,
      badgeRepository: mockBadgeRepo,
      historyRepository: mockHistoryRepo,
      reviewRepository: mockReviewRepo,
      collectionRepository: mockCollectionRepo,
      followRepository: mockFollowRepo
    });

    const achievements = engine.evaluateUserProgress(1);

    expect(achievements.length).toBe(1);
    expect(achievements[0].type).toBe("watch_5_films");
  });
});