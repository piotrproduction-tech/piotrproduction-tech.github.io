import express from "express";

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
