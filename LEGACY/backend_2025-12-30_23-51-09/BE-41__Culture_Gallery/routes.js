// backend/BE-41/routes.js

import * as service from "./service.js";

export function registerCultureRoutes(app) {

  // Wydarzenia
  app.post("/culture/event/add", (req, res) => {
    const { userId, title, description, ts } = req.body;
    res.json(service.Culture_addEvent(userId, title, description, ts));
  });

  app.get("/culture/events", (req, res) => {
    res.json({ list: service.Culture_getEvents() });
  });

  // Artyści
  app.post("/culture/artist/add", (req, res) => {
    const { name, specialty } = req.body;
    res.json(service.Culture_addArtist(name, specialty));
  });

  app.get("/culture/artists", (req, res) => {
    res.json({ list: service.Culture_getArtists() });
  });

  // Integracja z Festival Hub
  app.post("/culture/link/festival", (req, res) => {
    const { eventId, festivalId } = req.body;
    res.json(service.Culture_linkFestival(eventId, festivalId));
  });

  // Raporty
  app.get("/culture/reports", (req, res) => {
    res.json({ list: service.Culture_getReports() });
  });
}
