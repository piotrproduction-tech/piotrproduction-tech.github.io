// backend/BE-37/service.js

// ===== Sesje VR =====
export function VR_addSession(userId, title, description, ts) {
  const session = { id: "vr_session_" + Date.now(), userId, title, description, ts };
  return { ok: true, session };
}

export function VR_getSessions() {
  return [
    { id: "vr_session_01", title: "VR Concert", description: "Koncert w warstwie VR", ts: "2026-02-20T18:00:00Z" },
    { id: "vr_session_02", title: "DAO VR Debate", description: "Debata w przestrzeni VR", ts: "2026-02-25T19:00:00Z" }
  ];
}

// ===== Uczestnicy =====
export function VR_registerParticipant(userId, sessionId) {
  const registration = { id: "vr_reg_" + Date.now(), userId, sessionId };
  return { ok: true, registration };
}

export function VR_getParticipants(sessionId) {
  return [
    { id: "vr_reg_01", sessionId, userId: "u_01" },
    { id: "vr_reg_02", sessionId, userId: "u_02" }
  ];
}

// ===== Integracja z Culture Gallery =====
export function VR_linkCulture(sessionId, galleryId) {
  return { ok: true, sessionId, galleryId };
}

// ===== Raporty =====
export function VR_getReports() {
  return [
    { id: "rep_vr_01", title: "Raport Immersive VR Layer grudzień 2025", summary: "2 sesje, 15 uczestników" },
    { id: "rep_vr_02", title: "Raport Immersive VR Layer styczeń 2026", summary: "3 sesje, 25 uczestników" }
  ];
}
