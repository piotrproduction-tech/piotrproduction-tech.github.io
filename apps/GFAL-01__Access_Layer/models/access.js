export class UserAccess {
  constructor({ userId, festivalId, accessType, scope, validFrom, validTo }) {
    this.userId = userId;
    this.festivalId = festivalId;
    this.accessType = accessType; // ticket_single_film, pass_all_films, accreditation_jury, etc.
    this.scope = scope; // optional: { filmId } or { eventId }
    this.validFrom = validFrom;
    this.validTo = validTo;
  }
}