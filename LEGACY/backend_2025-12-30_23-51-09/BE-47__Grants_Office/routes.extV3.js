// backend/BE-47/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerGrantsRoutesV3(app) {

  app.get("/grants/v3/history", (req, res) => {
    res.json({ list: service.Grants_getGrantHistory() });
  });

  app.post("/grants/v3/link/budget", (req, res) => {
    const { applicationId, budgetId } = req.body;
    res.json(service.Grants_linkBudget(applicationId, budgetId));
  });

  app.post("/grants/v3/rating/add", (req, res) => {
    const { applicationId, userId, rating } = req.body;
    res.json(service.Grants_addProjectRating(applicationId, userId, rating));
  });

  app.get("/grants/v3/ratings/:applicationId", (req, res) => {
    res.json({ list: service.Grants_getProjectRatings(req.params.applicationId) });
  });

  app.get("/grants/v3/reports", (req, res) => {
    res.json({ list: service.Grants_getReports_v3() });
  });
}
