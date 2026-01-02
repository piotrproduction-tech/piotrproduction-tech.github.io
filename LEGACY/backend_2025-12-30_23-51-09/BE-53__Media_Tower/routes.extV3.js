// backend/BE-53/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerMediaRoutesV3(app) {

  app.get("/media/v3/schedule", (req, res) => {
    res.json({ list: service.Media_getSchedule() });
  });

  app.post("/media/v3/link/festival", (req, res) => {
    const { postId, eventId } = req.body;
    res.json(service.Media_linkFestival(postId, eventId));
  });

  app.post("/media/v3/rating/add", (req, res) => {
    const { postId, userId, rating } = req.body;
    res.json(service.Media_addRating(postId, userId, rating));
  });

  app.get("/media/v3/ratings/:postId", (req, res) => {
    res.json({ list: service.Media_getRatings(req.params.postId) });
  });

  app.get("/media/v3/reports", (req, res) => {
    res.json({ list: service.Media_getReports_v3() });
  });
}
