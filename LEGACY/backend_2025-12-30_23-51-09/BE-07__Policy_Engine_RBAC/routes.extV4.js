// backend/BE-07/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerProfileRoutesV4(app) {

  // Dashboard
  app.get("/profile/v4/dashboard/:userId", (req, res) => {
    res.json(service.Profile_dashboard(req.params.userId));
  });

  // Trends
  app.get("/profile/v4/trends/:days", (req, res) => {
    res.json({ list: service.Profile_activityTrends(Number(req.params.days)) });
  });

  // Export
  app.get("/profile/v4/export/pdf/:userId", (req, res) => {
    res.json(service.Profile_exportPDFPlaceholder(req.params.userId));
  });
}
