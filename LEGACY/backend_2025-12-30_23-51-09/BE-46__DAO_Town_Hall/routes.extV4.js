// backend/BE-46/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerDAORoutesV4(app) {

  app.get("/dao/v4/trends", (req, res) => {
    res.json({ list: service.DAO46_getVotingTrends() });
  });

  app.post("/dao/v4/notify", (req, res) => {
    const { proposalId, title } = req.body;
    res.json(service.DAO46_autoNotifyNewProposal(proposalId, title));
  });

  app.post("/dao/v4/link/governance", (req, res) => {
    const { proposalId, govId } = req.body;
    res.json(service.DAO46_linkGovernance(proposalId, govId));
  });

  app.get("/dao/v4/reports", (req, res) => {
    res.json({ list: service.DAO46_getReports() });
  });
}
