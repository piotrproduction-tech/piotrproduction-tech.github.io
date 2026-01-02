export class AnalyticsSnapshot {
  constructor({
    festivalId,
    timestamp,
    totalViewers,
    uniqueUsers,
    filmViews,
    eventAttendance,
    averageWatchTime,
    dropOffPoints,
    topFilms,
    topEvents
  }) {
    this.festivalId = festivalId;
    this.timestamp = timestamp || new Date().toISOString();

    this.totalViewers = totalViewers || 0;
    this.uniqueUsers = uniqueUsers || 0;

    this.filmViews = filmViews || {}; // { filmId: count }
    this.eventAttendance = eventAttendance || {}; // { eventId: count }

    this.averageWatchTime = averageWatchTime || 0; // seconds
    this.dropOffPoints = dropOffPoints || {}; // { filmId: [timestamps] }

    this.topFilms = topFilms || []; // [{ filmId, views }]
    this.topEvents = topEvents || []; // [{ eventId, attendees }]
  }
}