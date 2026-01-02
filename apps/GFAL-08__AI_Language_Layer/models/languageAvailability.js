export class LanguageAvailability {
  constructor({
    festivalId,
    filmId,
    eventId,
    audioLanguages,
    subtitleLanguages
  }) {
    this.festivalId = festivalId;
    this.filmId = filmId || null;
    this.eventId = eventId || null;

    this.audioLanguages = audioLanguages || []; // ["en", "pl"]
    this.subtitleLanguages = subtitleLanguages || []; // ["en", "pl"]
  }
}