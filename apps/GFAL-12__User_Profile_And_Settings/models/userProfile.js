export class UserProfile {
  constructor({
    userId,
    displayName,
    avatarUrl,
    bio,
    favoriteGenres
  }) {
    this.userId = userId;
    this.displayName = displayName || null;
    this.avatarUrl = avatarUrl || null;
    this.bio = bio || null;
    this.favoriteGenres = favoriteGenres || []; // ["drama", "documentary"]
  }
}