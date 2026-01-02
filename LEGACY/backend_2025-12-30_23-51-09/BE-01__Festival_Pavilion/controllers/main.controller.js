const festivalService = require("../services/main.service");

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
