import * as service from "./service.extV4.js";

export function registerFestivalRoutesV4(app) {

  app.get("/festival/v4/trends", (req, res) => {
    res.json({ list: service.Festival52_getEventTrends() });
  });

  app.post("/festival/v4/notify/new", (req, res) => {
    const { eventId, title } = req.body;
    res.json(service.Festival52_autoNotifyNewEvent(eventId, title));
  });

  app.post("/festival/v4/link/media", (req, res) => {
    const { eventId, mediaId } = req.body;
    res.json(service.Festival52_linkMedia(eventId, mediaId));
  });

  app.post("/festival/v4/link/culture", (req, res) => {
    const { eventId, cultureId } = req.body;
    res.json(service.Festival52_linkCulture(eventId, cultureId));
  });

  app.get("/festival/v4/reports", (req, res) => {
    res.json({ list: service.Festival52_getReports() });
  });
}
