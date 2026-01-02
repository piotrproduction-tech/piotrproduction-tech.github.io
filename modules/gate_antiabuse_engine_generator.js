/**
 * DUŻY KROK 4 — ANTI-ABUSE ENGINE
 *
 * Tworzy:
 * - backend/BE-00__AntiAbuse_Engine
 * - API: /api/abuse/...
 * - scoring ryzyka
 * - wykrywanie manipulacji
 * - integracja z Reward Engine (kary)
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BACKEND = path.join(ROOT, "backend");

const BE00 = path.join(BACKEND, "BE-00__AntiAbuse_Engine");

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

console.log("🏙️  DUŻY KROK 4 — ANTI-ABUSE ENGINE START...");

ensureDir(BE00);

// index.js
writeIfMissing(
  path.join(BE00, "index.js"),
  `import express from "express";
import { abuseRouter } from "./api/abuseApi.js";

export const AntiAbuseEngine = express.Router();
AntiAbuseEngine.use("/abuse", abuseRouter);
`
);

// API
writeIfMissing(
  path.join(BE00, "api", "abuseApi.js"),
  `import express from "express";

export const abuseRouter = express.Router();

// Proste reguły wykrywania nadużyć
const RULES = {
  "rapid_actions": { threshold: 10, penalty: "user.spam" },
  "duplicate_content": { threshold: 3, penalty: "user.spam" },
  "fake_activity": { threshold: 5, penalty: "user.spam" }
};

// Mock aktywności
let ACTIVITY = {};

function recordActivity(userId, type) {
  if (!ACTIVITY[userId]) ACTIVITY[userId] = {};
  if (!ACTIVITY[userId][type]) ACTIVITY[userId][type] = 0;
  ACTIVITY[userId][type]++;
}

function checkAbuse(userId) {
  const userActivity = ACTIVITY[userId] || {};
  const triggered = [];

  for (const [type, rule] of Object.entries(RULES)) {
    if ((userActivity[type] || 0) >= rule.threshold) {
      triggered.push(rule.penalty);
    }
  }

  return triggered;
}

abuseRouter.post("/record", (req, res) => {
  const { userId, type } = req.body;
  recordActivity(userId, type);
  res.json({ success: true });
});

abuseRouter.get("/check/:userId", async (req, res) => {
  const userId = req.params.userId;
  const penalties = checkAbuse(userId);

  for (const p of penalties) {
    await fetch("http://localhost:3000/api/rewards/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, action: p })
    });
  }

  res.json({ userId, penalties });
});
`
);

console.log("🎉 DUŻY KROK 4 — ANTI-ABUSE ENGINE ZAKOŃCZONY.");
