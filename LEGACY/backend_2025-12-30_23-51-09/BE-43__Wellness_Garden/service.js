// ===== Sesje wellness =====
export function Wellness_addSession(userId, title, description, ts) {
  const session = { id: "wellness_session_" + Date.now(), userId, title, description, ts };
  return { ok: true, session };
}

export function Wellness_getSessions() {
  return [
    { id: "wellness_session_01", title: "Yoga VR", description: "Sesja jogi VR", ts: "2026-05-10T18:00:00Z" },
    { id: "wellness_session_02", title: "Mindfulness DAO", description: "Medytacja DAO", ts: "2026-05-15T19:00:00Z" }
  ];
}

// ===== Uczestnicy =====
export function Wellness_registerParticipant(userId, sessionId) {
  const registration = { id: "wellness_reg_" + Date.now(), userId, sessionId };
  return { ok: true, registration };
}

export function Wellness_getParticipants(sessionId) {
  return [
    { id: "wellness_reg_01", sessionId, userId: "u_01" },
    { id: "wellness_reg_02", sessionId, userId: "u_02" }
  ];
}

// ===== Raporty v2 =====
export function Wellness_getReports() {
  return [
    { id: "rep_wellness_01", title: "Raport Wellness Garden kwiecień 2026", summary: "2 sesje, 15 uczestników" },
    { id: "rep_wellness_02", title: "Raport Wellness Garden maj 2026", summary: "3 sesje, 25 uczestników" }
  ];
}

// ===== DODANE Z BE‑10 (warstwa v2) =====

// Statystyki wellness użytkownika
export function Wellness_getUserStats(userId) {
  return {
    userId,
    wellnessPoints: 120,
    wellnessLevel: "Intermediate",
    lastActivity: "2026-05-10T18:00:00Z"
  };
}

// Aktualizacja punktów wellness
export function Wellness_updatePoints(userId, points) {
  return { ok: true, userId, added: points, newTotal: 120 + points };
}

// Aktywności grupowe
export function Wellness_getGroupActivities() {
  return [
    { id: "act_01", title: "Poranna joga", limit: 20 },
    { id: "act_02", title: "Spacer mindfulness", limit: 15 }
  ];
}

// Dołączanie do aktywności
export function Wellness_joinActivity(userId, activityId) {
  return { ok: true, userId, activityId };
}

// Statystyki aktywności
export function Wellness_getGroupStats(activityId) {
  return {
    activityId,
    name: "Poranna joga",
    participantsCount: 12,
    maxParticipants: 20
  };
}

// Placeholder AI
export function Wellness_getAiRecommendations(userId) {
  return { ready: false, message: "AI recommendations dostępne w v3 (BE‑43)" };
}

// Placeholder VR
export function Wellness_getVrPreview(userId) {
  return { ready: false, message: "VR immersions dostępne w v3 (BE‑43)" };
}
