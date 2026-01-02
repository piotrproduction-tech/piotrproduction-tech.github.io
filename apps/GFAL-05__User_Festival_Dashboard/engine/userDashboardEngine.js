import { UserFestivalEntry } from "../models/userFestivalEntry.js";

export class UserDashboardEngine {
  constructor({ festivals, ticketingEngine, accessEngine, eventRepository }) {
    this.festivals = festivals; // array of { id, name, startDate, endDate }
    this.ticketingEngine = ticketingEngine;
    this.accessEngine = accessEngine;
    this.eventRepository = eventRepository;
  }

  _getFestivalStatus(festival) {
    const now = new Date();
    const start = new Date(festival.startDate);
    const end = new Date(festival.endDate);

    if (now < start) return "upcoming";
    if (now > end) return "ended";
    return "ongoing";
  }

  buildUserDashboard(userId) {
    const entries = [];

    for (const fest of this.festivals) {
      const accessList = this.ticketingEngine.generateAccessForUser(
        userId,
        fest.id
      );

      const hasTickets = accessList.some(a =>
        a.accessType === "ticket_single_film" ||
        a.accessType === "ticket_single_event"
      );

      const hasPass = accessList.some(a =>
        a.accessType === "pass_all_films" ||
        a.accessType === "pass_all_events"
      );

      const hasAccreditation = accessList.some(a =>
        a.accessType === "accreditation_jury" ||
        a.accessType === "accreditation_media"
      );

      const status = this._getFestivalStatus(fest);

      let nextEvent = null;
      if (this.eventRepository && this.eventRepository.getUpcomingEventsForUser) {
        const upcoming = this.eventRepository.getUpcomingEventsForUser(
          userId,
          fest.id
        );
        if (upcoming && upcoming.length > 0) {
          const first = upcoming[0];
          nextEvent = {
            title: first.title,
            startTime: first.startTime
          };
        }
      }

      const role = hasAccreditation ? "jury" : hasPass || hasTickets ? "viewer" : "guest";

      entries.push(
        new UserFestivalEntry({
          festivalId: fest.id,
          festivalName: fest.name,
          role,
          hasTickets,
          hasPass,
          hasAccreditation,
          nextEvent,
          status
        })
      );
    }

    return entries;
  }
}