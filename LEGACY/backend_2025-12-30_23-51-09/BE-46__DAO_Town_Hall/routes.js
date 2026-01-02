// backend/BE-46/routes.js

import * as service from "./service.js";

export function registerDAORoutes(app) {

  // Propozycje
  app.post("/dao/proposal/add", (req, res) => {
    const { userId, title, description } = req.body;
    res.json(service.DAO_addProposal(userId, title, description));
  });

  app.get("/dao/proposals", (req, res) => {
    res.json({ list: service.DAO_getProposals() });
  });

  // Głosowania
  app.post("/dao/vote/cast", (req, res) => {
    const { userId, proposalId, choice } = req.body;
    res.json(service.DAO_castVote(userId, proposalId, choice));
  });

  app.get("/dao/votes/:proposalId", (req, res) => {
    res.json({ list: service.DAO_getVotes(req.params.proposalId) });
  });

  // Komentarze
  app.post("/dao/comment/add", (req, res) => {
    const { userId, proposalId, text } = req.body;
    res.json(service.DAO_addComment(userId, proposalId, text));
  });

  app.get("/dao/comments/:proposalId", (req, res) => {
    res.json({ list: service.DAO_getComments(req.params.proposalId) });
  });

  // Raporty
  app.get("/dao/reports", (req, res) => {
    res.json({ list: service.DAO_getReports() });
  });
}
