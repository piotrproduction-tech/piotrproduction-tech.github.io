// backend/BE-24/routes.js

import * as service from "./service.js";

export function registerSponsoringRoutes(app) {

  // ===== Tiers =====
  app.get("/sponsor/tiers", (req, res) => {
    res.json(service.Sponsor_manageTiers());
  });

  // ===== Kampanie =====
  app.get("/sponsor/campaigns", (req, res) => {
    res.json({ list: service.Sponsor_campaigns() });
  });

  // ===== Raporty =====
  app.get("/sponsor/reports", (req, res) => {
    const { range } = req.query;
    res.json(service.Sponsor_reportsDetailed(range));
  });

  // ===== Faktury =====
  app.get("/sponsor/invoices/:userId", (req, res) => {
    const { userId } = req.params;
    res.json({ list: service.Sponsor_invoices(userId) });
  });

  // ===== Perks =====
  app.get("/sponsor/perks/:tier", (req, res) => {
    const { tier } = req.params;
    res.json(service.Sponsor_perks(tier));
  });
}
