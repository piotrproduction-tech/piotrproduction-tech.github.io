import { Review } from "../models/review.js";

export class ReviewEngine {
  constructor({ reviewRepository }) {
    this.reviewRepository = reviewRepository;
  }

  addReview({ userId, festivalId, type, filmId, eventId, rating, text }) {
    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    const review = new Review({
      userId,
      festivalId,
      type,
      filmId,
      eventId,
      rating,
      text
    });

    this.reviewRepository.saveReview(review);
    return review;
  }

  getReviewsForItem({ festivalId, type, filmId, eventId }) {
    return this.reviewRepository.getReviews(festivalId, type, filmId, eventId);
  }

  getAverageRating({ festivalId, type, filmId, eventId }) {
    const reviews = this.getReviewsForItem({ festivalId, type, filmId, eventId });

    if (reviews.length === 0) return null;

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  }

  getUserReviews(userId) {
    return this.reviewRepository.getReviewsByUser(userId);
  }
}