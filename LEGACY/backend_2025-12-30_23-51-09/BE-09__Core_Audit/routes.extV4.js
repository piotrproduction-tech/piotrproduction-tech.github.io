// backend/BE-09/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerAuditRoutesV4(app) {

  app.get("/audit/v4/trends/:days", (req, res) => {
    res.json({ list: service.Audit_trendReport(Number(req.params.days)) });
  });

  app.get("/audit/v4/dashboard", (req, res) => {
    res.json(service.Audit_dashboardData());
  });

  app.get("/audit/v4/export/pdf", (req, res) => {
    const { title } = req.query;
    res.json(service.Audit_exportPDFPlaceholder(title));
  });
}
