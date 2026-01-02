// ======================================================
//  BE‑38 AI Companion — SERVICE (v2)
// ======================================================

let AI_SESSIONS = [];
let AI_INTERACTIONS = [];

function nowISO() {
  return new Date().toISOString();
}

// ===== Sesje AI =====
export function AI_addSession(userId, topic, ts) {
  const session = {
    id: "ai_session_" + Date.now(),
    userId,
    topic,
    ts: ts || nowISO(),
    createdAt: nowISO()
  };
  AI_SESSIONS.push(session);
  return { ok: true, session };
}

export function AI_getSessions() {
  return AI_SESSIONS;
}

// ===== Interakcje =====
export function AI_addInteraction(userId, sessionId, message) {
  const interaction = {
    id: "ai_interaction_" + Date.now(),
    userId,
    sessionId,
    message,
    ts: nowISO()
  };
  AI_INTERACTIONS.push(interaction);
  return { ok: true, interaction };
}

export function AI_getInteractions(sessionId) {
  return AI_INTERACTIONS.filter(i => i.sessionId === sessionId);
}

// ===== Integracja z Knowledge Hub =====
export function AI_linkKnowledge(sessionId, resourceId) {
  return { ok: true, sessionId, resourceId };
}

// ===== Raporty =====
export function AI_getReports() {
  return [
    { id: "rep_ai_01", title: "Raport AI Companion grudzień 2025", summary: "2 sesje, 10 interakcji" },
    { id: "rep_ai_02", title: "Raport AI Companion styczeń 2026", summary: "3 sesje, 15 interakcji" }
  ];
}
