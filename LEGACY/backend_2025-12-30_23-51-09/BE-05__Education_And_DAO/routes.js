// backend/BE-05/routes.js

import * as service from "./service.js";

export function registerEducationRoutes(app) {

  app.post("/education/course/add", (req, res) => {
    const { title, category, actor } = req.body;
    res.json(service.Education_addCourse(title, category, actor));
  });

  app.post("/education/course/update", (req, res) => {
    const { id, fields, actor } = req.body;
    res.json(service.Education_updateCourse(id, fields, actor));
  });

  app.post("/education/course/remove", (req, res) => {
    const { id } = req.body;
    res.json(service.Education_removeCourse(id));
  });

  app.get("/education/courses", (req, res) => {
    res.json({ list: service.Education_getCourses() });
  });
}
