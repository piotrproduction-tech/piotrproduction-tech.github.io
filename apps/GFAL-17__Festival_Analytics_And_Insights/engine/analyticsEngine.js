import { AnalyticsSnapshot } from "../models/analyticsSnapshot.js";

export class AnalyticsEngine {
  constructor({
    historyRepository,
    activityRepository,
    reviewRepository,
    programRepository
  }) {
    this.historyRepository = historyRepository;
    this.activityRepository = activityRepository;
    this.reviewRepository = reviewRepository;
    this.programRepository = programRepository;
  }

  generateSnapshot(festivalId) {
    const history = this.historyRepository.getEntriesForFestival(festivalId);
    const activities = this.activityRepository.getActivitiesForFestival(festivalId);
    const program = this.programRepository.getProgramForFestival(festivalId);

    const filmViews = {};
    const eventAttendance = {};
    const dropOffPoints = {};

    let totalWatchTime = 0;
    let watchCount = 0;

    for (const entry of history) {
      if (entry.type === "film") {
        filmViews[entry.filmId] = (filmViews[entry.filmId] || 0) + 1;

        if (entry.duration) {
          totalWatchTime += entry.progress;
          watchCount++;
        }

        if (entry.progress && entry.duration) {
          const drop = Math.floor((entry.progress / entry.duration) * 100);
          dropOffPoints[entry.filmId] = dropOffPoints[entry.filmId] || [];
          dropOffPoints[entry.filmId].push(drop);
        }
      }

      if (entry.type === "event") {
        eventAttendance[entry.eventId] = (eventAttendance[entry.eventId] || 0) + 1;
      }
    }

    const averageWatchTime = watchCount > 0 ? totalWatchTime / watchCount : 0;

    const uniqueUsers = new Set(history.map(h => h.userId)).size;

    const topFilms = Object.entries(filmViews)
      .map(([filmId, views]) => ({ filmId: Number(filmId), views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    const topEvents = Object.entries(eventAttendance)
      .map(([eventId, attendees]) => ({ eventId: Number(eventId), attendees }))
      .sort((a, b) => b.attendees - a.attendees)
      .slice(0, 5);

    return new AnalyticsSnapshot({
      festivalId,
      totalViewers: history.length,
      uniqueUsers,
      filmViews,
      eventAttendance,
      averageWatchTime,
      dropOffPoints,
      topFilms,
      topEvents
    });
  }
}