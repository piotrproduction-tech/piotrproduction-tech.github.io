// backend/BE-09/routes.js

import * as service from "./service.js";

export function registerAuditRoutes(app) {

  app.post("/audit/log", (req, res) => {
    const { action, actor } = req.body;
    res.json(service.Audit_logAction(action, actor));
  });

  app.get("/audit/logs", (req, res) => {
    res.json({ list: service.Audit_getLogs() });
  });

  app.get("/audit/filter/actor/:actor", (req, res) => {
    res.json({ list: service.Audit_filterByActor(req.params.actor) });
  });

  app.get("/audit/filter/action/:action", (req, res) => {
    res.json({ list: service.Audit_filterByAction(req.params.action) });
  });

  app.post("/audit/clear", (req, res) => {
    const { actor } = req.body;
    res.json(service.Audit_clearLogs(actor));
  });
}
