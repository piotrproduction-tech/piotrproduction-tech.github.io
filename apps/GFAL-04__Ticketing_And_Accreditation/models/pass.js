export class Pass {
  constructor({ id, userId, festivalId, scope, validFrom, validTo }) {
    this.id = id;
    this.userId = userId;
    this.festivalId = festivalId;
    this.scope = scope; // "all_films" | "all_events" | "full_access"
    this.validFrom = validFrom;
    this.validTo = validTo;
  }
}