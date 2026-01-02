import { cityMemory } from "../memory/cityMemoryEngine";
import { cityBroadcast } from "../broadcast/cityBroadcastEngine";
import { cityPersonality } from "../personality/cityPersonalityEngine";

export const cityReputation = {
  users: {},
  levels: [
    { id: "newcomer", label: "Newcomer", minScore: 0 },
    { id: "citizen", label: "Citizen", minScore: 10 },
    { id: "creator", label: "Creator", minScore: 30 },
    { id: "trusted", label: "Trusted", minScore: 80 },
    { id: "veteran", label: "Veteran", minScore: 150 },
    { id: "legend", label: "Legend", minScore: 300 }
  ],
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this));
  },

  ensureUser(userId) {
    if (!this.users[userId]) {
      this.users[userId] = {
        score: 0,
        level: "newcomer",
        history: []
      };
    }
    return this.users[userId];
  },

  addReputation(userId, amount, reason, sourceEvent) {
    const user = this.ensureUser(userId);
    user.score = Math.max(0, user.score + amount);
    user.history.push({
      delta: amount,
      reason,
      eventType: sourceEvent?.type || null,
      timestamp: Date.now()
    });

    const oldLevel = user.level;
    user.level = this.resolveLevel(user.score);

    if (oldLevel !== user.level) {
      this.announceLevelUp(userId, user.level);
    }

    this.notify();
  },

  resolveLevel(score) {
    let current = this.levels[0].id;
    for (const lvl of this.levels) {
      if (score >= lvl.minScore) current = lvl.id;
    }
    return current;
  },

  announceLevelUp(userId, levelId) {
    const level = this.levels.find(l => l.id === levelId);
    if (!level) return;

    const personality = cityPersonality.personality;

    const prefixMap = {
      Neutral: "Reputacja:",
      Energetic: "⚡ Awans reputacji!",
      Creative: "🎨 Nowy poziom twórcy!",
      Calm: "🌙 Spokojny awans:",
      Chaotic: "🌪️ Reputacja eksploduje:",
      Celebratory: "🎉 Wielki awans reputacji!"
    };

    const prefix = prefixMap[personality] || "Reputacja:";
    const msg = `${prefix} Użytkownik ${userId} osiągnął poziom: ${level.label}.`;

    cityBroadcast.push(msg);
  }
};

// Integracja z CityMemory: eventy → reputacja
cityMemory.subscribe(mem => {
  const last = mem.events[mem.events.length - 1];
  if (!last) return;

  const prefix = last.type.split(".")[0];
  const payload = last.payload || {};
  const userId = payload.userId || payload.creatorId || payload.ownerId || "anon";

  if (prefix === "creator") {
    cityReputation.addReputation(userId, 3, "Aktywność twórcza", last);
  }

  if (prefix === "marketplace") {
    cityReputation.addReputation(userId, 2, "Aktywność rynkowa", last);
  }

  if (prefix === "community") {
    cityReputation.addReputation(userId, 1, "Aktywność społecznościowa", last);
  }

  if (prefix === "festival") {
    cityReputation.addReputation(userId, 5, "Aktywność festiwalowa", last);
  }

  if (prefix === "street") {
    cityReputation.addReputation(userId, 1, "Aktywność uliczna", last);
  }
});