// backend/BE-49/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerBudgetRoutesV4(app) {

  app.get("/budget/v4/trends", (req, res) => {
    res.json({ list: service.Budget49_getFinanceTrends() });
  });

  app.post("/budget/v4/notify/threshold", (req, res) => {
    const { departmentId, threshold, current } = req.body;
    res.json(service.Budget49_autoNotifyThreshold(departmentId, threshold, current));
  });

  app.post("/budget/v4/link/vault", (req, res) => {
    const { transactionId, vaultId } = req.body;
    res.json(service.Budget49_linkVault(transactionId, vaultId));
  });

  app.post("/budget/v4/link/admin", (req, res) => {
    const { expenseId, approvalId } = req.body;
    res.json(service.Budget49_linkAdminApproval(expenseId, approvalId));
  });

  app.get("/budget/v4/reports", (req, res) => {
    res.json({ list: service.Budget49_getReports() });
  });
}
