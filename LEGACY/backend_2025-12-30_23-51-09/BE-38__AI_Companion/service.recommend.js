// ======================================================
//  BE‑38 AI Companion — RECOMMENDATIONS
// ======================================================

export function AI_recommendForUser(userId) {
  return {
    userId,
    recommendations: [
      { type: "knowledge", id: "kh_01", title: "Wprowadzenie do DAO" },
      { type: "event", id: "ev_12", title: "Warsztaty VR" },
      { type: "project", id: "pr_07", title: "Startup w Innovation Hub" },
      { type: "wellness", id: "wg_03", title: "Mindfulness Garden" }
    ]
  };
}

export function AI_recommendForSession(sessionId) {
  return {
    sessionId,
    suggestions: [
      { type: "resource", id: "kh_22", title: "Zarządzanie projektami" },
      { type: "company", id: "cmp_03", title: "DAO Consulting" }
    ]
  };
}
