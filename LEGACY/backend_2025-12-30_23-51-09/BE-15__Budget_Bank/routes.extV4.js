import * as serviceV4 from "./service.extV4.js";

export function registerBudgetRoutesV4(app) {

  app.get("/budget/v4/trends", (req, res) => {
    res.json({ list: serviceV4.Budget_getFinanceTrends() });
  });

  app.post("/budget/v4/notify/threshold", (req, res) => {
    const { departmentId, threshold, current } = req.body;
    res.json(serviceV4.Budget_autoNotifyThreshold(departmentId, threshold, current));
  });

  app.post("/budget/v4/link/vault", (req, res) => {
    const { transactionId, vaultId } = req.body;
    res.json(serviceV4.Budget_linkVault(transactionId, vaultId));
  });

  app.post("/budget/v4/link/admin", (req, res) => {
    const { expenseId, approvalId } = req.body;
    res.json(serviceV4.Budget_linkAdminApproval(expenseId, approvalId));
  });

  app.get("/budget/v4/reports", (req, res) => {
    res.json({ list: serviceV4.Budget_getReportsV4() });
  });
}
