import * as analytics from "./service.analytics.js";
import * as service from "./service.js";

export function registerAIAnalyticsRoutes(app) {

  app.post("/ai/analytics/sentiment", (req, res) => {
    const { message } = req.body;
    res.json(analytics.AI_analyzeSentiment(message));
  });

  app.get("/ai/analytics/session/:sessionId", (req, res) => {
    const interactions = service.AI_getInteractions(req.params.sessionId);
    res.json(analytics.AI_getSessionStats(req.params.sessionId, interactions));
  });

  app.get("/ai/analytics/user/:userId", (req, res) => {
    const all = service.AI_getInteractions();
    res.json(analytics.AI_getUserStats(req.params.userId, all));
  });

  app.get("/ai/analytics/heatmap", (req, res) => {
    const all = service.AI_getInteractions();
    res.json({ list: analytics.AI_getActivityHeatmap(all) });
  });
}
