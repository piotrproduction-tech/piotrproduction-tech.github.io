export class Ticket {
  constructor({ id, userId, festivalId, type, filmId, eventId, validFrom, validTo }) {
    this.id = id;
    this.userId = userId;
    this.festivalId = festivalId;
    this.type = type; // "single_film" | "single_event"
    this.filmId = filmId || null;
    this.eventId = eventId || null;
    this.validFrom = validFrom;
    this.validTo = validTo;
  }
}