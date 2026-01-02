const fs = require("fs");
const path = require("path");

// ROOT = katalog główny repo
const ROOT = process.cwd();
const BACKEND = path.join(ROOT, "backend");
const LEGACY = path.join(ROOT, "LEGACY");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function moveIfExists(src, destBaseName) {
  if (!fs.existsSync(src)) return;

  ensureDir(LEGACY);
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const dest = path.join(LEGACY, `${destBaseName}_${stamp}`);

  fs.renameSync(src, dest);
  console.log(`📦 Przeniesiono ${path.basename(src)}/ → ${path.relative(ROOT, dest)}/`);
}

function writeFileForce(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
  console.log(`✅ Utworzono: ${path.relative(ROOT, filePath)}`);
}

// --------------------------------------------------
// 1. ARCHIWIZACJA STAREGO BACKENDU
// --------------------------------------------------
console.log("🛠️  BE‑ALL GENERATOR START...");

moveIfExists(BACKEND, "backend");

// --------------------------------------------------
// 2. TWORZENIE NOWEGO backend/
// --------------------------------------------------
ensureDir(BACKEND);

// --------------------------------------------------
// 3. STORAGE ENGINE (prosty JSON storage)
// --------------------------------------------------
writeFileForce(
  path.join(BACKEND, "storage.js"),
  `import fs from "fs";

export function readJSON(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

export function writeJSON(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}
`
);

// --------------------------------------------------
// 4. ROUTER backendu
// --------------------------------------------------
writeFileForce(
  path.join(BACKEND, "router.js"),
  `import express from "express";
import { FestivalEngine } from "./BE-01__Festival_Engine/index.js";

export function createRouter() {
  const router = express.Router();

  // FESTIVAL ENGINE
  router.use("/festival", FestivalEngine);

  return router;
}
`
);

// --------------------------------------------------
// 5. BE‑01__Festival_Engine
// --------------------------------------------------
const BE01 = path.join(BACKEND, "BE-01__Festival_Engine");

// index.js
writeFileForce(
  path.join(BE01, "index.js"),
  `import express from "express";
import { getSubmissions } from "./api/getSubmissions.js";
import { getSubmissionById } from "./api/getSubmissionById.js";
import { createSubmission } from "./api/createSubmission.js";
import { getJuryDashboardData } from "./api/getJuryDashboardData.js";
import { getAIAnalysisOverview } from "./api/getAIAnalysisOverview.js";
import { getAdminOverview } from "./api/getAdminOverview.js";

export const FestivalEngine = express.Router();

FestivalEngine.get("/getSubmissions", getSubmissions);
FestivalEngine.get("/getSubmissionById/:id", getSubmissionById);
FestivalEngine.post("/createSubmission", createSubmission);
FestivalEngine.get("/getJuryDashboardData", getJuryDashboardData);
FestivalEngine.get("/getAIAnalysisOverview", getAIAnalysisOverview);
FestivalEngine.get("/getAdminOverview", getAdminOverview);
`
);

// --------------------------------------------------
// 6. API ENDPOINTS
// --------------------------------------------------
writeFileForce(
  path.join(BE01, "api/getSubmissions.js"),
  `import { readJSON } from "../../storage.js";
import path from "path";

export function getSubmissions(req, res) {
  const file = path.join(process.cwd(), "backend/BE-01__Festival_Engine/data/submissions.json");
  const data = readJSON(file);
  res.json(data);
}
`
);

writeFileForce(
  path.join(BE01, "api/getSubmissionById.js"),
  `import { readJSON } from "../../storage.js";
import path from "path";

export function getSubmissionById(req, res) {
  const file = path.join(process.cwd(), "backend/BE-01__Festival_Engine/data/submissions.json");
  const data = readJSON(file);
  const item = data.find((x) => x.id === req.params.id);
  res.json(item || null);
}
`
);

writeFileForce(
  path.join(BE01, "api/createSubmission.js"),
  `import { readJSON, writeJSON } from "../../storage.js";
import path from "path";

export function createSubmission(req, res) {
  const file = path.join(process.cwd(), "backend/BE-01__Festival_Engine/data/submissions.json");
  const data = readJSON(file);

  const newItem = {
    id: String(Date.now()),
    ...req.body
  };

  data.push(newItem);
  writeJSON(file, data);

  res.json({ success: true, id: newItem.id });
}
`
);

writeFileForce(
  path.join(BE01, "api/getJuryDashboardData.js"),
  `import { readJSON } from "../../storage.js";
import path from "path";

export function getJuryDashboardData(req, res) {
  const file = path.join(process.cwd(), "backend/BE-01__Festival_Engine/data/jury.json");
  const data = readJSON(file);
  res.json(data);
}
`
);

writeFileForce(
  path.join(BE01, "api/getAIAnalysisOverview.js"),
  `import { readJSON } from "../../storage.js";
import path from "path";

export function getAIAnalysisOverview(req, res) {
  const file = path.join(process.cwd(), "backend/BE-01__Festival_Engine/data/ai.json");
  const data = readJSON(file);
  res.json(data);
}
`
);

writeFileForce(
  path.join(BE01, "api/getAdminOverview.js"),
  `import { readJSON } from "../../storage.js";
import path from "path";

export function getAdminOverview(req, res) {
  const file = path.join(process.cwd(), "backend/BE-01__Festival_Engine/data/admin.json");
  const data = readJSON(file);
  res.json(data);
}
`
);

// --------------------------------------------------
// 7. MOCK DATA
// --------------------------------------------------
writeFileForce(
  path.join(BE01, "data/submissions.json"),
  `[
  { "id": "1", "title": "Film 1", "director": "Autor 1", "status": "submitted", "synopsis": "Opis 1", "duration": 90 },
  { "id": "2", "title": "Film 2", "director": "Autor 2", "status": "selected", "synopsis": "Opis 2", "duration": 120 }
]`
);

writeFileForce(
  path.join(BE01, "data/jury.json"),
  `{
  "juryName": "Jury Główne",
  "assignedSubmissions": [
    { "id": "1", "title": "Film 1", "status": "to_review" },
    { "id": "2", "title": "Film 2", "status": "to_review" }
  ]
}`
);

writeFileForce(
  path.join(BE01, "data/ai.json"),
  `{
  "totalAnalyzed": 12,
  "insights": [
    "AI wykryła wysokie emocje w 7 filmach.",
    "4 filmy mają ponadprzeciętny potencjał festiwalowy."
  ]
}`
);

writeFileForce(
  path.join(BE01, "data/admin.json"),
  `{
  "totalSubmissions": 42,
  "selected": 10,
  "rejected": 5,
  "inReview": 27
}`
);

// --------------------------------------------------
// 8. CONFIG
// --------------------------------------------------
writeFileForce(
  path.join(BE01, "config/functions.json"),
  `{
  "createSubmission": true,
  "reviewSubmission": true,
  "aiAnalyze": true,
  "adminAccess": true
}`
);

writeFileForce(
  path.join(BE01, "config/roles.json"),
  `{
  "user": ["createSubmission"],
  "jury": ["reviewSubmission"],
  "ai": ["aiAnalyze"],
  "admin": ["adminAccess"]
}`
);

writeFileForce(
  path.join(BE01, "config/levels.json"),
  `{
  "basic": ["user"],
  "jury": ["jury"],
  "ai": ["ai"],
  "admin": ["admin"]
}`
);

writeFileForce(
  path.join(BE01, "config/certificates.json"),
  `{
  "festival_participant": true,
  "jury_member": true,
  "ai_operator": true,
  "admin_certified": true
}`
);

console.log("🎉 BE‑ALL GENERATOR ZAKOŃCZONY — backend gotowy.");
