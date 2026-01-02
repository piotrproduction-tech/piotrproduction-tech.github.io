/**
 * DUŻY KROK — Creator Pathway dla Marketplace (FE-02 + BE-02)
 *
 * Dokłada:
 * - backend/BE-02__Marketplace_Engine/config/creatorPathway.json
 * - frontend: prosty panel ścieżki w FE-02 (PANELS/CreatorPathwayPanel.js)
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APPS = path.join(ROOT, "apps");
const BACKEND = path.join(ROOT, "backend");

const FE02 = path.join(APPS, "FE-02__Marketplace");
const BE02 = path.join(BACKEND, "BE-02__Marketplace_Engine");

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

console.log("🏙️  DUŻY KROK — Creator Pathway START...");

if (!fs.existsSync(FE02)) {
  console.error("❌ Brak apps/FE-02__Marketplace");
  process.exit(1);
}
if (!fs.existsSync(BE02)) {
  console.error("❌ Brak backend/BE-02__Marketplace_Engine");
  process.exit(1);
}

// BACKEND — definicja ścieżki
const pathwayConfig = path.join(BE02, "config", "creatorPathway.json");
writeIfMissing(
  pathwayConfig,
  `{
  "stages": [
    {
      "id": "marketplace",
      "label": "Marketplace",
      "description": "Pierwszy krok — wystawiasz swoje rzeczy w Marketplace.",
      "requirements": []
    },
    {
      "id": "marketplace_street",
      "label": "Marketplace Street",
      "description": "Twoje rzeczy zaczynają być widoczne jako stała obecność.",
      "requirements": ["minItems:3"]
    },
    {
      "id": "creator",
      "label": "Creator",
      "description": "Masz już rozpoznawalny styl i aktywność.",
      "requirements": ["minItems:5", "minActiveDays:30"]
    },
    {
      "id": "certified_creator",
      "label": "Certified Creator",
      "description": "Oficjalnie certyfikowany twórca w CITYOF-GATE.",
      "requirements": ["festivalParticipation:true", "communityApproval:true"]
    }
  ]
}
`
);

// FRONTEND — panel ścieżki
const fePanelsDir = path.join(FE02, "PANELS");
ensureDir(fePanelsDir);

const fePanelPath = path.join(fePanelsDir, "CreatorPathwayPanel.js");
writeIfMissing(
  fePanelPath,
  `import React from "react";

const STAGES = [
  {
    id: "marketplace",
    label: "Marketplace",
    description: "Pierwszy krok — wystawiasz swoje rzeczy w Marketplace."
  },
  {
    id: "marketplace_street",
    label: "Marketplace Street",
    description: "Twoje rzeczy zaczynają być widoczne jako stała obecność."
  },
  {
    id: "creator",
    label: "Creator",
    description: "Masz już rozpoznawalny styl i aktywność."
  },
  {
    id: "certified_creator",
    label: "Certified Creator",
    description: "Oficjalnie certyfikowany twórca w CITYOF-GATE."
  }
];

export function CreatorPathwayPanel() {
  // TODO: podpiąć realne dane użytkownika (obecny etap, spełnione wymagania)
  const currentStageId = "marketplace";

  return (
    <div>
      <h2>Creator Pathway</h2>
      <ol>
        {STAGES.map((stage) => {
          const isCurrent = stage.id === currentStageId;
          return (
            <li key={stage.id} style={{ marginBottom: "8px" }}>
              <strong>{stage.label}</strong>
              {isCurrent && " (tu jesteś teraz)"}
              <div>{stage.description}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
`
);

console.log("🎉 DUŻY KROK — Creator Pathway ZAKOŃCZONE.");
