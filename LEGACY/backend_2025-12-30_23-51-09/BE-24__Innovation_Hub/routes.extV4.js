// backend/BE-24/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerSponsorRoutesV4(app) {

  // Trendy
  app.get("/sponsor/v4/trends", (req, res) => {
    res.json({ list: service.Sponsor24_getTrends() });
  });

  // Alerty
  app.post("/sponsor/v4/notify/new", (req, res) => {
    const { campaignId, name } = req.body;
    res.json(service.Sponsor24_autoNotifyNewCampaign(campaignId, name));
  });

  // Integracje
  app.post("/sponsor/v4/link/festival", (req, res) => {
    const { campaignId, eventId } = req.body;
    res.json(service.Sponsor24_linkFestival(campaignId, eventId));
  });

  app.post("/sponsor/v4/link/marketplace", (req, res) => {
    const { campaignId, offerId } = req.body;
    res.json(service.Sponsor24_linkMarketplace(campaignId, offerId));
  });

  // Raporty
  app.get("/sponsor/v4/reports", (req, res) => {
    res.json({ list: service.Sponsor24_getReports() });
  });

  // Eksport
  app.get("/sponsor/v4/export/pdf", (req, res) => {
    const { title } = req.query;
    res.json(service.Sponsor24_exportPDFPlaceholder(title));
  });
}
