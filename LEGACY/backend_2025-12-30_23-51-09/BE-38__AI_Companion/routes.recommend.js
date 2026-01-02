import * as recommend from "./service.recommend.js";

export function registerAIRecommendRoutes(app) {

  app.get("/ai/recommend/user/:userId", (req, res) => {
    res.json(recommend.AI_recommendForUser(req.params.userId));
  });

  app.get("/ai/recommend/session/:sessionId", (req, res) => {
    res.json(recommend.AI_recommendForSession(req.params.sessionId));
  });
}
