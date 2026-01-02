// backend/BE-53/routes.js

import * as service from "./service.js";

export function registerMediaRoutes(app) {

  // Posty
  app.post("/media/post/add", (req, res) => {
    const { title, content, authorId } = req.body;
    res.json(service.Media_addPost(title, content, authorId));
  });

  app.get("/media/posts", (req, res) => {
    res.json({ list: service.Media_getPosts() });
  });

  // Assety
  app.post("/media/asset/add", (req, res) => {
    const { type, url, uploaderId } = req.body;
    res.json(service.Media_addAsset(type, url, uploaderId));
  });

  app.get("/media/assets", (req, res) => {
    res.json({ list: service.Media_getAssets() });
  });

  // Raporty
  app.get("/media/reports", (req, res) => {
    res.json({ list: service.Media_getReports() });
  });
}
