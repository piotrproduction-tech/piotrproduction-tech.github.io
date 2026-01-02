import * as serviceV4 from "./service.extV4.js";

export function registerProfileRoutesV4(app) {

  app.get("/profile/v4/trends", (req, res) => {
    res.json({ list: serviceV4.Profile_getActivityTrends() });
  });

  app.post("/profile/v4/notify/reminder", (req, res) => {
    const { reminderId, title } = req.body;
    res.json(serviceV4.Profile_autoNotifyReminder(reminderId, title));
  });

  app.post("/profile/v4/link/mediafeed", (req, res) => {
    const { userId, feedId } = req.body;
    res.json(serviceV4.Profile_linkMediaFeed(userId, feedId));
  });

  app.get("/profile/v4/reports/:userId", (req, res) => {
    res.json(serviceV4.Profile_getReportsV4(req.params.userId));
  });
}
