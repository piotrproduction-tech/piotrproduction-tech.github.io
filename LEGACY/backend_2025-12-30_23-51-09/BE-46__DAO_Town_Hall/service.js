// backend/BE-46/service.js

// ===== Propozycje DAO =====
export function DAO_addProposal(userId, title, description) {
  const proposal = { id: "dao_prop_" + Date.now(), userId, title, description, status: "open" };
  return { ok: true, proposal };
}

export function DAO_getProposals() {
  return [
    { id: "dao_prop_01", title: "Budżet Festiwalu VR", description: "Propozycja finansowania wydarzenia", status: "open" },
    { id: "dao_prop_02", title: "Nowa przestrzeń w Community House", description: "Rozbudowa infrastruktury", status: "closed" }
  ];
}

// ===== Głosowania =====
export function DAO_castVote(userId, proposalId, choice) {
  const vote = { id: "dao_vote_" + Date.now(), userId, proposalId, choice };
  return { ok: true, vote };
}

export function DAO_getVotes(proposalId) {
  return [
    { id: "dao_vote_01", proposalId, userId: "u_01", choice: "yes" },
    { id: "dao_vote_02", proposalId, userId: "u_02", choice: "no" }
  ];
}

// ===== Dyskusje =====
export function DAO_addComment(userId, proposalId, text) {
  const comment = { id: "dao_comment_" + Date.now(), userId, proposalId, text };
  return { ok: true, comment };
}

export function DAO_getComments(proposalId) {
  return [
    { id: "dao_comment_01", proposalId, userId: "u_01", text: "Świetny pomysł!" },
    { id: "dao_comment_02", proposalId, userId: "u_02", text: "Potrzebujemy więcej danych." }
  ];
}

// ===== Raporty =====
export function DAO_getReports() {
  return [
    { id: "rep_dao_01", title: "Raport DAO Town Hall czerwiec 2026", summary: "2 propozycje, 20 głosów, 5 komentarzy" },
    { id: "rep_dao_02", title: "Raport DAO Town Hall lipiec 2026", summary: "3 propozycje, 30 głosów, 10 komentarzy" }
  ];
}
