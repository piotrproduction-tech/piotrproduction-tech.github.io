import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODEL
  "models/directorInsightPacket.js": `
export class DirectorInsightPacket {
  constructor({
    festivalId,
    generatedAt,
    audienceMood,
    trendingFilms,
    trendingEvents,
    dropOffAlerts,
    engagementHeatmap,
    languagePreferences,
    socialPulse,
    achievementMomentum
  }) {
    this.festivalId = festivalId;
    this.generatedAt = generatedAt || new Date().toISOString();

    // High-level mood: "rising", "stable", "declining"
    this.audienceMood = audienceMood || "stable";

    // [{ filmId, views, avgRating }]
    this.trendingFilms = trendingFilms || [];

    // [{ eventId, attendees, upcoming }]
    this.trendingEvents = trendingEvents || [];

    // [{ filmId, dropOffAtPercent }]
    this.dropOffAlerts = dropOffAlerts || [];

    // [{ hour, viewers }]
    this.engagementHeatmap = engagementHeatmap || [];

    // { languageCode: count }
    this.languagePreferences = languagePreferences || {};

    // { activityLevel: "low" | "medium" | "high", recentEvents: number }
    this.socialPulse = socialPulse || {
      activityLevel: "medium",
      recentEvents: 0
    };

    // { newAchievements: number, newBadges: number }
    this.achievementMomentum = achievementMomentum || {
      newAchievements: 0,
      newBadges: 0
    };
  }
}
`,

  // ENGINE
  "engine/directorInsightsEngine.js": `
import { DirectorInsightPacket } from "../models/directorInsightPacket.js";

export class DirectorInsightsEngine {
  constructor({
    analyticsEngine,
    historyRepository,
    activityRepository,
    reviewRepository,
    languageEngine,
    achievementRepository,
    badgeRepository
  }) {
    this.analyticsEngine = analyticsEngine;
    this.historyRepository = historyRepository;
    this.activityRepository = activityRepository;
    this.reviewRepository = reviewRepository;
    this.languageEngine = languageEngine;
    this.achievementRepository = achievementRepository;
    this.badgeRepository = badgeRepository;
  }

  buildInsightsForFestival(festivalId) {
    const snapshot = this.analyticsEngine.generateSnapshot(festivalId);
    const activities = this.activityRepository.getActivitiesForFestival(festivalId);
    const reviews = this.reviewRepository.getReviewsForFestival
      ? this.reviewRepository.getReviewsForFestival(festivalId)
      : [];
    const achievements = this.achievementRepository.getAchievementsForFestival
      ? this.achievementRepository.getAchievementsForFestival(festivalId)
      : [];
    const badges = this.badgeRepository.getBadgesForFestival
      ? this.badgeRepository.getBadgesForFestival(festivalId)
      : [];

    const audienceMood = this._computeAudienceMood(snapshot, activities, reviews);
    const trendingFilms = this._buildTrendingFilms(snapshot, reviews);
    const trendingEvents = this._buildTrendingEvents(snapshot);
    const dropOffAlerts = this._buildDropOffAlerts(snapshot);
    const engagementHeatmap = this._buildEngagementHeatmap(festivalId);
    const languagePreferences = this._buildLanguagePreferences(festivalId);
    const socialPulse = this._buildSocialPulse(activities);
    const achievementMomentum = this._buildAchievementMomentum(achievements, badges);

    return new DirectorInsightPacket({
      festivalId,
      audienceMood,
      trendingFilms,
      trendingEvents,
      dropOffAlerts,
      engagementHeatmap,
      languagePreferences,
      socialPulse,
      achievementMomentum
    });
  }

  _computeAudienceMood(snapshot, activities, reviews) {
    const viewerCount = snapshot.uniqueUsers || 0;
    const activityCount = activities.length;
    const reviewCount = reviews.length;

    const score = viewerCount + activityCount * 2 + reviewCount * 3;

    if (score > 100) return "rising";
    if (score < 20) return "declining";
    return "stable";
  }

  _buildTrendingFilms(snapshot, reviews) {
    const ratingMap = {};

    for (const r of reviews) {
      if (r.type === "film" && r.filmId != null) {
        if (!ratingMap[r.filmId]) {
          ratingMap[r.filmId] = { sum: 0, count: 0 };
        }
        ratingMap[r.filmId].sum += r.rating || 0;
        ratingMap[r.filmId].count += 1;
      }
    }

    return (snapshot.topFilms || []).map(f => {
      const ratingData = ratingMap[f.filmId] || { sum: 0, count: 0 };
      const avgRating =
        ratingData.count > 0 ? ratingData.sum / ratingData.count : null;

      return {
        filmId: f.filmId,
        views: f.views,
        avgRating
      };
    });
  }

  _buildTrendingEvents(snapshot) {
    return (snapshot.topEvents || []).map(e => ({
      eventId: e.eventId,
      attendees: e.attendees,
      upcoming: false // FE-02 może to później wzbogacić o czas
    }));
  }

  _buildDropOffAlerts(snapshot) {
    const alerts = [];

    const dropOffPoints = snapshot.dropOffPoints || {};
    for (const [filmId, points] of Object.entries(dropOffPoints)) {
      if (!points.length) continue;
      const avg = points.reduce((a, b) => a + b, 0) / points.length;
      if (avg < 70) {
        alerts.push({
          filmId: Number(filmId),
          dropOffAtPercent: avg
        });
      }
    }

    return alerts;
  }

  _buildEngagementHeatmap(festivalId) {
    // Placeholder: w przyszłości można tu zaciągnąć dane czasowe z historii
    return [];
  }

  _buildLanguagePreferences(festivalId) {
    if (!this.languageEngine || !this.languageEngine.getFestivalLanguageStats) {
      return {};
    }
    return this.languageEngine.getFestivalLanguageStats(festivalId);
  }

  _buildSocialPulse(activities) {
    const recent = activities.filter(a => !!a.timestamp);
    const count = recent.length;

    let level = "medium";
    if (count < 10) level = "low";
    if (count > 50) level = "high";

    return {
      activityLevel: level,
      recentEvents: count
    };
  }

  _buildAchievementMomentum(achievements, badges) {
    return {
      newAchievements: achievements.length,
      newBadges: badges.length
    };
  }
}
`,

  // TESTY
  "__tests__/director-insights-engine.test.js": `
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
`
};

function generateGFAL20() {
  const baseDir = path.join(ROOT, "apps", "GFAL-20__Festival_AI_Director_Insights_Layer");

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

  console.log("\n🎉 GFAL‑20 Festival AI Director Insights Layer is ready.");
}

generateGFAL20();
