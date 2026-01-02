const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "workflow", "submissions.data.json");
const WORKFLOW_FILE = path.join(__dirname, "..", "workflow", "workflow.json");

function loadWorkflow() {
  const raw = fs.readFileSync(WORKFLOW_FILE, "utf8");
  return JSON.parse(raw);
}

function loadSubmissions() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function saveSubmissions(submissions) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
}

function findSubmission(submissions, id) {
  return submissions.find(s => s.id === id);
}

function generateId() {
  return "sub_" + Math.random().toString(36).substring(2, 10);
}

function canTransition(workflow, fromState, action) {
  const possible = workflow.transitions.filter(t => t.from === fromState && t.action === action);
  return possible.length > 0 ? possible[0].to : null;
}

async function createAndSubmitWork(data) {
  const submissions = loadSubmissions();
  const workflow = loadWorkflow();

  const id = generateId();
  const now = new Date().toISOString();

  const draft = {
    id,
    workId: data.workId,
    editionId: data.editionId,
    sectionId: data.sectionId || null,
    submitterId: data.submitterId,
    status: "draft",
    legalCheck: null,
    fingerprintCheck: null,
    juryScores: [],
    aiAnalysis: null,
    feesPaid: !!data.feesPaid,
    submittedAt: null,
    createdAt: now,
    updatedAt: now
  };

  const toState = canTransition(workflow, "draft", "submit");
  if (!toState) {
    throw new Error("Workflow does not allow submit from draft");
  }

  draft.status = toState;
  draft.submittedAt = now;
  draft.updatedAt = now;

  submissions.push(draft);
  saveSubmissions(submissions);

  return draft;
}

async function listSubmissions(filter) {
  const submissions = loadSubmissions();
  return submissions.filter(s => {
    if (filter.editionId && s.editionId !== filter.editionId) return false;
    if (filter.sectionId && s.sectionId !== filter.sectionId) return false;
    if (filter.status && s.status !== filter.status) return false;
    return true;
  });
}

async function getSubmissionById(id) {
  const submissions = loadSubmissions();
  return findSubmission(submissions, id) || null;
}

async function transitionSubmission(id, action) {
  const submissions = loadSubmissions();
  const workflow = loadWorkflow();
  const sub = findSubmission(submissions, id);
  if (!sub) throw new Error("Submission not found");

  const nextState = canTransition(workflow, sub.status, action);
  if (!nextState) {
    throw new Error(`Action ${action} not allowed from state ${sub.status}`);
  }

  sub.status = nextState;
  sub.updatedAt = new Date().toISOString();
  saveSubmissions(submissions);
  return sub;
}

async function runLegalCheck(id) {
  const submissions = loadSubmissions();
  const workflow = loadWorkflow();
  const sub = findSubmission(submissions, id);
  if (!sub) throw new Error("Submission not found");

  sub.legalCheck = {
    status: "approved",
    checkedAt: new Date().toISOString()
  };

  const toLegal = canTransition(workflow, sub.status, "runLegalCheck");
  if (!toLegal) throw new Error("Cannot run legal check from state " + sub.status);
  sub.status = toLegal;

  const toNext = canTransition(workflow, sub.status, "approveLegal");
  if (!toNext) throw new Error("Cannot approve legal from state " + sub.status);
  sub.status = toNext;

  sub.updatedAt = new Date().toISOString();
  saveSubmissions(submissions);
  return sub;
}

async function runFingerprintCheck(id) {
  const submissions = loadSubmissions();
  const workflow = loadWorkflow();
  const sub = findSubmission(submissions, id);
  if (!sub) throw new Error("Submission not found");

  sub.fingerprintCheck = {
    status: "approved",
    checkedAt: new Date().toISOString()
  };

  const toNext = canTransition(workflow, sub.status, "approveFingerprint");
  if (!toNext) throw new Error("Cannot approve fingerprint from state " + sub.status);
  sub.status = toNext;
  sub.updatedAt = new Date().toISOString();
  saveSubmissions(submissions);
  return sub;
}

async function assignJury(id, juryId) {
  const submissions = loadSubmissions();
  const workflow = loadWorkflow();
  const sub = findSubmission(submissions, id);
  if (!sub) throw new Error("Submission not found");

  sub.juryId = juryId;

  const toNext = canTransition(workflow, sub.status, "assignJury");
  if (!toNext) throw new Error("Cannot assign jury from state " + sub.status);
  sub.status = toNext;
  sub.updatedAt = new Date().toISOString();
  saveSubmissions(submissions);
  return sub;
}

async function addJuryScore(id, scoreData) {
  const submissions = loadSubmissions();
  const sub = findSubmission(submissions, id);
  if (!sub) throw new Error("Submission not found");

  sub.juryScores = sub.juryScores || [];
  sub.juryScores.push({
    id: "score_" + Math.random().toString(36).substring(2, 10),
    juryMemberId: scoreData.juryMemberId,
    score: scoreData.score,
    comment: scoreData.comment || "",
    createdAt: new Date().toISOString()
  });

  sub.updatedAt = new Date().toISOString();
  saveSubmissions(submissions);
  return sub;
}

async function runAIAnalysis(id) {
  const submissions = loadSubmissions();
  const workflow = loadWorkflow();
  const sub = findSubmission(submissions, id);
  if (!sub) throw new Error("Submission not found");

  sub.aiAnalysis = {
    quality: "unknown",
    originality: "unknown",
    notes: "AI placeholder",
    analyzedAt: new Date().toISOString()
  };

  const toNext = canTransition(workflow, sub.status, "approveAI");
  if (!toNext) throw new Error("Cannot approve AI from state " + sub.status);
  sub.status = toNext;
  sub.updatedAt = new Date().toISOString();
  saveSubmissions(submissions);
  return sub;
}

async function issueCertificate(id) {
  const submissions = loadSubmissions();
  const sub = findSubmission(submissions, id);
  if (!sub) throw new Error("Submission not found");

  sub.status = "certified";
  sub.certificate = {
    id: "cert_" + Math.random().toString(36).substring(2, 10),
    issuedAt: new Date().toISOString()
  };

  sub.updatedAt = new Date().toISOString();
  saveSubmissions(submissions);
  return sub;
}

module.exports = {
  createAndSubmitWork,
  listSubmissions,
  getSubmissionById,
  transitionSubmission,
  runLegalCheck,
  runFingerprintCheck,
  assignJury,
  addJuryScore,
  runAIAnalysis,
  issueCertificate
};
