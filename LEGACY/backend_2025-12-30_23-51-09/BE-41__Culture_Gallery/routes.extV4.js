// backend/BE-41/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerCultureRoutesV4(app) {

  app.get("/culture/v4/trends", (req, res) => {
    res.json({ list: service.Culture41_getEventTrends() });
  });

  app.post("/culture/v4/notify", (req, res) => {
    const { eventId, title } = req.body;
    res.json(service.Culture41_autoNotifyNewEvent(eventId, title));
  });

  app.post("/culture/v4/link/community", (req, res) => {
    const { eventId, initiativeId } = req.body;
    res.json(service.Culture41_linkCommunity(eventId, initiativeId));
  });

  app.post("/culture/v4/link/media", (req, res) => {
    const { eventId, contentId } = req.body;
    res.json(service.Culture41_linkMedia(eventId, contentId));
  });

  app.get("/culture/v4/reports", (req, res) => {
    res.json({ list: service.Culture41_getReports() });
  });
}
