import express from "express";

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
  await fetch(`http://localhost:3000/api/reputation/${repEndpoint}`, {
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
