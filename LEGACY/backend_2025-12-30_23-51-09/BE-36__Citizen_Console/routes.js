// backend/BE-36/routes.js

import * as service from "./service.js";

export function registerCitizenRoutes(app) {

  app.get("/citizen/profile/:userId", (req, res) => {
    res.json(service.Citizen_getProfile(req.params.userId));
  });

  app.post("/citizen/profile/update", (req, res) => {
    const { userId, field, value } = req.body;
    res.json(service.Citizen_updateProfile(userId, field, value));
  });

  app.get("/citizen/activities/:userId", (req, res) => {
    res.json({ list: service.Citizen_getActivities(req.params.userId) });
  });

  app.post("/citizen/link/profile", (req, res) => {
    const { userId, profileId } = req.body;
    res.json(service.Citizen_linkProfile(userId, profileId));
  });

  app.get("/citizen/reports/:userId", (req, res) => {
    res.json({ list: service.Citizen_getReports(req.params.userId) });
  });
}
