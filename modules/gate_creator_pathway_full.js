/**
 * DUŻY KROK B — Creator Pathway (pełna implementacja)
 *
 * Dokłada:
 * - backend/BE-02__Marketplace_Engine/config/creatorPathway.json (jeśli brak)
 * - backend/BE-02__Marketplace_Engine/api/creatorPathwayApi.js
 * - frontend FE-02/PANELS/CreatorPathwayPanel.js (pełny, z danymi z backendu)
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

console.log("🏙️  DUŻY KROK B — Creator Pathway START...");

if (!fs.existsSync(FE02)) {
  console.error("❌ Brak apps/FE-02__Marketplace");
  process.exit(1);
}
if (!fs.existsSync(BE02)) {
  console.error("❌ Brak backend/BE-02__Marketplace_Engine");
  process.exit(1);
}

// BACKEND — config ścieżki
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
      "description": "Twoje rzeczy są stałą obecnością.",
      "requirements": ["minItems:3"]
    },
    {
      "id": "creator",
      "label": "Creator",
      "description": "Masz rozpoznawalny styl i aktywność.",
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

// BACKEND — API Creator Pathway
const apiDir = path.join(BE02, "api");
ensureDir(apiDir);

const apiPath = path.join(apiDir, "creatorPathwayApi.js");
writeIfMissing(
  apiPath,
  `// API Creator Pathway — BE-02__Marketplace_Engine
// Uproszczone obliczanie etapu na podstawie mockowanych danych.

import express from "express";
import fs from "fs";
import path from "path";

export const creatorPathwayRouter = express.Router();

const ROOT = process.cwd();
const CONFIG_PATH = path.join(
  ROOT,
  "backend",
  "BE-02__Marketplace_Engine",
  "config",
  "creatorPathway.json"
);

// TODO: podpiąć prawdziwe dane użytkownika i ofert
function getMockUserStats(userId) {
  return {
    userId,
    itemsCount: 4,
    activeDays: 20,
    festivalParticipation: false,
    communityApproval: false
  };
}

function loadConfig() {
  const raw = fs.readFileSync(CONFIG_PATH, "utf8");
  return JSON.parse(raw);
}

function evaluateStage(stats, config) {
  const stages = config.stages || [];
  let current = stages[0] || null;

  for (const stage of stages) {
    const reqs = stage.requirements || [];
    const ok = reqs.every((r) => {
      if (r.startsWith("minItems:")) {
        const v = parseInt(r.split(":")[1], 10);
        return stats.itemsCount >= v;
      }
      if (r.startsWith("minActiveDays:")) {
        const v = parseInt(r.split(":")[1], 10);
        return stats.activeDays >= v;
      }
      if (r === "festivalParticipation:true") {
        return stats.festivalParticipation === true;
      }
      if (r === "communityApproval:true") {
        return stats.communityApproval === true;
      }
      return true;
    });
    if (ok) current = stage;
    else break;
  }

  return current;
}

creatorPathwayRouter.get("/creatorPathway/:userId", (req, res) => {
  const userId = req.params.userId;
  const config = loadConfig();
  const stats = getMockUserStats(userId);
  const stage = evaluateStage(stats, config);

  res.json({
    userId,
    stats,
    stage,
    stages: config.stages
  });
});
`
);

// FRONTEND — panel Creator Pathway
const panelsDir = path.join(FE02, "PANELS");
ensureDir(panelsDir);

const panelPath = path.join(panelsDir, "CreatorPathwayPanel.js");
writeIfMissing(
  panelPath,
  `import React, { useEffect, useState } from "react";

const BASE_URL = "/api/marketplace/creatorPathway";

export function CreatorPathwayPanel({ userId = "user-1" }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(\`\${BASE_URL}/\${userId}\`)
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(() => setData(null));
  }, [userId]);

  if (!data) return <div>Ładowanie Creator Pathway...</div>;

  const { stats, stage, stages } = data;

  return (
    <div>
      <h2>Creator Pathway</h2>
      <p>Aktualny etap: <strong>{stage?.label || "brak"}</strong></p>
      <p>
        Oferty: {stats.itemsCount}, aktywne dni: {stats.activeDays},
        festiwal: {stats.festivalParticipation ? "tak" : "nie"},
        społeczność: {stats.communityApproval ? "tak" : "nie"}
      </p>
      <ol>
        {stages.map((s) => {
          const isCurrent = s.id === stage?.id;
          return (
            <li key={s.id} style={{ marginBottom: "8px" }}>
              <strong>{s.label}</strong>
              {isCurrent && " (tu jesteś teraz)"}
              <div>{s.description}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
`
);

console.log("🎉 DUŻY KROK B — Creator Pathway ZAKOŃCZONE.");
