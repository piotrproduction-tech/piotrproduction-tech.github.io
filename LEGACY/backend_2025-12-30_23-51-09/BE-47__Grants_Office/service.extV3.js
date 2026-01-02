// backend/BE-47/service.extV3.js

// ===== Historia grantów =====
export function Grants_getGrantHistory() {
  return [
    { id: "grant_hist_01", title: "Projekt VR Edukacja", status: "approved", date: "2026-08-01" },
    { id: "grant_hist_02", title: "DAO Kultura", status: "pending", date: "2026-08-15" }
  ];
}

// ===== Integracja z Budget Bank =====
export function Grants_linkBudget(applicationId, budgetId) {
  return { ok: true, applicationId, budgetId };
}

// ===== System ocen projektów =====
export function Grants_addProjectRating(applicationId, userId, rating) {
  const rate = { id: "grant_rate_" + Date.now(), applicationId, userId, rating };
  return { ok: true, rate };
}

export function Grants_getProjectRatings(applicationId) {
  return [
    { id: "grant_rate_01", applicationId, userId: "u_01", rating: 5 },
    { id: "grant_rate_02", applicationId, userId: "u_02", rating: 4 }
  ];
}

// ===== Raporty grantowe =====
export function Grants_getReports_v3() {
  return [
    { id: "rep_grants_01", title: "Raport Grants Office sierpień 2026", summary: "10 wniosków, 5 zatwierdzonych" },
    { id: "rep_grants_02", title: "Raport Grants Office wrzesień 2026", summary: "12 wniosków, 7 zatwierdzonych" }
  ];
}
