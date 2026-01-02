// backend/BE-39/routes.js

import * as service from "./service.js";

export function registerVaultRoutes(app) {

  // Skarby
  app.post("/vault/item/add", (req, res) => {
    const { title, description, value } = req.body;
    res.json(service.Vault_addItem(title, description, value));
  });

  app.get("/vault/items", (req, res) => {
    res.json({ list: service.Vault_getItems() });
  });

  // Powiązania
  app.post("/vault/link/event", (req, res) => {
    const { itemId, eventId } = req.body;
    res.json(service.Vault_linkEvent(itemId, eventId));
  });

  // Raporty
  app.get("/vault/reports", (req, res) => {
    res.json({ list: service.Vault_getReports() });
  });
}
