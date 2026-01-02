// backend/BE-54/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerStudioRoutesV3(app) {

  // Współpraca
  app.post("/studio/v3/collab/add", (req, res) => {
    const { projectId, userId, role } = req.body;
    res.json(service.Studio_addCollaborator(projectId, userId, role));
  });

  app.get("/studio/v3/collab/:projectId", (req, res) => {
    res.json({ list: service.Studio_getCollaborators(req.params.projectId) });
  });

  // Assety
  app.post("/studio/v3/asset/add", (req, res) => {
    const { projectId, type, url } = req.body;
    res.json(service.Studio_addAsset(projectId, type, url));
  });

  app.get("/studio/v3/assets/:projectId", (req, res) => {
    res.json({ list: service.Studio_getAssets(req.params.projectId) });
  });

  // Oceny
  app.post("/studio/v3/rating/add", (req, res) => {
    const { projectId, userId, rating } = req.body;
    res.json(service.Studio_addRating(projectId, userId, rating));
  });

  app.get("/studio/v3/ratings/:projectId", (req, res) => {
    res.json({ list: service.Studio_getRatings(req.params.projectId) });
  });

  // Raporty
  app.get("/studio/v3/reports", (req, res) => {
    res.json({ list: service.Studio_getReports_v3() });
  });
}
