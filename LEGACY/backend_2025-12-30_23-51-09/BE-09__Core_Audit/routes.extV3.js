// backend/BE-09/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerAuditRoutesV3(app) {

  app.post("/audit/v3/filter", (req, res) => {
    res.json({ list: service.Audit_filter(req.body || {}) });
  });

  app.get("/audit/v3/group/:field", (req, res) => {
    res.json(service.Audit_groupBy(req.params.field));
  });

  app.post("/audit/v3/export/csv", (req, res) => {
    res.json(service.Audit_exportCSV(req.body || {}));
  });

  app.get("/audit/v3/report/daily/:dateISO", (req, res) => {
    res.json(service.Audit_dailyReport(req.params.dateISO));
  });

  app.get("/audit/v3/report/weekly/:startISO", (req, res) => {
    res.json(service.Audit_weeklyReport(req.params.startISO));
  });
}
