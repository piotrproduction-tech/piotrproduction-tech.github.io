// BE-21__Marketplace - workflow/creator.js
// Workflow twórców

const {
  syncCreatorProgress,
  syncCreatorPortfolio,
  syncCreatorToFestivalHub
} = require("../life/creatorSync");

async function updateCreatorProgress(data) {
  return syncCreatorProgress(data.userId, data.stats);
}

async function updateCreatorPortfolio(data) {
  return syncCreatorPortfolio(data.userId, data.portfolio);
}

async function updateCreatorFestival(data) {
  return syncCreatorToFestivalHub(data.userId, data.stats);
}

module.exports = {
  updateCreatorProgress,
  updateCreatorPortfolio,
  updateCreatorFestival
};
