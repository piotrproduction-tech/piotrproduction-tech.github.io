/**
 * Marketplace Token Engine 5.0
 */

export const MarketplaceTokenEngine = {
  awardTokens(userId, amount) {
    return { awarded: true, userId, amount };
  },

  spendTokens(userId, amount) {
    return { spent: true, userId, amount };
  },

  convertReputationToTokens(reputation) {
    return Math.floor((reputation || 0) * 0.1);
  },

  rewardForAchievement(achievementId) {
    return 50;
  },

  rewardForMission(missionId) {
    return 20;
  }
};