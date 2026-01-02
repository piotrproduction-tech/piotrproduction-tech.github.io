import * as serviceV3 from "./service.extV3.js";

export function registerSportsArenaRoutesV3(app) {

  app.get("/sports/v3/trends", (req, res) => {
    res.json({ list: serviceV3.Sports_getActivityTrends_v3() });
  });

  app.post("/sports/v3/notify", (req, res) => {
    const { eventId, title } = req.body;
    res.json(serviceV3.Sports_autoNotifyEvent_v3(eventId, title));
  });

  app.post("/sports/v3/link/wellness", (req, res) => {
    const { eventId, wellnessId } = req.body;
    res.json(serviceV3.Sports_linkWellness_v3(eventId, wellnessId));
  });

  app.get("/sports/v3/reports", (req, res) => {
    res.json({ list: serviceV3.Sports_getReports_v3() });
  });
}
