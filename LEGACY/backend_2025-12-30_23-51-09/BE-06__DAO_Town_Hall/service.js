// backend/BE-06/service.js

let PROPOSALS = Array.isArray(PROPOSALS) ? PROPOSALS : [];

function now() { return new Date().toISOString(); }

// ===== Propozycje =====
export function DAO_addProposal(title, actor) {
  const proposal = {
    id: "dao_" + Date.now(),
    title,
    status: "open",
    votes: 0,
    createdAt: now()
  };
  PROPOSALS.push(proposal);
  return { ok: true, proposal };
}

// ===== Głosowanie =====
export function DAO_voteProposal(id, actor) {
  const p = PROPOSALS.find(x => x.id === id);
  if (!p) return { error: "Not found" };

  p.votes = (p.votes || 0) + 1;
  p.updatedAt = now();
  return { ok: true, proposal: p };
}

// ===== Zamknięcie propozycji =====
export function DAO_closeProposal(id, actor) {
  const p = PROPOSALS.find(x => x.id === id);
  if (!p) return { error: "Not found" };

  p.status = "closed";
  p.updatedAt = now();
  return { ok: true, proposal: p };
}

// ===== Lista propozycji =====
export function DAO_getProposals() {
  return PROPOSALS;
}
