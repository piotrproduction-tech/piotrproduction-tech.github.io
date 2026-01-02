// backend/BE-13/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerConfigRoutesV4(app) {

  // Snapshots
  app.post("/config/v4/snapshot", (req, res) => {
    res.json(service.Config_snapshot());
  });

  // Dashboard
  app.get("/config/v4/dashboard", (req, res) => {
    res.json(service.Config_dashboardData());
  });

  // Rollout trends
  app.get("/config/v4/rollout/trends/:days", (req, res) => {
    res.json({ list: service.Config_rolloutTrendReport(Number(req.params.days)) });
  });

  // ID usage trends
  app.get("/config/v4/id/trends", (req, res) => {
    res.json({ list: service.Config_getIDUsageTrends() });
  });

  // Audit & alerts integration
  app.post("/config/v4/flag/set-with-audit", (req, res) => {
    const { key, value, actor, env, rollout, reason } = req.body;
    res.json(
      service.Config_setFlagWithAudit(key, value, actor, env, rollout, reason)
    );
  });

  app.post("/config/v4/flag/notify-change", (req, res) => {
    const { flagName, newValue } = req.body;
    res.json(service.Config_autoNotifyFlagChange(flagName, newValue));
  });

  app.post("/config/v4/flag/link-audit", (req, res) => {
    const { flagName, auditId } = req.body;
    res.json(service.Config_linkAudit(flagName, auditId));
  });

  // Reports & export
  app.get("/config/v4/reports", (req, res) => {
    res.json({ list: service.Config_getReports() });
  });

  app.get("/config/v4/export/pdf", (req, res) => {
    const { title } = req.query;
    res.json(service.Config_exportFullPDFPlaceholder(title));
  });
}
