import * as serviceV4 from "./service.extV4.js";

export function registerSportsArenaRoutesV4(app) {

  app.get("/sports/v4/trends", (req, res) => {
    res.json({ list: serviceV4.Sports42_getActivityTrends() });
  });

  app.post("/sports/v4/notify", (req, res) => {
    const { eventId, title } = req.body;
    res.json(serviceV4.Sports42_autoNotifyEvent(eventId, title));
  });

  app.post("/sports/v4/link/wellness", (req, res) => {
    const { eventId, wellnessId } = req.body;
    res.json(serviceV4.Sports42_linkWellness(eventId, wellnessId));
  });

  app.get("/sports/v4/reports", (req, res) => {
    res.json({ list: serviceV4.Sports42_getReports() });
  });
}
// AI: analiza wydajności
app.post("/sports/v4/ai/performance", (req, res) => {
  const { data } = req.body;
  res.json(serviceV4.SP_requestAIPerformanceAnalysis(data));
});

// AI: rekomendacje sportowe
app.get("/sports/v4/ai/recommend/:userId", (req, res) => {
  res.json(serviceV4.SP_requestAIRecommendations(req.params.userId));
});
