export class Report {
  constructor({
    id,
    reporterId,
    targetType,
    targetId,
    festivalId,
    reason,
    description,
    status,
    createdAt,
    resolvedAt
  }) {
    this.id = id;
    this.reporterId = reporterId;

    this.targetType = targetType;
    // "user" | "review" | "activity" | "film" | "event" | "festival" | "collection"

    this.targetId = targetId;
    this.festivalId = festivalId || null;

    this.reason = reason;
    // "abuse" | "spam" | "hate" | "copyright" | "misinfo" | "other"

    this.description = description || null;

    this.status = status || "pending";
    // "pending" | "reviewed" | "action_taken" | "dismissed"

    this.createdAt = createdAt || new Date().toISOString();
    this.resolvedAt = resolvedAt || null;
  }
}