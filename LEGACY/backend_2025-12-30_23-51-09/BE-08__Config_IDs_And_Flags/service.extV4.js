// backend/BE-08/service.extV4.js

let COURSE_PROPOSALS_V4 = Array.isArray(COURSE_PROPOSALS_V4) ? COURSE_PROPOSALS_V4 : [];

function now() { return new Date().toISOString(); }

// ===== Trendy governance =====
export function CourseGov_trendReport(days) {
  const data = {};
  COURSE_PROPOSALS_V4.forEach(p => {
    const d = p.createdAt.split("T")[0];
    if (!data[d]) data[d] = { proposals: 0, votes: 0 };
    data[d].proposals++;
    data[d].votes += p.votes.length;
  });

  const keys = Object.keys(data).sort();
  return keys.slice(-days).map(k => ({
    day: k,
    proposals: data[k].proposals,
    votes: data[k].votes
  }));
}

// ===== Auto-close =====
export function CourseGov_autoClose() {
  const nowTime = new Date();
  COURSE_PROPOSALS_V4.forEach(p => {
    if (p.status === "open" && new Date(p.closeAt) <= nowTime) {
      p.status = "closed";
      p.closedAt = now();
    }
  });
  return { ok: true };
}

// ===== Raport quorum =====
export function CourseGov_quorumReport(id) {
  const p = COURSE_PROPOSALS_V4.find(x => x.id === id);
  if (!p) return { error: "Not found" };

  return {
    id,
    title: p.title,
    quorum: p.quorum,
    totalVotes: p.votes.length,
    quorumMet: p.votes.length >= p.quorum
  };
}

// ===== Eksport =====
export function CourseGov_exportPDFPlaceholder(title) {
  const content =
    "=== " + title + " ===\nGenerated at " + now() +
    "\n\nCourse Governance report placeholder.";
  return { ok: true, content };
}
