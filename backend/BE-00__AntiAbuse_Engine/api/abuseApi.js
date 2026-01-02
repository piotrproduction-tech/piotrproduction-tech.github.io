import express from "express";

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
