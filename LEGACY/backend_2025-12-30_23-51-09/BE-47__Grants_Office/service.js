// backend/BE-47/service.js

// ===== Wnioski grantowe =====
export function Grants_addApplication(userId, title, description, amount) {
  const application = { id: "grant_app_" + Date.now(), userId, title, description, amount, status: "submitted" };
  return { ok: true, application };
}

export function Grants_getApplications() {
  return [
    { id: "grant_app_01", title: "Projekt VR Edukacja", description: "Rozwój edukacji w VR", amount: 5000, status: "approved" },
    { id: "grant_app_02", title: "DAO Kultura", description: "Wsparcie inicjatyw kulturalnych", amount: 3000, status: "pending" }
  ];
}

// ===== Ocena wniosków =====
export function Grants_reviewApplication(applicationId, reviewerId, decision) {
  const review = { id: "grant_review_" + Date.now(), applicationId, reviewerId, decision };
  return { ok: true, review };
}

export function Grants_getReviews(applicationId) {
  return [
    { id: "grant_review_01", applicationId, reviewerId: "rev_01", decision: "approve" },
    { id: "grant_review_02", applicationId, reviewerId: "rev_02", decision: "reject" }
  ];
}

// ===== Raporty =====
export function Grants_getReports() {
  return [
    { id: "rep_grants_01", title: "Raport Grants Office lipiec 2026", summary: "10 wniosków, 5 zatwierdzonych" },
    { id: "rep_grants_02", title: "Raport Grants Office sierpień 2026", summary: "12 wniosków, 7 zatwierdzonych" }
  ];
}
