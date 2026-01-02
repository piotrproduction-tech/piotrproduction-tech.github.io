import * as service from "./service.js";

export function registerKnowledgeRoutes(app) {

  app.get("/knowledge/resources", (req, res) => {
    res.json({ list: service.Knowledge_getResources() });
  });

  app.post("/knowledge/resource/add", (req, res) => {
    const { userId, title, category, description } = req.body;
    res.json(service.Knowledge_addResource(userId, title, category, description));
  });

  app.get("/knowledge/search/:query", (req, res) => {
    res.json({ list: service.Knowledge_search(req.params.query) });
  });

  app.get("/knowledge/filter/:category", (req, res) => {
    res.json({ list: service.Knowledge_filter(req.params.category) });
  });

  app.post("/knowledge/discussion/add", (req, res) => {
    const { userId, topic, text } = req.body;
    res.json(service.Knowledge_createDiscussion(userId, topic, text));
  });

  app.get("/knowledge/discussions", (req, res) => {
    res.json({ list: service.Knowledge_getDiscussions() });
  });

  app.get("/knowledge/reports", (req, res) => {
    res.json({ list: service.Knowledge_getReports() });
  });
}
