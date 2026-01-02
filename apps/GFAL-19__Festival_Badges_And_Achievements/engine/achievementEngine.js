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