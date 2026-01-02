import { FollowRelation } from "../models/followRelation.js";

export class SocialGraphEngine {
  constructor({ followRepository }) {
    this.followRepository = followRepository;
  }

  followUser(followerId, followingId) {
    if (followerId === followingId) {
      throw new Error("User cannot follow themselves");
    }

    const existing = this.followRepository.getRelation(followerId, followingId);
    if (existing) return existing;

    const relation = new FollowRelation({
      followerId,
      followingId
    });

    this.followRepository.saveRelation(relation);
    return relation;
  }

  unfollowUser(followerId, followingId) {
    this.followRepository.deleteRelation(followerId, followingId);
    return { success: true };
  }

  getFollowers(userId) {
    return this.followRepository.getFollowers(userId);
  }

  getFollowing(userId) {
    return this.followRepository.getFollowing(userId);
  }

  getMutualConnections(userId) {
    const followers = new Set(
      this.followRepository.getFollowers(userId).map(r => r.followerId)
    );

    const following = new Set(
      this.followRepository.getFollowing(userId).map(r => r.followingId)
    );

    const mutual = [...followers].filter(id => following.has(id));

    return mutual;
  }

  getSuggestedUsers(userId) {
    const following = new Set(
      this.followRepository.getFollowing(userId).map(r => r.followingId)
    );

    const allUsers = this.followRepository.getAllUsers();
    const suggestions = [];

    for (const u of allUsers) {
      if (u.id !== userId && !following.has(u.id)) {
        suggestions.push(u);
      }
    }

    return suggestions;
  }
}