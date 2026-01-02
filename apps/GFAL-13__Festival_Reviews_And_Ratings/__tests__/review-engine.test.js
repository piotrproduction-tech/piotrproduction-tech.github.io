import { ReviewEngine } from "../engine/reviewEngine.js";

describe("GFAL Reviews & Ratings Engine", () => {
  const mockRepo = {
    saveReview: jest.fn(),
    getReviews: jest.fn(),
    getReviewsByUser: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("adds a review", () => {
    const engine = new ReviewEngine({ reviewRepository: mockRepo });

    const review = engine.addReview({
      userId: 1,
      festivalId: 10,
      type: "film",
      filmId: 5,
      rating: 4,
      text: "Great movie!"
    });

    expect(review.rating).toBe(4);
    expect(mockRepo.saveReview).toHaveBeenCalled();
  });

  it("calculates average rating", () => {
    mockRepo.getReviews.mockReturnValue([
      { rating: 5 },
      { rating: 3 },
      { rating: 4 }
    ]);

    const engine = new ReviewEngine({ reviewRepository: mockRepo });

    const avg = engine.getAverageRating({
      festivalId: 10,
      type: "film",
      filmId: 5
    });

    expect(avg).toBeCloseTo(4);
  });

  it("returns user reviews", () => {
    mockRepo.getReviewsByUser.mockReturnValue([
      { rating: 5, text: "Loved it" }
    ]);

    const engine = new ReviewEngine({ reviewRepository: mockRepo });

    const reviews = engine.getUserReviews(1);

    expect(reviews.length).toBe(1);
    expect(reviews[0].rating).toBe(5);
  });
});