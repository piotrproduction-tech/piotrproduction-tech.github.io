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