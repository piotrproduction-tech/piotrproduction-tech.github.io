// ======================================================
//  BE‑38 AI Companion — ANALYTICS
// ======================================================

// ===== Analiza sentymentu =====
export function AI_analyzeSentiment(message) {
  // Placeholder — w realu model ML
  const score = Math.random() * 2 - 1; // -1 → 1
  return {
    score,
    label: score > 0.2 ? "positive" : score < -0.2 ? "negative" : "neutral"
  };
}

// ===== Statystyki sesji =====
export function AI_getSessionStats(sessionId, interactions) {
  const msgs = interactions.map(i => i.message);
  return {
    sessionId,
    messages: msgs.length,
    avgLength: msgs.reduce((a, b) => a + b.length, 0) / msgs.length || 0,
    topics: ["general", "business", "learning"]
  };
}

// ===== Statystyki użytkownika =====
export function AI_getUserStats(userId, interactions) {
  const userMsgs = interactions.filter(i => i.userId === userId);
  return {
    userId,
    interactions: userMsgs.length,
    avgSentiment: 0.5,
    lastMessage: userMsgs[userMsgs.length - 1]?.message || null
  };
}

// ===== Heatmapa aktywności =====
export function AI_getActivityHeatmap(interactions) {
  const map = {};
  interactions.forEach(i => {
    const day = i.ts.split("T")[0];
    map[day] = (map[day] || 0) + 1;
  });
  return Object.entries(map).map(([day, count]) => ({ day, count }));
}
