/**
 * DUŻY KROK 3 — REWARD ENGINE
 *
 * Tworzy:
 * - backend/BE-00__Reward_Engine
 * - API: /api/rewards/...
 * - integracja z Token Engine i Reputation Engine
 * - reguły nagród i kar
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BACKEND = path.join(ROOT, "backend");

const BE00 = path.join(BACKEND, "BE-00__Reward_Engine");

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

console.log("🏙️  DUŻY KROK 3 — REWARD ENGINE START...");

ensureDir(BE00);

// index.js
writeIfMissing(
  path.join(BE00, "index.js"),
  `import express from "express";
import { rewardRouter } from "./api/rewardApi.js";

export const RewardEngine = express.Router();
RewardEngine.use("/rewards", rewardRouter);
`
);

// API
writeIfMissing(
  path.join(BE00, "api", "rewardApi.js"),
  `import express from "express";

export const rewardRouter = express.Router();

// Reguły nagród i kar
const RULES = {
  "marketplace.create": { tokens: +5, reputation: +2 },
  "festival.submission.accepted": { tokens: +20, reputation: +10 },
  "festival.submission.rejected": { tokens: 0, reputation: -5 },
  "user.spam": { tokens: -10, reputation: -20 }
};

// Wywołanie nagrody/kary
rewardRouter.post("/apply", async (req, res) => {
  const { userId, action } = req.body;

  const rule = RULES[action];
  if (!rule) return res.json({ success: false, error: "Unknown action" });

  // Token Engine
  await fetch("http://localhost:3000/api/tokens/reward", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      amount: rule.tokens,
      reason: action
    })
  });

  // Reputation Engine
  const repEndpoint = rule.reputation >= 0 ? "add" : "remove";
  await fetch(\`http://localhost:3000/api/reputation/\${repEndpoint}\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      amount: Math.abs(rule.reputation),
      reason: action
    })
  });

  res.json({ success: true, applied: rule });
});
`
);

console.log("🎉 DUŻY KROK 3 — REWARD ENGINE ZAKOŃCZONY.");
