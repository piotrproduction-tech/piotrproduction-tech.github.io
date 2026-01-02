// backend/BE-40/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerInnovationRoutesV3(app) {

  app.get("/innovation/v3/ranking", (req, res) => {
    res.json({ list: service.Innovation_getProjectRanking() });
  });

  app.get("/innovation/v3/partnerships/:projectId", (req, res) => {
    res.json({ list: service.Innovation_getPartnerships(req.params.projectId) });
  });

  app.get("/innovation/v3/reports", (req, res) => {
    res.json({ list: service.Innovation_getReports_v3() });
  });

  app.post("/innovation/v3/link/business", (req, res) => {
    const { projectId, companyId } = req.body;
    res.json(service.Innovation_linkBusiness(projectId, companyId));
  });
}
