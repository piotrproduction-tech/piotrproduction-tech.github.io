export class OrganizerEventInput {
  constructor({
    id,
    festivalId,
    title,
    type,
    startTime,
    endTime,
    streamUrl,
    location
  }) {
    this.id = id;
    this.festivalId = festivalId;
    this.title = title;
    this.type = type; // "opening" | "closing" | "qna" | "workshop" | "live_show"
    this.startTime = startTime;
    this.endTime = endTime;
    this.streamUrl = streamUrl || null;
    this.location = location || null;
  }
}