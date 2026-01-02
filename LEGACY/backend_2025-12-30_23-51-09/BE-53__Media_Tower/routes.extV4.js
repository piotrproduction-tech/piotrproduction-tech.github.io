// backend/BE-53/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerMediaRoutesV4(app) {

  app.get("/media/v4/trends", (req, res) => {
    res.json({ list: service.Media53_getTrends() });
  });

  app.post("/media/v4/notify/new", (req, res) => {
    const { postId, title } = req.body;
    res.json(service.Media53_autoNotifyNewPost(postId, title));
  });

  app.post("/media/v4/link/culture", (req, res) => {
    const { postId, cultureId } = req.body;
    res.json(service.Media53_linkCulture(postId, cultureId));
  });

  app.post("/media/v4/link/festival", (req, res) => {
    const { postId, festivalId } = req.body;
    res.json(service.Media53_linkFestival(postId, festivalId));
  });

  app.get("/media/v4/reports", (req, res) => {
    res.json({ list: service.Media53_getReports() });
  });
}
