import * as serviceV4 from "./service.extV4.js";

export function registerMarketplaceRoutesV4(app) {

  app.get("/marketplace/v4/trends", (req, res) => {
    res.json({ list: serviceV4.Marketplace_getTransactionTrends() });
  });

  app.post("/marketplace/v4/notify/listing", (req, res) => {
    const { listingId, title } = req.body;
    res.json(serviceV4.Marketplace_autoNotifyNewListing(listingId, title));
  });

  app.post("/marketplace/v4/link/business", (req, res) => {
    const { listingId, companyId } = req.body;
    res.json(serviceV4.Marketplace_linkBusinessDistrict(listingId, companyId));
  });

  app.get("/marketplace/v4/reports", (req, res) => {
    res.json({ list: serviceV4.Marketplace_getReportsV4() });
  });
}
