const express = require("express");
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
