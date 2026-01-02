// backend/BE-13/routes.js

import * as service from "./service.js";

export function registerConfigRoutes(app) {

  // Flags basic
  app.post("/config/flag/set", (req, res) => {
    const { key, value, actor } = req.body;
    res.json(service.Config_setFlag(key, value, actor));
  });

  app.get("/config/flag/:key", (req, res) => {
    res.json(service.Config_getFlag(req.params.key));
  });

  app.post("/config/flag/remove", (req, res) => {
    const { key, actor } = req.body;
    res.json(service.Config_removeFlag(key, actor));
  });

  app.get("/config/flags", (req, res) => {
    res.json({ list: service.Config_getFlagsBasic() });
  });

  // ID Generator (simple)
  app.get("/config/id/:prefix", (req, res) => {
    res.json({ id: service.Config_generateID(req.params.prefix) });
  });

  // Env & modules
  app.get("/config/env", (req, res) => {
    res.json(service.Config_getEnv());
  });

  app.get("/config/module-ids", (req, res) => {
    res.json(service.Config_getModuleIds());
  });
}
