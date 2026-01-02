// backend/BE-35/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerGovernanceRoutesV4(app) {

  app.get("/governance/v4/trends", (req, res) => {
    res.json({ list: service.Governance35_getVotingTrends() });
  });

  app.post("/governance/v4/notify", (req, res) => {
    const { proposalId, title } = req.body;
    res.json(service.Governance35_autoNotifyNewProposal(proposalId, title));
  });

  app.post("/governance/v4/link/cityhall", (req, res) => {
    const { proposalId, resolutionId } = req.body;
    res.json(service.Governance35_linkCityHall(proposalId, resolutionId));
  });

  app.get("/governance/v4/reports", (req, res) => {
    res.json({ list: service.Governance35_getReports() });
  });
}
