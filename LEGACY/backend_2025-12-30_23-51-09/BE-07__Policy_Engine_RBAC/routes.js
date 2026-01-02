// backend/BE-07/routes.js

import * as service from "./service.js";

export function registerProfileRoutes(app) {

  app.get("/profile/media/:userId", (req, res) => {
    res.json(service.Profile_getMedia(req.params.userId));
  });

  app.get("/profile/purchases/:userId", (req, res) => {
    res.json(service.Profile_getPurchases(req.params.userId));
  });

  app.get("/profile/reminders/:userId", (req, res) => {
    res.json(service.Profile_getReminders(req.params.userId));
  });

  app.get("/profile/vr/:userId", (req, res) => {
    res.json(service.Profile_getVRAssets(req.params.userId));
  });
}
