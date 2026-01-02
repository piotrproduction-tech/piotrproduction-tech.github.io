import * as serviceV4 from "./service.extV4.js";

export function registerTreasureVaultRoutesV4(app) {

  app.get("/treasure/v4/trends", (req, res) => {
    res.json({ list: serviceV4.Vault25_getResourceTrends() });
  });

  app.post("/treasure/v4/notify/large", (req, res) => {
    const { transactionId, amount } = req.body;
    res.json(serviceV4.Vault25_autoNotifyLargeTransaction(transactionId, amount));
  });

  app.post("/treasure/v4/link/budget", (req, res) => {
    const { transactionId, bankId } = req.body;
    res.json(serviceV4.Vault25_linkBudgetBank(transactionId, bankId));
  });

  app.get("/treasure/v4/reports", (req, res) => {
    res.json({ list: serviceV4.Vault25_getReports() });
  });
}
