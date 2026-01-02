// backend/BE-40/routes.js

import * as service from "./service.js";

export function registerInnovationRoutes(app) {

  // Projekty
  app.post("/innovation/project/add", (req, res) => {
    const { userId, title, description } = req.body;
    res.json(service.Innovation_addProject(userId, title, description));
  });

  app.get("/innovation/projects", (req, res) => {
    res.json({ list: service.Innovation_getProjects() });
  });

  // Partnerstwa
  app.post("/innovation/partner/add", (req, res) => {
    const { projectId, partnerName } = req.body;
    res.json(service.Innovation_addPartner(projectId, partnerName));
  });

  app.get("/innovation/partners/:projectId", (req, res) => {
    res.json({ list: service.Innovation_getPartners(req.params.projectId) });
  });

  // Integracja z Business District
  app.post("/innovation/link/business", (req, res) => {
    const { projectId, companyId } = req.body;
    res.json(service.Innovation_linkBusiness(projectId, companyId));
  });

  // Raporty
  app.get("/innovation/reports", (req, res) => {
    res.json({ list: service.Innovation_getReports() });
  });
}
