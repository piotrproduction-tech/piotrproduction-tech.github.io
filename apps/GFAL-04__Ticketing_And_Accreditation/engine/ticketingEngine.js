import { UserAccess } from "../../GFAL-01__Access_Layer/models/access.js";

export class TicketingEngine {
  constructor({ tickets, passes, accreditations }) {
    this.tickets = tickets || [];
    this.passes = passes || [];
    this.accreditations = accreditations || [];
  }

  generateAccessForUser(userId, festivalId) {
    const accessList = [];

    const userTickets = this.tickets.filter(
      t => t.userId === userId && t.festivalId === festivalId
    );
    const userPasses = this.passes.filter(
      p => p.userId === userId && p.festivalId === festivalId
    );
    const userAccs = this.accreditations.filter(
      a => a.userId === userId && a.festivalId === festivalId
    );

    for (const t of userTickets) {
      if (t.type === "single_film") {
        accessList.push(
          new UserAccess({
            userId,
            festivalId,
            accessType: "ticket_single_film",
            scope: { filmId: t.filmId },
            validFrom: t.validFrom,
            validTo: t.validTo
          })
        );
      }

      if (t.type === "single_event") {
        accessList.push(
          new UserAccess({
            userId,
            festivalId,
            accessType: "ticket_single_event",
            scope: { eventId: t.eventId },
            validFrom: t.validFrom,
            validTo: t.validTo
          })
        );
      }
    }

    for (const p of userPasses) {
      if (p.scope === "all_films") {
        accessList.push(
          new UserAccess({
            userId,
            festivalId,
            accessType: "pass_all_films",
            scope: null,
            validFrom: p.validFrom,
            validTo: p.validTo
          })
        );
      }

      if (p.scope === "all_events") {
        accessList.push(
          new UserAccess({
            userId,
            festivalId,
            accessType: "pass_all_events",
            scope: null,
            validFrom: p.validFrom,
            validTo: p.validTo
          })
        );
      }

      if (p.scope === "full_access") {
        accessList.push(
          new UserAccess({
            userId,
            festivalId,
            accessType: "pass_all_films",
            scope: null,
            validFrom: p.validFrom,
            validTo: p.validTo
          })
        );
        accessList.push(
          new UserAccess({
            userId,
            festivalId,
            accessType: "pass_all_events",
            scope: null,
            validFrom: p.validFrom,
            validTo: p.validTo
          })
        );
      }
    }

    for (const a of userAccs) {
      if (a.role === "jury") {
        accessList.push(
          new UserAccess({
            userId,
            festivalId,
            accessType: "accreditation_jury",
            scope: null,
            validFrom: a.validFrom,
            validTo: a.validTo
          })
        );
      }

      if (a.role === "media") {
        accessList.push(
          new UserAccess({
            userId,
            festivalId,
            accessType: "accreditation_media",
            scope: null,
            validFrom: a.validFrom,
            validTo: a.validTo
          })
        );
      }
    }

    return accessList;
  }
}