// backend/BE-43/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerWellnessRoutesV4(app) {

  app.get("/wellness/v4/trends", (req, res) => {
    res.json({ list: service.Wellness43_getActivityTrends() });
  });

  app.post("/wellness/v4/notify", (req, res) => {
    const { eventId, title } = req.body;
    res.json(service.Wellness43_autoNotifyEvent(eventId, title));
  });

  app.post("/wellness/v4/link/sports", (req, res) => {
    const { eventId, sportsId } = req.body;
    res.json(service.Wellness43_linkSportsArena(eventId, sportsId));
  });

  app.get("/wellness/v4/reports", (req, res) => {
    res.json({ list: service.Wellness43_getReports() });
  });
}
// AI: analiza nastroju
app.post("/wellness/v4/ai/mood", (req, res) => {
  const { message } = req.body;
  res.json(serviceV4.WG_requestAIMoodAnalysis(message));
});

// AI: rekomendacje wellness
app.get("/wellness/v4/ai/recommend/:userId", (req, res) => {
  res.json(serviceV4.WG_requestAIRecommendations(req.params.userId));
});
