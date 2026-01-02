// backend/BE-50/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerAdminRoutesV3(app) {

  app.get("/admin/v3/history", (req, res) => {
    res.json({ list: service.Admin_getActionHistory() });
  });

  app.post("/admin/v3/link/governance", (req, res) => {
    const { userId, dashboardId } = req.body;
    res.json(service.Admin_linkGovernance(userId, dashboardId));
  });

  app.get("/admin/v3/audit", (req, res) => {
    res.json({ list: service.Admin_getAuditReports() });
  });

  app.get("/admin/v3/reports", (req, res) => {
    res.json({ list: service.Admin_getReports_v3() });
  });
}
