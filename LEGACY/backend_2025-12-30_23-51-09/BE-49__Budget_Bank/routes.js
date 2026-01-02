// backend/BE-49/routes.js

import * as service from "./service.js";

export function registerBudgetRoutes(app) {

  // Budżety
  app.post("/budget/add", (req, res) => {
    const { title, description, amount } = req.body;
    res.json(service.Budget_addBudget(title, description, amount));
  });

  app.get("/budget/list", (req, res) => {
    res.json({ list: service.Budget_getBudgets() });
  });

  // Transakcje
  app.post("/budget/transaction/add", (req, res) => {
    const { budgetId, userId, amount, type } = req.body;
    res.json(service.Budget_addTransaction(budgetId, userId, amount, type));
  });

  app.get("/budget/transactions/:budgetId", (req, res) => {
    res.json({ list: service.Budget_getTransactions(req.params.budgetId) });
  });

  // Raporty
  app.get("/budget/reports", (req, res) => {
    res.json({ list: service.Budget_getReports() });
  });
}
