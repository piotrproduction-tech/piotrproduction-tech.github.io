// backend/BE-50/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerAdminRoutesV4(app) {

  app.get("/admin/v4/trends", (req, res) => {
    res.json({ list: service.Admin50_getApprovalTrends() });
  });

  app.post("/admin/v4/notify/pending", (req, res) => {
    const { approvalId, title } = req.body;
    res.json(service.Admin50_autoNotifyPending(approvalId, title));
  });

  app.post("/admin/v4/link/budget", (req, res) => {
    const { expenseId, approvalId } = req.body;
    res.json(service.Admin50_linkBudgetApproval(expenseId, approvalId));
  });

  app.get("/admin/v4/reports", (req, res) => {
    res.json({ list: service.Admin50_getReports() });
  });
}
