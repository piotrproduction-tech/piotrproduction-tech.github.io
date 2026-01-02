import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODEL
  "models/activityItem.js": `
export class ActivityItem {
  constructor({
    userId,
    festivalId,
    type,
    filmId,
    eventId,
    rating,
    text,
    timestamp
  }) {
    this.userId = userId;
    this.festivalId = festivalId || null;

    this.type = type; 
    // "watched_film"
    // "watched_event"
    // "rated_film"
    // "rated_event"
    // "reviewed_film"
    // "reviewed_event"
    // "joined_event"
    // "completed_festival"

    this.filmId = filmId || null;
    this.eventId = eventId || null;

    this.rating = rating || null;
    this.text = text || null;

    this.timestamp = timestamp || new Date().toISOString();
  }
}
`,

  // ENGINE
  "engine/activityFeedEngine.js": `
import { ActivityItem } from "../models/activityItem.js";

export class ActivityFeedEngine {
  constructor({ activityRepository }) {
    this.activityRepository = activityRepository;
  }

  recordActivity(activityData) {
    const item = new ActivityItem(activityData);
    this.activityRepository.saveActivity(item);
    return item;
  }

  getUserFeed(userId) {
    return this.activityRepository
      .getActivitiesForUser(userId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  getFestivalFeed(festivalId) {
    return this.activityRepository
      .getActivitiesForFestival(festivalId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  getGlobalFeed() {
    return this.activityRepository
      .getAllActivities()
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  getFeedFiltered({ userId, festivalId, type }) {
    let feed = this.activityRepository.getAllActivities();

    if (userId) feed = feed.filter(a => a.userId === userId);
    if (festivalId) feed = feed.filter(a => a.festivalId === festivalId);
    if (type) feed = feed.filter(a => a.type === type);

    return feed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }
}
`,

  // TESTY
  "__tests__/activity-feed-engine.test.js": `
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
`
};

function generateGFAL14() {
  const baseDir = path.join(ROOT, "apps", "GFAL-14__Social_Sharing_And_User_Activity_Feed");

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

  console.log("\n🎉 GFAL‑14 Social Sharing & Activity Feed is ready.");
}

generateGFAL14();
