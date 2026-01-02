// backend/BE-13/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerConfigRoutesV3(app) {

  // ID sequence
  app.get("/config/v3/id/:prefix", (req, res) => {
    res.json({ id: service.Config_generateID_sequence(req.params.prefix) });
  });

  app.get("/config/v3/id/:id/validate", (req, res) => {
    res.json({ valid: service.Config_validateID(req.params.id) });
  });

  app.get("/config/v3/id-list/:prefix", (req, res) => {
    res.json({ list: service.Config_listIDs(req.params.prefix) });
  });

  // Flags extended
  app.post("/config/v3/flag/set", (req, res) => {
    const { key, value, actor, env, rollout } = req.body;
    res.json(service.Config_setFlag_extended(key, value, actor, env, rollout));
  });

  app.post("/config/v3/flag/remove", (req, res) => {
    const { key, actor } = req.body;
    res.json(service.Config_removeFlag_extended(key, actor));
  });

  app.get("/config/v3/flags/:env", (req, res) => {
    res.json({ list: service.Config_getFlags(req.params.env) });
  });

  app.get("/config/v3/rollout/check/:key/:userHash", (req, res) => {
    const { key, userHash } = req.params;
    res.json({ allowed: service.Config_rolloutCheck(key, userHash) });
  });

  // Versioned flags
  app.post("/config/v3/flag/versioned/set", (req, res) => {
    const { key, value, actor, env, rollout, reason } = req.body;
    res.json(
      service.Config_setFlagVersioned(key, value, actor, env, rollout, reason)
    );
  });

  app.get("/config/v3/flag/:key/audit", (req, res) => {
    res.json({ list: service.Config_flagAuditTrail(req.params.key) });
  });

  // Scenarios
  app.get("/config/v3/rollout/scenario/:key/:groupHash", (req, res) => {
    const { key, groupHash } = req.params;
    res.json({ allowed: service.Config_rolloutScenario(key, groupHash) });
  });

  // Feature flags / env switch
  app.get("/config/v3/feature-flags", (req, res) => {
    res.json({ list: service.Config_featureFlags() });
  });

  app.post("/config/v3/toggle", (req, res) => {
    const { flagKey, value } = req.body;
    res.json(service.Config_toggleFlag(flagKey, value));
  });

  app.post("/config/v3/env/switch", (req, res) => {
    const { env } = req.body;
    res.json(service.Config_envSwitch(env));
  });
}
