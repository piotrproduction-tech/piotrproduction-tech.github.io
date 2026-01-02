// BE-21__Marketplace - life/narration.js
// Nadaje role, poziomy, nagrody, badge’e na podstawie eventów + RTRA

function calculateRoles(stats) {
  const roles = [];

  if (stats.sales > 0) roles.push("Seller");
  if (stats.purchases > 0) roles.push("Buyer");
  if (stats.reviews > 0) roles.push("Reviewer");
  if (stats.creations > 0) roles.push("Creator");
  if (stats.services > 0) roles.push("Provider");

  if (stats.sales >= 10 && stats.reputation >= 100) roles.push("Trusted Seller");
  if (stats.sales >= 50 && stats.reputation >= 300) roles.push("Master Seller");
  if (stats.sales >= 150 && stats.reputation >= 700) roles.push("Master Merchant");

  if (stats.creations >= 10 && stats.reputation >= 150) roles.push("Certified Creator");
  if (stats.creations >= 50 && stats.reputation >= 500) roles.push("Master Creator");

  return roles;
}

function calculateLevels(stats) {
  return {
    sellerLevel: stats.sales,
    buyerLevel: stats.purchases,
    reviewerLevel: stats.reviews,
    creatorLevel: stats.creations,
    providerLevel: stats.services
  };
}

function calculateRewards(stats) {
  const rewards = [];

  if (stats.sales >= 10) rewards.push("Bronze Seller");
  if (stats.sales >= 30) rewards.push("Silver Seller");
  if (stats.sales >= 60) rewards.push("Gold Seller");
  if (stats.sales >= 120) rewards.push("Platinum Seller");

  if (stats.reviews >= 10) rewards.push("Helpful Reviewer");
  if (stats.reviews >= 50) rewards.push("Expert Reviewer");

  if (stats.creations >= 10) rewards.push("Certified Creator");
  if (stats.creations >= 50) rewards.push("Master Creator");

  return rewards;
}

function calculateBadges(roles, rewards) {
  return [...roles, ...rewards];
}

function applyNarration(event, rtra, stats) {
  const roles = calculateRoles(stats);
  const levels = calculateLevels(stats);
  const rewards = calculateRewards(stats);
  const badges = calculateBadges(roles, rewards);

  return {
    event,
    rtra,
    roles,
    levels,
    rewards,
    badges
  };
}

module.exports = {
  applyNarration
};
