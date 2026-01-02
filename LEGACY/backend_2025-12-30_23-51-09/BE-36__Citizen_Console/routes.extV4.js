// backend/BE-36/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerCitizenRoutesV4(app) {

  app.get("/citizen/v4/trends", (req, res) => {
    res.json({ list: service.Citizen36_getActivityTrends() });
  });

  app.post("/citizen/v4/notify", (req, res) => {
    const { feedbackId, title } = req.body;
    res.json(service.Citizen36_autoNotifyNewFeedback(feedbackId, title));
  });

  app.post("/citizen/v4/link/governance", (req, res) => {
    const { feedbackId, govId } = req.body;
    res.json(service.Citizen36_linkGovernance(feedbackId, govId));
  });

  app.get("/citizen/v4/reports", (req, res) => {
    res.json({ list: service.Citizen36_getReports() });
  });
}
