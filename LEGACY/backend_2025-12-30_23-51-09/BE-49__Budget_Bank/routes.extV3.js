// backend/BE-49/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerBudgetRoutesV3(app) {

  app.get("/budget/v3/history", (req, res) => {
    res.json({ list: service.Budget_getHistory() });
  });

  app.post("/budget/v3/link/dao", (req, res) => {
    const { budgetId, proposalId } = req.body;
    res.json(service.Budget_linkDAO(budgetId, proposalId));
  });

  app.get("/budget/v3/alerts/:budgetId", (req, res) => {
    res.json({ list: service.Budget_getAlerts(req.params.budgetId) });
  });

  app.get("/budget/v3/reports", (req, res) => {
    res.json({ list: service.Budget_getReports_v3() });
  });
}
