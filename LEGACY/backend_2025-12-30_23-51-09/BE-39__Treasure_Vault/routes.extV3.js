// backend/BE-39/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerVaultRoutesV3(app) {

  app.get("/vault/v3/history/:itemId", (req, res) => {
    res.json({ list: service.Vault_getItemHistory(req.params.itemId) });
  });

  app.post("/vault/v3/rating/add", (req, res) => {
    const { itemId, userId, rating } = req.body;
    res.json(service.Vault_addValueRating(itemId, userId, rating));
  });

  app.get("/vault/v3/ratings/:itemId", (req, res) => {
    res.json({ list: service.Vault_getValueRatings(req.params.itemId) });
  });

  app.post("/vault/v3/link/festival", (req, res) => {
    const { itemId, festivalId } = req.body;
    res.json(service.Vault_linkFestival(itemId, festivalId));
  });

  app.get("/vault/v3/link/reports", (req, res) => {
    res.json({ list: service.Vault_getLinkReports() });
  });
}
