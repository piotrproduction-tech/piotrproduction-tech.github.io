import * as service from "./service.js";

export function registerWellnessRoutes(app) {

  // Sesje
  app.post("/wellness/session/add", (req, res) => {
    const { userId, title, description, ts } = req.body;
    res.json(service.Wellness_addSession(userId, title, description, ts));
  });

  app.get("/wellness/sessions", (req, res) => {
    res.json({ list: service.Wellness_getSessions() });
  });

  // Uczestnicy
  app.post("/wellness/participant/register", (req, res) => {
    const { userId, sessionId } = req.body;
    res.json(service.Wellness_registerParticipant(userId, sessionId));
  });

  app.get("/wellness/participants/:sessionId", (req, res) => {
    res.json({ list: service.Wellness_getParticipants(req.params.sessionId) });
  });

  // Raporty
  app.get("/wellness/reports", (req, res) => {
    res.json({ list: service.Wellness_getReports() });
  });

  // ===== DODANE Z BE‑10 =====

  app.get("/wellness/user/:userId", (req, res) => {
    res.json(service.Wellness_getUserStats(req.params.userId));
  });

  app.post("/wellness/user/points", (req, res) => {
    const { userId, points } = req.body;
    res.json(service.Wellness_updatePoints(userId, points));
  });

  app.get("/wellness/group/activities", (req, res) => {
    res.json({ list: service.Wellness_getGroupActivities() });
  });

  app.post("/wellness/group/join", (req, res) => {
    const { userId, activityId } = req.body;
    res.json(service.Wellness_joinActivity(userId, activityId));
  });

  app.get("/wellness/group/stats/:activityId", (req, res) => {
    res.json(service.Wellness_getGroupStats(req.params.activityId));
  });

  app.get("/wellness/ai/:userId", (req, res) => {
    res.json(service.Wellness_getAiRecommendations(req.params.userId));
  });

  app.get("/wellness/vr/:userId", (req, res) => {
    res.json(service.Wellness_getVrPreview(req.params.userId));
  });
}
