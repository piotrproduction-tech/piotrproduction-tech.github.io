import { CollectionEngine } from "../engine/collectionEngine.js";

describe("GFAL Collections & Playlists Engine", () => {
  const mockRepo = {
    generateId: jest.fn(),
    saveCollection: jest.fn(),
    getCollection: jest.fn(),
    getCollectionsByUser: jest.fn(),
    getPublicCollections: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates a collection", () => {
    mockRepo.generateId.mockReturnValue(100);

    const engine = new CollectionEngine({ collectionRepository: mockRepo });

    const col = engine.createCollection({
      userId: 1,
      title: "My Favorites",
      description: "Best films",
      isPublic: true
    });

    expect(col.id).toBe(100);
    expect(col.title).toBe("My Favorites");
    expect(mockRepo.saveCollection).toHaveBeenCalled();
  });

  it("adds an item to a collection", () => {
    mockRepo.getCollection.mockReturnValue({
      items: [],
      id: 100
    });

    const engine = new CollectionEngine({ collectionRepository: mockRepo });

    const updated = engine.addItemToCollection(100, {
      type: "film",
      filmId: 5,
      order: 1
    });

    expect(updated.items.length).toBe(1);
    expect(updated.items[0].filmId).toBe(5);
  });

  it("removes an item from a collection", () => {
    mockRepo.getCollection.mockReturnValue({
      items: [{ filmId: 5 }, { filmId: 6 }],
      id: 100
    });

    const engine = new CollectionEngine({ collectionRepository: mockRepo });

    const updated = engine.removeItemFromCollection(100, 0);

    expect(updated.items.length).toBe(1);
    expect(updated.items[0].filmId).toBe(6);
  });
});