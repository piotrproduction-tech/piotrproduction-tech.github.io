// backend/BE-36/service.extV3.js

// ===== Historia reputacji =====
export function Citizen_getReputationHistory(userId) {
  return [
    { id: "cit_rep_01", userId, points: 10, reason: "Udział w wolontariacie", date: "2026-09-01" },
    { id: "cit_rep_02", userId, points: 20, reason: "Głosowanie w DAO", date: "2026-09-05" }
  ];
}

// ===== Integracja z Volunteer Center =====
export function Citizen_linkVolunteer(userId, offerId) {
  return { ok: true, userId, offerId };
}

// ===== Powiadomienia =====
export function Citizen_notifyActivity(userId, activity) {
  return { ok: true, userId, activity };
}

// ===== Odznaki =====
export function Citizen_getBadges(userId) {
  return [
    { id: "badge_01", userId, title: "Aktywny Obywatel", date: "2026-09-10" },
    { id: "badge_02", userId, title: "Lider DAO", date: "2026-09-15" }
  ];
}
