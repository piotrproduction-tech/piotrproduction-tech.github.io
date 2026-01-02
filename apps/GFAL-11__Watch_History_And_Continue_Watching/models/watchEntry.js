export class WatchEntry {
  constructor({
    userId,
    festivalId,
    type,
    filmId,
    eventId,
    progress,
    duration,
    lastWatchedAt
  }) {
    this.userId = userId;
    this.festivalId = festivalId;
    this.type = type; // "film" | "event"
    this.filmId = filmId || null;
    this.eventId = eventId || null;
    this.progress = progress || 0; // seconds
    this.duration = duration || null; // seconds
    this.lastWatchedAt = lastWatchedAt || new Date().toISOString();
  }
}