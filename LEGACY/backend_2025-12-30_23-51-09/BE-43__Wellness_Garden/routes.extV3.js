// backend/BE-43/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerWellnessRoutesV3(app) {

  app.get("/wellness/v3/history", (req, res) => {
    res.json({ list: service.Wellness_getSessionHistory() });
  });

  app.post("/wellness/v3/link/volunteer", (req, res) => {
    const { sessionId, offerId } = req.body;
    res.json(service.Wellness_linkVolunteer(sessionId, offerId));
  });

  app.post("/wellness/v3/rating/add", (req, res) => {
    const { sessionId, userId, rating } = req.body;
    res.json(service.Wellness_addRating(sessionId, userId, rating));
  });

  app.get("/wellness/v3/ratings/:sessionId", (req, res) => {
    res.json({ list: service.Wellness_getRatings(req.params.sessionId) });
  });

  app.get("/wellness/v3/reports", (req, res) => {
    res.json({ list: service.Wellness_getReports_v3() });
  });
}
