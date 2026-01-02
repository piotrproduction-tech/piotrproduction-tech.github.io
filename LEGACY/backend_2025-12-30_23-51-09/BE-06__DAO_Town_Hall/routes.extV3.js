// backend/BE-06/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerDAORoutesV3(app) {

  app.post("/dao/v3/proposal/add", (req, res) => {
    const { title, quorum, openAt, closeAt, actor } = req.body;
    res.json(service.DAO_addTimedProposal(title, quorum, openAt, closeAt, actor));
  });

  app.post("/dao/v3/proposal/vote", (req, res) => {
    const { id, user, type } = req.body;
    res.json(service.DAO_voteTyped(id, user, type));
  });

  app.post("/dao/v3/proposal/close", (req, res) => {
    const { id, actor } = req.body;
    res.json(service.DAO_closeTimedProposal(id, actor));
  });

  app.get("/dao/v3/proposal/:id/report", (req, res) => {
    res.json(service.DAO_reportResults(req.params.id));
  });
}
