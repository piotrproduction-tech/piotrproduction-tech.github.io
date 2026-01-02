// backend/BE-07/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerProfileRoutesV3(app) {

  // AI Reports
  app.get("/profile/v3/ai/:userId", (req, res) => {
    res.json(service.Profile_generateAIReport(req.params.userId));
  });

  // Edit user data
  app.post("/profile/v3/edit", (req, res) => {
    const { userId, data } = req.body;
    res.json(service.Profile_editUserData(userId, data));
  });

  // Privacy
  app.post("/profile/v3/privacy", (req, res) => {
    const { userId, settings } = req.body;
    res.json(service.Profile_privacySettings(userId, settings));
  });

  // Activity history
  app.get("/profile/v3/activity/:userId", (req, res) => {
    res.json(service.Profile_activityHistory(req.params.userId));
  });

  // Calendar
  app.get("/profile/v3/calendar/:userId", (req, res) => {
    res.json(service.Profile_calendarIntegration(req.params.userId));
  });
}
