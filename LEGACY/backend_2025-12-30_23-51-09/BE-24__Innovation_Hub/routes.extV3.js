// backend/BE-24/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerSponsorRoutesV3(app) {

  // Kampanie
  app.post("/sponsor/v3/campaign/add", (req, res) => {
    const { name, budget, owner } = req.body;
    res.json(service.Sponsor24_addCampaign(name, budget, owner));
  });

  app.post("/sponsor/v3/campaign/status", (req, res) => {
    const { campaignId, status } = req.body;
    res.json(service.Sponsor24_updateCampaignStatus(campaignId, status));
  });

  // Leady
  app.post("/sponsor/v3/lead/register", (req, res) => {
    const { campaignId, companyId, contact } = req.body;
    res.json(service.Sponsor24_registerLead(campaignId, companyId, contact));
  });

  // Raport kampanii
  app.get("/sponsor/v3/campaign/:campaignId/report", (req, res) => {
    res.json(service.Sponsor24_campaignReport(req.params.campaignId));
  });

  // Integracja z Business District
  app.post("/sponsor/v3/link/business", (req, res) => {
    const { campaignId, companyId } = req.body;
    res.json(service.Sponsor24_linkBusiness(campaignId, companyId));
  });
}
