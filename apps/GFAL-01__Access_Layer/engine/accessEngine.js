export class AccessEngine {
  constructor({ accessList }) {
    this.accessList = accessList;
  }

  _findAccess(userId, festivalId) {
    return this.accessList.filter(a => a.userId === userId && a.festivalId === festivalId);
  }

  canAccessFilm(userId, festivalId, filmId) {
    const access = this._findAccess(userId, festivalId);

    if (access.length === 0) {
      return { allowed: false, reason: "NO_ACCESS" };
    }

    for (const a of access) {
      if (a.accessType === "pass_all_films") return { allowed: true, reason: "OK" };
      if (a.accessType === "ticket_single_film" && a.scope?.filmId === filmId)
        return { allowed: true, reason: "OK" };
      if (a.accessType === "accreditation_jury") return { allowed: true, reason: "OK" };
    }

    return { allowed: false, reason: "NO_TICKET" };
  }

  canAccessEvent(userId, festivalId, eventId) {
    const access = this._findAccess(userId, festivalId);

    if (access.length === 0) {
      return { allowed: false, reason: "NO_ACCESS" };
    }

    for (const a of access) {
      if (a.accessType === "pass_all_events") return { allowed: true, reason: "OK" };
      if (a.accessType === "ticket_single_event" && a.scope?.eventId === eventId)
        return { allowed: true, reason: "OK" };
      if (a.accessType === "accreditation_media") return { allowed: true, reason: "OK" };
    }

    return { allowed: false, reason: "NO_TICKET" };
  }
}