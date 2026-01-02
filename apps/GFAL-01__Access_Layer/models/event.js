export class Event {
  constructor({ id, festivalId, type, title, startTime, endTime, streamUrl, location }) {
    this.id = id;
    this.festivalId = festivalId;
    this.type = type; // opening, closing, qna, workshop, live_show
    this.title = title;
    this.startTime = startTime;
    this.endTime = endTime;
    this.streamUrl = streamUrl;
    this.location = location; // kino / scena / online
  }
}