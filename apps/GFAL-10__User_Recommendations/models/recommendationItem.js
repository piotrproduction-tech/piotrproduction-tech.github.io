export class RecommendationItem {
  constructor({
    type,
    id,
    title,
    reason,
    festivalId,
    startTime
  }) {
    this.type = type; // "film" | "event" | "festival"
    this.id = id;
    this.title = title;
    this.reason = reason; // "based_on_history" | "similar_language" | "upcoming" | etc.
    this.festivalId = festivalId || null;
    this.startTime = startTime || null;
  }
}