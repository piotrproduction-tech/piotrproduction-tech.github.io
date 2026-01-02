// backend/BE-08/routes.js

import * as service from "./service.js";

export function registerCourseGovRoutes(app) {

  app.post("/course-gov/proposal/add", (req, res) => {
    const { courseId, userId, proposal } = req.body;
    res.json(service.CourseGov_addProposal(courseId, userId, proposal));
  });

  app.post("/course-gov/proposal/vote", (req, res) => {
    const { proposalId, userId, vote } = req.body;
    res.json(service.CourseGov_voteProposal(proposalId, userId, vote));
  });

  app.get("/course-gov/proposals/:courseId", (req, res) => {
    res.json({ list: service.CourseGov_getProposals(req.params.courseId) });
  });
}
