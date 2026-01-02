// backend/BE-41/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerCultureRoutesV3(app) {

  app.get("/culture/v3/exhibitions", (req, res) => {
    res.json({ list: service.Culture_getExhibitionSchedule() });
  });

  app.post("/culture/v3/link/festival", (req, res) => {
    const { exhibitionId, festivalId } = req.body;
    res.json(service.Culture_linkFestival_exhibition(exhibitionId, festivalId));
  });

  app.post("/culture/v3/artist/rating/add", (req, res) => {
    const { artistId, userId, rating } = req.body;
    res.json(service.Culture_addArtistRating(artistId, userId, rating));
  });

  app.get("/culture/v3/artist/ratings/:artistId", (req, res) => {
    res.json({ list: service.Culture_getArtistRatings(req.params.artistId) });
  });

  app.get("/culture/v3/reports", (req, res) => {
    res.json({ list: service.Culture_getReports_v3() });
  });
}
