const fs = require("fs");
const path = require("path");

const BE_FOLDER = "BE-01__Festival_Pavilion";
const ROOT = __dirname;
const BE_PATH = path.join(ROOT, BE_FOLDER);

// ============ HELPERY ============

function ensureDir(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

function removeIfExists(p) {
  if (fs.existsSync(p)) {
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      fs.rmSync(p, { recursive: true, force: true });
    } else {
      fs.unlinkSync(p);
    }
    console.log(`🧹 Usunięto: ${path.relative(ROOT, p)}`);
  }
}

function writeFileForce(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
  console.log(`✅ Nadpisano: ${path.relative(ROOT, filePath)}`);
}

function writeIfMissing(filePath, content) {
  if (!fs.existsSync(filePath)) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, content);
    console.log(`✅ Utworzono: ${path.relative(ROOT, filePath)}`);
  } else {
    console.log(`ℹ️  Pominięto (istnieje): ${path.relative(ROOT, filePath)}`);
  }
}

// ============ KROK 1: CLEAN LEGACY ============
//
// Czyścimy tylko to, co jest częścią starego silnika / starego szkieletonu BE-01,
// i co ma być w pełni kontrolowane przez FESTIVAL ENGINE.
//

function cleanLegacy() {
  console.log("🧹 CLEAN: Czyszczenie legacy BE-01__Festival_Pavilion...");

  // Stare pliki z silnika 1–52:
  removeIfExists(path.join(BE_PATH, "service.js"));
  removeIfExists(path.join(BE_PATH, "routes.js"));

  // Stary, pusty / błędny workflow (będzie nadpisany kanonicznym)
  removeIfExists(path.join(BE_PATH, "workflow", "workflow.json"));

  // Stare wersje głównych plików, które mają być kontrolowane przez generator:
  removeIfExists(path.join(BE_PATH, "controllers", "main.controller.js"));
  removeIfExists(path.join(BE_PATH, "services", "main.service.js"));
  removeIfExists(path.join(BE_PATH, "routes", "main.routes.js"));

  console.log("🧹 CLEAN: Zakończono czyszczenie legacy.");
}

// ============ KROK 2: INSTALL FESTIVAL ENGINE BACKEND ============

function installFestivalEngine() {
  console.log("🏗 INSTALL: Instalacja FESTIVAL ENGINE BACKEND...");

  ensureDir(BE_PATH);

  const folders = [
    "controllers",
    "services",
    "routes",
    "workflow",
    "ai",
    "certificates"
  ];
  folders.forEach(f => ensureDir(path.join(BE_PATH, f)));

  // --- workflow.json (kanoniczny, NADPISUJEMY zawsze) ---
  const workflowJson = `{
  "entity": "WorkSubmission",
  "states": [
    "draft",
    "submitted",
    "legal_check",
    "fingerprint_check",
    "jury_assignment",
    "jury_review",
    "ai_analysis",
    "finalist_selection",
    "certified",
    "rejected"
  ],
  "actions": {
    "updateDraft": ["draft"],
    "submit": ["draft"],
    "runLegalCheck": ["submitted"],
    "approveLegal": ["legal_check"],
    "rejectLegal": ["legal_check"],
    "approveFingerprint": ["fingerprint_check"],
    "rejectFingerprint": ["fingerprint_check"],
    "assignJury": ["jury_assignment"],
    "unassignJury": ["jury_assignment"],
    "addJuryScore": ["jury_review"],
    "finalizeJuryScores": ["jury_review"],
    "runAI": ["ai_analysis"],
    "approveAI": ["ai_analysis"],
    "rejectAI": ["ai_analysis"],
    "selectAsFinalist": ["finalist_selection"],
    "rejectAsNonFinalist": ["finalist_selection"],
    "issueCertificate": ["certified"],
    "publishResults": ["certified"],
    "archiveSubmission": ["rejected"]
  },
  "transitions": [
    { "from": "draft", "action": "submit", "to": "submitted" },
    { "from": "submitted", "action": "runLegalCheck", "to": "legal_check" },
    { "from": "legal_check", "action": "approveLegal", "to": "fingerprint_check" },
    { "from": "legal_check", "action": "rejectLegal", "to": "rejected" },
    { "from": "fingerprint_check", "action": "approveFingerprint", "to": "jury_assignment" },
    { "from": "fingerprint_check", "action": "rejectFingerprint", "to": "rejected" },
    { "from": "jury_assignment", "action": "assignJury", "to": "jury_review" },
    { "from": "jury_review", "action": "finalizeJuryScores", "to": "ai_analysis" },
    { "from": "ai_analysis", "action": "approveAI", "to": "finalist_selection" },
    { "from": "ai_analysis", "action": "rejectAI", "to": "rejected" },
    { "from": "finalist_selection", "action": "selectAsFinalist", "to": "certified" },
    { "from": "finalist_selection", "action": "rejectAsNonFinalist", "to": "rejected" }
  ]
}
`;
  writeFileForce(path.join(BE_PATH, "workflow", "workflow.json"), workflowJson);

  // storage na zgłoszenia – tylko jeśli brak
  writeIfMissing(path.join(BE_PATH, "workflow", "submissions.data.json"), "[]\n");

  // --- routes/main.routes.js (KANONICZNY, NADPISUJEMY) ---
  const routesJs = `const express = require("express");
const router = express.Router();
const festivalController = require("../controllers/main.controller");

// Zgłoszenia
router.post("/festival/submissions", festivalController.createSubmission);
router.get("/festival/submissions", festivalController.listSubmissions);
router.get("/festival/submissions/:id", festivalController.getSubmissionById);

// Workflow (przejścia stanów)
router.post("/festival/submissions/:id/transition", festivalController.transitionSubmission);

// Akcje domenowe
router.post("/festival/submissions/:id/legal-check", festivalController.runLegalCheck);
router.post("/festival/submissions/:id/fingerprint-check", festivalController.runFingerprintCheck);
router.post("/festival/submissions/:id/jury-assign", festivalController.assignJury);
router.post("/festival/submissions/:id/jury-score", festivalController.addJuryScore);
router.post("/festival/submissions/:id/ai-analysis", festivalController.runAIAnalysis);
router.post("/festival/submissions/:id/certify", festivalController.issueCertificate);

module.exports = router;
`;
  writeFileForce(path.join(BE_PATH, "routes", "main.routes.js"), routesJs);

  // --- controllers/main.controller.js (KANONICZNY, NADPISUJEMY) ---
  const controllerJs = `const festivalService = require("../services/main.service");

// Utworzenie zgłoszenia (draft + submit)
async function createSubmission(req, res) {
  try {
    const submissionData = req.body;
    const submission = await festivalService.createAndSubmitWork(submissionData);
    res.status(201).json(submission);
  } catch (err) {
    console.error("createSubmission error:", err);
    res.status(400).json({ error: err.message || "Cannot create submission" });
  }
}

async function listSubmissions(req, res) {
  try {
    const { editionId, sectionId, status } = req.query;
    const submissions = await festivalService.listSubmissions({ editionId, sectionId, status });
    res.json(submissions);
  } catch (err) {
    console.error("listSubmissions error:", err);
    res.status(400).json({ error: err.message || "Cannot list submissions" });
  }
}

async function getSubmissionById(req, res) {
  try {
    const { id } = req.params;
    const submission = await festivalService.getSubmissionById(id);
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }
    res.json(submission);
  } catch (err) {
    console.error("getSubmissionById error:", err);
    res.status(400).json({ error: err.message || "Cannot get submission" });
  }
}

// Ogólny endpoint workflow
async function transitionSubmission(req, res) {
  try {
    const { id } = req.params;
    const { action } = req.body;
    const updated = await festivalService.transitionSubmission(id, action);
    res.json(updated);
  } catch (err) {
    console.error("transitionSubmission error:", err);
    res.status(400).json({ error: err.message || "Cannot transition submission" });
  }
}

async function runLegalCheck(req, res) {
  try {
    const { id } = req.params;
    const result = await festivalService.runLegalCheck(id);
    res.json(result);
  } catch (err) {
    console.error("runLegalCheck error:", err);
    res.status(400).json({ error: err.message || "Cannot run legal check" });
  }
}

async function runFingerprintCheck(req, res) {
  try {
    const { id } = req.params;
    const result = await festivalService.runFingerprintCheck(id);
    res.json(result);
  } catch (err) {
    console.error("runFingerprintCheck error:", err);
    res.status(400).json({ error: err.message || "Cannot run fingerprint check" });
  }
}

async function assignJury(req, res) {
  try {
    const { id } = req.params;
    const { juryId } = req.body;
    const result = await festivalService.assignJury(id, juryId);
    res.json(result);
  } catch (err) {
    console.error("assignJury error:", err);
    res.status(400).json({ error: err.message || "Cannot assign jury" });
  }
}

async function addJuryScore(req, res) {
  try {
    const { id } = req.params;
    const scoreData = req.body;
    const result = await festivalService.addJuryScore(id, scoreData);
    res.json(result);
  } catch (err) {
    console.error("addJuryScore error:", err);
    res.status(400).json({ error: err.message || "Cannot add jury score" });
  }
}

async function runAIAnalysis(req, res) {
  try {
    const { id } = req.params;
    const result = await festivalService.runAIAnalysis(id);
    res.json(result);
  } catch (err) {
    console.error("runAIAnalysis error:", err);
    res.status(400).json({ error: err.message || "Cannot run AI analysis" });
  }
}

async function issueCertificate(req, res) {
  try {
    const { id } = req.params;
    const result = await festivalService.issueCertificate(id);
    res.json(result);
  } catch (err) {
    console.error("issueCertificate error:", err);
    res.status(400).json({ error: err.message || "Cannot issue certificate" });
  }
}

module.exports = {
  createSubmission,
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
`;
  writeFileForce(path.join(BE_PATH, "controllers", "main.controller.js"), controllerJs);

  // --- services/main.service.js (KANONICZNY, NADPISUJEMY) ---
  const serviceJs = `const fs = require("fs");
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
    throw new Error(\`Action \${action} not allowed from state \${sub.status}\`);
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
`;
  writeFileForce(path.join(BE_PATH, "services", "main.service.js"), serviceJs);

  // ai / certificates – tylko jeśli brak
  writeIfMissing(path.join(BE_PATH, "ai", "ai.json"), JSON.stringify({ functions: [] }, null, 2));
  writeIfMissing(path.join(BE_PATH, "certificates", "certificates.json"), JSON.stringify({ certificates: [] }, null, 2));

  // README i module.config – tworzymy tylko jeśli brak (Twoje mogą już istnieć)
  writeIfMissing(
    path.join(BE_PATH, "README_BE-01__Festival_Pavilion.md"),
    `# BE-01__Festival_Pavilion

Backend FESTIVAL ENGINE dla CITYOF-GATE.
Obsługuje zgłoszenia dzieł do festiwali, workflow, jury, AI oraz certyfikację.

Plik wygenerowany automatycznie.\n`
  );

  const moduleConfigPath = path.join(BE_PATH, "module.config.json");
  if (!fs.existsSync(moduleConfigPath)) {
    const cfg = {
      moduleId: "BE-01__Festival_Pavilion",
      description: "Backend FESTIVAL ENGINE (Pavilion) dla CITYOF-GATE.",
      routes: ["/festival/submissions"],
      services: ["WorkSubmissionService"],
      workflow: ["workflow/workflow.json"],
      ai: [],
      certificates: []
    };
    writeIfMissing(moduleConfigPath, JSON.stringify(cfg, null, 2));
  } else {
    console.log("ℹ️  Pominięto module.config.json (istnieje)");
  }

  console.log("🏗 INSTALL: FESTIVAL ENGINE BACKEND zainstalowany.");
}

// ============ MAIN ============

console.log("🚀 FESTIVAL ENGINE GENERATOR v2 start...");
cleanLegacy();
installFestivalEngine();
console.log("🏙️ FESTIVAL ENGINE GENERATOR v2 zakończony.");
