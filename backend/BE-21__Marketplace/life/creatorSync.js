// BE-21__Marketplace - life/creatorSync.js
// Rozszerzona integracja Creator Pathway + Festival Hub

const { CitySuperEngine } = require("../../CitySuperEngine");

// EVENT EMITTER
function emitCreatorEvent(type, payload) {
  const event = {
    type,
    districtId: "BE-21",
    districtType: "marketplace",
    timestamp: Date.now(),
    payload
  };
  return CitySuperEngine.process(event);
}

// OBLICZANIE PROGRESJI TWÓRCY
function calculateCreatorProgress(stats) {
  const progress = {
    level: "Creator",
    badge: null,
    nextLevel: null
  };

  if (stats.creations >= 10 && stats.reputation >= 150) {
    progress.level = "Certified Creator";
    progress.badge = "Certified Creator";
    progress.nextLevel = "Master Creator";
  }

  if (stats.creations >= 50 && stats.reputation >= 500) {
    progress.level = "Master Creator";
    progress.badge = "Master Creator";
    progress.nextLevel = null;
  }

  return progress;
}

// SYNC DO CREATOR PATHWAY
function syncCreatorProgress(userId, stats) {
  const progress = calculateCreatorProgress(stats);

  return emitCreatorEvent("creator.progress.updated", {
    userId,
    stats,
    progress
  });
}

// SYNC PORTFOLIO
function syncCreatorPortfolio(userId, portfolio) {
  return emitCreatorEvent("creator.portfolio.updated", {
    userId,
    portfolio
  });
}

// SYNC DO FESTIVAL HUB
function syncCreatorToFestivalHub(userId, stats) {
  return emitCreatorEvent("festival.creator.synced", {
    userId,
    stats
  });
}

module.exports = {
  syncCreatorProgress,
  syncCreatorPortfolio,
  syncCreatorToFestivalHub,
  calculateCreatorProgress
};
