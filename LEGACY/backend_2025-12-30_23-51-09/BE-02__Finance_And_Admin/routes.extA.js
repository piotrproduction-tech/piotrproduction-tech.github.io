// backend/BE-02/routes.extA.js

import * as extA from "./service.extA.js";

export function registerFinanceAdminRoutesExtA(app) {

  // ===== Budget Bank — filtrowanie =====
  app.post("/finance/budget/filter", (req, res) => {
    res.json(extA.BudgetBank_filter(req.body || {}));
  });

  // ===== Budget Bank — eksport CSV =====
  app.post("/finance/budget/export/csv", (req, res) => {
    const csv = extA.BudgetBank_exportCSV(req.body || {});
    res.header("Content-Type", "text/csv");
    res.attachment("budget_export.csv");
    res.send(csv);
  });

  // ===== Budget Bank — okresy =====
  app.post("/finance/budget/periods/close", (req, res) => {
    const { label } = req.body;
    res.json(extA.BudgetBank_closePeriod(label));
  });

  app.get("/finance/budget/periods", (req, res) => {
    res.json({ list: extA.BudgetBank_getPeriods() });
  });

  // ===== Treasure Vault — status =====
  app.post("/finance/treasure/status", (req, res) => {
    const { rewardId, status } = req.body;
    res.json(extA.TreasureVault_setStatus(rewardId, status));
  });

  // ===== Treasure Vault — claim =====
  app.post("/finance/treasure/claim", (req, res) => {
    const { rewardId, user } = req.body;
    res.json(extA.TreasureVault_claim(rewardId, user));
  });

  app.get("/finance/treasure/claims", (req, res) => {
    res.json({ list: extA.TreasureVault_getClaims() });
  });
}
