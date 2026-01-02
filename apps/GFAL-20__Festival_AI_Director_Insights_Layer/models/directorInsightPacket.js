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