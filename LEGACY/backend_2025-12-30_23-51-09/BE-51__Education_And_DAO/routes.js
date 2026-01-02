// backend/BE-51/routes.js

import * as service from "./service.js";

export function registerEducationRoutes(app) {

  // Kursy
  app.post("/education/course/add", (req, res) => {
    const { title, description, level } = req.body;
    res.json(service.Education_addCourse(title, description, level));
  });

  app.get("/education/courses", (req, res) => {
    res.json({ list: service.Education_getCourses() });
  });

  // Rejestracje
  app.post("/education/register", (req, res) => {
    const { userId, courseId } = req.body;
    res.json(service.Education_register(userId, courseId));
  });

  app.get("/education/registrations/:courseId", (req, res) => {
    res.json({ list: service.Education_getRegistrations(req.params.courseId) });
  });

  // Integracja DAO
  app.post("/education/link/dao", (req, res) => {
    const { courseId, proposalId } = req.body;
    res.json(service.Education_linkDAO(courseId, proposalId));
  });

  // Raporty
  app.get("/education/reports", (req, res) => {
    res.json({ list: service.Education_getReports() });
  });
}
