// backend/BE-05/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerEducationRoutesV3(app) {

  // Wersje
  app.post("/education/v3/course/version", (req, res) => {
    const { courseId, syllabus, actor } = req.body;
    res.json(service.Education_addCourseVersion(courseId, syllabus, actor));
  });

  // Poziomy
  app.post("/education/v3/course/level", (req, res) => {
    const { courseId, level } = req.body;
    res.json(service.Education_setCourseLevel(courseId, level));
  });

  // Postępy
  app.post("/education/v3/progress/update", (req, res) => {
    const { courseId, user, percent } = req.body;
    res.json(service.Education_updateProgress(courseId, user, percent));
  });

  app.get("/education/v3/progress/:courseId", (req, res) => {
    res.json(service.Education_reportProgress(req.params.courseId));
  });

  // Mentoring
  app.post("/education/v3/mentor/add", (req, res) => {
    const { userId, expertise } = req.body;
    res.json(service.Education_addMentor(userId, expertise));
  });

  // VR Classes
  app.post("/education/v3/vr/add", (req, res) => {
    const { title, ts } = req.body;
    res.json(service.Education_createVRClass(title, ts));
  });

  // Support Groups
  app.post("/education/v3/group/create", (req, res) => {
    const { courseId, groupName } = req.body;
    res.json(service.Education_createSupportGroup(courseId, groupName));
  });

  app.post("/education/v3/group/join", (req, res) => {
    const { groupId, userId } = req.body;
    res.json(service.Education_joinSupportGroup(groupId, userId));
  });

  // Granty
  app.post("/education/v3/grant/request", (req, res) => {
    const { userId, courseId, amount } = req.body;
    res.json(service.Education_requestGrant(userId, courseId, amount));
  });

  app.get("/education/v3/grants", (req, res) => {
    res.json({ list: service.Education_getGrants() });
  });
}
