// backend/BE-35/routes.js

import * as service from "./service.js";

export function registerGovernanceRoutes(app) {

  app.get("/governance/stats", (req, res) => {
    res.json(service.Governance_getVotingStats());
  });

  app.get("/governance/proposals", (req, res) => {
    res.json({ list: service.Governance_getProposalSummary() });
  });

  app.post("/governance/link/dao", (req, res) => {
    const { proposalId } = req.body;
    res.json(service.Governance_linkDAO(proposalId));
  });

  app.get("/governance/reports", (req, res) => {
    res.json({ list: service.Governance_getReports() });
  });
}
