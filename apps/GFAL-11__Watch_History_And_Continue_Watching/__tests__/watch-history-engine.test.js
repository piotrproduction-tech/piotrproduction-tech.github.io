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