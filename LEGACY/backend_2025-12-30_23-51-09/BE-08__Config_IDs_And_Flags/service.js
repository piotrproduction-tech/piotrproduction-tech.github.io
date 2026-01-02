// backend/BE-08/service.js

let COURSE_PROPOSALS = Array.isArray(COURSE_PROPOSALS) ? COURSE_PROPOSALS : [];

function now() { return new Date().toISOString(); }

// ===== Dodanie propozycji =====
export function CourseGov_addProposal(courseId, userId, proposal) {
  const p = {
    id: "cg_prop_" + Date.now(),
    courseId,
    userId,
    proposal,
    votes: [],
    status: "open",
    createdAt: now()
  };
  COURSE_PROPOSALS.push(p);
  return { ok: true, proposal: p };
}

// ===== Głosowanie =====
export function CourseGov_voteProposal(proposalId, userId, vote) {
  const p = COURSE_PROPOSALS.find(x => x.id === proposalId);
  if (!p) return { error: "Not found" };

  p.votes.push({ userId, vote, ts: now() });
  return { ok: true, proposal: p };
}

// ===== Lista propozycji =====
export function CourseGov_getProposals(courseId) {
  return COURSE_PROPOSALS.filter(p => p.courseId === courseId);
}
