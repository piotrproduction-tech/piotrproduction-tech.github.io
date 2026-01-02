// backend/BE-08/service.extV3.js

let COURSE_PROPOSALS_V3 = Array.isArray(COURSE_PROPOSALS_V3) ? COURSE_PROPOSALS_V3 : [];

function now() { return new Date().toISOString(); }

// ===== Propozycje z quorum i oknami czasowymi =====
export function CourseGov_addTimedProposal(courseId, title, quorum, openAt, closeAt, actor) {
  const p = {
    id: "cg_prop_" + Date.now(),
    courseId,
    title,
    quorum,
    openAt,
    closeAt,
    votes: [],
    status: "open",
    createdAt: now()
  };
  COURSE_PROPOSALS_V3.push(p);
  return { ok: true, proposal: p };
}

// ===== Głosowanie typowane =====
export function CourseGov_voteTyped(proposalId, userId, type) {
  const p = COURSE_PROPOSALS_V3.find(x => x.id === proposalId);
  if (!p) return { error: "Not found" };

  const allowed = ["for", "against", "abstain"];
  if (!allowed.includes(type)) return { error: "Invalid vote" };

  const nowTime = new Date();
  if (nowTime < new Date(p.openAt) || nowTime > new Date(p.closeAt))
    return { error: "Voting closed" };

  p.votes.push({ userId, type, ts: now() });
  return { ok: true, proposal: p };
}

// ===== Zamknięcie =====
export function CourseGov_closeTimedProposal(id, actor) {
  const p = COURSE_PROPOSALS_V3.find(x => x.id === id);
  if (!p) return { error: "Not found" };

  p.status = "closed";
  p.closedAt = now();
  return { ok: true, proposal: p };
}

// ===== Raport wyników =====
export function CourseGov_reportResults(id) {
  const p = COURSE_PROPOSALS_V3.find(x => x.id === id);
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
