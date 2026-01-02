import * as service from "./service.js";

export function registerBudgetRoutes(app) {

  app.get("/budget/accounts", (req, res) => {
    res.json({ list: service.Budget_getAccounts() });
  });

  app.post("/budget/account/create", (req, res) => {
    const { userId, name, initialBalance } = req.body;
    res.json(service.Budget_createAccount(userId, name, initialBalance));
  });

  app.post("/budget/transaction/add", (req, res) => {
    const { accountId, amount, description } = req.body;
    res.json(service.Budget_addTransaction(accountId, amount, description));
  });

  app.get("/budget/transactions/:accountId", (req, res) => {
    res.json({ list: service.Budget_getTransactions(req.params.accountId) });
  });

  app.post("/budget/link/grant", (req, res) => {
    const { accountId, grantId } = req.body;
    res.json(service.Budget_linkGrant(accountId, grantId));
  });

  app.get("/budget/reports", (req, res) => {
    res.json({ list: service.Budget_getReports() });
  });

  app.get("/budget/audit", (req, res) => {
    res.json({ list: service.Budget_getAuditLogs() });
  });

  app.post("/budget/archive", (req, res) => {
    const { accountId } = req.body;
    res.json(service.Budget_archiveAccount(accountId));
  });
}
