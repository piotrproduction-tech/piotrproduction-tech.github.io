// backend/BE-54/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerStudioRoutesV4(app) {

  app.get("/studio/v4/trends", (req, res) => {
    res.json({ list: service.Studio54_getProductionTrends() });
  });

  app.post("/studio/v4/notify/render", (req, res) => {
    const { projectId, stage } = req.body;
    res.json(service.Studio54_autoNotifyRender(projectId, stage));
  });

  app.post("/studio/v4/link/media", (req, res) => {
    const { projectId, mediaId } = req.body;
    res.json(service.Studio54_linkMedia(projectId, mediaId));
  });

  app.post("/studio/v4/link/festival", (req, res) => {
    const { projectId, festivalId } = req.body;
    res.json(service.Studio54_linkFestival(projectId, festivalId));
  });

  app.get("/studio/v4/reports", (req, res) => {
    res.json({ list: service.Studio54_getReports() });
  });
}
