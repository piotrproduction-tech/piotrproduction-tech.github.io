export const festivalReviewsWorkflow = {
  addReview(submissionId, reviewerId, score, comment) {
    return {
      submissionId,
      reviewerId,
      score,
      comment,
      createdAt: Date.now()
    };
  }
};