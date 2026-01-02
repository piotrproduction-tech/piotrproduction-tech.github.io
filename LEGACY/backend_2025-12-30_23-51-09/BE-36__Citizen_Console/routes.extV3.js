// backend/BE-36/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerCitizenRoutesV3(app) {

  app.get("/citizen/v3/reputation/:userId", (req, res) => {
    res.json({ list: service.Citizen_getReputationHistory(req.params.userId) });
  });

  app.post("/citizen/v3/link/volunteer", (req, res) => {
    const { userId, offerId } = req.body;
    res.json(service.Citizen_linkVolunteer(userId, offerId));
  });

  app.post("/citizen/v3/notify", (req, res) => {
    const { userId, activity } = req.body;
    res.json(service.Citizen_notifyActivity(userId, activity));
  });

  app.get("/citizen/v3/badges/:userId", (req, res) => {
    res.json({ list: service.Citizen_getBadges(req.params.userId) });
  });
}
