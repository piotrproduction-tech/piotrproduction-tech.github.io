// backend/BE-48/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerBusinessRoutesV3(app) {

  app.get("/business/v3/history/:companyId", (req, res) => {
    res.json({ list: service.Business_getOfferHistory(req.params.companyId) });
  });

  app.post("/business/v3/link/innovation", (req, res) => {
    const { companyId, projectId } = req.body;
    res.json(service.Business_linkInnovation(companyId, projectId));
  });

  app.post("/business/v3/rating/add", (req, res) => {
    const { companyId, userId, rating } = req.body;
    res.json(service.Business_addCompanyRating(companyId, userId, rating));
  });

  app.get("/business/v3/ratings/:companyId", (req, res) => {
    res.json({ list: service.Business_getCompanyRatings(req.params.companyId) });
  });

  app.get("/business/v3/reports", (req, res) => {
    res.json({ list: service.Business_getReports_v3() });
  });
}
