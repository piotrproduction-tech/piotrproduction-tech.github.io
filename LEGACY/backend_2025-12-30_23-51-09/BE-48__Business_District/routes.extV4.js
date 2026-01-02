import * as serviceV4 from "./service.extV4.js";

export function registerBusinessDistrictRoutesV4(app) {

  // Trendy
  app.get("/business/v4/trends/projects", (req, res) => {
    res.json({ list: serviceV4.Business_getProjectTrends() });
  });

  app.get("/business/v4/trends/activity", (req, res) => {
    res.json({ list: serviceV4.Business48_getActivityTrends() });
  });

  // Powiadomienia
  app.post("/business/v4/notify/project", (req, res) => {
    const { projectId, title } = req.body;
    res.json(serviceV4.Business_autoNotifyNewProject(projectId, title));
  });

  app.post("/business/v4/notify/company", (req, res) => {
    const { companyId, name } = req.body;
    res.json(serviceV4.Business48_autoNotifyNewCompany(companyId, name));
  });

  // Integracje
  app.post("/business/v4/link/innovation", (req, res) => {
    const { projectId, hubId } = req.body;
    res.json(serviceV4.Business_linkInnovationHub(projectId, hubId));
  });

  app.post("/business/v4/link/marketplace", (req, res) => {
    const { companyId, marketId } = req.body;
    res.json(serviceV4.Business48_linkMarketplace(companyId, marketId));
  });

  // Raporty v4
  app.get("/business/v4/reports", (req, res) => {
    res.json({ list: serviceV4.Business_getReports_v4() });
  });

  app.get("/business/v4/reports/activity", (req, res) => {
    res.json({ list: serviceV4.Business48_getReports() });
  });
}
// ======================================================
//  Integracja z AI Companion (BE‑38)
// ======================================================

// Analiza firmy
app.get("/business/v4/ai/insights/:companyId", (req, res) => {
  res.json(serviceV4.BD_requestAIInsights(req.params.companyId));
});

// Rekomendacje KPI
app.get("/business/v4/ai/kpis/:companyId", (req, res) => {
  res.json(serviceV4.BD_requestAIKPIRecommendations(req.params.companyId));
});

// Trendy biznesowe
app.get("/business/v4/ai/trends", (req, res) => {
  res.json(serviceV4.BD_requestAITrendAnalysis());
});

// Klasyfikacja firmy
app.get("/business/v4/ai/classify/:companyId", (req, res) => {
  res.json(serviceV4.BD_requestAIClassification(req.params.companyId));
});
