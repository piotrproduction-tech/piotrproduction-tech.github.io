import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODEL
  "models/review.js": `
export class Review {
  constructor({
    userId,
    festivalId,
    type,
    filmId,
    eventId,
    rating,
    text,
    createdAt
  }) {
    this.userId = userId;
    this.festivalId = festivalId;
    this.type = type; // "film" | "event" | "festival"
    this.filmId = filmId || null;
    this.eventId = eventId || null;
    this.rating = rating; // 1–5
    this.text = text || null;
    this.createdAt = createdAt || new Date().toISOString();
  }
}
`,

  // ENGINE
  "engine/reviewEngine.js": `
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
`,

  // TESTY
  "__tests__/review-engine.test.js": `
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
`
};

function generateGFAL13() {
  const baseDir = path.join(ROOT, "apps", "GFAL-13__Festival_Reviews_And_Ratings");

  Object.entries(FILES).forEach(([relativePath, content]) => {
    const filePath = path.join(baseDir, relativePath);
    const dir = path.dirname(filePath);

    ensureDir(dir);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content.trim(), "utf8");
      console.log("✔ Created:", filePath);
    } else {
      console.log("⏭ Skipped (exists):", filePath);
    }
  });

  console.log("\n🎉 GFAL‑13 Festival Reviews & Ratings is ready.");
}

generateGFAL13();
