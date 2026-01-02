export class PlaybackRequest {
  constructor({ userId, festivalId, type, filmId, eventId, preferredLanguage }) {
    this.userId = userId;
    this.festivalId = festivalId;
    this.type = type; // "film" | "event"
    this.filmId = filmId || null;
    this.eventId = eventId || null;
    this.preferredLanguage = preferredLanguage || "en";
  }
}