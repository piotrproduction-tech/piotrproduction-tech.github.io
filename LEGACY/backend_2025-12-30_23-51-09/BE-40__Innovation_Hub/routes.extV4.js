// backend/BE-40/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerInnovationRoutesV4(app) {

  app.get("/innovation/v4/trends", (req, res) => {
    res.json({ list: service.Innovation40_getTrends() });
  });

  app.post("/innovation/v4/notify", (req, res) => {
    const { projectId, title } = req.body;
    res.json(service.Innovation40_autoNotifyNewProject(projectId, title));
  });

  app.post("/innovation/v4/link/business", (req, res) => {
    const { projectId, companyId } = req.body;
    res.json(service.Innovation40_linkBusinessDistrict(projectId, companyId));
  });

  app.post("/innovation/v4/link/grants", (req, res) => {
    const { appId, projectId } = req.body;
    res.json(service.Innovation40_linkGrants(appId, projectId));
  });

  app.get("/innovation/v4/reports", (req, res) => {
    res.json({ list: service.Innovation40_getReports() });
  });
}
