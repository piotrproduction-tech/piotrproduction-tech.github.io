export class Collection {
  constructor({
    id,
    userId,
    title,
    description,
    items,
    isPublic,
    createdAt
  }) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description || null;
    this.items = items || []; // array of PlaylistItem
    this.isPublic = isPublic ?? false;
    this.createdAt = createdAt || new Date().toISOString();
  }
}