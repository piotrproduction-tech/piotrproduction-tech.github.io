// backend/BE-06/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerDAORoutesV4(app) {

  // Trendy
  app.get("/dao/v4/trends/:days", (req, res) => {
    res.json({ list: service.DAO_trendReport(Number(req.params.days)) });
  });

  // Auto-close
  app.post("/dao/v4/auto-close", (req, res) => {
    res.json(service.DAO_autoClose());
  });

  // Quorum report
  app.get("/dao/v4/quorum/:id", (req, res) => {
    res.json(service.DAO_quorumReport(req.params.id));
  });

  // Eksport
  app.get("/dao/v4/export/pdf", (req, res) => {
    const { title } = req.query;
    res.json(service.DAO_exportPDFPlaceholder(title));
  });
}
