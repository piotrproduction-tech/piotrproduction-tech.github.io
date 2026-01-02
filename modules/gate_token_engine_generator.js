/**
 * DUŻY KROK 1 — TOKENIZACJA (GATE TOKENS)
 *
 * Tworzy:
 * - backend/BE-00__Token_Engine
 * - API: /api/tokens/...
 * - portfel użytkownika (FE-00)
 * - historia transakcji
 * - token actions
 * - integracja z FE-01 i FE-02
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BACKEND = path.join(ROOT, "backend");
const APPS = path.join(ROOT, "apps");

// === BACKEND ===

const BE00 = path.join(BACKEND, "BE-00__Token_Engine");

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

console.log("🏙️  DUŻY KROK 1 — TOKEN ENGINE START...");

ensureDir(BE00);

// 1. index.js
writeIfMissing(
  path.join(BE00, "index.js"),
  `import express from "express";
import { tokenRouter } from "./api/tokenApi.js";

export const TokenEngine = express.Router();
TokenEngine.use("/tokens", tokenRouter);
`
);

// 2. API
writeIfMissing(
  path.join(BE00, "api", "tokenApi.js"),
  `import express from "express";

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
`
);

// === FRONTEND (FE-00) ===

const FE00 = path.join(APPS, "FE-00__City");

// 3. Panel portfela
writeIfMissing(
  path.join(FE00, "PANELS", "WalletPanel.js"),
  `import React, { useEffect, useState } from "react";

export function WalletPanel({ userId = "user-1" }) {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    fetch(\`/api/tokens/wallet/\${userId}\`)
      .then((res) => res.json())
      .then((data) => setWallet(data));
  }, [userId]);

  if (!wallet) return <div>Ładowanie portfela...</div>;

  return (
    <div>
      <h2>Portfel użytkownika</h2>
      <p>Saldo: <strong>{wallet.balance} GATE</strong></p>
      <h3>Historia</h3>
      <ul>
        {wallet.history.map((h, i) => (
          <li key={i}>
            {h.type} — {h.amount} GATE — {h.reason}
          </li>
        ))}
      </ul>
    </div>
  );
}
`
);

console.log("🎉 DUŻY KROK 1 — TOKEN ENGINE ZAKOŃCZONY.");
