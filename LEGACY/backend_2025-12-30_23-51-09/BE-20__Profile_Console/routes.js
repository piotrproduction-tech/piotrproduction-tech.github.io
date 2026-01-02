import * as service from "./service.js";

export function registerProfileRoutes(app) {

  app.post("/profile/create", (req, res) => {
    const { userId, name, email } = req.body;
    res.json(service.Profile_create(userId, name, email));
  });

  app.get("/profile/:userId", (req, res) => {
    res.json(service.Profile_get(req.params.userId));
  });

  app.post("/profile/update", (req, res) => {
    const { userId, field, value } = req.body;
    res.json(service.Profile_updateUser(userId, field, value));
  });

  app.post("/profile/activity/add", (req, res) => {
    const { userId, activity } = req.body;
    res.json(service.Profile_addActivity(userId, activity));
  });

  app.get("/profile/activities/:userId", (req, res) => {
    res.json({ list: service.Profile_getActivities(req.params.userId) });
  });

  app.post("/profile/purchase/add", (req, res) => {
    const { userId, item, data } = req.body;
    res.json(service.Profile_addPurchase(userId, item, data));
  });

  app.get("/profile/purchases/:userId", (req, res) => {
    res.json({ list: service.Profile_getPurchases(req.params.userId) });
  });

  app.post("/profile/reminder/add", (req, res) => {
    const { userId, text, ts } = req.body;
    res.json(service.Profile_addReminder(userId, text, ts));
  });

  app.get("/profile/reminders/:userId", (req, res) => {
    res.json({ list: service.Profile_getReminders(req.params.userId) });
  });

  app.post("/profile/link/media", (req, res) => {
    const { userId, platform, handle } = req.body;
    res.json(service.Profile_linkMedia(userId, platform, handle));
  });

  app.get("/profile/media/:userId", (req, res) => {
    res.json({ list: service.Profile_getMediaLinks(req.params.userId) });
  });

  app.post("/profile/link/module", (req, res) => {
    const { userId, moduleId } = req.body;
    res.json(service.Profile_linkModule(userId, moduleId));
  });

  app.post("/profile/session/vr", (req, res) => {
    const { userId, context } = req.body;
    res.json(service.Profile_startVRSession(userId, context));
  });

  app.post("/profile/session/ai", (req, res) => {
    const { userId, context } = req.body;
    res.json(service.Profile_startAISession(userId, context));
  });
}
