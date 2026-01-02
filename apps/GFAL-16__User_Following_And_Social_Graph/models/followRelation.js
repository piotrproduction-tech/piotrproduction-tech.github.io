export class FollowRelation {
  constructor({
    followerId,
    followingId,
    createdAt
  }) {
    this.followerId = followerId;
    this.followingId = followingId;
    this.createdAt = createdAt || new Date().toISOString();
  }
}