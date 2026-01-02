// backend/BE-23/routes.analytics.js

import * as service from "./service.analytics.js";

export function registerCultureGalleryAnalyticsRoutes(app) {

  app.get("/culture/analytics/trends", (req, res) => {
    res.json({ list: service.Culture_getEventTrends() });
  });

  app.post("/culture/analytics/notify", (req, res) => {
    const { eventId, title } = req.body;
    res.json(service.Culture_autoNotifyNewEvent(eventId, title));
  });

  app.get("/culture/analytics/reports", (req, res) => {
    res.json({ list: service.Culture_getReports() });
  });
}
