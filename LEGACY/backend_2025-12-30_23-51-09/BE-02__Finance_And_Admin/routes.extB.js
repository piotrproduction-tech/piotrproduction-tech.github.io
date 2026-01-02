// backend/BE-02/routes.extB.js

import * as extB from "./service.extB.js";

export function registerFinanceAdminRoutesExtB(app) {

  // ===== Walidacja + bezpieczne transakcje =====
  app.post("/finance/budget/validate", (req, res) => {
    res.json(extB.BudgetBank_validateTransaction(req.body || {}));
  });

  app.post("/finance/budget/transactions/add/safe", (req, res) => {
    const { amount, type, actor } = req.body;
    res.json(extB.BudgetBank_addTransaction_safe(amount, type, actor));
  });

  // ===== Grants Office — workflow =====
  app.post("/finance/grants/workflow/set", (req, res) => {
    const { grantId, status, reviewer, note, actor } = req.body;
    res.json(extB.GrantsOffice_setWorkflow(grantId, status, reviewer, note, actor));
  });

  app.get("/finance/grants/workflow", (req, res) => {
    res.json({ list: extB.GrantsOffice_getAllWorkflow() });
  });

  // ===== Admin Tower — bulk assign =====
  app.post("/finance/admin/roles/bulk", (req, res) => {
    const { assignments, actor } = req.body;
    res.json(extB.AdminTower_bulkAssign(assignments, actor));
  });

  // ===== Admin Tower — expiry =====
  app.post("/finance/admin/roles/expiry", (req, res) => {
    const { user, expiryISO, actor } = req.body;
    res.json(extB.AdminTower_setRoleExpiry(user, expiryISO, actor));
  });

  app.get("/finance/admin/roles/all", (req, res) => {
    res.json({ list: extB.AdminTower_getAllRoles() });
  });
}
