/**
 * DUŻY KROK — Odtworzenie workflow FESTIWALU (BE-01__Festival_Engine)
 *
 * Tworzy:
 * - filmSubmissionWorkflow.json
 * - juryWorkflow.json
 * - eventWorkflow.json
 *
 * NICZEGO nie nadpisuje, jeśli pliki istnieją.
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BE01 = path.join(ROOT, "backend", "BE-01__Festival_Engine");
const WORKFLOW = path.join(BE01, "workflow");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeIfMissing(filePath, content) {
  if (!fs.existsSync(filePath)) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, content);
    console.log(`📄 Utworzono: ${path.relative(ROOT, filePath)}`);
  } else {
    console.log(`⏭  Istnieje, pomijam: ${path.relative(ROOT, filePath)}`);
  }
}

console.log("🏙️  DUŻY KROK — FESTIWAL WORKFLOW START...");

if (!fs.existsSync(BE01)) {
  console.error("❌ Brak backend/BE-01__Festival_Engine");
  process.exit(1);
}

ensureDir(WORKFLOW);

// 1. Workflow zgłoszeń filmowych
writeIfMissing(
  path.join(WORKFLOW, "filmSubmissionWorkflow.json"),
  `{
  "entity": "filmSubmission",
  "defaultState": "draft",
  "states": [
    "draft",
    "submitted",
    "under_review",
    "accepted",
    "rejected",
    "awarded"
  ],
  "transitions": {
    "draft": ["submitted"],
    "submitted": ["under_review"],
    "under_review": ["accepted", "rejected"],
    "accepted": ["awarded"],
    "rejected": [],
    "awarded": []
  }
}
`
);

// 2. Workflow jury
writeIfMissing(
  path.join(WORKFLOW, "juryWorkflow.json"),
  `{
  "entity": "juryEvaluation",
  "defaultState": "assigned",
  "states": [
    "assigned",
    "evaluating",
    "completed"
  ],
  "transitions": {
    "assigned": ["evaluating"],
    "evaluating": ["completed"],
    "completed": []
  }
}
`
);

// 3. Workflow wydarzeń festiwalowych
writeIfMissing(
  path.join(WORKFLOW, "eventWorkflow.json"),
  `{
  "entity": "festivalEvent",
  "defaultState": "planned",
  "states": [
    "planned",
    "published",
    "archived"
  ],
  "transitions": {
    "planned": ["published"],
    "published": ["archived"],
    "archived": []
  }
}
`
);

console.log("🎉 DUŻY KROK — FESTIWAL WORKFLOW ZAKOŃCZONE.");
