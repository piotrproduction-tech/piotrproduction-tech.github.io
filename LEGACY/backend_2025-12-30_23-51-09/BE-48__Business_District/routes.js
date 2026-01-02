import * as service from "./service.js";

export function registerBusinessDistrictRoutes(app) {

  // Firmy
  app.post("/business/company/add", (req, res) => {
    const { name, revenue } = req.body;
    res.json(service.BusinessDistrict_addCompany(name, revenue));
  });

  app.post("/business/company/revenue", (req, res) => {
    const { id, revenue } = req.body;
    res.json(service.BusinessDistrict_updateRevenue(id, revenue));
  });

  app.get("/business/companies", (req, res) => {
    res.json({ list: service.BusinessDistrict_getCompanies() });
  });

  // Raporty
  app.get("/business/reports", (req, res) => {
    res.json({ list: service.BusinessDistrict_getReports() });
  });

  // ===== DODANE Z BE‑12 =====

  app.post("/business/company/kpi", (req, res) => {
    const { companyId, kpi } = req.body;
    res.json(service.BusinessDistrict_updateKPI(companyId, kpi));
  });

  app.post("/business/filter", (req, res) => {
    res.json(service.BusinessDistrict_filter(req.body));
  });

  app.get("/business/industry/report", (req, res) => {
    res.json(service.BusinessDistrict_reportByIndustry());
  });

  app.get("/business/industry/trend", (req, res) => {
    const { industry, days } = req.query;
    res.json(service.BusinessDistrict_trendReport(industry, Number(days) || 30));
  });

  app.get("/business/export/pdf", (req, res) => {
    const { title } = req.query;
    res.json(service.BusinessDistrict_exportPDFPlaceholder(title));
  });

  app.post("/business/contracts", (req, res) => {
    const { partnerId, contractData } = req.body;
    res.json(service.Business_contracts(partnerId, contractData));
  });

  app.get("/business/investments", (req, res) => {
    const { range } = req.query;
    res.json(service.Business_investments(range));
  });

  app.get("/business/partner/dashboard/:partnerId", (req, res) => {
    res.json(service.Business_partnerDashboard(req.params.partnerId));
  });
}
