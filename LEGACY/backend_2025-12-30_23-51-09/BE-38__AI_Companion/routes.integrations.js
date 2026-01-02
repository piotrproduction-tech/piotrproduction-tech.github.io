import * as integ from "./service.integrations.js";

export function registerAIIntegrationRoutes(app) {

  // ======================================================
  //  Innovation Hub (BE‑24)
  // ======================================================
  app.post("/ai/integration/innovation", (req, res) => {
    const { sessionId, projectId } = req.body;
    res.json(integ.AI_linkToInnovation(sessionId, projectId));
  });


  // ======================================================
  //  Business District (BE‑48)
  // ======================================================
  app.post("/ai/integration/business/company", (req, res) => {
    const { sessionId, companyId } = req.body;
    res.json(integ.AI_linkToBusinessCompany(sessionId, companyId));
  });

  app.get("/ai/integration/business/insights/:companyId", (req, res) => {
    res.json(integ.AI_generateBusinessInsights(req.params.companyId));
  });

  app.get("/ai/integration/business/kpis/:companyId", (req, res) => {
    res.json(integ.AI_recommendBusinessKPIs(req.params.companyId));
  });

  app.get("/ai/integration/business/trends", (req, res) => {
    res.json(integ.AI_detectBusinessTrends());
  });


  // ======================================================
  //  Community (BE‑03)
  // ======================================================
  app.post("/ai/integration/community/link", (req, res) => {
    const { sessionId, threadId } = req.body;
    res.json(integ.AI_linkToCommunityThread(sessionId, threadId));
  });

  app.get("/ai/integration/community/summary/:threadId", (req, res) => {
    res.json(integ.AI_summarizeCommunityThread(req.params.threadId));
  });

  app.get("/ai/integration/community/topics/:userId", (req, res) => {
    res.json(integ.AI_recommendCommunityTopics(req.params.userId));
  });

  app.post("/ai/integration/community/moderate", (req, res) => {
    const { message } = req.body;
    res.json(integ.AI_detectToxicity(message));
  });


  // ======================================================
  //  Knowledge Hub (BE‑19)
  // ======================================================
  app.post("/ai/integration/knowledge/link", (req, res) => {
    const { sessionId, resourceId } = req.body;
    res.json(integ.AI_linkToKnowledgeHub(sessionId, resourceId));
  });

  app.get("/ai/integration/knowledge/recommend", (req, res) => {
    const { topic } = req.query;
    res.json(integ.AI_getKnowledgeRecommendations(topic));
  });

  app.post("/ai/integration/knowledge/signal", (req, res) => {
    const { sessionId, message } = req.body;
    res.json(integ.AI_pushLearningSignal(sessionId, message));
  });


  // ======================================================
  //  Wellness Garden (BE‑43)
  // ======================================================
  app.post("/ai/integration/wellness/link", (req, res) => {
    const { sessionId, activityId } = req.body;
    res.json(integ.AI_linkToWellnessActivity(sessionId, activityId));
  });

  app.get("/ai/integration/wellness/recommend/:userId", (req, res) => {
    res.json(integ.AI_recommendWellnessActivities(req.params.userId));
  });

  app.post("/ai/integration/wellness/mood", (req, res) => {
    const { message } = req.body;
    res.json(integ.AI_analyzeWellnessMood(message));
  });


  // ======================================================
  //  Sports Arena (BE‑42)
  // ======================================================
  app.post("/ai/integration/sports/link", (req, res) => {
    const { sessionId, sportId } = req.body;
    res.json(integ.AI_linkToSportActivity(sessionId, sportId));
  });

  app.get("/ai/integration/sports/recommend/:userId", (req, res) => {
    res.json(integ.AI_recommendSports(req.params.userId));
  });

  app.post("/ai/integration/sports/performance", (req, res) => {
    const { data } = req.body;
    res.json(integ.AI_analyzePerformance(data));
  });


  // ======================================================
  //  Community House (BE‑45)
  // ======================================================
  app.post("/ai/integration/communityhouse/link", (req, res) => {
    const { sessionId, eventId } = req.body;
    res.json(integ.AI_linkToCommunityEvent(sessionId, eventId));
  });

  app.get("/ai/integration/communityhouse/recommend/:userId", (req, res) => {
    res.json(integ.AI_recommendEvents(req.params.userId));
  });

  app.post("/ai/integration/communityhouse/engagement", (req, res) => {
    const { data } = req.body;
    res.json(integ.AI_analyzeEngagement(data));
  });

}
