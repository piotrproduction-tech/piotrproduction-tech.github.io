/**
 * Marketplace Social Engine 5.0
 */

export const MarketplaceSocialEngine = {
  follow(userId, targetId) {
    return { followed: true, userId, targetId };
  },

  like(userId, itemId) {
    return { liked: true, userId, itemId };
  },

  comment(userId, itemId, text) {
    return { commented: true, userId, itemId, text };
  },

  getFeed(userId) {
    return { feed: [] };
  }
};