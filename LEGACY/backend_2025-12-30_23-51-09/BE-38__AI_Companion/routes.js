import * as service from "./service.js";

export function registerAIRoutes(app) {

  // Sesje
  app.post("/ai/session/add", (req, res) => {
    const { userId, topic, ts } = req.body;
    res.json(service.AI_addSession(userId, topic, ts));
  });

  app.get("/ai/sessions", (req, res) => {
    res.json({ list: service.AI_getSessions() });
  });

  // Interakcje
  app.post("/ai/interaction/add", (req, res) => {
    const { userId, sessionId, message } = req.body;
    res.json(service.AI_addInteraction(userId, sessionId, message));
  });

  app.get("/ai/interactions/:sessionId", (req, res) => {
    res.json({ list: service.AI_getInteractions(req.params.sessionId) });
  });

  // Knowledge Hub
  app.post("/ai/link/knowledge", (req, res) => {
    const { sessionId, resourceId } = req.body;
    res.json(service.AI_linkKnowledge(sessionId, resourceId));
  });

  // Raporty
  app.get("/ai/reports", (req, res) => {
    res.json({ list: service.AI_getReports() });
  });
}
