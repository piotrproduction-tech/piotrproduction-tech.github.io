// backend/BE-02/routes.extD.js

import * as extD from "./service.extD.js";

export function registerFinanceAdminRoutesExtD(app) {

  // ===== Dashboard =====
  app.get("/finance/budget/dashboard", (req, res) => {
    res.json({ list: extD.BudgetBank_dashboardData() });
  });

  // ===== Audyt z polityką =====
  app.post("/finance/budget/audit-policy", (req, res) => {
    const { txId, role, action } = req.body;
    res.json(extD.BudgetBank_auditWithPolicy(txId, role, action));
  });

  // ===== Trendy =====
  app.get("/finance/budget/trends/:days", (req, res) => {
    const days = Number(req.params.days);
    res.json({ list: extD.BudgetBank_trendReport(days) });
  });

  // ===== Eksport PDF =====
  app.post("/finance/budget/export/pdf", (req, res) => {
    const { title } = req.body;
    const content = extD.BudgetBank_exportPDFPlaceholder(title);
    res.header("Content-Type", "text/plain");
    res.send(content);
  });
}
