export class UserFestivalEntry {
  constructor({
    festivalId,
    festivalName,
    role,
    hasTickets,
    hasPass,
    hasAccreditation,
    nextEvent,
    status
  }) {
    this.festivalId = festivalId;
    this.festivalName = festivalName;
    this.role = role; // "viewer" | "jury" | "media" | "producer" | "guest"
    this.hasTickets = hasTickets;
    this.hasPass = hasPass;
    this.hasAccreditation = hasAccreditation;
    this.nextEvent = nextEvent || null; // { title, startTime } or null
    this.status = status; // "upcoming" | "ongoing" | "ended"
  }
}