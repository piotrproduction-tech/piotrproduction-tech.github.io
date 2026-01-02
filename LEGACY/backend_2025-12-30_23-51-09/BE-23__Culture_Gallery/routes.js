// backend/BE-23/routes.js

import * as service from "./service.js";

export function registerCultureGalleryRoutes(app) {

  // Wystawy
  app.get("/culture/exhibitions", (req, res) => {
    res.json({ list: service.Gallery_getExhibitions() });
  });

  app.post("/culture/exhibitions/add", (req, res) => {
    const { userId, title, ts } = req.body;
    res.json(service.Gallery_createExhibition(userId, title, ts));
  });

  // Dzieła
  app.get("/culture/artworks", (req, res) => {
    res.json({ list: service.Gallery_getArtworks() });
  });

  app.post("/culture/artworks/add", (req, res) => {
    const { userId, title, artist, medium } = req.body;
    res.json(service.Gallery_addArtwork(userId, title, artist, medium));
  });

  // Komentarze
  app.get("/culture/comments", (req, res) => {
    const { artworkId } = req.query;
    res.json({ list: service.Gallery_getComments(artworkId) });
  });

  app.post("/culture/comments/add", (req, res) => {
    const { userId, artworkId, text } = req.body;
    res.json(service.Gallery_addComment(userId, artworkId, text));
  });

  // Raporty
  app.get("/culture/reports", (req, res) => {
    res.json({ list: service.Gallery_getReports() });
  });

  // Archiwizacja
  app.post("/culture/exhibitions/archive", (req, res) => {
    const { exhibitionId } = req.body;
    res.json(service.Gallery_archiveExhibition(exhibitionId));
  });
}
