import * as service from "./service.extV4.js";

export function registerKnowledgeRoutesV4(app) {

  app.get("/knowledge/v4/trends", (req, res) => {
    res.json({ list: service.Knowledge_getPublicationTrends() });
  });

  app.post("/knowledge/v4/notify/material", (req, res) => {
    const { materialId, title } = req.body;
    res.json(service.Knowledge_autoNotifyNewMaterial(materialId, title));
  });

  app.post("/knowledge/v4/link/education", (req, res) => {
    const { courseId, materialId } = req.body;
    res.json(service.Knowledge_linkEducationV4(courseId, materialId));
  });

  app.get("/knowledge/v4/reports", (req, res) => {
    res.json({ list: service.Knowledge_getReportsV4() });
  });
}
// ===== Integracja z AI Companion (BE‑38) =====

app.post("/kh/v4/ai/summary", (req, res) => {
  const { resourceId, content } = req.body;
  res.json(serviceV4.KH_requestAISummary(resourceId, content));
});

app.post("/kh/v4/ai/classify", (req, res) => {
  const { resourceId, content } = req.body;
  res.json(serviceV4.KH_requestAIClassification(resourceId, content));
});

app.get("/kh/v4/ai/recommend/:userId", (req, res) => {
  res.json(serviceV4.KH_requestAIUserRecommendations(req.params.userId));
});
