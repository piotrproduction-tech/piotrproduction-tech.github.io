import express from "express";

export const tokenRouter = express.Router();

// Mock storage
let WALLETS = {
  "user-1": { balance: 100, history: [] }
};

function ensureWallet(userId) {
  if (!WALLETS[userId]) {
    WALLETS[userId] = { balance: 0, history: [] };
  }
}

tokenRouter.get("/wallet/:userId", (req, res) => {
  const userId = req.params.userId;
  ensureWallet(userId);
  res.json(WALLETS[userId]);
});

tokenRouter.post("/reward", (req, res) => {
  const { userId, amount, reason } = req.body;
  ensureWallet(userId);
  WALLETS[userId].balance += amount;
  WALLETS[userId].history.push({ type: "reward", amount, reason, ts: Date.now() });
  res.json({ success: true, wallet: WALLETS[userId] });
});

tokenRouter.post("/charge", (req, res) => {
  const { userId, amount, reason } = req.body;
  ensureWallet(userId);
  WALLETS[userId].balance -= amount;
  WALLETS[userId].history.push({ type: "charge", amount, reason, ts: Date.now() });
  res.json({ success: true, wallet: WALLETS[userId] });
});
