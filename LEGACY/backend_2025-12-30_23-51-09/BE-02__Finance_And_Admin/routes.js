// backend/BE-02/routes.js

import * as service from "./service.js";

export function registerFinanceAdminRoutes(app) {

  // ===== Budget Bank =====

  app.get("/finance/budget/transactions", (req, res) => {
    res.json({ list: service.BudgetBank_getTransactions() });
  });

  app.post("/finance/budget/transactions/add", (req, res) => {
    const { amount, type, actor } = req.body;
    res.json(service.BudgetBank_addTransaction(amount, type, actor));
  });

  app.get("/finance/budget/balance", (req, res) => {
    res.json({ balance: service.BudgetBank_calculateBalance() });
  });

  // ===== Treasure Vault =====

  app.get("/finance/treasure/rewards", (req, res) => {
    res.json({ list: service.TreasureVault_getRewards() });
  });

  app.post("/finance/treasure/rewards/add", (req, res) => {
    const { title, value, actor } = req.body;
    res.json(service.TreasureVault_addReward(title, value, actor));
  });

  // ===== Admin Tower =====

  app.get("/finance/admin/roles", (req, res) => {
    res.json({ list: service.AdminTower_getRoles() });
  });

  app.post("/finance/admin/roles/assign", (req, res) => {
    const { user, role, actor } = req.body;
    res.json(service.AdminTower_assignRole(user, role, actor));
  });

  // ===== Grants Office =====

  app.get("/finance/grants", (req, res) => {
    res.json({ list: service.GrantsOffice_getGrants() });
  });

  app.post("/finance/grants/update", (req, res) => {
    const { applicant, status, actor } = req.body;
    res.json(service.GrantsOffice_updateStatus(applicant, status, actor));
  });
}
