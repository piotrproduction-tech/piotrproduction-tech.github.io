const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BACKEND = path.join(ROOT, "backend");
const MODULE_ID = "BE-21__Marketplace";
const MODULE_PATH = path.join(BACKEND, MODULE_ID);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log("[DIR] created:", dir);
  }
}

function writeFileIfMissing(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("[FILE] created:", filePath);
  } else {
    console.log("[FILE] exists, skipped:", filePath);
  }
}

function getNarrationTemplate() {
  return `// BE-21__Marketplace - life/narration.js
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
`;
}

function getStreetSyncTemplate() {
  return `// BE-21__Marketplace - life/streetSync.js
// Synchronizuje dane Marketplace z Marketplace Street (BE-33)

function syncSellerToStreet(userData) {
  return {
    type: "street.update.seller",
    payload: userData
  };
}

function syncCreatorToStreet(creatorData) {
  return {
    type: "street.update.creator",
    payload: creatorData
  };
}

function syncOfferToStreet(offerData) {
  return {
    type: "street.update.offer",
    payload: offerData
  };
}

function syncEventToStreet(event) {
  return {
    type: "street.feed.event",
    payload: event
  };
}

module.exports = {
  syncSellerToStreet,
  syncCreatorToStreet,
  syncOfferToStreet,
  syncEventToStreet
};
`;
}

function getCreatorSyncTemplate() {
  return `// BE-21__Marketplace - life/creatorSync.js
// Synchronizacja twórców z Creator Pathway i Festival Hub

function syncCreatorProgress(userData) {
  return {
    type: "creator.progress.update",
    payload: userData
  };
}

function syncCreatorPortfolio(portfolio) {
  return {
    type: "creator.portfolio.update",
    payload: portfolio
  };
}

module.exports = {
  syncCreatorProgress,
  syncCreatorPortfolio
};
`;
}

function getRtraConfigTemplate() {
  return `{
  "districtType": "marketplace",
  "reputation": {
    "marketplace.offer.created": 3,
    "marketplace.offer.published": 5,
    "marketplace.offer.sold": 20,
    "marketplace.review.positive": 10,
    "marketplace.review.negative": -10,
    "marketplace.service.completed": 10
  },
  "tokens": {
    "marketplace.offer.sold": 25,
    "marketplace.service.completed": 15
  }
}`;
}

function main() {
  console.log("=== BE-21 Marketplace: KROK 14–15 generator start ===");

  if (!fs.existsSync(MODULE_PATH)) {
    console.error("[ERROR] Module path not found:", MODULE_PATH);
    process.exit(1);
  }

  const lifeDir = path.join(MODULE_PATH, "life");
  ensureDir(lifeDir);

  writeFileIfMissing(path.join(lifeDir, "narration.js"), getNarrationTemplate());
  writeFileIfMissing(path.join(lifeDir, "streetSync.js"), getStreetSyncTemplate());
  writeFileIfMissing(path.join(lifeDir, "creatorSync.js"), getCreatorSyncTemplate());
  writeFileIfMissing(path.join(lifeDir, "rtra.config.json"), getRtraConfigTemplate());

  console.log("=== BE-21 Marketplace: KROK 14–15 generator done ===");
}

if (require.main === module) {
  main();
}
