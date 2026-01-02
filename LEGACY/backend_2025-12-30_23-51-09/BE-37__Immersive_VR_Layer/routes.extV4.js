// backend/BE-37/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerVRRoutesV4(app) {

  app.get("/vr/v4/trends", (req, res) => {
    res.json({ list: service.VR37_getSessionTrends() });
  });

  app.post("/vr/v4/notify", (req, res) => {
    const { sessionId, title } = req.body;
    res.json(service.VR37_autoNotifyNewSession(sessionId, title));
  });

  app.post("/vr/v4/link/ai", (req, res) => {
    const { sessionId, companionId } = req.body;
    res.json(service.VR37_linkAICompanion(sessionId, companionId));
  });

  app.get("/vr/v4/reports", (req, res) => {
    res.json({ list: service.VR37_getReports() });
  });
}
