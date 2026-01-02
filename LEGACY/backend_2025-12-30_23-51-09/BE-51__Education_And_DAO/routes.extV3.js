// backend/BE-51/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerEducationRoutesV3(app) {

  app.get("/education/v3/schedule", (req, res) => {
    res.json({ list: service.Education_getCourseSchedule() });
  });

  app.post("/education/v3/link/citizen", (req, res) => {
    const { userId, courseId } = req.body;
    res.json(service.Education_linkCitizen(userId, courseId));
  });

  app.post("/education/v3/rating/add", (req, res) => {
    const { courseId, userId, rating } = req.body;
    res.json(service.Education_addCourseRating(courseId, userId, rating));
  });

  app.get("/education/v3/ratings/:courseId", (req, res) => {
    res.json({ list: service.Education_getCourseRatings(req.params.courseId) });
  });

  app.get("/education/v3/reports", (req, res) => {
    res.json({ list: service.Education_getReports_v3() });
  });
}
