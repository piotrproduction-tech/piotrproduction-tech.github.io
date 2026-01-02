// backend/BE-36/service.js

// ===== Profil obywatela =====
export function Citizen_getProfile(userId) {
  return {
    userId,
    name: "Jan Kowalski",
    reputation: 120,
    badges: ["Volunteer", "Innovator"]
  };
}

export function Citizen_updateProfile(userId, field, value) {
  return { ok: true, userId, field, value };
}

// ===== Aktywności =====
export function Citizen_getActivities(userId) {
  return [
    { id: "act_01", type: "vote", description: "Głos w DAO Town Hall", ts: "2026-01-10T12:00:00Z" },
    { id: "act_02", type: "volunteer", description: "Pomoc w Community House", ts: "2026-01-15T14:00:00Z" }
  ];
}

// ===== Integracja z Profile Console =====
export function Citizen_linkProfile(userId, profileId) {
  return { ok: true, userId, profileId };
}

// ===== Raporty =====
export function Citizen_getReports(userId) {
  return [
    { id: "rep_citizen_01", title: "Raport aktywności obywatela grudzień 2025", summary: "5 głosów, 2 wolontariaty" },
    { id: "rep_citizen_02", title: "Raport aktywności obywatela styczeń 2026", summary: "7 głosów, 3 wolontariaty" }
  ];
}
