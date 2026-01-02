// backend/BE-47/routes.js

import * as service from "./service.js";

export function registerGrantsRoutes(app) {

  // Wnioski
  app.post("/grants/application/add", (req, res) => {
    const { userId, title, description, amount } = req.body;
    res.json(service.Grants_addApplication(userId, title, description, amount));
  });

  app.get("/grants/applications", (req, res) => {
    res.json({ list: service.Grants_getApplications() });
  });

  // Oceny
  app.post("/grants/review/add", (req, res) => {
    const { applicationId, reviewerId, decision } = req.body;
    res.json(service.Grants_reviewApplication(applicationId, reviewerId, decision));
  });

  app.get("/grants/reviews/:applicationId", (req, res) => {
    res.json({ list: service.Grants_getReviews(req.params.applicationId) });
  });

  // Raporty
  app.get("/grants/reports", (req, res) => {
    res.json({ list: service.Grants_getReports() });
  });
}
