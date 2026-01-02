// backend/BE-06/routes.js

import * as service from "./service.js";

export function registerDAORoutes(app) {

  app.post("/dao/proposal/add", (req, res) => {
    const { title, actor } = req.body;
    res.json(service.DAO_addProposal(title, actor));
  });

  app.post("/dao/proposal/vote", (req, res) => {
    const { id, actor } = req.body;
    res.json(service.DAO_voteProposal(id, actor));
  });

  app.post("/dao/proposal/close", (req, res) => {
    const { id, actor } = req.body;
    res.json(service.DAO_closeProposal(id, actor));
  });

  app.get("/dao/proposals", (req, res) => {
    res.json({ list: service.DAO_getProposals() });
  });
}
