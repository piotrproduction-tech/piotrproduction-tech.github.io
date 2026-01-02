export class OrganizerFilmInput {
  constructor({
    id,
    festivalId,
    title,
    synopsis,
    duration,
    language,
    ageRating,
    streamUrl,
    startTime,
    endTime,
    room
  }) {
    this.id = id;
    this.festivalId = festivalId;
    this.title = title;
    this.synopsis = synopsis;
    this.duration = duration;
    this.language = language;
    this.ageRating = ageRating;
    this.streamUrl = streamUrl;
    this.startTime = startTime || null;
    this.endTime = endTime || null;
    this.room = room || null;
  }
}