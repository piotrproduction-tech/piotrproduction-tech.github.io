// backend/BE-08/routes.extV3.js

import * as service from "./service.extV3.js";

export function registerCourseGovRoutesV3(app) {

  app.post("/course-gov/v3/proposal/add", (req, res) => {
    const { courseId, title, quorum, openAt, closeAt, actor } = req.body;
    res.json(service.CourseGov_addTimedProposal(courseId, title, quorum, openAt, closeAt, actor));
  });

  app.post("/course-gov/v3/proposal/vote", (req, res) => {
    const { proposalId, userId, type } = req.body;
    res.json(service.CourseGov_voteTyped(proposalId, userId, type));
  });

  app.post("/course-gov/v3/proposal/close", (req, res) => {
    const { proposalId, actor } = req.body;
    res.json(service.CourseGov_closeTimedProposal(proposalId, actor));
  });

  app.get("/course-gov/v3/proposal/:id/report", (req, res) => {
    res.json(service.CourseGov_reportResults(req.params.id));
  });
}
