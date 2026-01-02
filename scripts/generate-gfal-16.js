import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODEL
  "models/followRelation.js": `
export class FollowRelation {
  constructor({
    followerId,
    followingId,
    createdAt
  }) {
    this.followerId = followerId;
    this.followingId = followingId;
    this.createdAt = createdAt || new Date().toISOString();
  }
}
`,

  // ENGINE
  "engine/socialGraphEngine.js": `
import { FollowRelation } from "../models/followRelation.js";

export class SocialGraphEngine {
  constructor({ followRepository }) {
    this.followRepository = followRepository;
  }

  followUser(followerId, followingId) {
    if (followerId === followingId) {
      throw new Error("User cannot follow themselves");
    }

    const existing = this.followRepository.getRelation(followerId, followingId);
    if (existing) return existing;

    const relation = new FollowRelation({
      followerId,
      followingId
    });

    this.followRepository.saveRelation(relation);
    return relation;
  }

  unfollowUser(followerId, followingId) {
    this.followRepository.deleteRelation(followerId, followingId);
    return { success: true };
  }

  getFollowers(userId) {
    return this.followRepository.getFollowers(userId);
  }

  getFollowing(userId) {
    return this.followRepository.getFollowing(userId);
  }

  getMutualConnections(userId) {
    const followers = new Set(
      this.followRepository.getFollowers(userId).map(r => r.followerId)
    );

    const following = new Set(
      this.followRepository.getFollowing(userId).map(r => r.followingId)
    );

    const mutual = [...followers].filter(id => following.has(id));

    return mutual;
  }

  getSuggestedUsers(userId) {
    const following = new Set(
      this.followRepository.getFollowing(userId).map(r => r.followingId)
    );

    const allUsers = this.followRepository.getAllUsers();
    const suggestions = [];

    for (const u of allUsers) {
      if (u.id !== userId && !following.has(u.id)) {
        suggestions.push(u);
      }
    }

    return suggestions;
  }
}
`,

  // TESTY
  "__tests__/social-graph-engine.test.js": `
import { SocialGraphEngine } from "../engine/socialGraphEngine.js";

describe("GFAL Social Graph Engine", () => {
  const mockRepo = {
    getRelation: jest.fn(),
    saveRelation: jest.fn(),
    deleteRelation: jest.fn(),
    getFollowers: jest.fn(),
    getFollowing: jest.fn(),
    getAllUsers: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates a follow relation", () => {
    mockRepo.getRelation.mockReturnValue(null);

    const engine = new SocialGraphEngine({ followRepository: mockRepo });

    const rel = engine.followUser(1, 2);

    expect(rel.followerId).toBe(1);
    expect(rel.followingId).toBe(2);
    expect(mockRepo.saveRelation).toHaveBeenCalled();
  });

  it("prevents self-following", () => {
    const engine = new SocialGraphEngine({ followRepository: mockRepo });

    expect(() => engine.followUser(1, 1)).toThrow();
  });

  it("returns mutual connections", () => {
    mockRepo.getFollowers.mockReturnValue([{ followerId: 2 }]);
    mockRepo.getFollowing.mockReturnValue([{ followingId: 2 }]);

    const engine = new SocialGraphEngine({ followRepository: mockRepo });

    const mutual = engine.getMutualConnections(1);

    expect(mutual).toContain(2);
  });

  it("suggests users not followed yet", () => {
    mockRepo.getFollowing.mockReturnValue([{ followingId: 2 }]);
    mockRepo.getAllUsers.mockReturnValue([{ id: 2 }, { id: 3 }]);

    const engine = new SocialGraphEngine({ followRepository: mockRepo });

    const suggestions = engine.getSuggestedUsers(1);

    expect(suggestions.length).toBe(1);
    expect(suggestions[0].id).toBe(3);
  });
});
`
};

function generateGFAL16() {
  const baseDir = path.join(ROOT, "apps", "GFAL-16__User_Following_And_Social_Graph");

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

  console.log("\n🎉 GFAL‑16 User Following & Social Graph is ready.");
}

generateGFAL16();
