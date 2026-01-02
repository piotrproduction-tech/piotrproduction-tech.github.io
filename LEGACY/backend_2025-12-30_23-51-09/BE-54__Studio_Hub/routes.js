// backend/BE-54/routes.js

import * as service from "./service.js";

export function registerStudioRoutes(app) {

  // Projekty
  app.post("/studio/project/add", (req, res) => {
    const { title, description, ownerId } = req.body;
    res.json(service.Studio_addProject(title, description, ownerId));
  });

  app.get("/studio/projects", (req, res) => {
    res.json({ list: service.Studio_getProjects() });
  });

  // Sceny
  app.post("/studio/scene/add", (req, res) => {
    const { projectId, name, duration } = req.body;
    res.json(service.Studio_addScene(projectId, name, duration));
  });

  app.get("/studio/scenes/:projectId", (req, res) => {
    res.json({ list: service.Studio_getScenes(req.params.projectId) });
  });

  // Timeline
  app.post("/studio/timeline/add", (req, res) => {
    const { projectId, label, ts } = req.body;
    res.json(service.Studio_addTimelineEvent(projectId, label, ts));
  });

  app.get("/studio/timeline/:projectId", (req, res) => {
    res.json({ list: service.Studio_getTimeline(req.params.projectId) });
  });

  // Raporty
  app.get("/studio/reports", (req, res) => {
    res.json({ list: service.Studio_getReports() });
  });
}
