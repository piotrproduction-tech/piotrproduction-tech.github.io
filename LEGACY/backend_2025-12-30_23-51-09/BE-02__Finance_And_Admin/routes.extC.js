// backend/BE-02/routes.extC.js

import * as extC from "./service.extC.js";

export function registerFinanceAdminRoutesExtC(app) {

  // ===== Raporty miesięczne =====
  app.get("/finance/budget/summary/:year", (req, res) => {
    const year = Number(req.params.year);
    res.json(extC.BudgetBank_summaryByMonth(year));
  });

  // ===== Powiązanie transakcji z grantem =====
  app.post("/finance/budget/link-grant", (req, res) => {
    const { txId, grantId } = req.body;
    res.json(extC.BudgetBank_linkGrant(txId, grantId));
  });

  // ===== Audyt transakcji =====
  app.post("/finance/budget/audit", (req, res) => {
    const { txId, status, note } = req.body;
    res.json(extC.BudgetBank_auditTransaction(txId, status, note));
  });

  // ===== Plan wieloletni =====
  app.post("/finance/budget/multi-year", (req, res) => {
    const { years } = req.body;
    res.json(extC.BudgetBank_multiYearPlan(years));
  });
}
