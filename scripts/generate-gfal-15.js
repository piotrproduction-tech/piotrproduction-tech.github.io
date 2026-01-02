import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODELE
  "models/collection.js": `
export class Collection {
  constructor({
    id,
    userId,
    title,
    description,
    items,
    isPublic,
    createdAt
  }) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description || null;
    this.items = items || []; // array of PlaylistItem
    this.isPublic = isPublic ?? false;
    this.createdAt = createdAt || new Date().toISOString();
  }
}
`,

  "models/playlistItem.js": `
export class PlaylistItem {
  constructor({
    type,
    filmId,
    eventId,
    festivalId,
    order
  }) {
    this.type = type; // "film" | "event" | "festival"
    this.filmId = filmId || null;
    this.eventId = eventId || null;
    this.festivalId = festivalId || null;
    this.order = order || 0;
  }
}
`,

  // ENGINE
  "engine/collectionEngine.js": `
import { Collection } from "../models/collection.js";
import { PlaylistItem } from "../models/playlistItem.js";

export class CollectionEngine {
  constructor({ collectionRepository }) {
    this.collectionRepository = collectionRepository;
  }

  createCollection({ userId, title, description, isPublic }) {
    const collection = new Collection({
      id: this.collectionRepository.generateId(),
      userId,
      title,
      description,
      items: [],
      isPublic
    });

    this.collectionRepository.saveCollection(collection);
    return collection;
  }

  addItemToCollection(collectionId, itemData) {
    const collection = this.collectionRepository.getCollection(collectionId);
    if (!collection) throw new Error("Collection not found");

    const item = new PlaylistItem(itemData);
    collection.items.push(item);

    // sort by order
    collection.items.sort((a, b) => a.order - b.order);

    this.collectionRepository.saveCollection(collection);
    return collection;
  }

  removeItemFromCollection(collectionId, index) {
    const collection = this.collectionRepository.getCollection(collectionId);
    if (!collection) throw new Error("Collection not found");

    collection.items.splice(index, 1);
    this.collectionRepository.saveCollection(collection);

    return collection;
  }

  getCollectionsForUser(userId) {
    return this.collectionRepository.getCollectionsByUser(userId);
  }

  getPublicCollections() {
    return this.collectionRepository.getPublicCollections();
  }
}
`,

  // TESTY
  "__tests__/collection-engine.test.js": `
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
`
};

function generateGFAL15() {
  const baseDir = path.join(ROOT, "apps", "GFAL-15__Festival_Collections_And_Playlists");

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

  console.log("\n🎉 GFAL‑15 Festival Collections & Playlists is ready.");
}

generateGFAL15();
