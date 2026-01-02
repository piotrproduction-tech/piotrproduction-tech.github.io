export class Review {
  constructor({
    userId,
    festivalId,
    type,
    filmId,
    eventId,
    rating,
    text,
    createdAt
  }) {
    this.userId = userId;
    this.festivalId = festivalId;
    this.type = type; // "film" | "event" | "festival"
    this.filmId = filmId || null;
    this.eventId = eventId || null;
    this.rating = rating; // 1–5
    this.text = text || null;
    this.createdAt = createdAt || new Date().toISOString();
  }
}