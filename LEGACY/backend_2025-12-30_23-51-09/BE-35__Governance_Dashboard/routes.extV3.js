// backend/BE-35/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerGovernanceRoutesV3(app) {

  app.get("/governance/v3/stats", (req, res) => {
    res.json(service.Governance_getVotingStats_v3());
  });

  app.get("/governance/v3/trends", (req, res) => {
    res.json({ list: service.Governance_getTrends() });
  });

  app.post("/governance/v3/link/citizen", (req, res) => {
    const { userId, consoleId } = req.body;
    res.json(service.Governance_linkCitizen(userId, consoleId));
  });

  app.get("/governance/v3/reports/comparative", (req, res) => {
    res.json({ list: service.Governance_getComparativeReports() });
  });
}
