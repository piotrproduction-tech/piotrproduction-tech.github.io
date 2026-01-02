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