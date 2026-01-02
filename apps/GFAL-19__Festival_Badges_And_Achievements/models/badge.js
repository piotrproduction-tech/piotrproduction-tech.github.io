export class Badge {
  constructor({
    id,
    userId,
    name,
    description,
    earnedAt
  }) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.description = description;
    this.earnedAt = earnedAt || new Date().toISOString();
  }
}