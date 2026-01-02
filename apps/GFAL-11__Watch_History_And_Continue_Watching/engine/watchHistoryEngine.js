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