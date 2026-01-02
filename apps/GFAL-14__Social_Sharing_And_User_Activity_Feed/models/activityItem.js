export class ActivityItem {
  constructor({
    userId,
    festivalId,
    type,
    filmId,
    eventId,
    rating,
    text,
    timestamp
  }) {
    this.userId = userId;
    this.festivalId = festivalId || null;

    this.type = type; 
    // "watched_film"
    // "watched_event"
    // "rated_film"
    // "rated_event"
    // "reviewed_film"
    // "reviewed_event"
    // "joined_event"
    // "completed_festival"

    this.filmId = filmId || null;
    this.eventId = eventId || null;

    this.rating = rating || null;
    this.text = text || null;

    this.timestamp = timestamp || new Date().toISOString();
  }
}