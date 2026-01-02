export class DirectorAction {
  constructor({
    type,
    priority,
    payload,
    ttl,
    source
  }) {
    this.type = type;
    this.priority = priority || 3;
    this.payload = payload || {};
    this.ttl = ttl || null;
    this.source = source || "ai_director";
  }
}