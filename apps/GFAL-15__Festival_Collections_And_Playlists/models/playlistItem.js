export class PlaylistItem {
  constructor({
    type,
    filmId,
    eventId,
    festivalId,
    order
  }) {
    this.type = type; // "film" | "event" | "festival"
    this.filmId = filmId || null;
    this.eventId = eventId || null;
    this.festivalId = festivalId || null;
    this.order = order || 0;
  }
}