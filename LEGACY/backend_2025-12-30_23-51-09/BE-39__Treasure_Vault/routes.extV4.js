// backend/BE-39/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerVaultRoutesV4(app) {

  app.get("/vault/v4/trends", (req, res) => {
    res.json({ list: service.Vault39_getResourceTrends() });
  });

  app.post("/vault/v4/notify/large", (req, res) => {
    const { transactionId, amount } = req.body;
    res.json(service.Vault39_autoNotifyLargeTransaction(transactionId, amount));
  });

  app.post("/vault/v4/link/budget", (req, res) => {
    const { transactionId, bankId } = req.body;
    res.json(service.Vault39_linkBudgetBank(transactionId, bankId));
  });

  app.post("/vault/v4/link/admin", (req, res) => {
    const { transactionId, approvalId } = req.body;
    res.json(service.Vault39_linkAdminApproval(transactionId, approvalId));
  });

  app.get("/vault/v4/reports", (req, res) => {
    res.json({ list: service.Vault39_getReports() });
  });
}
