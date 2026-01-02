export class Achievement {
  constructor({
    id,
    userId,
    type,
    metadata,
    earnedAt
  }) {
    this.id = id;
    this.userId = userId;

    this.type = type;
    // "watch_5_films"
    // "watch_3_events"
    // "complete_festival"
    // "write_review"
    // "create_playlist"
    // "gain_followers"
    // "polyglot_viewer"

    this.metadata = metadata || {};
    this.earnedAt = earnedAt || new Date().toISOString();
  }
}