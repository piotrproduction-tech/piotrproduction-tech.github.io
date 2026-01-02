// backend/BE-51/routes.extV4.js

import * as service from "./service.extV4.js";

export function registerEducationRoutesV4(app) {

  app.get("/education/v4/trends", (req, res) => {
    res.json({ list: service.Education51_getTrends() });
  });

  app.post("/education/v4/notify/new", (req, res) => {
    const { courseId, title } = req.body;
    res.json(service.Education51_autoNotifyNewCourse(courseId, title));
  });

  app.post("/education/v4/link/dao", (req, res) => {
    const { courseId, daoId } = req.body;
    res.json(service.Education51_linkDAO(courseId, daoId));
  });

  app.get("/education/v4/reports", (req, res) => {
    res.json({ list: service.Education51_getReports() });
  });
}
