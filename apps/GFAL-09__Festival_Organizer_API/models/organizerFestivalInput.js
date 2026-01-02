export class OrganizerFestivalInput {
  constructor({
    id,
    name,
    description,
    startDate,
    endDate,
    mode,
    visibility
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.mode = mode; // "online" | "onsite" | "hybrid"
    this.visibility = visibility; // "public" | "private" | "unlisted"
  }
}