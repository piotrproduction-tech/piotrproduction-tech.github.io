// backend/BE-37/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerVRRoutesV3(app) {

  app.get("/vr/v3/ranking", (req, res) => {
    res.json({ list: service.VR_getSessionRanking() });
  });

  app.post("/vr/v3/link/culture", (req, res) => {
    const { sessionId, galleryId } = req.body;
    res.json(service.VR_linkCultureGallery(sessionId, galleryId));
  });

  app.post("/vr/v3/notify", (req, res) => {
    res.json(service.VR_notifyNewEvent(req.body));
  });

  app.get("/vr/v3/history/:userId", (req, res) => {
    res.json({ list: service.VR_getParticipationHistory(req.params.userId) });
  });
}
