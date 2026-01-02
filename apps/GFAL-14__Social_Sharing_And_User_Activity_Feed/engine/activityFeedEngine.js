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