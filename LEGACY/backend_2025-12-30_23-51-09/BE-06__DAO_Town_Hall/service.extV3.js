// backend/BE-06/service.extV3.js

let PROPOSALS_V3 = Array.isArray(PROPOSALS_V3) ? PROPOSALS_V3 : [];

function now() { return new Date().toISOString(); }

// ===== Propozycje z quorum i oknami czasowymi =====
export function DAO_addTimedProposal(title, quorum, openAt, closeAt, actor) {
  const p = {
    id: "prop_" + Date.now(),
    title,
    quorum,
    openAt,
    closeAt,
    votes: [],
    status: "open",
    createdAt: now()
  };
  PROPOSALS_V3.push(p);
  return { ok: true, proposal: p };
}

// ===== Głosowanie typowane =====
export function DAO_voteTyped(id, user, type) {
  const p = PROPOSALS_V3.find(x => x.id === id);
  if (!p) return { error: "Not found" };

  const allowed = ["for", "against", "abstain"];
  if (!allowed.includes(type)) return { error: "Invalid vote" };

  const nowTime = new Date();
  if (nowTime < new Date(p.openAt) || nowTime > new Date(p.closeAt))
    return { error: "Voting closed" };

  p.votes.push({ user, type, votedAt: now() });
  return { ok: true, proposal: p };
}

// ===== Zamknięcie =====
export function DAO_closeTimedProposal(id, actor) {
  const p = PROPOSALS_V3.find(x => x.id === id);
  if (!p) return { error: "Not found" };

  p.status = "closed";
  p.closedAt = now();
  return { ok: true, proposal: p };
}

// ===== Raport wyników =====
export function DAO_reportResults(id) {
  const p = PROPOSALS_V3.find(x => x.id === id);
  if (!p) return { error: "Not found" };

  const counts = { for: 0, against: 0, abstain: 0 };
  p.votes.forEach(v => counts[v.type]++);

  return {
    id,
    title: p.title,
    counts,
    total: p.votes.length,
    quorumMet: p.votes.length >= p.quorum,
    status: p.status
  };
}
