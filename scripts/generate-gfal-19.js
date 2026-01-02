import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODELE
  "models/achievement.js": `
export class Achievement {
  constructor({
    id,
    userId,
    type,
    metadata,
    earnedAt
  }) {
    this.id = id;
    this.userId = userId;

    this.type = type;
    // "watch_5_films"
    // "watch_3_events"
    // "complete_festival"
    // "write_review"
    // "create_playlist"
    // "gain_followers"
    // "polyglot_viewer"

    this.metadata = metadata || {};
    this.earnedAt = earnedAt || new Date().toISOString();
  }
}
`,

  "models/badge.js": `
export class Badge {
  constructor({
    id,
    userId,
    name,
    description,
    earnedAt
  }) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.description = description;
    this.earnedAt = earnedAt || new Date().toISOString();
  }
}
`,

  // ENGINE
  "engine/achievementEngine.js": `
import { Achievement } from "../models/achievement.js";
import { Badge } from "../models/badge.js";

export class AchievementEngine {
  constructor({
    achievementRepository,
    badgeRepository,
    historyRepository,
    reviewRepository,
    collectionRepository,
    followRepository
  }) {
    this.achievementRepository = achievementRepository;
    this.badgeRepository = badgeRepository;

    this.historyRepository = historyRepository;
    this.reviewRepository = reviewRepository;
    this.collectionRepository = collectionRepository;
    this.followRepository = followRepository;
  }

  awardAchievement(userId, type, metadata = {}) {
    const existing = this.achievementRepository.getAchievement(userId, type);
    if (existing) return existing;

    const achievement = new Achievement({
      id: this.achievementRepository.generateId(),
      userId,
      type,
      metadata
    });

    this.achievementRepository.saveAchievement(achievement);
    return achievement;
  }

  awardBadge(userId, name, description) {
    const existing = this.badgeRepository.getBadge(userId, name);
    if (existing) return existing;

    const badge = new Badge({
      id: this.badgeRepository.generateId(),
      userId,
      name,
      description
    });

    this.badgeRepository.saveBadge(badge);
    return badge;
  }

  evaluateUserProgress(userId) {
    const history = this.historyRepository.getEntriesForUser(userId);
    const reviews = this.reviewRepository.getReviewsByUser(userId);
    const collections = this.collectionRepository.getCollectionsByUser(userId);
    const followers = this.followRepository.getFollowers(userId);

    const achievements = [];

    // 1. Watch 5 films
    const filmCount = history.filter(h => h.type === "film").length;
    if (filmCount >= 5) {
      achievements.push(this.awardAchievement(userId, "watch_5_films"));
    }

    // 2. Watch 3 events
    const eventCount = history.filter(h => h.type === "event").length;
    if (eventCount >= 3) {
      achievements.push(this.awardAchievement(userId, "watch_3_events"));
    }

    // 3. Write a review
    if (reviews.length >= 1) {
      achievements.push(this.awardAchievement(userId, "write_review"));
    }

    // 4. Create a playlist
    if (collections.length >= 1) {
      achievements.push(this.awardAchievement(userId, "create_playlist"));
    }

    // 5. Gain 10 followers
    if (followers.length >= 10) {
      achievements.push(this.awardAchievement(userId, "gain_followers"));
    }

    // 6. Polyglot viewer (watched films in 3 languages)
    const languages = new Set(history.map(h => h.metadata?.language).filter(Boolean));
    if (languages.size >= 3) {
      achievements.push(this.awardAchievement(userId, "polyglot_viewer"));
    }

    return achievements;
  }

  getUserBadges(userId) {
    return this.badgeRepository.getBadgesByUser(userId);
  }

  getUserAchievements(userId) {
    return this.achievementRepository.getAchievementsByUser(userId);
  }
}
`,

  // TESTY
  "__tests__/achievement-engine.test.js": `
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
`
};

function generateGFAL19() {
  const baseDir = path.join(ROOT, "apps", "GFAL-19__Festival_Badges_And_Achievements");

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

  console.log("\n🎉 GFAL‑19 Festival Badges & Achievements is ready.");
}

generateGFAL19();
