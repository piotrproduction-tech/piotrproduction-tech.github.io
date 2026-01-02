// backend/BE-47/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerGrantsRoutesV4(app) {

  app.get("/grants/v4/trends", (req, res) => {
    res.json({ list: service.Grants47_getTrends() });
  });

  app.post("/grants/v4/notify", (req, res) => {
    const { appId, applicant } = req.body;
    res.json(service.Grants47_autoNotifyNewApplication(appId, applicant));
  });

  app.post("/grants/v4/link/budget", (req, res) => {
    const { appId, transactionId } = req.body;
    res.json(service.Grants47_linkBudgetBank(appId, transactionId));
  });

  app.post("/grants/v4/link/innovation", (req, res) => {
    const { appId, hubId } = req.body;
    res.json(service.Grants47_linkInnovationHub(appId, hubId));
  });

  app.get("/grants/v4/reports", (req, res) => {
    res.json({ list: service.Grants47_getReports() });
  });
}
