import * as service from "./service.js";

export function registerWellnessV2Routes(app) {
  // Statystyki wellness użytkownika
  app.get("/wellness/v2/user/:userId", (req, res) => {
    const { userId } = req.params;
    res.json(service.BE26_getUserWellness(userId));
  });

  // Aktualizacja punktów wellness
  app.post("/wellness/v2/user/points", (req, res) => {
    const { userId, points } = req.body;
    res.json(service.BE26_updateWellnessPoints(userId, points));
  });

  // Lista aktywności grupowych
  app.get("/wellness/v2/group/activities", (req, res) => {
    res.json({ list: service.BE26_getGroupActivities() });
  });

  // Dołączanie do aktywności
  app.post("/wellness/v2/group/join", (req, res) => {
    const { userId, activityId } = req.body;
    res.json(service.BE26_joinActivity(userId, activityId));
  });

  // Statystyki pojedynczej aktywności
  app.get("/wellness/v2/group/stats/:activityId", (req, res) => {
    res.json(service.BE26_getGroupStats(req.params.activityId));
  });

  // Placeholder AI
  app.get("/wellness/v2/ai/:userId", (req, res) => {
    res.json(service.BE26_getAiRecommendations(req.params.userId));
  });

  // Placeholder VR
  app.get("/wellness/v2/vr/:userId", (req, res) => {
    res.json(service.BE26_getVrPreview(req.params.userId));
  });
}
