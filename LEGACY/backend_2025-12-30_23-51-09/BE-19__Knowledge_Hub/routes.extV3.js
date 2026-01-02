import * as service from "./service.extV3.js";

export function registerKnowledgeRoutesV3(app) {
  app.get("/knowledge/v3/history/:resourceId", (req, res) => {
    res.json({ list: service.Knowledge_getResourceHistory(req.params.resourceId) });
  });
}
