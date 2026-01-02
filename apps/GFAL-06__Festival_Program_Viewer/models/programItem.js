export class ProgramItem {
  constructor({
    id,
    festivalId,
    type,
    title,
    startTime,
    endTime,
    room,
    isOnline,
    canAccess
  }) {
    this.id = id;
    this.festivalId = festivalId;
    this.type = type; // "film" | "event"
    this.title = title;
    this.startTime = startTime;
    this.endTime = endTime;
    this.room = room || null;
    this.isOnline = isOnline;
    this.canAccess = canAccess; // boolean
  }
}