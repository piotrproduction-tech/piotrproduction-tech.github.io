// BE-21__Marketplace - workflow/reviews.js

const {
  emitReviewAdded,
  emitReviewPositive,
  emitReviewNegative,
  emitReviewFlagged,
} = require("../events/emitters");

async function addReview(data) {
  const result = await emitReviewAdded(data);
  return result;
}

async function positiveReview(data) {
  const result = await emitReviewPositive(data);
  return result;
}

async function negativeReview(data) {
  const result = await emitReviewNegative(data);
  return result;
}

async function flagReview(data) {
  const result = await emitReviewFlagged(data);
  return result;
}

module.exports = {
  addReview,
  positiveReview,
  negativeReview,
  flagReview,
};
