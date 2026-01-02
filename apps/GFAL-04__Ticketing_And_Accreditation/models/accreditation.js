export class Accreditation {
  constructor({ id, userId, festivalId, role, validFrom, validTo }) {
    this.id = id;
    this.userId = userId;
    this.festivalId = festivalId;
    this.role = role; // "media" | "producer" | "jury" | "vip"
    this.validFrom = validFrom;
    this.validTo = validTo;
  }
}