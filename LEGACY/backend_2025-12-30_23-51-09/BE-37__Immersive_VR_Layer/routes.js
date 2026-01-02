// backend/BE-37/routes.js

import * as service from "./service.js";

export function registerVRRoutes(app) {

  // Sesje VR
  app.post("/vr/session/add", (req, res) => {
    const { userId, title, description, ts } = req.body;
    res.json(service.VR_addSession(userId, title, description, ts));
  });

  app.get("/vr/sessions", (req, res) => {
    res.json({ list: service.VR_getSessions() });
  });

  // Uczestnicy
  app.post("/vr/participant/register", (req, res) => {
    const { userId, sessionId } = req.body;
    res.json(service.VR_registerParticipant(userId, sessionId));
  });

  app.get("/vr/participants/:sessionId", (req, res) => {
    res.json({ list: service.VR_getParticipants(req.params.sessionId) });
  });

  // Integracja z Culture Gallery
  app.post("/vr/link/culture", (req, res) => {
    const { sessionId, galleryId } = req.body;
    res.json(service.VR_linkCulture(sessionId, galleryId));
  });

  // Raporty
  app.get("/vr/reports", (req, res) => {
    res.json({ list: service.VR_getReports() });
  });
}
