// backend/BE-43/service.extV3.js

// ===== Historia sesji wellness =====
export function Wellness_getSessionHistory() {
  return [
    { id: "wellness_hist_01", title: "Yoga VR", date: "2026-08-10", participants: 20 },
    { id: "wellness_hist_02", title: "Mindfulness DAO", date: "2026-08-15", participants: 15 }
  ];
}

// ===== Integracja z Volunteer Center =====
export function Wellness_linkVolunteer(sessionId, offerId) {
  return { ok: true, sessionId, offerId };
}

// ===== System ocen wellness =====
export function Wellness_addRating(sessionId, userId, rating) {
  const rate = { id: "wellness_rate_" + Date.now(), sessionId, userId, rating };
  return { ok: true, rate };
}

export function Wellness_getRatings(sessionId) {
  return [
    { id: "wellness_rate_01", sessionId, userId: "u_01", rating: 5 },
    { id: "wellness_rate_02", sessionId, userId: "u_02", rating: 4 }
  ];
}

// ===== Raporty uczestnictwa =====
export function Wellness_getReports_v3() {
  return [
    { id: "rep_wellness_01", title: "Raport Wellness Garden sierpień 2026", summary: "2 sesje, 35 uczestników" },
    { id: "rep_wellness_02", title: "Raport Wellness Garden wrzesień 2026", summary: "3 sesje, 50 uczestników" }
  ];
}
