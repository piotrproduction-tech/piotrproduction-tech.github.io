import * as serviceV4 from "./service.extV4.js";

export function registerVolunteerRoutesV4(app) {

  // Trendy
  app.get("/volunteer/v4/trends", (req, res) => {
    const { days } = req.query;
    res.json(serviceV4.Volunteer_getTrends(Number(days) || 30));
  });

  // Powiadomienia
  app.post("/volunteer/v4/notify", (req, res) => {
    const { taskId, title } = req.body;
    res.json(serviceV4.Volunteer_autoNotify(taskId, title));
  });

  // Integracje
  app.post("/volunteer/v4/link/event", (req, res) => {
    const { taskId, eventId } = req.body;
    res.json(serviceV4.Volunteer_linkEvent(taskId, eventId));
  });

  app.post("/volunteer/v4/link/community", (req, res) => {
    const { taskId, groupId } = req.body;
    res.json(serviceV4.Volunteer_linkCommunity(taskId, groupId));
  });

  // Raporty v4
  app.get("/volunteer/v4/reports", (req, res) => {
    res.json({ list: serviceV4.Volunteer_getAdvancedReports() });
  });
}
