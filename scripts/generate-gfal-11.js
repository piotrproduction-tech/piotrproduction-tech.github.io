import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODEL
  "models/watchEntry.js": `
export class WatchEntry {
  constructor({
    userId,
    festivalId,
    type,
    filmId,
    eventId,
    progress,
    duration,
    lastWatchedAt
  }) {
    this.userId = userId;
    this.festivalId = festivalId;
    this.type = type; // "film" | "event"
    this.filmId = filmId || null;
    this.eventId = eventId || null;
    this.progress = progress || 0; // seconds
    this.duration = duration || null; // seconds
    this.lastWatchedAt = lastWatchedAt || new Date().toISOString();
  }
}
`,

  // ENGINE
  "engine/watchHistoryEngine.js": `
import { WatchEntry } from "../models/watchEntry.js";

export class WatchHistoryEngine {
  constructor({ historyRepository }) {
    this.historyRepository = historyRepository;
  }

  recordProgress({ userId, festivalId, type, filmId, eventId, progress, duration }) {
    const existing = this.historyRepository.getEntry(userId, festivalId, filmId, eventId);

    const entry = new WatchEntry({
      userId,
      festivalId,
      type,
      filmId,
      eventId,
      progress,
      duration,
      lastWatchedAt: new Date().toISOString()
    });

    if (existing) {
      this.historyRepository.updateEntry(entry);
    } else {
      this.historyRepository.saveEntry(entry);
    }

    return entry;
  }

  getContinueWatching(userId) {
    const entries = this.historyRepository.getEntriesForUser(userId);

    return entries
      .filter(e => e.progress > 0 && (!e.duration || e.progress < e.duration))
      .sort((a, b) => new Date(b.lastWatchedAt) - new Date(a.lastWatchedAt));
  }

  getWatchHistory(userId) {
    return this.historyRepository
      .getEntriesForUser(userId)
      .sort((a, b) => new Date(b.lastWatchedAt) - new Date(a.lastWatchedAt));
  }
}
`,

  // TESTY
  "__tests__/watch-history-engine.test.js": `
import { WatchHistoryEngine } from "../engine/watchHistoryEngine.js";

describe("GFAL Watch History & Continue Watching Engine", () => {
  const mockRepo = {
    getEntry: jest.fn(),
    saveEntry: jest.fn(),
    updateEntry: jest.fn(),
    getEntriesForUser: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("saves new watch entry", () => {
    mockRepo.getEntry.mockReturnValue(null);

    const engine = new WatchHistoryEngine({ historyRepository: mockRepo });

    const entry = engine.recordProgress({
      userId: 1,
      festivalId: 10,
      type: "film",
      filmId: 5,
      progress: 120,
      duration: 600
    });

    expect(mockRepo.saveEntry).toHaveBeenCalled();
    expect(entry.progress).toBe(120);
  });

  it("updates existing watch entry", () => {
    mockRepo.getEntry.mockReturnValue({ existing: true });

    const engine = new WatchHistoryEngine({ historyRepository: mockRepo });

    engine.recordProgress({
      userId: 1,
      festivalId: 10,
      type: "film",
      filmId: 5,
      progress: 300,
      duration: 600
    });

    expect(mockRepo.updateEntry).toHaveBeenCalled();
  });

  it("returns continue watching list", () => {
    mockRepo.getEntriesForUser.mockReturnValue([
      { progress: 100, duration: 200, lastWatchedAt: "2026-01-01T10:00:00Z" },
      { progress: 0, duration: 200, lastWatchedAt: "2026-01-01T09:00:00Z" },
      { progress: 150, duration: 150, lastWatchedAt: "2026-01-01T11:00:00Z" }
    ]);

    const engine = new WatchHistoryEngine({ historyRepository: mockRepo });

    const list = engine.getContinueWatching(1);

    expect(list.length).toBe(1);
    expect(list[0].progress).toBe(100);
  });
});
`
};

function generateGFAL11() {
  const baseDir = path.join(ROOT, "apps", "GFAL-11__Watch_History_And_Continue_Watching");

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

  console.log("\n🎉 GFAL‑11 Watch History & Continue Watching is ready.");
}

generateGFAL11();
