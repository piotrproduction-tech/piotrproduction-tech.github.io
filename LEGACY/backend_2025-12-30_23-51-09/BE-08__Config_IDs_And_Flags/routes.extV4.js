// backend/BE-08/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerCourseGovRoutesV4(app) {

  // Trendy
  app.get("/course-gov/v4/trends/:days", (req, res) => {
    res.json({ list: service.CourseGov_trendReport(Number(req.params.days)) });
  });

  // Auto-close
  app.post("/course-gov/v4/auto-close", (req, res) => {
    res.json(service.CourseGov_autoClose());
  });

  // Quorum report
  app.get("/course-gov/v4/quorum/:id", (req, res) => {
    res.json(service.CourseGov_quorumReport(req.params.id));
  });

  // Eksport
  app.get("/course-gov/v4/export/pdf", (req, res) => {
    const { title } = req.query;
    res.json(service.CourseGov_exportPDFPlaceholder(title));
  });
}
