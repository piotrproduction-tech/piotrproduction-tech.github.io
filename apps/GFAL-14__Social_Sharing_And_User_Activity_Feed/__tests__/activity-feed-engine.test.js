import { ActivityFeedEngine } from "../engine/activityFeedEngine.js";

describe("GFAL Social Sharing & Activity Feed Engine", () => {
  const mockRepo = {
    saveActivity: jest.fn(),
    getActivitiesForUser: jest.fn(),
    getActivitiesForFestival: jest.fn(),
    getAllActivities: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("records an activity", () => {
    const engine = new ActivityFeedEngine({ activityRepository: mockRepo });

    const item = engine.recordActivity({
      userId: 1,
      type: "watched_film",
      filmId: 5
    });

    expect(item.type).toBe("watched_film");
    expect(mockRepo.saveActivity).toHaveBeenCalled();
  });

  it("returns user feed sorted by time", () => {
    mockRepo.getActivitiesForUser.mockReturnValue([
      { timestamp: "2026-01-01T10:00:00Z" },
      { timestamp: "2026-01-01T12:00:00Z" }
    ]);

    const engine = new ActivityFeedEngine({ activityRepository: mockRepo });

    const feed = engine.getUserFeed(1);

    expect(feed[0].timestamp).toBe("2026-01-01T12:00:00Z");
  });

  it("filters feed by type", () => {
    mockRepo.getAllActivities.mockReturnValue([
      { type: "watched_film" },
      { type: "rated_film" }
    ]);

    const engine = new ActivityFeedEngine({ activityRepository: mockRepo });

    const feed = engine.getFeedFiltered({ type: "rated_film" });

    expect(feed.length).toBe(1);
    expect(feed[0].type).toBe("rated_film");
  });
});