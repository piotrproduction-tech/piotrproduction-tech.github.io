import * as service from "./service.extV3.js";

export function registerFestivalRoutesV3(app) {

  app.get("/festival/v3/schedule", (req, res) => {
    res.json({ list: service.Festival_getEventSchedule() });
  });

  app.post("/festival/v3/link/culture", (req, res) => {
    const { eventId, galleryId } = req.body;
    res.json(service.Festival_linkCulture(eventId, galleryId));
  });

  app.post("/festival/v3/rating/add", (req, res) => {
    const { eventId, userId, rating } = req.body;
    res.json(service.Festival_addEventRating(eventId, userId, rating));
  });

  app.get("/festival/v3/ratings/:eventId", (req, res) => {
    res.json({ list: service.Festival_getEventRatings(req.params.eventId) });
  });

  app.get("/festival/v3/reports", (req, res) => {
    res.json({ list: service.Festival_getReports_v3() });
  });
}
