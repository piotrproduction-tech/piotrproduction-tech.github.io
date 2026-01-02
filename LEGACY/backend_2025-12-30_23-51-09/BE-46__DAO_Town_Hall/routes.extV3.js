// backend/BE-46/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerDAORoutesV3(app) {

  app.get("/dao/v3/history", (req, res) => {
    res.json({ list: service.DAO_getProposalHistory() });
  });

  app.post("/dao/v3/link/governance", (req, res) => {
    const { proposalId, dashboardId } = req.body;
    res.json(service.DAO_linkGovernance(proposalId, dashboardId));
  });

  app.get("/dao/v3/trends", (req, res) => {
    res.json({ list: service.DAO_getVotingTrends() });
  });

  app.get("/dao/v3/decision/reports", (req, res) => {
    res.json({ list: service.DAO_getDecisionReports() });
  });
}
