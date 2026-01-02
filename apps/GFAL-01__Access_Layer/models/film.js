export class Film {
  constructor({ id, festivalId, title, synopsis, duration, language, ageRating, streamUrl }) {
    this.id = id;
    this.festivalId = festivalId;
    this.title = title;
    this.synopsis = synopsis;
    this.duration = duration;
    this.language = language;
    this.ageRating = ageRating;
    this.streamUrl = streamUrl;
  }
}