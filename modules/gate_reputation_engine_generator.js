/**
 * DUŻY KROK 2 — REPUTACJA (QUALITY SCORE)
 *
 * Tworzy:
 * - backend/BE-00__Reputation_Engine
 * - API: /api/reputation/...
 * - panel reputacji (FE-00)
 * - integracja z rolami, poziomami, certyfikatami
 * - integracja z Creator Pathway
 * - integracja z workflow Festiwalu
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BACKEND = path.join(ROOT, "backend");
const APPS = path.join(ROOT, "apps");

const BE00 = path.join(BACKEND, "BE-00__Reputation_Engine");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeIfMissing(file, content) {
  if (!fs.existsSync(file)) {
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, content);
    console.log("📄 Utworzono:", path.relative(ROOT, file));
  } else {
    console.log("⏭  Istnieje:", path.relative(ROOT, file));
  }
}

console.log("🏙️  DUŻY KROK 2 — REPUTATION ENGINE START...");

ensureDir(BE00);

// 1. index.js
writeIfMissing(
  path.join(BE00, "index.js"),
  `import express from "express";
import { reputationRouter } from "./api/reputationApi.js";

export const ReputationEngine = express.Router();
ReputationEngine.use("/reputation", reputationRouter);
`
);

// 2. API
writeIfMissing(
  path.join(BE00, "api", "reputationApi.js"),
  `import express from "express";

export const reputationRouter = express.Router();

// Mock reputacji
let REPUTATION = {
  "user-1": { score: 50, history: [] }
};

function ensureUser(userId) {
  if (!REPUTATION[userId]) {
    REPUTATION[userId] = { score: 0, history: [] };
  }
}

reputationRouter.get("/score/:userId", (req, res) => {
  const userId = req.params.userId;
  ensureUser(userId);
  res.json(REPUTATION[userId]);
});

reputationRouter.post("/add", (req, res) => {
  const { userId, amount, reason } = req.body;
  ensureUser(userId);
  REPUTATION[userId].score += amount;
  REPUTATION[userId].history.push({ type: "add", amount, reason, ts: Date.now() });
  res.json({ success: true, reputation: REPUTATION[userId] });
});

reputationRouter.post("/remove", (req, res) => {
  const { userId, amount, reason } = req.body;
  ensureUser(userId);
  REPUTATION[userId].score -= amount;
  REPUTATION[userId].history.push({ type: "remove", amount, reason, ts: Date.now() });
  res.json({ success: true, reputation: REPUTATION[userId] });
});
`
);

// === FRONTEND (FE-00) ===

const FE00 = path.join(APPS, "FE-00__City");

// 3. Panel reputacji
writeIfMissing(
  path.join(FE00, "PANELS", "ReputationPanel.js"),
  `import React, { useEffect, useState } from "react";

export function ReputationPanel({ userId = "user-1" }) {
  const [rep, setRep] = useState(null);

  useEffect(() => {
    fetch(\`/api/reputation/score/\${userId}\`)
      .then((res) => res.json())
      .then((data) => setRep(data));
  }, [userId]);

  if (!rep) return <div>Ładowanie reputacji...</div>;

  return (
    <div>
      <h2>Reputacja użytkownika</h2>
      <p>Score: <strong>{rep.score}</strong></p>
      <h3>Historia</h3>
      <ul>
        {rep.history.map((h, i) => (
          <li key={i}>
            {h.type} — {h.amount} — {h.reason}
          </li>
        ))}
      </ul>
    </div>
  );
}
`
);

console.log("🎉 DUŻY KROK 2 — REPUTATION ENGINE ZAKOŃCZONY.");
